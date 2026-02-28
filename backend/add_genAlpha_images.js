const fs = require('fs');
const path = require('path');

const makeUrl = (prompt) => {
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true`;
};

const alphaQuestions = [
    ["Identify this 2020s popular Indian kids' cartoon character.", "Little Singham", ["Little Singham", "Motu Patlu", "Chhota Bheem", "Shiva"]],
    ["Which famous Indian 2020s meme is this?", "Binod", ["Binod", "Jal Lijiye", "Rasode Mein Kaun Tha", "Pawri Ho Rahi Hai"]],
    ["Name this legendary 2020s Indian e-sports game.", "BGMI (Battlegrounds Mobile India)", ["BGMI (Battlegrounds Mobile India)", "Free Fire", "Call of Duty Mobile", "Valorant"]],
    ["Guess this iconic 2020s Indian digital creator.", "CarryMinati", ["CarryMinati", "Bhuvan Bam", "Ashish Chanchlani", "Technical Guruji"]],
    ["Identify this popular 2020s Indian OTT series character.", "Harshad Mehta (Scam 1992)", ["Harshad Mehta (Scam 1992)", "Gaitonde (Sacred Games)", "Kaleen Bhaiya (Mirzapur)", "Srikant Tiwari (The Family Man)"]],
    ["Which 2020s Bollywood actor is known for this action scene?", "Tiger Shroff", ["Tiger Shroff", "Hrithik Roshan", "Vidyut Jammwal", "John Abraham"]],
    ["Name this 2020s Indian viral music video.", "Kacha Badam", ["Kacha Badam", "Manike Mage Hithe", "Bachpan Ka Pyaar", "Pasoori"]],
    ["Identify this 2020s Indian TV advertisement.", "Cred", ["Cred", "Dream11", "Zomato", "Swiggy"]],
    ["Guess this famous 2020s Indian cricket moment.", "Rishabh Pant at Gabba", ["Rishabh Pant at Gabba", "Kohli 82 vs Pakistan", "Dhoni Retirement", "Rohit 5 Centuries"]],
    ["Identify this popular 2020s Indian snack brand.", "Too Yumm", ["Too Yumm", "Bingo Twist", "Mad Angles", "Lays Maxx"]],
    ["Which 2020s kids show features this magical girl?", "Rudra", ["Rudra", "Baalveer Returns", "Golu", "Bhootu"]],
    ["Name this iconic 2020s Indian mobile application.", "UPI (BharatPe/PhonePe/GPay)", ["UPI (BharatPe/PhonePe/GPay)", "Paytm", "CRED", "Kuku FM"]],
    ["Identify this 2020s Pan-Indian blockbuster movie.", "RRR", ["RRR", "KGF Chapter 2", "Pushpa", "Baahubali 2"]],
    ["Guess this famous 2020s Indian comedy sketch group.", "AIB", ["AIB", "FilterCopy", "TVF", "Dice Media"]],
    ["Identify this 2020s viral Indian street food trend.", "Fanta Maggi", ["Fanta Maggi", "Cheese Burst Dosa", "Oreo Pakoda", "Momos"]],
    ["Name this 2020s Indian music sensation.", "AP Dhillon", ["AP Dhillon", "Sidhu Moose Wala", "Diljit Dosanjh", "Karan Aujla"]],
    ["Which 2020s Indian film won a National Award for Best Actor?", "Allu Arjun (Pushpa)", ["Allu Arjun (Pushpa)", "Suriya (Soorarai Pottru)", "Vicky Kaushal (Uri)", "Ayushmann Khurrana (Andhadhun)"]],
    ["Identify this 2020s Indian start-up founder.", "Ashneer Grover", ["Ashneer Grover", "Aman Gupta", "Peyush Bansal", "Namita Thapar"]],
    ["Guess this popular 2020s Indian animation movie.", "Hanuman vs Mahiravana", ["Hanuman vs Mahiravana", "Chhota Bheem Kung Fu Dhamaka", "Motu Patlu King of Kings", "Return of Hanuman"]],
    ["Identify this 2020s legendary Indian playback singer.", "Arijit Singh", ["Arijit Singh", "Jubin Nautiyal", "Armaan Malik", "Darshan Raval"]],
    ["Name this 2020s Bollywood actress known for 'Pasoori' cover.", "Alia Bhatt", ["Alia Bhatt", "Kiara Advani", "Rashmika Mandanna", "Kriti Sanon"]],
    ["Which 2020s Indian web series featured students in an engineering college?", "Kota Factory", ["Kota Factory", "Hostel Daze", "Campus Diaries", "Mismatched"]],
    ["Identify this iconic 2020s Indian smartwatch brand.", "boAt", ["boAt", "Noise", "Fire-Boltt", "Pebble"]],
    ["Guess this famous 2020s Indian Shark Tank judge.", "Anupam Mittal", ["Anupam Mittal", "Vineeta Singh", "Ghazal Alagh", "Amit Jain"]],
    ["Identify this 2020s Bollywood romantic comedy.", "Tu Jhoothi Main Makkaar", ["Tu Jhoothi Main Makkaar", "Rocky Aur Rani Kii Prem Kahaani", "Satyaprem Ki Katha", "Zara Hatke Zara Bachke"]],
    ["Name this iconic 2020s Indian digital payment soundbox.", "Paytm Soundbox", ["Paytm Soundbox", "PhonePe SmartSpeaker", "BharatPe Speaker", "Pine Labs"]],
    ["Which 2020s Indian cricket legend is known as 'Hitman'?", "Rohit Sharma", ["Rohit Sharma", "Virat Kohli", "KL Rahul", "Shubman Gill"]],
    ["Identify this popular 2020s Indian reality TV show.", "Shark Tank India", ["Shark Tank India", "MasterChef India", "Khatron Ke Khiladi", "India's Best Dancer"]],
    ["Guess this famous 2020s Indian meme template.", "Giga Chad", ["Giga Chad", "Drake Hotline Bling", "Dogelore", "Women Hahahaha"]],
    ["Identify this 2020s Indian EdTech giant mascot.", "Byju's", ["Byju's", "Unacademy", "Vedantu", "Physics Wallah"]],
    ["Name this 2020s Pan-Indian movie featuring an underworld don.", "KGF Chapter 2", ["KGF Chapter 2", "Pushpa", "Salaar", "Vikram"]],
    ["Which 2020s Indian web series featured an intelligence officer?", "The Family Man", ["The Family Man", "Special OPS", "Mirzapur", "Paatal Lok"]],
    ["Identify this iconic 2020s Indian independent artist.", "Prateek Kuhad", ["Prateek Kuhad", "Anuv Jain", "Zaeden", "Ritviz"]],
    ["Guess this legendary 2020s Indian sports achievement.", "Neeraj Chopra Olympic Gold", ["Neeraj Chopra Olympic Gold", "Thomas Cup Win", "Women's Cricket U19 WC", "Chess Olympiad Gold"]],
    ["Identify this popular 2020s Indian tech YouTuber.", "Technical Guruji", ["Technical Guruji", "Trakin Tech", "Geekyranjit", "Gyan Therapy"]],
    ["Name this 2020s Indian online multiplayer ludo game.", "Ludo King", ["Ludo King", "Ludo Supreme", "Ludo Club", "Parchisi STAR"]],
    ["Which 2020s Bollywood film featured the 'Naatu Naatu' song?", "RRR", ["RRR", "Baahubali", "Pushpa", "KGF"]],
    ["Identify this popular 2020s Indian dark comedy series.", "Panchayat", ["Panchayat", "Gullak", "Yeh Meri Family", "Aspirants"]],
    ["Guess this legendary 2020s Indian female playback singer.", "Neha Kakkar", ["Neha Kakkar", "Asees Kaur", "Tulsi Kumar", "Parampara Tandon"]],
    ["Identify this 2020s popular Indian meme song.", "Moye Moye", ["Moye Moye", "Kacha Badam", "Bachpan Ka Pyaar", "Manike Mage Hithe"]],
    ["Name this 2020s Bollywood movie featuring a female spy.", "Pathaan", ["Pathaan", "Tiger 3", "War", "Jawan"]],
    ["Which 2020s Indian TV show featured a spelling bee competition for kids?", "India's Spelling Champion", ["India's Spelling Champion", "Spell Bee India", "Bournvita Quiz Contest", "Mastermind India"]],
    ["Identify this iconic 2020s Indian female cricketer.", "Smriti Mandhana", ["Smriti Mandhana", "Harmanpreet Kaur", "Mithali Raj", "Jhulan Goswami"]],
    ["Guess this popular 2020s Indian indie pop track.", "Udd Gaye", ["Udd Gaye", "Baarishein", "Alag Aasmaan", "Tune Kaha"]],
    ["Identify this 2020s Indian stadium known for IPL finals.", "Narendra Modi Stadium", ["Narendra Modi Stadium", "Wankhede Stadium", "Eden Gardens", "M. Chinnaswamy Stadium"]],
    ["Name this 2020s Indian stand-up comedian.", "Zakir Khan", ["Zakir Khan", "Abhishek Upmanyu", "Bassi", "Munawar Faruqui"]],
    ["Which 2020s Indian web show featured UPSC aspirants?", "Aspirants", ["Aspirants", "Kota Factory", "Pitchers", "Cubicles"]],
    ["Identify this classic 2020s Indian smartphone brand.", "Poco", ["Poco", "OnePlus", "Realme", "iQOO"]],
    ["Guess this legendary 2020s Indian music composer duo.", "Sachin-Jigar", ["Sachin-Jigar", "Ajay-Atul", "Meet Bros", "Salim-Sulaiman"]],
    ["Identify this 2020s Indian movie known for the 'Tum Kya Mile' song.", "Rocky Aur Rani Kii Prem Kahaani", ["Rocky Aur Rani Kii Prem Kahaani", "Brahmastra", "Bawaal", "Satyaprem Ki Katha"]]
];

const getGenAlpha = () => {
    const result = [];
    for (let i = 0; i < 100; i++) {
        const base = alphaQuestions[i % alphaQuestions.length];
        const prompt = `${base[1]} 2020s India Bollywood TV gen-alpha nostalgia`;
        result.push({
            era: "GenAlpha",
            type: "image",
            question: base[0],
            mediaUrl: makeUrl(prompt),
            options: base[2],
            correctOption: base[2].indexOf(base[1])
        });
    }
    return result;
}

const outFile = path.join(__dirname, 'data', 'gen_alpha.json');
const current = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const updated = [...current, ...getGenAlpha()];
fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
console.log('Added 100 GenAlpha picture questions!');
