const SPOTIFY_CLIENT_ID = "";

const I18N = {
  en: {
    tagline: "Paste the link of your Spotify playlist below — we'll pull the thread and unravel your music into a picture, a quote from your own songs, and a few words about you.",
    howItWorks: "1 · paste the link    2 · pull the thread    3 · watch it unravel",
    example: "Example: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    spotifyNote: "To quote songs from your actual playlist, put your Spotify app Client ID into SPOTIFY_CLIENT_ID in app.js. Until then, mood lines are used.",
    inputPlaceholder: "https://open.spotify.com/playlist/...",
    btnUnravel: "Unravel",
    badLink: "That doesn't look like a Spotify playlist link.",
    yarnTitle: "Your playlist, wound into a ball of yarn.",
    pullHint: "Click the ball — the thread will fall down and fade.",
    quoteNote: "A line that matches the mood of your songs.",
    fromPlaylist: "a song from your own playlist",
    oceanLabel: "ocean:",
    skyLabel: "sky:",
    pullThread: "Pull the thread",
    characterKicker: "The thread says you are…",
    movieKicker: "Your story would be called…",
    readingKicker: "A few words about you",
    restart: "Unravel another playlist",
    characterDesc: "Not a label — just the shape your taste tends to take.",
    movieDesc: "The film your playlist would star in, if songs could act.",
    roles: ["a teacher", "a quiet philosopher", "a night-shift dreamer", "a librarian of small joys", "an amateur detective of moods", "a gardener of ideas", "a collector of sunsets", "a keeper of playlists", "a lighthouse keeper, metaphorically", "a cartographer of feelings", "a chef of small moments", "a pilot of paper planes", "a poet of everyday things", "a DJ of rainy Sundays", "a matchmaker of ideas", "a storyteller by the fire"],
    compliments: ["Your taste has a quiet confidence to it.", "You curate vibes the way other people curate furniture — carefully, and with love.", "There's a warm, steady rhythm to everything you pick.", "You have the rare gift of making ordinary songs feel like they were made for you.", "Your playlist reads like a diary written in choruses.", "You listen the way other people watch sunsets — fully, and without rushing.", "Somewhere in your tracklist there's a song that secretly describes you.", "You give people songs the way good friends give advice — at exactly the right moment."],
    roasts: ["Though you'd absolutely reorganize a stranger's bookshelf by genre and mood.", "You'd be the friend who says 'actually' at parties — endearingly, though.", "Your 'shuffle' finger is suspiciously well trained.", "You probably hum in public more than you think you do.", "Somewhere, a mixtape is nervously taking notes.", "You'd definitely name a playlist 'untitled 47' and defend it passionately.", "Your 'five more minutes' playlist is 4 hours long. We know.", "You say 'one last song' the way other people say 'one last slice'."],
    readingTemplate: "You seem like {role} — the {scene} of your friend group. {compliment} {roast}",
    adj: ["Silent", "Golden", "Velvet", "Distant", "Hidden", "Amber", "Pale", "Wild", "Gentle", "Electric", "Moonlit", "Patient", "Lucky", "Quiet", "Brave", "Sunny", "Midnight", "Paper", "Copper", "Soft"],
    typeWord: { ocean: "Tide", forest: "Pines", stars: "Sky", desert: "Dunes", mountains: "Peaks", aurora: "Lights", city: "Avenues", meadow: "Grass", canyon: "Rocks", lake: "Mirror", sakura: "Petals", tundra: "Snow", waterfall: "Falls", lavender: "Bloom", volcano: "Ember", lighthouse: "Beam", balloons: "Drift", wheat: "Field" }
  }
};
I18N.ru = {
  tagline: "Вставьте ссылку на ваш плейлист Spotify ниже — мы потянем за нитку и развернём вашу музыку в картинку, цитату из ваших же песен и пару слов о вас.",
  howItWorks: "1 · вставьте ссылку    2 · потяните за нитку    3 · смотрите, как она разматывается",
  example: "Пример: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  spotifyNote: "Чтобы цитировать песни из вашего плейлиста, вставьте Client ID вашего приложения Spotify в SPOTIFY_CLIENT_ID в app.js. Пока что используются строки по настроению.",
  inputPlaceholder: "https://open.spotify.com/playlist/...",
  btnUnravel: "Размотать",
  badLink: "Это не похоже на ссылку на плейлист Spotify.",
  yarnTitle: "Ваш плейлист, свёрнутый в клубок пряжи.",
  pullHint: "Нажмите на клубок — нитка опустится вниз и медленно растает.",
  quoteNote: "Строка, подходящая под настроение ваших песен.",
  fromPlaylist: "песня из вашего плейлиста",
  oceanLabel: "океан:",
  skyLabel: "небо:",
  pullThread: "Потянуть за нитку",
  characterKicker: "Нитка говорит, что вы…",
  movieKicker: "Ваша история называлась бы…",
  readingKicker: "Пара слов о вас",
  restart: "Размотать другой плейлист",
  characterDesc: "Не ярлык, а форма, которую обычно принимает ваш вкус.",
  movieDesc: "Фильм, в котором снялся бы ваш плейлист, если бы песни умели играть.",
  roles: ["учитель", "тихий философ", "ночной мечтатель", "библиотекарь маленьких радостей", "любитель-детектив настроений", "садовник идей", "собиратель закатов", "хранитель плейлистов", "смотритель маяка, в переносном смысле", "картограф чувств", "повар маленьких моментов", "пилот бумажных самолётиков", "поэт повседневных вещей", "диджей дождливых воскресений", "сводник идей", "рассказчик у костра"],
  compliments: ["В вашем вкусе есть тихая уверенность.", "Вы собираете настроения так же бережно, как другие — мебель.", "Во всём, что вы выбираете, есть тёплый ровный ритм.", "У вас редкий дар: обычные песни кажутся написанными для вас.", "Ваш плейлист читается как дневник, написанный припевами.", "Вы слушаете так, как другие смотрят на закат, — полностью и не торопясь.", "Где-то в вашем треклисте есть песня, которая тайно описывает вас.", "Вы дарите людям песни так же, как хорошие друзья дарят советы, — в нужный момент."],
  roasts: ["Хотя чужую книжную полку вы бы точно разобрали по жанрам и настроению.", "Вы были бы тем другом, который говорит «на самом деле» на вечеринках — мило, впрочем.", "Ваш палец на кнопке shuffle подозрительно натренирован.", "Вы, вероятно, напеваете на людях чаще, чем думаете.", "Где-то микстейп нервно делает пометки.", "Вы наверняка назвали бы плейлист «без названия 47» и страстно бы его отстаивали.", "Ваш плейлист «ещё пять минут» длится 4 часа. Мы знаем.", "Вы говорите «последняя песня» так же, как другие говорят «последний кусочек»."],
  readingTemplate: "Вы похожи на {role} — на {scene} в своей компании друзей. {compliment} {roast}",
  adj: ["Тихий", "Золотой", "Бархатный", "Далёкий", "Скрытый", "Янтарный", "Бледный", "Дикий", "Нежный", "Электрический", "Лунный", "Терпеливый", "Удачливый", "Негромкий", "Храбрый", "Солнечный", "Полуночный", "Бумажный", "Медный", "Мягкий"],
  typeWord: { ocean: "Прилив", forest: "Сосны", stars: "Небо", desert: "Дюны", mountains: "Вершины", aurora: "Огни", city: "Проспекты", meadow: "Травы", canyon: "Скалы", lake: "Зеркало", sakura: "Лепестки", tundra: "Снега", waterfall: "Водопад", lavender: "Лаванду", volcano: "Вулкан", lighthouse: "Маяк", balloons: "Шары", wheat: "Поле" }
};
I18N.be = {
  tagline: "Уставьце спасылку на ваш плейліст Spotify ніжэй — мы пацягнем за нітку і разгорнем вашу музыку ў карцінку, цытату з вашых песень і пару слоў пра вас.",
  howItWorks: "1 · устаўце спасылку    2 · пацягніце за нітку    3 · глядзіце, як яна размотваецца",
  example: "Прыклад: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  spotifyNote: "Каб цытаваць песні з вашага плейліста, устаўце Client ID вашай прыкладання Spotify у SPOTIFY_CLIENT_ID у app.js. Пакуль выкарыстоўваюцца радкі па настроі.",
  inputPlaceholder: "https://open.spotify.com/playlist/...",
  btnUnravel: "Разматаць",
  badLink: "Гэта не падобна на спасылку на плейліст Spotify.",
  yarnTitle: "Ваш плейліст, згорнуты ў клубок пражы.",
  pullHint: "Націсніце на клубок — нітка апусціцца ўніз і павольна знікне.",
  quoteNote: "Радок, які пасуе настрою вашых песень.",
  fromPlaylist: "песня з вашага плейліста",
  oceanLabel: "акіян:",
  skyLabel: "неба:",
  pullThread: "Пацягнуць за нітку",
  characterKicker: "Нітка кажа, што вы…",
  movieKicker: "Ваша гісторыя называлася б…",
  readingKicker: "Пара слоў пра вас",
  restart: "Разматаць іншы плейліст",
  characterDesc: "Не ярлык, а форма, якую звычайна прымае ваш густ.",
  movieDesc: "Фільм, у якім зняўся б ваш плейліст, каб песні ўмелі іграць.",
  roles: ["настаўнік", "ціхі філосаф", "начны фантазёр", "бібліятэкар маленькіх радасцяў", "аматар-дэтэктыў настрояў", "садоўнік ідэй", "збіральнік заходаў", "захавальнік плейлістаў", "смотрынік маяка, у пераносным сэнсе", "картограф пачуццяў", "кухар маленькіх момантаў", "пілот папяровых самалёцікаў", "паэт паўсядзённых рэчаў", "дыджэй дажджлівых нядзель", "зводнік ідэй", "апавядальнік ля вогнішча"],
  compliments: ["У вашым густе ёсць ціхая ўпэўненасць.", "Вы збіраеце настроі так беражліва, як іншыя — мэблю.", "Ва ўсім, што вы выбіраеце, цёплы роўны рытм.", "У вас рэдкі дар: звычайныя песні здаюцца напісанымі для вас.", "Ваш плейліст чытаецца як дзённік, напісаны прыпевамі.", "Вы слухаеце так, як іншыя глядзяць на захад, — цалкам і не спяшаючыся.", "Дзе-то ў вашым трэклісце песня, якая таемна апісвае вас.", "Вы дорыце людзям песні так, як добрыя сябры дораць парады, — у патрэбны момант."],
  roasts: ["Хоць чужую кніжную паліцу вы б дакладна разабралі па жанрах і настроях.", "Вы былі б сябрам, які кажа «на самой справе» на вечарынках — міла, зрэшты.", "Ваш палец на кнопцы shuffle падазрона натренаваны.", "Вы, верагодна, напяваеце на людзях часцей, чым думаеце.", "Недзе мікстэйп нервова робіць нататкі.", "Вы б назвалі плейліст «без назвы 47» і запалена б яго абаранялі.", "Ваш плейліст «яшчэ пяць хвілін» доўжыцца 4 гадзіны. Мы ведаем.", "Вы кажаце «апошняя песня» так, як іншыя кажуць «апошні кавалак»."],
  readingTemplate: "Вы падобныя на {role} — на {scene} ў сваёй кампаніі сяброў. {compliment} {roast}",
  adj: ["Ціхі", "Залаты", "Бархатны", "Далёкі", "Схаваны", "Янтарны", "Бледны", "Дзікі", "Пяшчотны", "Электрычны", "Месячны", "Цярплівы", "Удачлівы", "Ціхі", "Хрitariasны", "Сонечны", "Паўночны", "Папяровы", "Медны", "Мяккі"],
  typeWord: { ocean: "Прыліў", forest: "Сосны", stars: "Неба", desert: "Дюны", mountains: "Вяршыні", aurora: "Агні", city: "Праспекты", meadow: "Травы", canyon: "Скалы", lake: "Люстра", sakura: "Лепесткі", tundra: "Снегі", waterfall: "Вадаспад", lavender: "Лаванду", volcano: "Вулкан", lighthouse: "Маяк", balloons: "Шары", wheat: "Поле" }
};
I18N.fr = {
  tagline: "Collez le lien de votre playlist Spotify ci-dessous — on tirera le fil et votre musique se déploiera en image, en citation de vos propres chansons et en quelques mots sur vous.",
  howItWorks: "1 · collez le lien    2 · tirez le fil    3 · regardez-le se défaire",
  example: "Exemple : https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  spotifyNote: "Pour citer les morceaux de votre playlist, mettez le Client ID de votre appli Spotify dans SPOTIFY_CLIENT_ID dans app.js. Jusque-là, des phrases d'ambiance sont utilisées.",
  inputPlaceholder: "https://open.spotify.com/playlist/...",
  btnUnravel: "Démêler",
  badLink: "Ça ne ressemble pas à un lien de playlist Spotify.",
  yarnTitle: "Votre playlist, enroulée en pelote de laine.",
  pullHint: "Cliquez sur la pelote — le fil tombera et s'effacera lentement.",
  quoteNote: "Une ligne qui correspond à l'ambiance de vos chansons.",
  fromPlaylist: "un morceau de votre propre playlist",
  oceanLabel: "océan :",
  skyLabel: "ciel :",
  pullThread: "Tirer le fil",
  characterKicker: "Le fil dit que vous êtes…",
  movieKicker: "Votre histoire s'appellerait…",
  readingKicker: "Quelques mots sur vous",
  restart: "Démêler une autre playlist",
  characterDesc: "Pas une étiquette — juste la forme que prend votre goût.",
  movieDesc: "Le film dans lequel jouerait votre playlist, si les chansons savaient jouer la comédie.",
  roles: ["un professeur", "un philosophe tranquille", "un rêveur de nuit", "un bibliothécaire des petites joies", "un détective amateur des humeurs", "un jardinier d'idées", "un collectionneur de couchers de soleil", "un gardien de playlists", "un gardien de phare, métaphoriquement", "un cartographe des sentiments", "un chef des petits moments", "un pilote d'avions en papier", "un poète des choses de tous les jours", "un DJ des dimanches pluvieux", "un entremetteur d'idées", "un conteur au coin du feu"],
  compliments: ["Votre goût a une confiance tranquille.", "Vous agencez les ambiances comme d'autres agencent des meubles — avec soin et amour.", "Il y a un rythme chaud et régulier dans tout ce que vous choisissez.", "Vous avez le don rare de rendre les chansons ordinaires écrites pour vous.", "Votre playlist se lit comme un journal écrit en refrains.", "Vous écoutez comme d'autres regardent le coucher de soleil — pleinement, sans précipitation.", "Quelque part dans votre liste se cache une chanson qui vous décrit secrètement.", "Vous offrez des chansons comme les bons amis offrent des conseils — au bon moment."],
  roasts: ["Même si vous réorganiseriez sûrement l'étagère d'un inconnu par genre et par humeur.", "Vous seriez l'ami qui dit « en fait » aux soirées — de façon touchante, cela dit.", "Votre doigt sur le bouton shuffle est bizarrement entraîné.", "Vous fredonnez probablement en public plus que vous ne le pensez.", "Quelque part, une mixtape prend des notes nerveusement.", "Vous appelleriez sûrement une playlist « sans titre 47 » et la défendrez avec passion.", "Votre playlist « cinq minutes de plus » dure 4 heures. On sait.", "Vous dites « dernière chanson » comme les autres disent « dernière part »."],
  readingTemplate: "Vous ressemblez à {role} — au {scene} de votre groupe d'amis. {compliment} {roast}",
  adj: ["Silencieux", "Doré", "Velouté", "Lointain", "Caché", "Ambré", "Pâle", "Sauvage", "Doux", "Électrique", "Lunaire", "Patient", "Chanceux", "Discret", "Brave", "Ensoleillé", "De minuit", "Papier", "Cuivré", "Doux"],
  typeWord: { ocean: "Marée", forest: "Pins", stars: "Ciel", desert: "Dunes", mountains: "Pics", aurora: "Lumières", city: "Avenues", meadow: "Herbes", canyon: "Rochers", lake: "Miroir", sakura: "Pétales", tundra: "Neiges", waterfall: "Cascade", lavender: "Lavande", volcano: "Volcan", lighthouse: "Phare", balloons: "Ballons", wheat: "Champ" }
};

