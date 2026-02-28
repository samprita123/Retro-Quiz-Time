const fs = require('fs');
const path = require('path');

const makeAudioUrl = (id) => `https://upload.wikimedia.org/wikipedia/commons/${id}`;
const makeVideoUrl = (ytId, start = 0) => `https://www.youtube.com/embed/${ytId}?start=${start}&end=${start + 15}&autoplay=0&rel=0`;

const audioClips = [
    'thumb/4/4e/Sa-re-ga-ma-pa.ogg/Sa-re-ga-ma-pa.ogg',
    'b/b4/Raga-Bhairavi.ogg',
    '4/4e/Sa-re-ga-ma-pa.ogg',
];

const genAlphaAudioBase = [
    { q: "Identify this popular 2020s viral Hindi meme audio.", correct: "Moye Moye / Kacha Badam", opts: ["Moye Moye / Kacha Badam", "Rasode Mein Kaun Tha", "Pawri Ho Rahi Hai", "Jal Lijiye"] },
    { q: "Which 2020s Indian e-sports caster voice is heard in this clip?", correct: "Mortal / Dynamo / Scout style", opts: ["Mortal / Dynamo / Scout style", "CarryMinati", "Triggered Insaan", "Jonathan"] },
    { q: "Listen: This music represents the intro of which 2020s Indian YouTuber?", correct: "CarryMinati (Yalgaar era)", opts: ["CarryMinati (Yalgaar era)", "BB Ki Vines", "Ashish Chanchlani", "Technical Guruji"] },
    { q: "This notification sound comes from which prominent 2020s Indian payment app?", correct: "Paytm 'Received' Soundbox", opts: ["Paytm 'Received' Soundbox", "PhonePe", "Google Pay", "CRED"] },
    { q: "Which 2020s pan-Indian movie background score is this?", correct: "KGF Chapter 2", opts: ["KGF Chapter 2", "RRR", "Pushpa", "Baahubali 2"] },
    { q: "Identify this 2020s viral Indian indie pop song.", correct: "Pasoori (Coke Studio / Ali Sethi)", opts: ["Pasoori (Coke Studio / Ali Sethi)", "Manike Mage Hithe", "Udd Gaye", "Baarishein"] },
    { q: "Which 2020s shark tank judge's catchphrase is this?", correct: "Ashneer Grover (Yeh sab doglapan hai)", opts: ["Ashneer Grover (Yeh sab doglapan hai)", "Aman Gupta", "Anupam Mittal", "Namita Thapar"] },
    { q: "This rap beat belongs to which 2020s viral Indian artist?", correct: "MC Stan / AP Dhillon", opts: ["MC Stan / AP Dhillon", "Divine", "Naezy", "Krsna"] },
    { q: "Which 2020s short-form video platform popularized this audio trend?", correct: "Instagram Reels / TikTok India", opts: ["Instagram Reels / TikTok India", "YouTube Shorts", "Snapchat", "Moj"] },
    { q: "Identify the 2020s Indian commentator describing this sports moment.", correct: "Neeraj Chopra Olympic Gold call", opts: ["Neeraj Chopra Olympic Gold call", "IPL 2023 Final (Jadeja)", "T20 World Cup 2022 (Kohli vs Pak)", "Thomas Cup victory"] }
];

const genAlphaVideoBase = [
    { ytId: 'Gd0oN2-u8qM', start: 5, q: "Which 2020s viral meme video is this?", correct: "Pawri Ho Rahi Hai", opts: ["Pawri Ho Rahi Hai", "Rasode Mein Kaun Tha", "Binod", "Jal Lijiye"] },
    { ytId: 'jKGjNBszGZg', start: 0, q: "Identify this 2020s Pan-Indian blockbuster scene.", correct: "Pushpa: The Rise (Srivalli/Main Jhukega Nahi)", opts: ["Pushpa: The Rise (Srivalli/Main Jhukega Nahi)", "RRR (Naatu Naatu)", "KGF (Rocky Bhai)", "Salaar"] },
    { ytId: '1Nzb0-O1bA8', start: 5, q: "This video shows which famous 2020s Indian reality TV pitch?", correct: "Shark Tank India (Pitchers)", opts: ["Shark Tank India (Pitchers)", "MasterChef India", "Khatron Ke Khiladi", "Bigg Boss OTT"] },
    { ytId: 'wD2cVhC-63I', start: 10, q: "Which 2020s Indian web series does this gritty scene belong to?", correct: "The Family Man / Mirzapur", opts: ["The Family Man / Mirzapur", "Scam 1992", "Panchayat", "Aspirants"] },
    { ytId: 'M7X82qEQRww', start: 0, q: "Identify this popular 2020s gaming stream.", correct: "BGMI (Battlegrounds Mobile India) Tournament", opts: ["BGMI (Battlegrounds Mobile India) Tournament", "Free Fire", "Valorant India", "GTA V Roleplay"] },
    { ytId: '3X9RSGXXbYw', start: 5, q: "What phenomenon does this 2020s ad belong to?", correct: "CRED Ads (featuring retro celebs)", opts: ["CRED Ads (featuring retro celebs)", "Zomato Delivery Ads", "Dream11 IPL Ads", "Swiggy Instamart"] },
    { ytId: 'I1oR_5v26mE', start: 0, q: "Which 2020s Indian educational platform is known for this style of video?", correct: "Physics Wallah (Alakh Pandey)", opts: ["Physics Wallah (Alakh Pandey)", "Unacademy", "BYJU's", "Vedantu"] },
    { ytId: '2qU2hTXY0N8', start: 5, q: "This 2020s film clip features which famous song?", correct: "Naatu Naatu (RRR)", opts: ["Naatu Naatu (RRR)", "Jhoome Jo Pathaan", "Tum Kya Mile", "Kesariya"] },
    { ytId: 'V9PBRu6GjY4', start: 5, q: "Identify this 2020s Indian YouTuber's distinct editing style.", correct: "CarryMinati / Triggered Insaan", opts: ["CarryMinati / Triggered Insaan", "Bhuvan Bam (BB Ki Vines)", "Fukra Insaan", "Slayy Point"] },
    { ytId: 'Q5aQ-qI_NZE', start: 10, q: "Which 2020s Indian sports moment is this?", correct: "India winning Thomas Cup / Women's U19 WC", opts: ["India winning Thomas Cup / Women's U19 WC", "T20 World Cup 2024", "Neeraj Chopra Gold", "IPL Final 2023"] }
];

const genAlphaAudio = [];
for (let i = 0; i < 50; i++) {
    const base = genAlphaAudioBase[i % genAlphaAudioBase.length];
    genAlphaAudio.push({
        era: 'GenAlpha',
        type: 'audio',
        mediaUrl: makeAudioUrl(audioClips[i % audioClips.length]),
        question: base.q,
        options: base.opts,
        correctOption: base.opts.indexOf(base.correct)
    });
}

const genAlphaVideo = [];
for (let i = 0; i < 50; i++) {
    const base = genAlphaVideoBase[i % genAlphaVideoBase.length];
    genAlphaVideo.push({
        era: 'GenAlpha',
        type: 'video',
        mediaUrl: makeVideoUrl(base.ytId, base.start),
        question: base.q,
        options: base.opts,
        correctOption: base.opts.indexOf(base.correct)
    });
}

const outFile = path.join(__dirname, 'data', 'gen_alpha.json');
const current = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const updated = [...current, ...genAlphaAudio, ...genAlphaVideo];
fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
console.log(`GenAlpha: added ${genAlphaAudio.length} audio + ${genAlphaVideo.length} video questions. Total: ${updated.length}`);
