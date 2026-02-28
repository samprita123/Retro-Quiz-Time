const fs = require('fs');
const path = require('path');

const makeAudioUrl = (id) => `https://upload.wikimedia.org/wikipedia/commons/${id}`;
const makeVideoUrl = (ytId, start = 0) => `https://www.youtube.com/embed/${ytId}?start=${start}&end=${start + 15}&autoplay=0&rel=0`;

const audioClips = [
    'thumb/4/4e/Sa-re-ga-ma-pa.ogg/Sa-re-ga-ma-pa.ogg',
    'b/b4/Raga-Bhairavi.ogg',
    '4/4e/Sa-re-ga-ma-pa.ogg',
];

const genYAudioBase = [
    { q: "This 90s Bollywood intro belongs to which film?", correct: "Dilwale Dulhania Le Jayenge (DDLJ)", opts: ["Dilwale Dulhania Le Jayenge (DDLJ)", "Kuch Kuch Hota Hai", "Hum Aapke Hain Koun", "Dil To Pagal Hai"] },
    { q: "Which 90s Indian pop song does this catchy beat come from?", correct: "Made in India – Alisha Chinai", opts: ["Made in India – Alisha Chinai", "Bolo Ta Ra Ra – Daler Mehndi", "Ik Pal Ka Jeena", "Pari Hoon Main"] },
    { q: "Listen: which popular 90s Indian TV show does this jingle represent?", correct: "Shaktimaan title track", opts: ["Shaktimaan title track", "Hum Paanch", "Son Pari", "Shankar Jai Kishan"] },
    { q: "This iconic voice belongs to which 90s Bollywood playback singer?", correct: "Udit Narayan", opts: ["Udit Narayan", "Kumar Sanu", "Sonu Nigam", "Abhijeet Bhattacharya"] },
    { q: "Identify this 90s iconic show opening tune.", correct: "Antakshari (TV show opening)", opts: ["Antakshari (TV show opening)", "Sa Re Ga Ma Pa opening", "Kaun Banega Crorepati", "Indian Idol opening"] },
    { q: "This children's cartoon intro is from which 90s show?", correct: "Ducktales (Cartoon Network India)", opts: ["Ducktales (Cartoon Network India)", "Shaktimaan", "Chhota Bheem", "Tom and Jerry"] },
    { q: "Identify this famous Cartoon Network intro jingle that played in the 90s!", correct: "Cartoon Network India bumper", opts: ["Cartoon Network India bumper", "Disney Channel bumper", "Nickelodeon India bumper", "Pogo TV bumper"] },
    { q: "This audio from the late 90s sounds like which famous tech/mobile ad?", correct: "Nokia ringtone / jingle (1990s India)", opts: ["Nokia ringtone / jingle (1990s India)", "Airtel tune", "Hutch music", "BSNL Landline tone"] },
    { q: "Which 90s Bollywood composer created this dramatic background score style?", correct: "A.R. Rahman", opts: ["A.R. Rahman", "Jatin-Lalit", "Nadeem-Shravan", "Anu Malik"] },
    { q: "Which famous 90s jingle used the line 'Yeh Dil Maange More'?", correct: "Pepsi (Sachin Tendulkar ad)", opts: ["Pepsi (Sachin Tendulkar ad)", "Coca Cola", "Gold Spot", "Limca"] }
];

const genYVideoBase = [
    { ytId: 'yFW9jxNKFJY', start: 0, q: "Identify this iconic 90s Bollywood train scene.", correct: "DDLJ – Simran runs for the train", opts: ["DDLJ – Simran runs for the train", "Dil Hai Ke Manta Nahi", "Dil To Pagal Hai", "Pyaar Kiya Toh Darna Kya"] },
    { ytId: 'IwRT2UwxHOU', start: 5, q: "Which 90s Bollywood song features this famous hook step?", correct: "Ek Do Teen – Madhuri Dixit", opts: ["Ek Do Teen – Madhuri Dixit", "Dhak Dhak", "Choli Ke Peeche", "Tamma Tamma"] },
    { ytId: 'PkZATxzDjLY', start: 5, q: "Identify this iconic 90s music video completely shot in USA.", correct: "Made in India – Alisha Chinai", opts: ["Made in India – Alisha Chinai", "Keh Do Na", "Pari Hoon Main", "Bolo Ta Ra Ra"] },
    { ytId: 'WKcxHj9IzXY', start: 0, q: "Which college romance classic does this 90s Bollywood clip come from?", correct: "Jo Jeeta Wohi Sikandar", opts: ["Jo Jeeta Wohi Sikandar", "Kuch Kuch Hota Hai", "Dil Chahta Hai", "Maine Pyar Kiya"] },
    { ytId: 'EtmXBb5qKiM', start: 10, q: "Identify this legendary 90s Bollywood scene.", correct: "KKHH – Rahul and Anjali meet", opts: ["KKHH – Rahul and Anjali meet", "DDLJ – Raj and Simran", "Mohabbatein – classroom scene", "Taal – music room scene"] },
    { ytId: 'F4B4dXthz9I', start: 5, q: "Identify this classic 90s Indian TV commercial clip.", correct: "Pepsi – Sachin/Kapil/Azhar ad", opts: ["Pepsi – Sachin/Kapil/Azhar ad", "7Up Fido Dido ad", "Thums Up ad", "Limca ad"] },
    { ytId: '4AuP84Ef3AY', start: 0, q: "This 90s Doordarshan show was a milestone for Indian TV. Which is it?", correct: "Byomkesh Bakshi", opts: ["Byomkesh Bakshi", "CID", "Tehkikaat", "Karamchand"] },
    { ytId: 'TqA60E70amk', start: 0, q: "Which 90s Indian pop singer does this catchy music video feature?", correct: "Daler Mehndi – Tunak Tunak Tun", opts: ["Daler Mehndi – Tunak Tunak Tun", "Baba Sehgal", "Jazzy B", "Lucky Ali"] },
    { ytId: '0HKU4vvPy_A', start: 5, q: "Which iconic 90s sports moment is this?", correct: "Sachin Tendulkar's Desert Storm 1998", opts: ["Sachin Tendulkar's Desert Storm 1998", "1999 WC India vs Pakistan", "2003 WC final", "Ganguly at NatWest 2002"] },
    { ytId: 'H9LiuX12PR8', start: 5, q: "Identify this popular 90s Cartoon Network show intro.", correct: "Tom and Jerry (India dub 90s)", opts: ["Tom and Jerry (India dub 90s)", "Swat Kats", "Dexter's Lab", "Jungle Book CN"] }
];

const genYAudio = [];
for (let i = 0; i < 50; i++) {
    const base = genYAudioBase[i % genYAudioBase.length];
    genYAudio.push({
        era: 'GenY',
        type: 'audio',
        mediaUrl: makeAudioUrl(audioClips[i % audioClips.length]),
        question: base.q,
        options: base.opts,
        correctOption: base.opts.indexOf(base.correct)
    });
}

const genYVideo = [];
for (let i = 0; i < 50; i++) {
    const base = genYVideoBase[i % genYVideoBase.length];
    genYVideo.push({
        era: 'GenY',
        type: 'video',
        mediaUrl: makeVideoUrl(base.ytId, base.start),
        question: base.q,
        options: base.opts,
        correctOption: base.opts.indexOf(base.correct)
    });
}

const outFile = path.join(__dirname, 'data', 'gen_y.json');
const current = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const updated = [...current, ...genYAudio, ...genYVideo];
fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
console.log(`GenY: added ${genYAudio.length} audio + ${genYVideo.length} video questions. Total: ${updated.length}`);