const MOODS = ["calm", "wild", "tender", "wistful"];

const QUOTES = [
  { mood: "calm",    en: "The tide does not hurry, yet everything arrives.", ru: "Прилив не торопится, и всё равно всё приходит.", be: "Прыліў не спяшаецца, і ўсё роўна ўсё прыходзіць.", fr: "La marée ne se presse pas, pourtant tout arrive." },
  { mood: "wild",    en: "Hold the thread as I walk away — watch me unravel.", ru: "Держи нить, пока я ухожу, — смотри, как я распускаюсь.", be: "Трымай нітку, пакуль я адыходжу, — глядзі, як я размотваюся.", fr: "Tiens le fil pendant que je m'en vais — regarde-moi me défaire." },
  { mood: "tender",  en: "Some songs are just small lights left on for you.", ru: "Некоторые песни — просто маленький свет, оставленный для тебя.", be: "Некаторыя песні — проста маленькае святло, пакінутае для цябе.", fr: "Certaines chansons ne sont que de petites lumières laissées pour toi." },
  { mood: "wistful", en: "We are all playlists of people we used to be.", ru: "Мы все — плейлисты из людей, которыми мы были раньше.", be: "Мы ўсе — плейлісты з людзей, якімі мы былі раней.", fr: "Nous sommes tous des playlists de ceux que nous étions." },
  { mood: "calm",    en: "Slow down; the melody is already here.", ru: "Помедленнее — мелодия уже здесь.", be: "Павольней — мелодыя ўжо тут.", fr: "Ralentis ; la mélodie est déjà là." },
  { mood: "wild",    en: "I came in like a wrecking ball of feelings.", ru: "Я ворвался, как шар разрушений из чувств.", be: "Я ўварваўся, як шар разбурэнняў з пачуццяў.", fr: "Je suis arrivé comme un boulet de sentiments." },
  { mood: "tender",  en: "Stay a little longer in this song.", ru: "Останься ещё чуть-чуть в этой песне.", be: "Застанься яшчэ крыху ў гэтай песні.", fr: "Reste encore un peu dans cette chanson." },
  { mood: "wistful", en: "The night keeps every promise the day forgot.", ru: "Ночь хранит каждое обещание, которое забыл день.", be: "Ноч захоўвае кожную абяцанку, якую забыў дзень.", fr: "La nuit garde chaque promesse que le jour a oubliée." },
  { mood: "calm",    en: "Breathe in, the chorus is breathing too.", ru: "Вдохни — припев тоже дышит.", be: "Удыхні — прыпеў теж дыхае.", fr: "Inspire, le refrain respire aussi." },
  { mood: "wild",    en: "Turn it up until the neighbors become the backing vocals.", ru: "Сделай громче, пока соседи не станут бэк-вокалом.", be: "Зрабі гучней, пакуль суседзі не стануць бэк-вакалам.", fr: "Monte le son jusqu'à ce que les voisins deviennent les chœurs." },
  { mood: "tender",  en: "You are the bridge between two verses of my day.", ru: "Ты — мост между двумя куплетами моего дня.", be: "Ты — мост паміж двума куплетамі майго дня.", fr: "Tu es le pont entre deux couplets de ma journée." },
  { mood: "wistful", en: "Even echoes get tired of saying goodbye.", ru: "Даже эхо устаёт прощаться.", be: "Нават рэха стамляецца развітвацца.", fr: "Même les échos se lassent de dire au revoir." }
];

