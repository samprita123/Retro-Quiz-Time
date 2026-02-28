const fs = require('fs');
const path = require('path');

const makeAudioUrl = (id) => `https://upload.wikimedia.org/wikipedia/commons/${id}`;
const makeVideoUrl = (ytId, start = 0) => `https://www.youtube.com/embed/${ytId}?start=${start}&end=${start + 15}&autoplay=0&rel=0`;

const audioClips = [
    'thumb/4/4e/Sa-re-ga-ma-pa.ogg/Sa-re-ga-ma-pa.ogg',
    'b/b4/Raga-Bhairavi.ogg',
    '4/4e/Sa-re-ga-ma-pa.ogg',
];

const genZAudioBase = [
    { q: "This early 2000s ringtone belongs to which famous polyphonic phone?", correct: "Nokia 3310 ringtone", opts: ["Nokia 3310 ringtone", "Sony Ericsson Walkman", "Motorola Razr", "Blackberry alert"] },
    { q: "Which iconic 2000s Bollywood party song has this fast beat?", correct: "It's The Time To Disco (Kal Ho Naa Ho)", opts: ["It's The Time To Disco (Kal Ho Naa Ho)", "Where's The Party Tonight", "Koi Kahe Kehta Rahe", "Dus Bahane"] },
    { q: "Listen: Which famous 2000s talent show had this dramatic suspense music?", correct: "Indian Idol", opts: ["Indian Idol", "Roadies", "Splitsvilla", "Boogie Woogie"] },
    { q: "Identify the lead singer from this soulful early 2000s indie pop song.", correct: "Lucky Ali (O Sanam)", opts: ["Lucky Ali (O Sanam)", "Shaan (Tanha Dil)", "KK (Pal)", "Mohit Chauhan (Dooba Dooba)"] },
    { q: "What famous 2000s Indian cartoon intro song is this?", correct: "Pokemon Hindi Rap Intro", opts: ["Pokemon Hindi Rap Intro", "Beyblade Hindi Intro", "Dragon Ball Z Hindi", "Digimon Hindi"] },
    { q: "Which 2000s sports event featured this legendary commentary?", correct: "2007 T20 World Cup Final (Joginder Sharma over)", opts: ["2007 T20 World Cup Final (Joginder Sharma over)", "2011 WC Final (Dhoni six)", "NatWest 2002 Final", "Yuvraj 6 Sixes"] },
    { q: "This melodramatic 'Dhoom Tana' sound effect is a staple of which 2000s TV genre?", correct: "K-serials (Balaji Telefilms)", opts: ["K-serials (Balaji Telefilms)", "CID", "Aahat", "MTV Roadies"] },
    { q: "Identify the 2000s mobile network ad jingle.", correct: "Hutch / Vodafone (You & I)", opts: ["Hutch / Vodafone (You & I)", "Airtel (A.R. Rahman tune)", "BSNL", "Reliance India Mobile"] },
    { q: "Which 2000s Bollywood franchise featured this iconic background score?", correct: "Dhoom Theme", opts: ["Dhoom Theme", "Krrish Theme", "Don Theme", "Race Theme"] },
    { q: "Identify this voice of a famous 2000s Indian stand-up comedian.", correct: "Raju Srivastav", opts: ["Raju Srivastav", "Kapil Sharma", "Sunil Pal", "Ehsan Qureshi"] }
];

const genZVideoBase = [
    { ytId: 'wF_B_aagLfI', start: 0, q: "Identify this classic 2000s Bollywood emotional scene.", correct: "Kabhi Khushi Kabhie Gham (K3G)", opts: ["Kabhi Khushi Kabhie Gham (K3G)", "Kal Ho Naa Ho", "Mohabbatein", "Veer-Zaara"] },
    { ytId: 'jKGjNBszGZg', start: 5, q: "Which early 2000s youth TV show is this?", correct: "Remix (STAR One)", opts: ["Remix (STAR One)", "Left Right Left", "Dill Mill Gayye", "Hip Hip Hurray"] },
    { ytId: '1Nzb0-O1bA8', start: 10, q: "This legendary 2000s Indian cricket moment is?", correct: "Yuvraj Singh hitting 6 sixes", opts: ["Yuvraj Singh hitting 6 sixes", "Dhoni World Cup winning six", "Sachin 200 against SA", "Sehwag 309 Multan"] },
    { ytId: 'wD2cVhC-63I', start: 0, q: "Which 2000s cartoon network original aired this clip?", correct: "Roll No. 21", opts: ["Roll No. 21", "Chhota Bheem", "Little Singham", "Motu Patlu"] },
    { ytId: 'M7X82qEQRww', start: 5, q: "Identify this massive 2000s Bollywood dance track.", correct: "Kajra Re (Bunty Aur Babli)", opts: ["Kajra Re (Bunty Aur Babli)", "Beedi Jalaile (Omkara)", "Desi Girl (Dostana)", "Sheila Ki Jawani"] },
    { ytId: '3X9RSGXXbYw', start: 0, q: "What phenomenon does this early 2000s ad belong to?", correct: "ZooZoos (Vodafone)", opts: ["ZooZoos (Vodafone)", "Hutch Pug", "Amul Girl", "Airtel"] },
    { ytId: 'I1oR_5v26mE', start: 5, q: "Which 2000s show featured this iconic CID officer?", correct: "CID (Sony TV) - ACP Pradyuman", opts: ["CID (Sony TV) - ACP Pradyuman", "Aahat", "Adaalat", "Crime Patrol"] },
    { ytId: '2qU2hTXY0N8', start: 0, q: "This 2000s movie featured a magic alien. Which one?", correct: "Koi... Mil Gaya", opts: ["Koi... Mil Gaya", "Krrish", "Taarzan The Wonder Car", "Ra.One"] },
    { ytId: 'V9PBRu6GjY4', start: 10, q: "Identify this 2000s reality TV show.", correct: "MTV Roadies", opts: ["MTV Roadies", "Splitsvilla", "Dare 2 Dance", "Fear Factor India"] },
    { ytId: 'Q5aQ-qI_NZE', start: 5, q: "Which 2000s Indian video game does this clip show?", correct: "GTA Vice City (Indian mods) / PC Gaming era", opts: ["GTA Vice City (Indian mods) / PC Gaming era", "Road Rash", "NFS Most Wanted", "Project IGI"] }
];

const genZAudio = [];
for (let i = 0; i < 50; i++) {
    const base = genZAudioBase[i % genZAudioBase.length];
    genZAudio.push({
        era: 'GenZ',
        type: 'audio',
        mediaUrl: makeAudioUrl(audioClips[i % audioClips.length]),
        question: base.q,
        options: base.opts,
        correctOption: base.opts.indexOf(base.correct)
    });
}

const genZVideo = [];
for (let i = 0; i < 50; i++) {
    const base = genZVideoBase[i % genZVideoBase.length];
    genZVideo.push({
        era: 'GenZ',
        type: 'video',
        mediaUrl: makeVideoUrl(base.ytId, base.start),
        question: base.q,
        options: base.opts,
        correctOption: base.opts.indexOf(base.correct)
    });
}

const outFile = path.join(__dirname, 'data', 'gen_z.json');
const current = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const updated = [...current, ...genZAudio, ...genZVideo];
fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
console.log(`GenZ: added ${genZAudio.length} audio + ${genZVideo.length} video questions. Total: ${updated.length}`);
