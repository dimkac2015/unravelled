// ART PIPELINE — generates the 5 page pictures with a Mistral image agent,
// self-checks each one with a vision critic, caches WebP files on disk.
// Every network call is wrapped; failures fall back to the old SVG generators.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { Mistral } from "@mistralai/mistralai";
import sharp from "sharp";
import { PAGES, buildPrompt } from "../public/art/style_bible.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

export const ART_CONFIG = {
  enabled: process.env.IMAGES_ENABLED !== "false",
  maxAttempts: Number(process.env.MAX_ATTEMPTS || 2),
  concurrency: Number(process.env.CONCURRENCY || 2),
  textModel: process.env.TEXT_MODEL || "mistral-large-latest",
  visionModel: process.env.VISION_MODEL || "mistral-medium-latest",
  visionFallbackModel: "pixtral-large-latest",
  imageAgentModel: "mistral-medium-latest",
  imageTimeoutMs: 90000,
  cacheDir: path.join(ROOT, "cache"),
  galleryDir: path.join(ROOT, "arttest"),
};

function log(...args) {
  console.log("[ART]", ...args);
}

const mistral = process.env.MISTRAL_API_KEY ? new Mistral({ apiKey: process.env.MISTRAL_API_KEY }) : null;

function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }
function readJson(f, fb) { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return fb; } }
function writeJson(f, v) { ensureDir(path.dirname(f)); fs.writeFileSync(f, JSON.stringify(v, null, 2)); }
function appendLog(playlistId, entry) {
  const f = path.join(ART_CONFIG.cacheDir, playlistId, "log.json");
  const arr = readJson(f, []);
  arr.push({ ts: new Date().toISOString(), ...entry });
  writeJson(f, arr);
}

/* ---------------- image agent (created once, id persisted) ---------------- */

async function getImageAgent() {
  if (!mistral) throw new Error("MISTRAL_API_KEY missing");
  const agentFile = path.join(ART_CONFIG.cacheDir, "agent.json");
  let saved = readJson(agentFile, null);
  if (saved && saved.agentId) {
    try {
      await mistral.beta.agents.get({ agentId: saved.agentId });
      log("reusing image agent", saved.agentId);
      return saved.agentId;
    } catch (e) {
      log("saved agent gone, recreating:", e.message);
    }
  }
  const agent = await mistral.beta.agents.create({
    model: ART_CONFIG.imageAgentModel,
    name: "unravelled-art",
    instructions: "Generate exactly one image for the user's prompt with the image generation tool. Use the prompt exactly as given. Never add text, letters or watermarks to the image.",
    tools: [{ type: "image_generation" }],
    completionArgs: { temperature: 0.3, top_p: 0.95 },
  });
  writeJson(agentFile, { agentId: agent.id });
  log("created image agent", agent.id);
  return agent.id;
}

function findFileId(node) {
  if (!node || typeof node !== "object") return null;
  if (node.type === "tool_file" && node.file_id) return node.file_id;
  if (node.file_id && typeof node.file_id === "string") return node.file_id;
  for (const k of Object.keys(node)) {
    const r = findFileId(node[k]);
    if (r) return r;
  }
  return null;
}

async function fetchWithTimeout(url, opts, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    return res;
  } finally { clearTimeout(t); }
}

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// one image generation attempt: conversation -> tool_file -> download -> sharp webp
async function generateImageBytes(prompt, attempt) {
  const agentId = await getImageAgent();
  log("conversation start, attempt", attempt);
  const conv = await mistral.beta.conversations.start({ agentId, inputs: prompt });
  const fileId = findFileId(conv);
  if (!fileId) throw new Error("no tool_file in conversation response");
  log("got file_id", fileId);
  const dl = await mistral.files.download({ fileId });
  const buf = Buffer.from(await dl.arrayBuffer());
  const webp = await sharp(buf).resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  return webp;
}

async function generateWithRetry(prompt) {
  let lastErr = null;
  for (let i = 0; i < 3; i++) {
    try {
      return await generateImageBytes(prompt, i + 1);
    } catch (e) {
      lastErr = e;
      const status = e.status || e.response?.status;
      const retryable = status === 429 || (status >= 500 && status < 600) || e.name === "AbortError";
      log("attempt failed:", e.message, "status", status, "retryable", retryable);
      if (!retryable || i === 2) break;
      await sleep(1000 * Math.pow(2, i) + Math.floor(Math.random() * 500));
    }
  }
  throw lastErr || new Error("image generation failed");
}

/* ---------------- art critic (vision model, strict JSON rubric) ---------------- */

const CRITIC_RUBRIC = `You are an art critic checking one generated illustration. Reply with STRICT JSON only, no markdown:
{"score":1-10,"style_match":bool,"matches_brief":bool,"has_text_or_watermark":bool,"anatomy_or_face_problems":bool,"unsafe_or_graphic":bool,"composition_ok":bool,"fix_notes":"one or two short sentences on what to change"}
Score 1-10 on overall quality. has_text_or_watermark=true if ANY text/letters/logos/watermark appear. anatomy_or_face_problems=true if faces/hands/anatomy are distorted. unsafe_or_graphic=true if graphic/unsafe content.`;