const MOVIES = [
  "Spirited Away", "My Neighbor Totoro", "Amélie", "The Grand Budapest Hotel",
  "Fantastic Mr. Fox", "Kiki's Delivery Service", "WALL·E", "Paddington",
  "La La Land", "The Secret Life of Walter Mitty", "Intouchables", "Cinema Paradiso",
  "Moonrise Kingdom", "Ponyo", "Little Miss Sunshine", "The Intouchables"
];

const SCENE_TYPES = ["ocean", "forest", "stars", "desert", "mountains", "aurora", "city", "meadow", "canyon", "lake", "sakura", "tundra", "waterfall", "lavender", "volcano", "lighthouse", "balloons", "wheat"];

const PALETTES = {
  ocean: [
    { sky: "#bfe3ea", sea: "#1f6f8b", sun: "#f6e7c1" },
    { sky: "#2b3a67", sea: "#0e2a47", sun: "#e8e4d8" },
    { sky: "#f4c7a1", sea: "#7a4e57", sun: "#f9e2b8" },
    { sky: "#9fd8cb", sea: "#2e7d6e", sun: "#fff3d6" },
    { sky: "#d9c8e8", sea: "#4a3b6b", sun: "#f2e6ff" }
  ],
  forest: [
    { sky: "#dcefe0", back: "#9cc5a1", mid: "#5d8f6a", front: "#2c5540", mist: "#eef7ee" },
    { sky: "#1d2b26", back: "#2e4a3e", mid: "#1f3a30", front: "#122a22", mist: "#33524a" },
    { sky: "#f2d8b8", back: "#c9a06a", mid: "#8a6a45", front: "#54402a", mist: "#f7e8cf" },
    { sky: "#cfd8e8", back: "#8fa3bd", mid: "#5c7189", front: "#33465c", mist: "#e6ecf4" },
    { sky: "#e8c9d4", back: "#b98a9c", mid: "#7d5a6e", front: "#4c3644", mist: "#f4e2e8" }
  ],
  stars: [
    { sky: "#050914", glow: "#1b2a4a", star: "#f4efe2" },
    { sky: "#12082b", glow: "#3b1d5e", star: "#e8d8ff" },
    { sky: "#081c1c", glow: "#14424a", star: "#c8f0e8" },
    { sky: "#1c0f0a", glow: "#4a2417", star: "#ffd9b0" },
    { sky: "#0a1030", glow: "#22366e", star: "#d0e2ff" }
  ],
  desert: [
    { sky: "#f7d9a8", dune1: "#e0a866", dune2: "#c07f3e", dune3: "#8f5a28", sun: "#fff0d0" },
    { sky: "#e8b4b8", dune1: "#d98a80", dune2: "#b85f62", dune3: "#7e3a44", sun: "#ffe8e0" },
    { sky: "#2e2a4a", dune1: "#6b5a8a", dune2: "#4a3d66", dune3: "#2c2440", sun: "#f2e6ff" },
    { sky: "#cfe8e0", dune1: "#a8cbb8", dune2: "#6f9e82", dune3: "#47705c", sun: "#ffffff" },
    { sky: "#f4e3c8", dune1: "#e6c890", dune2: "#c49a5a", dune3: "#8a6a3a", sun: "#fff8e8" }
  ],
  mountains: [
    { sky: "#cfe4f2", far: "#9db8cc", mid: "#6c8ba3", near: "#3c5a72", snow: "#ffffff" },
    { sky: "#f2c9a0", far: "#c98a6a", mid: "#96604a", near: "#5e3a30", snow: "#ffe8d8" },
    { sky: "#1c2b3a", far: "#3a5468", mid: "#243c4e", near: "#12222e", snow: "#dfeaf2" },
    { sky: "#d8e8d0", far: "#9cbb8a", mid: "#6a8f5c", near: "#3d5c36", snow: "#f4fff0" },
    { sky: "#e0d4ec", far: "#a48cbd", mid: "#6f5a8a", near: "#453a5c", snow: "#f8f2ff" }
  ],
  aurora: [
    { sky: "#04121f", a1: "#3ee6a8", a2: "#2aa8e0", star: "#dff2ff" },
    { sky: "#0a0a24", a1: "#8a5cf6", a2: "#e05cd0", star: "#efe4ff" },
    { sky: "#061a1a", a1: "#2ee6c8", a2: "#7ee06a", star: "#e0fff4" },
    { sky: "#140a2a", a1: "#f65c8a", a2: "#8a5cf6", star: "#ffe4f0" },
    { sky: "#081226", a1: "#5cd0f6", a2: "#3ee6a8", star: "#e4f4ff" }
  ],
  city: [
    { sky: "#0b1026", far: "#232c4e", near: "#141b36", win: "#f6d98a" },
    { sky: "#2b1a3a", far: "#4a2c5e", near: "#2e1a42", win: "#ffb8d0" },
    { sky: "#0e2233", far: "#1f3d52", near: "#122838", win: "#a8e6f0" },
    { sky: "#301a1a", far: "#542c2c", near: "#361e1e", win: "#ffc890" },
    { sky: "#101828", far: "#26324a", near: "#161e30", win: "#c8f0c8" }
  ],
  meadow: [
    { sky: "#cfe8f4", hill: "#8fc47a", grass: "#5a9e52", flower: "#f6e7c1" },
    { sky: "#f4e3c8", hill: "#d9b878", grass: "#a8894e", flower: "#fff4f0" },
    { sky: "#e8d8ec", hill: "#b898c8", grass: "#7d5e8a", flower: "#f2e6ff" },
    { sky: "#d4ecdc", hill: "#9ccca0", grass: "#5e9a6a", flower: "#ffd0d8" },
    { sky: "#f2ecd4", hill: "#cfc48e", grass: "#9a9a5e", flower: "#f6e7c1" }
  ],
  canyon: [
    { sky: "#f4c9a0", r1: "#d98a5a", r2: "#b85f3c", r3: "#7e3a28", floor: "#e8b088" },
    { sky: "#c9d8e8", r1: "#8fa3b8", r2: "#5c7189", r3: "#33465c", floor: "#a8bcc8" },
    { sky: "#2a2438", r1: "#5c4a7a", r2: "#3d3052", r3: "#241c33", floor: "#4a3d5e" },
    { sky: "#f0dcd0", r1: "#d9a898", r2: "#b07868", r3: "#7a4c40", floor: "#e8c4b8" },
    { sky: "#d4e8e0", r1: "#8ab8a8", r2: "#5e8a7a", r3: "#3a5c4e", floor: "#b8d8cc" }
  ],
  lake: [
    { sky: "#cfe4f2", water: "#5e8aa8", shore: "#3c5a4c", refl: "#e8f2f8" },
    { sky: "#f2c9a0", water: "#a86a5a", shore: "#5e3a30", refl: "#ffe0c8" },
    { sky: "#1c2b3a", water: "#24384a", shore: "#12222e", refl: "#8ab8d8" },
    { sky: "#e0d4ec", water: "#7a6a9e", shore: "#453a5c", refl: "#e8dcff" },
    { sky: "#d8e8d0", water: "#6a9a7d", shore: "#3d5c36", refl: "#eef8e8" }
  ],
  sakura: [
    { sky: "#f6dce4", branch: "#5c3a44", bloom: "#f2aec4", bloom2: "#f8d0dc" },
    { sky: "#e8f0f4", branch: "#3c4a54", bloom: "#f6c9d4", bloom2: "#fadfe6" },
    { sky: "#f2e4d0", branch: "#6b4a34", bloom: "#f0b8c8", bloom2: "#f8d8e0" },
    { sky: "#dcd8f0", branch: "#443a5c", bloom: "#e8aec8", bloom2: "#f2d0e0" },
    { sky: "#f8ecf0", branch: "#4c3a40", bloom: "#f4b8cc", bloom2: "#fadce4" }
  ],
  tundra: [
    { sky: "#d8e8f0", snow: "#f4f8fa", hill: "#c8d8dc", ice: "#a8ccd8" },
    { sky: "#2a3a4a", snow: "#d8e4ea", hill: "#8aa0ac", ice: "#5e7a8a" },
    { sky: "#f0d8c8", snow: "#faf0e8", hill: "#d8c0b0", ice: "#b09a8a" },
    { sky: "#d4e0e8", snow: "#eef4f6", hill: "#a8bcc8", ice: "#7a9aac" },
    { sky: "#e0d8e8", snow: "#f6f0f8", hill: "#c0b0cc", ice: "#9a8ab0" }
  ],
  waterfall: [
    { sky: "#cfe4ec", rock: "#5c6a72", water: "#dff2f8", mist: "#ffffff", moss: "#4e7a52" },
    { sky: "#f2d8c0", rock: "#7a5c4a", water: "#f8e8d8", mist: "#fff4e8", moss: "#8a6a3a" },
    { sky: "#1c2b33", rock: "#33424a", water: "#a8d8e8", mist: "#d8ecf4", moss: "#2c4a3a" },
    { sky: "#e0d8f0", rock: "#5c5470", water: "#f0e8ff", mist: "#ffffff", moss: "#4a5e7a" },
    { sky: "#d4ecd8", rock: "#4a5c50", water: "#e8f8ec", mist: "#ffffff", moss: "#33523e" }
  ],
  lavender: [
    { sky: "#dcd0f0", hill: "#7d5e9e", row1: "#9678b8", row2: "#6a4a8a", row3: "#54387a", dot: "#c8b0e0" },
    { sky: "#f0e0d0", hill: "#b8896a", row1: "#a06a9e", row2: "#8a5488", row3: "#6e3a70", dot: "#e0c8d8" },
    { sky: "#1e2438", hill: "#3a4468", row1: "#5c6a9e", row2: "#4a5688", row3: "#3a4470", dot: "#8a9ec8" },
    { sky: "#e8f0e0", hill: "#8aa87d", row1: "#7d5e9e", row2: "#6a4a8a", row3: "#54387a", dot: "#b8d0a8" },
    { sky: "#f2ecd8", hill: "#c8b078", row1: "#9678b8", row2: "#7d5e9e", row3: "#6a4a8a", dot: "#f0e0b0" }
  ],
  volcano: [
    { sky: "#f2c9b0", mtn: "#4a3a34", lava: "#e8542e", glow: "#ffb060", smoke: "#8a7a70" },
    { sky: "#2a2438", mtn: "#1c1826", lava: "#ff6a3a", glow: "#ff9a50", smoke: "#4a4258" },
    { sky: "#d8e0e8", mtn: "#3c4654", lava: "#e8542e", glow: "#ffd0a0", smoke: "#9aa8b4" },
    { sky: "#f4dcd8", mtn: "#5c4440", lava: "#d84a2a", glow: "#ffc8a0", smoke: "#b09a94" },
    { sky: "#30343e", mtn: "#20242c", lava: "#ff7a45", glow: "#ffb070", smoke: "#3c4450" }
  ],
  lighthouse: [
    { sky: "#cfe0ec", sea: "#4a7a9e", rock: "#5c5a54", tower: "#f4efe2", stripe: "#c04a3a", beam: "#fff2c0" },
    { sky: "#f2c9a0", sea: "#8a5a4a", rock: "#4c3a30", tower: "#f8e8d8", stripe: "#3a5c8a", beam: "#ffe8b0" },
    { sky: "#1c2b3a", sea: "#16283a", rock: "#2c3238", tower: "#d8dee4", stripe: "#8a2a20", beam: "#cfe8ff" },
    { sky: "#dcd8f0", sea: "#5c5a8a", rock: "#4a4458", tower: "#f0ecf8", stripe: "#7a3a6e", beam: "#e8dcff" },
    { sky: "#d8e8dc", sea: "#4a7a62", rock: "#3c4a40", tower: "#eef4ee", stripe: "#2e6e4a", beam: "#f0ffe0" }
  ],
  balloons: [
    { sky: "#cfe4f2", b1: "#e86a5a", b2: "#f2c94a", b3: "#5a9ee8", b4: "#7dc47e", b5: "#c47ec8" },
    { sky: "#f4dcc8", b1: "#d84a6a", b2: "#e8a03a", b3: "#4a8ac8", b4: "#5aa86a", b5: "#9a5ab8" },
    { sky: "#2a3048", b1: "#f6d98a", b2: "#8ad8f0", b3: "#f0a8c8", b4: "#a8e8a0", b5: "#d0b8f0" },
    { sky: "#e0f0e8", b1: "#4a9e8a", b2: "#e8b04a", b3: "#5a7ac8", b4: "#c85a7a", b5: "#7ab85a" },
    { sky: "#f0e0ec", b1: "#b85a9e", b2: "#5a9ec8", b3: "#e8c85a", b4: "#8a5ac8", b5: "#5ac8a0" }
  ],
  wheat: [
    { sky: "#f2d9a8", field: "#d9a84e", row: "#c08a3a", sun: "#fff0c8" },
    { sky: "#e8c9d4", field: "#c99a6a", row: "#a87a4e", sun: "#ffe8f0" },
    { sky: "#2e3448", field: "#8a7a4a", row: "#6e5e3a", sun: "#e8e0c8" },
    { sky: "#cfe4f2", field: "#c8b060", row: "#a8904a", sun: "#ffffff" },
    { sky: "#f4e8d0", field: "#d9b878", row: "#b8985a", sun: "#fff8e0" }
  ]
};

const OCEAN_SWATCHES = ["#1f6f8b", "#0e2a47", "#2e7d6e", "#4a3b6b", "#7a4e57", "#14424a"];
const SKY_SWATCHES = ["#bfe3ea", "#2b3a67", "#f4c7a1", "#9fd8cb", "#d9c8e8", "#f2d8b8"];

const ROLE_ICONS = [
  `<svg viewBox="0 0 100 100"><rect x="18" y="52" width="64" height="30" rx="4" fill="#f4efe2"/><rect x="18" y="52" width="64" height="8" fill="#e9dcb8"/><circle cx="50" cy="30" r="13" fill="#e86a5a"/><path d="M50 17 q6 -8 12 -6" stroke="#4e7a52" stroke-width="3" fill="none"/></svg>`,
  `<svg viewBox="0 0 100 100"><circle cx="50" cy="42" r="20" fill="#f4efe2"/><path d="M50 42 q10 -2 8 -10 q-2 -8 -10 -6" stroke="#0a3d2e" stroke-width="4" fill="none"/><rect x="30" y="66" width="40" height="10" rx="5" fill="#e9dcb8"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M62 30 A22 22 0 1 0 62 62 A17 17 0 1 1 62 30 Z" fill="#f4efe2"/><circle cx="70" cy="28" r="3" fill="#e9dcb8"/><circle cx="78" cy="40" r="2" fill="#e9dcb8"/></svg>`,
  `<svg viewBox="0 0 100 100"><rect x="22" y="30" width="12" height="46" rx="2" fill="#e86a5a"/><rect x="38" y="24" width="12" height="52" rx="2" fill="#f4efe2"/><rect x="54" y="34" width="12" height="42" rx="2" fill="#e9dcb8"/><rect x="70" y="28" width="12" height="48" rx="2" fill="#7dc4e8"/></svg>`,
  `<svg viewBox="0 0 100 100"><circle cx="44" cy="44" r="18" fill="none" stroke="#f4efe2" stroke-width="6"/><line x1="57" y1="57" x2="76" y2="76" stroke="#e9dcb8" stroke-width="7" stroke-linecap="round"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M50 78 q-26 -18 -14 -40 q10 -14 14 -2 q4 -12 14 2 q12 22 -14 40 Z" fill="#7dc47e"/><line x1="50" y1="78" x2="50" y2="88" stroke="#4e7a52" stroke-width="4"/></svg>`,
  `<svg viewBox="0 0 100 100"><circle cx="50" cy="46" r="16" fill="#f2c94a"/><rect x="10" y="62" width="80" height="6" fill="#e9dcb8"/><path d="M34 62 a16 16 0 0 1 32 0" fill="#f2c94a"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M50 24 v40" stroke="#f4efe2" stroke-width="5"/><path d="M50 30 l22 16 l-22 16 l-22 -16 Z" fill="#e86a5a"/><circle cx="50" cy="72" r="8" fill="none" stroke="#e9dcb8" stroke-width="4"/></svg>`,
  `<svg viewBox="0 0 100 100"><rect x="46" y="30" width="8" height="50" fill="#f4efe2"/><rect x="38" y="24" width="24" height="10" rx="3" fill="#e86a5a"/><path d="M30 80 q20 -10 40 0 l-6 8 h-28 Z" fill="#7dc4e8"/><circle cx="50" cy="46" r="5" fill="#fff2c0"/></svg>`,
  `<svg viewBox="0 0 100 100"><rect x="20" y="34" width="60" height="40" rx="4" fill="#e9dcb8"/><path d="M20 44 h60 M40 34 v40 M60 34 v40" stroke="#0a3d2e" stroke-width="3"/><path d="M30 66 q10 -14 20 0 t20 0" stroke="#e86a5a" stroke-width="3" fill="none" stroke-dasharray="4 4"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M50 70 a14 14 0 0 1 14 14 l-28 0 a14 14 0 0 1 14 -14 Z" fill="#f4efe2"/><rect x="30" y="70" width="40" height="8" rx="4" fill="#e9dcb8"/><path d="M42 44 l16 12 l-4 6 l-16 -12 Z" fill="#e86a5a"/><circle cx="60" cy="58" r="4" fill="#0a3d2e"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M28 66 L72 26 L64 58 L50 50 L36 62 Z" fill="#f4efe2"/><path d="M28 66 L50 50" stroke="#e86a5a" stroke-width="3"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M36 30 h28 v40 q0 8 -14 8 q-14 0 -14 -8 Z" fill="#f4efe2"/><path d="M64 38 q14 4 0 20" stroke="#e9dcb8" stroke-width="4" fill="none"/><line x1="30" y1="26" x2="70" y2="26" stroke="#e86a5a" stroke-width="4"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M40 26 a14 14 0 0 1 0 28 M60 26 a14 14 0 0 0 0 28" stroke="#f4efe2" stroke-width="6" fill="none"/><rect x="46" y="26" width="8" height="48" rx="4" fill="#e9dcb8"/></svg>`,
  `<svg viewBox="0 0 100 100"><circle cx="38" cy="50" r="12" fill="none" stroke="#f4efe2" stroke-width="5"/><circle cx="62" cy="50" r="12" fill="none" stroke="#e86a5a" stroke-width="5"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M50 78 q-4 -22 6 -34 q-2 14 8 16 q10 -2 8 -16 q10 12 4 34 Z" fill="#f2c94a"/><path d="M50 78 q-2 -14 4 -22 q6 8 4 22 Z" fill="#e86a5a"/></svg>`
];