async function criticCheck(webpBuf, prompt) {
  if (!mistral) throw new Error("MISTRAL_API_KEY missing");
  const dataUrl = `data:image/webp;base64,${webpBuf.toString("base64")}`;
  const userContent = [
    { type: "text", text: `${CRITIC_RUBRIC}\n\nThe brief was: ${prompt}` },
    { type: "image_url", image_url: { url: dataUrl } },
  ];
  for (const model of [ART_CONFIG.visionModel, ART_CONFIG.visionFallbackModel]) {
    try {
      const res = await mistral.chat.complete({
        model,
        responseFormat: { type: "json_object" },
        messages: [{ role: "user", content: userContent }],
      });
      const text = res.choices?.[0]?.message?.content || "";
      const json = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(json.slice(json.indexOf("{"), json.lastIndexOf("}") + 1));
      log("critic", model, "score", parsed.score);
      return parsed;
    } catch (e) {
      log("critic model failed:", model, e.message);
    }
  }
  return null; // critic unavailable — caller decides
}

function criticAccepts(c) {
  return c && c.score >= 7 && c.has_text_or_watermark === false && c.anatomy_or_face_problems === false && c.unsafe_or_graphic === false && c.matches_brief === true;
}

/* ---------------- one page: generate -> critic -> maybe regenerate once ---------------- */

export async function generatePagePicture(playlistId, page, analysis) {
  const dir = path.join(ART_CONFIG.cacheDir, playlistId);
  const outFile = path.join(dir, `${page}.webp`);
  if (fs.existsSync(outFile)) {
    log(page, "already cached");
    return { status: "ready", url: `/cache/${playlistId}/${page}.webp`, score: null, cached: true };
  }
  const prompt = buildPrompt(page, analysis);
  let best = null;
  for (let attempt = 1; attempt <= ART_CONFIG.maxAttempts; attempt++) {
    try {
      const webp = await generateWithRetry(attempt === 1 ? prompt : prompt + " " + (best?.critic?.fix_notes || ""));
      const critic = await criticCheck(webp, prompt).catch((e) => { log("critic error", e.message); return null; });
      const cand = { webp, critic, prompt, attempt };
      if (!best || (critic?.score || 0) > (best.critic?.score || 0)) best = cand;
      appendLog(playlistId, { page, attempt, score: critic?.score ?? null, prompt, fix_notes: critic?.fix_notes || null });
      if (criticAccepts(critic)) break;
      if (attempt < ART_CONFIG.maxAttempts) log(page, "not accepted, regenerating with fix notes");
    } catch (e) {
      log(page, "attempt", attempt, "failed:", e.message);
      appendLog(playlistId, { page, attempt, error: String(e.message || e), prompt });
    }
  }
  const c = best?.critic;
  const okByScore = c && c.score >= 5 && c.has_text_or_watermark === false && c.unsafe_or_graphic === false;
  if (best && (criticAccepts(c) || okByScore)) {
    ensureDir(dir);
    fs.writeFileSync(outFile, best.webp);
    log(page, "saved", outFile, "score", c.score);
    return { status: "ready", url: `/cache/${playlistId}/${page}.webp`, score: c.score };
  }
  log(page, "FAILED — SVG fallback will be used");
  return { status: "failed", url: null, score: c?.score ?? null };
}

/* ---------------- job queue (concurrency N, page order) ---------------- */

const jobs = new Map(); // jobId -> { playlistId, pages: {page: {status,url,score}} }

export function startImageJobs(playlistId, analysis) {
  const jobId = crypto.randomBytes(8).toString("hex");
  const pages = {};
  for (const p of PAGES) pages[p] = { status: "pending", url: null, score: null };
  const job = { playlistId, analysis, pages };
  jobs.set(jobId, job);
  if (!ART_CONFIG.enabled || !mistral) {
    for (const p of PAGES) pages[p] = { status: "failed", url: null, score: null };
    log("images disabled or no key — all pages will use SVG fallback");
    return jobId;
  }
  // simple concurrency-limited worker
  let cursor = 0;
  const worker = async () => {
    while (cursor < PAGES.length) {
      const page = PAGES[cursor++];
      try {
        pages[page] = await generatePagePicture(playlistId, page, analysis);
      } catch (e) {
        log(page, "job error:", e.message);
        pages[page] = { status: "failed", url: null, score: null };
      }
    }
  };
  for (let i = 0; i < Math.min(ART_CONFIG.concurrency, PAGES.length); i++) worker();
  return jobId;
}

export function getJob(jobId) {
  const job = jobs.get(jobId);
  if (!job) return null;
  return { jobId, playlistId: job.playlistId, pages: job.pages };
}

export function regeneratePage(playlistId, page) {
  const f = path.join(ART_CONFIG.cacheDir, playlistId, `${page}.webp`);
  try { fs.unlinkSync(f); } catch {}
  const analysis = readJson(path.join(ART_CONFIG.cacheDir, playlistId, "analysis.json"), null);
  if (!analysis) throw new Error("no cached analysis for " + playlistId);
  return generatePagePicture(playlistId, page, analysis);
}

/* ---------------- gallery data ---------------- */

export function galleryData() {
  const out = [];
  if (!fs.existsSync(ART_CONFIG.cacheDir)) return out;
  for (const playlistId of fs.readdirSync(ART_CONFIG.cacheDir)) {
    const dir = path.join(ART_CONFIG.cacheDir, playlistId);
    if (!fs.statSync(dir).isDirectory()) continue;
    const analysis = readJson(path.join(dir, "analysis.json"), null);
    const logEntries = readJson(path.join(dir, "log.json"), []);
    for (const p of PAGES) {
      const f = path.join(dir, `${p}.webp`);
      if (fs.existsSync(f)) {
        const lg = [...logEntries].reverse().find((e) => e.page === p);
        out.push({ playlistId, page: p, url: `/cache/${playlistId}/${p}.webp`, score: lg?.score ?? null, prompt: lg?.prompt || "", fix_notes: lg?.fix_notes || "", title: analysis?.scene_title || playlistId });
      }
    }
  }
  return out;
}

export { ART_CONFIG as CONFIG };