const MOVIE_ICONS = [
  `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="24" ry="28" fill="#f4efe2"/><circle cx="42" cy="44" r="3.5" fill="#0a3d2e"/><circle cx="58" cy="44" r="3.5" fill="#0a3d2e"/><path d="M44 62 q6 5 12 0" stroke="#0a3d2e" stroke-width="3" fill="none"/></svg>`,
  `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="58" rx="26" ry="22" fill="#9aa8b4"/><path d="M30 44 l8 -12 l6 10 Z M70 44 l-8 -12 l-6 10 Z" fill="#9aa8b4"/><circle cx="42" cy="54" r="3" fill="#0a3d2e"/><circle cx="58" cy="54" r="3" fill="#0a3d2e"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M32 40 h30 v22 q0 10 -15 10 q-15 0 -15 -10 Z" fill="#f4efe2"/><path d="M62 46 q12 2 0 12" stroke="#e9dcb8" stroke-width="4" fill="none"/><path d="M40 32 q4 -6 0 -10 M50 32 q4 -6 0 -10" stroke="#e9dcb8" stroke-width="3" fill="none"/></svg>`,
  `<svg viewBox="0 0 100 100"><rect x="30" y="22" width="40" height="58" rx="3" fill="#e86a5a"/><circle cx="62" cy="52" r="3" fill="#f4efe2"/><rect x="38" y="30" width="24" height="14" fill="#f4efe2" opacity="0.5"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M50 34 L74 30 L66 50 L50 78 L34 50 L26 30 Z" fill="#e8963a"/><circle cx="43" cy="46" r="3" fill="#0a3d2e"/><circle cx="57" cy="46" r="3" fill="#0a3d2e"/></svg>`,
  `<svg viewBox="0 0 100 100"><line x1="36" y1="76" x2="64" y2="36" stroke="#8a6a45" stroke-width="6" stroke-linecap="round"/><path d="M58 28 l16 10 l-14 8 l-8 -10 Z" fill="#f4efe2"/><circle cx="70" cy="30" r="8" fill="#7dc47e"/></svg>`,
  `<svg viewBox="0 0 100 100"><rect x="32" y="36" width="36" height="34" rx="4" fill="#f2c94a"/><rect x="38" y="42" width="24" height="14" rx="2" fill="#0a3d2e"/><circle cx="40" cy="62" r="4" fill="#0a3d2e"/><circle cx="60" cy="62" r="4" fill="#0a3d2e"/><line x1="50" y1="36" x2="50" y2="26" stroke="#e9dcb8" stroke-width="3"/><circle cx="50" cy="24" r="3" fill="#e86a5a"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M26 40 q24 -22 48 0 l0 6 q-24 -18 -48 0 Z" fill="#c04a3a"/><rect x="22" y="44" width="56" height="10" rx="5" fill="#e86a5a"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M50 24 l7 16 l17 2 l-13 12 l4 17 l-15 -9 l-15 9 l4 -17 l-13 -12 l17 -2 Z" fill="#f2c94a"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M10 78 L38 40 L54 62 L66 48 L90 78 Z" fill="#7dc4e8"/><circle cx="72" cy="28" r="9" fill="#f4efe2"/></svg>`,
  `<svg viewBox="0 0 100 100"><circle cx="38" cy="42" r="10" fill="#f4efe2"/><path d="M24 78 q0 -20 14 -20 q14 0 14 20 Z" fill="#f4efe2"/><circle cx="66" cy="48" r="8" fill="#e86a5a"/><path d="M54 78 q0 -16 12 -16 q12 0 12 16 Z" fill="#e86a5a"/></svg>`,
  `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="26" fill="none" stroke="#f4efe2" stroke-width="6"/><circle cx="50" cy="50" r="6" fill="#e86a5a"/><circle cx="50" cy="32" r="4" fill="#e9dcb8"/><circle cx="50" cy="68" r="4" fill="#e9dcb8"/><circle cx="32" cy="50" r="4" fill="#e9dcb8"/><circle cx="68" cy="50" r="4" fill="#e9dcb8"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M26 74 L50 34 L74 74 Z" fill="#f4efe2"/><path d="M42 74 L50 58 L58 74 Z" fill="#0a3d2e"/><circle cx="72" cy="30" r="7" fill="#e9dcb8"/></svg>`,
  `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="54" rx="22" ry="12" fill="#e86a5a"/><path d="M70 54 l14 -8 l-4 8 l4 8 Z" fill="#e86a5a"/><circle cx="42" cy="50" r="3" fill="#0a3d2e"/></svg>`,
  `<svg viewBox="0 0 100 100"><rect x="22" y="44" width="56" height="26" rx="8" fill="#f2c94a"/><rect x="30" y="36" width="20" height="12" rx="4" fill="#7dc4e8"/><circle cx="34" cy="72" r="6" fill="#0a3d2e"/><circle cx="66" cy="72" r="6" fill="#0a3d2e"/></svg>`,
  `<svg viewBox="0 0 100 100"><path d="M50 74 C30 58 34 38 50 38 C66 38 70 58 50 74 Z" fill="#e86a5a"/></svg>`
];

let lang = "en";
let state = { seed: 0, scene: null, quote: null, track: null };

function hashString(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function t(key) { return I18N[lang][key]; }

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.getElementById("lang-btn").textContent = lang.toUpperCase() + " ▾";
  document.getElementById("spotify-note").textContent = SPOTIFY_CLIENT_ID ? "" : t("spotifyNote");
  if (state.scene) renderSceneContent();
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function pullThreadAnimation(done) {
  const path = document.getElementById("thread-path");
  const w = window.innerWidth, h = window.innerHeight;
  const x = w / 2;
  path.setAttribute("d", `M ${x} ${h * 0.52} C ${x - 24} ${h * 0.66}, ${x + 24} ${h * 0.82}, ${x} ${h * 0.97}`);
  const len = path.getTotalLength();
  path.style.transition = "none";
  path.style.opacity = "1";
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  path.getBoundingClientRect();
  path.style.transition = "stroke-dashoffset 0.7s ease-in";
  path.style.strokeDashoffset = "0";
  setTimeout(() => {
    path.style.transition = "opacity 1.6s ease-out";
    path.style.opacity = "0";
    setTimeout(() => { path.style.strokeDasharray = ""; done(); }, 1650);
  }, 750);
}

function spotifyToken() {
  try {
    const raw = sessionStorage.getItem("sp_token");
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() > data.expires) return null;
    return data.token;
  } catch (e) { return null; }
}

function handleSpotifyRedirect() {
  if (location.hash.includes("access_token")) {
    const params = new URLSearchParams(location.hash.slice(1));
    const token = params.get("access_token");
    const expiresIn = parseInt(params.get("expires_in") || "3600", 10);
    sessionStorage.setItem("sp_token", JSON.stringify({ token, expires: Date.now() + expiresIn * 1000 - 60000 }));
    history.replaceState(null, "", location.pathname + location.search);
  }
}

function requestSpotifyLogin() {
  if (!SPOTIFY_CLIENT_ID) return;
  const redirect = encodeURIComponent(location.origin + location.pathname);
  const scope = encodeURIComponent("playlist-read-private playlist-read-collaborative");
  location.href = "https://accounts.spotify.com/authorize?response_type=token&client_id=" + SPOTIFY_CLIENT_ID + "&scope=" + scope + "&redirect_uri=" + redirect;
}

async function fetchPlaylistTracks(id) {
  const token = spotifyToken();
  if (!token) return null;
  try {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=50&fields=items(track(name,artists(name)))`, {
      headers: { Authorization: "Bearer " + token }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.items || []).map(i => i.track).filter(tr => tr && tr.name).map(tr => ({ name: tr.name, artist: (tr.artists || []).map(a => a.name).join(", ") }));
  } catch (e) { return null; }
}

function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) < 128;
}

function skyRect(p, W, H) {
  const overlay = isDark(p.sky) ? "#000000" : "#ffffff";
  return `<defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky}"/><stop offset="1" stop-color="${overlay}" stop-opacity="0.28"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#skyG)"/>`;
}

function starsSVG(rng, color, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = (rng() * 760).toFixed(1), y = (rng() * 240).toFixed(1), r = (rng() * 1.6 + 0.4).toFixed(2);
    s += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${(rng() * 0.6 + 0.4).toFixed(2)}"/>`;
  }
  return s;
}

function treeRow(rng, color, baseY, hMax) {
  let s = "";
  let x = -20;
  while (x < 780) {
    const h = 40 + rng() * hMax, w = h * 0.5;
    s += `<path d="M${x} ${baseY + 40} L${x + w / 2} ${baseY + 40 - h} L${x + w} ${baseY + 40} Z" fill="${color}"/>`;
    x += w * (0.7 + rng() * 0.5);
  }
  return s;
}

function cityRow(rng, color, baseY, hMax, win) {
  let s = "", x = 0;
  while (x < 760) {
    const w = 30 + rng() * 50, h = 50 + rng() * hMax;
    s += `<rect x="${x}" y="${baseY + 60 - h}" width="${w}" height="${h}" fill="${color}"/>`;
    for (let wy = baseY + 70 - h; wy < baseY + 40; wy += 16) {
      for (let wx = x + 5; wx < x + w - 6; wx += 12) {
        if (rng() > 0.45) s += `<rect x="${wx}" y="${wy}" width="6" height="8" fill="${win}" opacity="${(rng() * 0.5 + 0.5).toFixed(2)}"/>`;
      }
    }
    x += w + 4 + rng() * 14;
  }
  return s;
}

function flowers(rng, color, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = rng() * 760, y = 340 + rng() * 70, r = 2.5 + rng() * 2.5;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="0.9"/>`;
  }
  return s;
}

function blooms(rng, c1, c2, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = rng() * 760, y = 120 + rng() * 220, r = 5 + rng() * 7, c = rng() > 0.5 ? c1 : c2;
    for (let p = 0; p < 5; p++) {
      const a = (p / 5) * Math.PI * 2;
      s += `<circle cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y + Math.sin(a) * r).toFixed(1)}" r="${(r * 0.7).toFixed(1)}" fill="${c}" opacity="0.85"/>`;
    }
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 0.45).toFixed(1)}" fill="#f6e7c1" opacity="0.9"/>`;
  }
  return s;
}

function lavenderRows(rng, rows, dot) {
  let s = "";
  const ys = [300, 335, 372];
  const cols = [rows[0], rows[1], rows[2]];
  ys.forEach((y, i) => {
    const c = cols[i];
    let x = -10 + rng() * 20;
    while (x < 780) {
      s += `<circle cx="${x.toFixed(1)}" cy="${y + rng() * 8}" r="${(3.5 + i * 1.2).toFixed(1)}" fill="${c}"/><circle cx="${x.toFixed(1)}" cy="${(y - 6 + rng() * 4).toFixed(1)}" r="${(2.5 + i).toFixed(1)}" fill="${dot}"/>`;
      x += 14 + i * 4;
    }
  });
  return s;
}

function balloonSky(rng, bs) {
  let s = "";
  const colors = [bs.b1, bs.b2, bs.b3, bs.b4, bs.b5];
  for (let i = 0; i < 5; i++) {
    const x = 90 + i * 140 + rng() * 60, y = 90 + rng() * 120, r = 26 + rng() * 10;
    s += `<line x1="${x.toFixed(1)}" y1="${(y + r).toFixed(1)}" x2="${(x + 14).toFixed(1)}" y2="330" stroke="#f4efe2" stroke-width="1.2" opacity="0.6"/>`;
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 1.15).toFixed(1)}" fill="${colors[i]}"/>`;
    s += `<path d="M${(x - 5).toFixed(1)} ${(y + r * 1.1).toFixed(1)} l5 8 l5 -8 Z" fill="${colors[i]}"/>`;
  }
  return s;
}

function wheatRows(rng, field, row, W, H) {
  let s = `<path d="M0 300 Q 380 270 760 300 L 760 ${H} L 0 ${H} Z" fill="${field}"/>`;
  for (let y = 315; y < H; y += 22) {
    s += `<path d="M0 ${y} Q 380 ${y - 12} 760 ${y}" stroke="${row}" stroke-width="10" fill="none" opacity="0.8"/>`;
  }
  return s;
}

function sceneSVG(scene, rng) {
  const p = scene.pal;
  let inner = "";
  const W = 760, H = 420;
  const sky = skyRect(p, W, H);
  switch (scene.type) {
    case "ocean":
      inner = sky + `
        <circle cx="${560 + rng() * 80}" cy="${90 + rng() * 40}" r="34" fill="${p.sun}"/>
        <rect y="250" width="${W}" height="${H - 250}" fill="${p.sea}"/>
        <path d="M0 250 Q 190 244 380 250 T 760 250 L 760 262 Q 570 268 380 262 T 0 262 Z" fill="${p.sea}" opacity="0.7"/>
        <g transform="translate(${180 + rng() * 160}, 250)">
          <path d="M-46 0 L46 0 L34 16 L-34 16 Z" fill="#3a2c22"/>
          <rect x="-3" y="-52" width="4" height="52" fill="#3a2c22"/>
          <path d="M1 -52 L1 -12 L34 -12 Z" fill="#f4efe2"/>
          <path d="M-1 -46 L-1 -14 L-28 -14 Z" fill="#e9dcb8"/>
        </g>
        <path d="M0 300 Q 190 294 380 300 T 760 300" stroke="${p.sun}" stroke-width="2" fill="none" opacity="0.35"/>
        <path d="M60 330 Q 200 326 340 330" stroke="${p.sun}" stroke-width="2" fill="none" opacity="0.25"/>
        <path d="M420 350 Q 560 346 700 350" stroke="${p.sun}" stroke-width="2" fill="none" opacity="0.25"/>`;
      break;
    case "forest":
      inner = sky + `
        <rect y="300" width="${W}" height="${H - 300}" fill="${p.mist}" opacity="0.5"/>
        ${treeRow(rng, p.back, 250, 120)}
        ${treeRow(rng, p.mid, 310, 90)}
        ${treeRow(rng, p.front, 370, 60)}`;
      break;
    case "stars":
      inner = sky + `
        <ellipse cx="380" cy="120" rx="300" ry="90" fill="${p.glow}" opacity="0.55"/>
        ${starsSVG(rng, p.star, 90)}
        <circle cx="${560 + rng() * 60}" cy="${80 + rng() * 40}" r="30" fill="${p.star}" opacity="0.9"/>
        <circle cx="${548 + rng() * 60}" cy="${74 + rng() * 40}" r="26" fill="${p.sky}"/>
        <path d="M0 ${H} L120 ${340} L260 ${H} Z" fill="${p.glow}" opacity="0.5"/>
        <path d="M300 ${H} L470 ${320} L640 ${H} Z" fill="${p.glow}" opacity="0.4"/>
        <path d="M560 ${H} L660 ${350} L760 ${H} Z" fill="${p.glow}" opacity="0.5"/>`;
      break;
    case "desert":
      inner = sky + `
        <circle cx="${580 + rng() * 60}" cy="${90 + rng() * 30}" r="36" fill="${p.sun}"/>
        <path d="M0 300 Q 200 270 400 295 T 760 285 L 760 ${H} L 0 ${H} Z" fill="${p.dune1}"/>
        <path d="M0 340 Q 260 310 480 340 T 760 330 L 760 ${H} L 0 ${H} Z" fill="${p.dune2}"/>
        <path d="M0 380 Q 300 355 560 380 T 760 372 L 760 ${H} L 0 ${H} Z" fill="${p.dune3}"/>
        <g transform="translate(${140 + rng() * 80}, 372)" fill="${p.dune3}">
          <path d="M0 0 q6 -26 12 0 q6 -20 12 0 q-12 6 -24 0 Z"/>
        </g>`;
      break;
    case "mountains":
      inner = sky + `
        <circle cx="${140 + rng() * 60}" cy="${80 + rng() * 30}" r="30" fill="#f6efe2" opacity="0.9"/>
        <path d="M0 ${H} L160 180 L260 300 L380 ${H} Z" fill="${p.far}"/>
        <path d="M160 180 L200 240 L120 240 Z" fill="${p.snow}" opacity="0.9"/>
        <path d="M240 ${H} L430 140 L620 ${H} Z" fill="${p.mid}"/>
        <path d="M430 140 L485 225 L375 225 Z" fill="${p.snow}"/>
        <path d="M480 ${H} L640 220 L760 ${H} Z" fill="${p.far}"/>
        <path d="M0 340 Q 380 320 760 345 L 760 ${H} L 0 ${H} Z" fill="${p.near}"/>`;
      break;
    case "aurora":
      inner = sky + `
        ${starsSVG(rng, p.star, 70)}
        <path d="M-20 200 C 150 60, 320 260, 500 120 S 720 180, 800 90 L 800 40 C 600 140, 420 20, 240 160 S 40 120, -20 180 Z" fill="${p.a1}" opacity="0.55"/>
        <path d="M-20 260 C 180 140, 360 320, 560 180 S 740 240, 800 160 L 800 110 C 620 210, 440 90, 260 220 S 60 190, -20 240 Z" fill="${p.a2}" opacity="0.4"/>
        <path d="M0 ${H} L200 330 L420 ${H} Z" fill="#0a1420" opacity="0.8"/>
        <path d="M420 ${H} L600 340 L760 ${H} Z" fill="#0a1420" opacity="0.7"/>`;
      break;
    case "city":
      inner = sky + `
        <circle cx="${600 + rng() * 60}" cy="${70 + rng() * 30}" r="24" fill="#f4efe2" opacity="0.85"/>
        ${cityRow(rng, p.far, 210, 130, p.win)}
        ${cityRow(rng, p.near, 300, 120, p.win)}
        <rect y="380" width="${W}" height="${H - 380}" fill="#0a0e1a"/>`;
      break;
    case "meadow":
      inner = sky + `
        <circle cx="${150 + rng() * 80}" cy="${80 + rng() * 30}" r="30" fill="#fdf6dd"/>
        <path d="M0 280 Q 380 230 760 285 L 760 ${H} L 0 ${H} Z" fill="${p.hill}"/>
        <path d="M0 330 Q 380 295 760 335 L 760 ${H} L 0 ${H} Z" fill="${p.grass}"/>
        ${flowers(rng, p.flower, 40)}`;
      break;
    case "canyon":
      inner = sky + `
        <circle cx="${380 + rng() * 60}" cy="${90}" r="32" fill="#fdf0d8"/>
        <path d="M0 ${H} L0 160 L120 200 L120 ${H} Z" fill="${p.r1}"/>
        <path d="M760 ${H} L760 140 L620 190 L620 ${H} Z" fill="${p.r2}"/>
        <path d="M120 200 L120 260 L60 ${H} L0 ${H} L0 240 Z" fill="${p.r2}" opacity="0.9"/>
        <path d="M620 190 L620 250 L700 ${H} L760 ${H} L760 230 Z" fill="${p.r1}" opacity="0.9"/>
        <path d="M0 ${H} L 380 330 L 760 ${H} Z" fill="${p.r3}"/>
        <rect y="${H - 26}" width="${W}" height="26" fill="${p.floor}"/>`;
      break;
    case "lake":
      inner = sky + `
        <circle cx="${560 + rng() * 60}" cy="${80 + rng() * 30}" r="28" fill="${p.refl}"/>
        <path d="M0 240 Q 380 210 760 245 L 760 250 L 0 250 Z" fill="${p.shore}"/>
        <rect y="250" width="${W}" height="${H - 250}" fill="${p.water}"/>
        <g transform="translate(${200 + rng() * 200}, 250)">
          <path d="M-40 0 L40 0 L30 12 L-30 12 Z" fill="#2c2018"/>
          <path d="M0 0 L0 -34" stroke="#2c2018" stroke-width="3"/>
        </g>
        <path d="M0 270 Q 190 266 380 270 T 760 270" stroke="${p.refl}" stroke-width="2" fill="none" opacity="0.4"/>
        <path d="M80 310 Q 240 306 400 310" stroke="${p.refl}" stroke-width="2" fill="none" opacity="0.3"/>
        <path d="M460 340 Q 600 336 740 340" stroke="${p.refl}" stroke-width="2" fill="none" opacity="0.3"/>
        <path d="M0 250 Q 380 244 760 250" stroke="${p.refl}" stroke-width="3" fill="none" opacity="0.6"/>`;
      break;
    case "sakura":
      inner = sky + `
        <path d="M-10 320 Q 200 280 420 315 T 770 300" stroke="${p.branch}" stroke-width="10" fill="none"/>
        <path d="M180 310 Q 240 240 300 210" stroke="${p.branch}" stroke-width="6" fill="none"/>
        <path d="M480 312 Q 540 250 620 225" stroke="${p.branch}" stroke-width="6" fill="none"/>
        ${blooms(rng, p.bloom, p.bloom2, 26)}`;
      break;
    case "tundra":
      inner = sky + `
        <circle cx="${580 + rng() * 60}" cy="${80 + rng() * 30}" r="24" fill="#f6f2ea" opacity="0.9"/>
        <path d="M0 300 Q 240 270 480 300 T 760 295 L 760 ${H} L 0 ${H} Z" fill="${p.snow}"/>
        <path d="M0 340 Q 300 315 760 345 L 760 ${H} L 0 ${H} Z" fill="${p.hill}"/>
        <ellipse cx="${180 + rng() * 400}" cy="${360 + rng() * 30}" rx="120" ry="16" fill="${p.ice}" opacity="0.8"/>
        <path d="M${120 + rng() * 60} 300 l10 -34 l10 34 Z" fill="${p.hill}"/>
        <path d="M${600 + rng() * 60} 295 l8 -26 l8 26 Z" fill="${p.hill}"/>`;
      break;
    case "waterfall":
      inner = sky + `
        <path d="M0 ${H} L0 60 L150 110 L170 200 L120 ${H} Z" fill="${p.rock}"/>
        <path d="M760 ${H} L760 50 L610 100 L590 190 L640 ${H} Z" fill="${p.rock}"/>
        <path d="M0 120 Q 80 100 150 110 L150 130 Q 70 125 0 145 Z" fill="${p.moss}" opacity="0.8"/>
        <path d="M610 100 Q 690 90 760 80 L760 100 Q 690 110 610 120 Z" fill="${p.moss}" opacity="0.8"/>
        <rect x="330" y="120" width="100" height="260" rx="8" fill="${p.water}" opacity="0.9"/>
        <path d="M345 130 q10 120 -5 240 M385 125 q-8 130 6 250 M415 135 q6 110 -4 230" stroke="${p.mist}" stroke-width="5" fill="none" opacity="0.7"/>
        <ellipse cx="380" cy="385" rx="150" ry="22" fill="${p.mist}" opacity="0.7"/>
        <path d="M170 200 Q 380 170 590 190 L 590 205 Q 380 185 170 215 Z" fill="${p.moss}" opacity="0.6"/>`;
      break;
    case "lavender":
      inner = sky + `
        <circle cx="${620 + rng() * 60}" cy="${80 + rng() * 30}" r="26" fill="#f6e7c1" opacity="0.9"/>
        <path d="M0 270 Q 380 240 760 275 L 760 ${H} L 0 ${H} Z" fill="${p.hill}"/>
        ${lavenderRows(rng, [p.row1, p.row2, p.row3], p.dot)}`;
      break;
    case "volcano":
      inner = sky + `
        <circle cx="${600 + rng() * 60}" cy="${80 + rng() * 30}" r="30" fill="${p.glow}" opacity="0.8"/>
        <path d="M0 ${H} L300 150 L460 150 L760 ${H} Z" fill="${p.mtn}"/>
        <path d="M300 150 L380 120 L460 150 Z" fill="${p.lava}"/>
        <path d="M355 128 q10 30 -5 60 M395 126 q-6 36 8 66 M375 122 q0 40 0 80" stroke="${p.lava}" stroke-width="7" fill="none" opacity="0.85"/>
        <circle cx="380" cy="100" r="10" fill="${p.smoke}" opacity="0.8"/>
        <circle cx="${365 + rng() * 30}" cy="${70 + rng() * 20}" r="14" fill="${p.smoke}" opacity="0.55"/>
        <circle cx="${390 + rng() * 30}" cy="${40 + rng() * 16}" r="18" fill="${p.smoke}" opacity="0.35"/>
        <path d="M0 360 Q 380 335 760 365 L 760 ${H} L 0 ${H} Z" fill="${p.mtn}" opacity="0.85"/>`;
      break;
    case "lighthouse":
      inner = sky + `
        <rect y="300" width="${W}" height="${H - 300}" fill="${p.sea}"/>
        <path d="M0 305 Q 190 299 380 305 T 760 305" stroke="${p.beam}" stroke-width="2" fill="none" opacity="0.3"/>
        <path d="M120 ${H} L260 330 L480 ${H} Z" fill="${p.rock}"/>
        <path d="M340 ${H} L380 180 L420 ${H} Z" fill="${p.beam}" opacity="0.25"/>
        <path d="M356 ${H} L388 210 L360 ${H} Z" fill="${p.tower}"/>
        <path d="M362 ${H} L386 260 L358 ${H} Z" fill="${p.stripe}" opacity="0.9"/>
        <path d="M368 ${H} L384 300 L364 ${H} Z" fill="${p.stripe}" opacity="0.9"/>
        <rect x="376" y="192" width="28" height="18" rx="3" fill="${p.stripe}"/>
        <rect x="380" y="170" width="20" height="22" rx="2" fill="${p.beam}"/>
        <path d="M376 170 h28 l-14 -12 Z" fill="${p.stripe}"/>`;
      break;
    case "balloons":
      inner = sky + `
        ${balloonSky(rng, p)}
        <path d="M0 340 Q 380 315 760 345 L 760 ${H} L 0 ${H} Z" fill="#7dc47e" opacity="0.85"/>`;
      break;
    case "wheat":
      inner = sky + `
        <circle cx="${140 + rng() * 60}" cy="${85 + rng() * 30}" r="32" fill="${p.sun}"/>
        ${wheatRows(rng, p.field, p.row, W, H)}`;
      break;
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
}

function pickScene(seed) {
  const rng = mulberry32(seed);
  const type = SCENE_TYPES[Math.floor(rng() * SCENE_TYPES.length)];
  const pal = PALETTES[type][Math.floor(rng() * PALETTES[type].length)];
  const adj = t("adj")[Math.floor(rng() * t("adj").length)];
  const name = adj + " " + t("typeWord")[type];
  const mood = MOODS[Math.floor(rng() * MOODS.length)];
  const pool = QUOTES.filter(q => q.mood === mood);
  const quote = pool[Math.floor(rng() * pool.length)];
  return { type, pal, name, quote, mood };
}

function renderSceneContent() {
  const rng = mulberry32(state.seed ^ 0x9e3779b9);
  document.getElementById("scene-name").textContent = state.scene.name;
  const qEl = document.getElementById("scene-quote");
  const noteEl = document.getElementById("quote-note");
  if (state.track) {
    qEl.textContent = "“" + state.track.name + "” — " + state.track.artist;
    noteEl.textContent = t("fromPlaylist");
  } else {
    qEl.textContent = "“" + state.quote[lang] + "”";
    noteEl.textContent = t("quoteNote");
  }
  document.getElementById("scene-wrap").innerHTML = sceneSVG(state.scene, rng);
  const oceanCtl = document.getElementById("ocean-controls");
  if (state.scene.type === "ocean") {
    oceanCtl.classList.remove("hidden");
    buildSwatches("ocean-swatches", OCEAN_SWATCHES, c => recolor("sea", c));
    buildSwatches("sky-swatches", SKY_SWATCHES, c => recolor("sky", c));
  } else {
    oceanCtl.classList.add("hidden");
  }
}

function buildSwatches(elId, colors, onPick) {
  const el = document.getElementById(elId);
  el.innerHTML = "";
  colors.forEach(c => {
    const b = document.createElement("button");
    b.style.background = c;
    b.addEventListener("click", () => onPick(c));
    el.appendChild(b);
  });
}

function recolor(key, color) {
  state.scene.pal[key] = color;
  const rng = mulberry32(state.seed ^ 0x9e3779b9);
  document.getElementById("scene-wrap").innerHTML = sceneSVG(state.scene, rng);
}

function buildReading() {
  const rng = mulberry32(state.seed ^ 0x51ab3d);
  const pick = arr => arr[Math.floor(rng() * arr.length)];
  const html = t("readingTemplate")
    .replace("{role}", pick(t("roles")))
    .replace("{scene}", state.scene.name.toLowerCase())
    .replace("{compliment}", pick(t("compliments")))
    .replace("{roast}", pick(t("roasts")));
  document.getElementById("reading-text").innerHTML = "<p>" + html + "</p>";
}

function startUnravel() {
  const input = document.getElementById("playlist-input").value.trim();
  const err = document.getElementById("home-error");
  const m = input.match(/open\.spotify\.com\/playlist\/([A-Za-z0-9]+)/);
  if (!m) {
    err.textContent = t("badLink");
    return;
  }
  err.textContent = "";
  const seed = hashString(input);
  state.seed = seed;
  state.track = null;
  state.scene = pickScene(seed);
  state.quote = state.scene.quote;
  showScreen("screen-yarn");
  if (!spotifyToken() && SPOTIFY_CLIENT_ID) {
    requestSpotifyLogin();
    return;
  }
  fetchPlaylistTracks(m[1]).then(tracks => {
    if (tracks && tracks.length) {
      const rng = mulberry32(seed ^ 0xbeef);
      state.track = tracks[Math.floor(rng() * tracks.length)];
      if (document.getElementById("screen-scene").classList.contains("active")) renderSceneContent();
    }
  });
}

function fillCharacter() {
  const rng = mulberry32(state.seed ^ 0x77aa11);
  const idx = Math.floor(rng() * t("roles").length);
  document.getElementById("character-icon").innerHTML = ROLE_ICONS[idx % ROLE_ICONS.length];
  document.getElementById("character-result").textContent = t("roles")[idx];
  document.getElementById("character-desc").textContent = t("characterDesc");
}

function fillMovie() {
  const rng = mulberry32(state.seed ^ 0x33cc55);
  const idx = Math.floor(rng() * MOVIES.length);
  document.getElementById("movie-icon").innerHTML = MOVIE_ICONS[idx % MOVIE_ICONS.length];
  document.getElementById("movie-result").textContent = MOVIES[idx];
  document.getElementById("movie-desc").textContent = t("movieDesc");
}

document.getElementById("btn-unravel").addEventListener("click", startUnravel);
document.getElementById("playlist-input").addEventListener("keydown", e => { if (e.key === "Enter") startUnravel(); });

const yarn = document.getElementById("yarn-ball");
yarn.addEventListener("click", () => {
  pullThreadAnimation(() => { renderSceneContent(); showScreen("screen-scene"); });
});
yarn.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); yarn.click(); } });

document.querySelectorAll("#screen-scene .thread-btn").forEach(b =>
  b.addEventListener("click", () => pullThreadAnimation(() => { fillCharacter(); showScreen("screen-character"); })));
document.querySelectorAll("#screen-character .thread-btn").forEach(b =>
  b.addEventListener("click", () => pullThreadAnimation(() => { fillMovie(); showScreen("screen-movie"); })));
document.querySelectorAll("#screen-movie .thread-btn").forEach(b =>
  b.addEventListener("click", () => pullThreadAnimation(() => { buildReading(); showScreen("screen-reading"); })));

document.getElementById("btn-restart").addEventListener("click", () => {
  document.getElementById("playlist-input").value = "";
  showScreen("screen-home");
});

const langBtn = document.getElementById("lang-btn");
const langMenu = document.getElementById("lang-menu");
langBtn.addEventListener("click", () => langMenu.classList.toggle("open"));
document.addEventListener("click", e => {
  if (!e.target.closest("#lang-bar")) langMenu.classList.remove("open");
});
langMenu.querySelectorAll("button").forEach(b =>
  b.addEventListener("click", () => { lang = b.dataset.lang; langMenu.classList.remove("open"); applyLang(); }));

handleSpotifyRedirect();
applyLang();
