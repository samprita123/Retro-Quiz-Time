const fs = require('fs');
const path = require('path');

const makeUrl = (prompt) => {
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true`;
};

const yQuestions = [
    ["Identify this 90s Indian superhero character.", "Shaktimaan", ["Shaktimaan", "Captain Vyom", "Junior G", "Aryaman"]],
    ["Name this popular 90s Indian TV show about a magical pencil.", "Shaka Laka Boom Boom", ["Shaka Laka Boom Boom", "Son Pari", "Shararat", "Hatim"]],
    ["What is the name of this classic 90s Indian cartoon character?", "Mowgli", ["Mowgli", "Chhota Bheem", "Dexter", "Baloo"]],
    ["Identify this iconic 90s Indian pop indie band.", "Euphoria", ["Euphoria", "Silk Route", "Bombay Vikings", "Aryans"]],
    ["Which famous 90s Bollywood movie features this train scene?", "Dilwale Dulhania Le Jayenge", ["Dilwale Dulhania Le Jayenge", "Kuch Kuch Hota Hai", "Dil To Pagal Hai", "Hum Aapke Hain Koun"]],
    ["Name this legendary 90s video game console popular in India.", "Terminator 2 (8-bit)", ["Terminator 2 (8-bit)", "PlayStation 1", "Sega Mega Drive", "Nintendo 64"]],
    ["Guess this iconic 90s Indian advertisement character.", "Boomer Man", ["Boomer Man", "Parle G Girl", "Nirma Girl", "Amul Girl"]],
    ["Identify this classic 90s Indian comic book superhero.", "Nagraj", ["Nagraj", "Doga", "Super Commando Dhruva", "Bheriya"]],
    ["Which 90s Indian TV show featured these five sisters?", "Hum Paanch", ["Hum Paanch", "Dekh Bhai Dekh", "Tu Tu Main Main", "Zabaan Sambhalke"]],
    ["Name this legendary 90s Bollywood playback singer (male).", "Kumar Sanu", ["Kumar Sanu", "Udit Narayan", "Abhijeet Bhattacharya", "Sonu Nigam"]],
    ["Identify this popular 90s Indian candy.", "Phantom Sweet Cigarettes", ["Phantom Sweet Cigarettes", "Kismi Bar", "Mango Bite", "Swad"]],
    ["What is the name of this classic 90s Indian soft drink?", "Gold Spot", ["Gold Spot", "Campa Cola", "Citra", "Limca"]],
    ["Guess this iconic 90s Indian music video.", "Made in India (Alisha Chinai)", ["Made in India (Alisha Chinai)", "Pari Hoon Main", "Yaad Piya Ki Aane Lagi", "Gud Naal Ishq Mitha"]],
    ["Identify this 90s Indian cricket captain.", "Mohammad Azharuddin", ["Mohammad Azharuddin", "Sachin Tendulkar", "Sourav Ganguly", "Rahul Dravid"]],
    ["Name this famous 90s Indian TV show host.", "Siddhartha Basu", ["Siddhartha Basu", "Roshan Abbas", "Aman Verma", "Cyrus Broacha"]],
    ["Which classic 90s Indian cartoon show is this?", "Jungle Book (Anime)", ["Jungle Book (Anime)", "TaleSpin", "DuckTales", "Swat Kats"]],
    ["Identify this iconic 90s Indian movie villain.", "Crime Master Gogo", ["Crime Master Gogo", "Mogambo", "Shakaal", "Kancha Cheena"]],
    ["What is the name of this 90s Indian TV show alien?", "Jadoo", ["Jadoo", "Karishma (Robot)", "Vicky", "Son Pari"]],
    ["Guess this legendary 90s Indian pop song.", "Tunak Tunak Tun", ["Tunak Tunak Tun", "Ho Jayegi Balle Balle", "Bolo Ta Ra Ra", "Dardi Rab Rab"]],
    ["Identify this classic 90s Indian video game.", "Super Mario Bros", ["Super Mario Bros", "Contra", "Adventure Island", "Duck Hunt"]],
    ["Name this 90s Indian TV show about a detective.", "Byomkesh Bakshi", ["Byomkesh Bakshi", "CID", "Karamchand", "Tehkikaat"]],
    ["Which iconic 90s Indian advertisement featured a waterfall?", "Liril Soap", ["Liril Soap", "Cinthol", "Lux", "Lifebuoy"]],
    ["Identify this popular 90s Indian magazine for kids.", "Tinkle", ["Tinkle", "Champak", "Chandamama", "Target"]],
    ["What is the name of this 90s Indian TV show magical fairy?", "Son Pari", ["Son Pari", "Shararat", "Shaka Laka Boom Boom", "Hatim"]],
    ["Guess this classic 90s Indian Bollywood movie.", "Andaz Apna Apna", ["Andaz Apna Apna", "Hera Pheri", "Coolie No. 1", "Judwaa"]],
    ["Identify this 90s Indian cricket legend known as 'The Wall'.", "Rahul Dravid", ["Rahul Dravid", "VVS Laxman", "Sachin Tendulkar", "Sourav Ganguly"]],
    ["Name this famous 90s Indian VJ.", "Cyrus Broacha", ["Cyrus Broacha", "Nikhil Chinapa", "Malaika Arora", "Cyrus Sahukar"]],
    ["Which 90s Indian TV show featured this iconic title track?", "Malgudi Days", ["Malgudi Days", "Dekh Bhai Dekh", "Hum Paanch", "Flop Show"]],
    ["Identify this iconic 90s Indian indie pop singer.", "Lucky Ali", ["Lucky Ali", "Shaan", "Sonu Nigam", "Abhijeet"]],
    ["What is the name of this classic 90s Indian snack?", "Uncle Chipps", ["Uncle Chipps", "Crax", "Kurkure", "Cheetos"]],
    ["Guess this popular 90s Indian TV show about a school.", "Hip Hip Hurray", ["Hip Hip Hurray", "Just Mohabbat", "Remix", "Left Right Left"]],
    ["Identify this legendary 90s Bollywood movie scene.", "Kuch Kuch Hota Hai (Basketball)", ["Kuch Kuch Hota Hai (Basketball)", "Dil To Pagal Hai", "Biwi No. 1", "Pyaar Kiya To Darna Kya"]],
    ["Name this 90s Indian comic book character.", "Chacha Chaudhary", ["Chacha Chaudhary", "Tenali Rama", "Bankelal", "Super Commando Dhruva"]],
    ["Which classic 90s Indian cartoon show featured a lab?", "Dexter's Laboratory", ["Dexter's Laboratory", "Johnny Bravo", "Powerpuff Girls", "Ed, Edd n Eddy"]],
    ["Identify this iconic 90s Indian advertisement.", "Dhara Cooking Oil (Jalebi)", ["Dhara Cooking Oil (Jalebi)", "Complan", "Bournvita", "Horlicks"]],
    ["What is the name of this 90s Indian TV show robot?", "Karishma", ["Karishma", "Vicky", "Jadoo", "Sonu"]],
    ["Guess this classic 90s Indian pop group.", "Viva", ["Viva", "Band of Boys", "Aasma", "Models"]],
    ["Identify this 90s Indian cricket moment.", "Desert Storm (Sachin 1998)", ["Desert Storm (Sachin 1998)", "1992 World Cup", "Anil Kumble 10 wickets", "Venkatesh Prasad vs Aamir Sohail"]],
    ["Name this famous 90s Indian TV show.", "Office Office", ["Office Office", "Flop Show", "Dekh Bhai Dekh", "Zabaan Sambhalke"]],
    ["Which 90s Indian movie featured this iconic friendship?", "Dil Chahta Hai", ["Dil Chahta Hai", "Zindagi Na Milegi Dobara", "Rang De Basanti", "Hera Pheri"]],
    ["Identify this popular 90s Indian children's program.", "Bournvita Quiz Contest", ["Bournvita Quiz Contest", "Takeshi's Castle", "M.A.D", "Art Attack"]],
    ["What is the name of this classic 90s Indian video game?", "Contra", ["Contra", "Super Mario Bros", "Adventure Island", "Duck Hunt"]],
    ["Guess this iconic 90s Indian pop song.", "Pari Hoon Main", ["Pari Hoon Main", "Yaad Piya Ki Aane Lagi", "Piya Basanti", "Deewana Tera"]],
    ["Identify this 90s Indian Bollywood actor.", "Shah Rukh Khan", ["Shah Rukh Khan", "Salman Khan", "Aamir Khan", "Akshay Kumar"]],
    ["Name this 90s Indian comic book publisher.", "Raj Comics", ["Raj Comics", "Diamond Comics", "Amar Chitra Katha", "Gotham Comics"]],
    ["Which classic 90s Indian TV show featured this family?", "Dekh Bhai Dekh", ["Dekh Bhai Dekh", "Hum Paanch", "Tu Tu Main Main", "Shrimaan Shrimati"]],
    ["Identify this iconic 90s Indian advertisement jingle.", "Washing Powder Nirma", ["Washing Powder Nirma", "Babul Ki Duayen", "Vicco Turmeric", "Zandu Balm"]],
    ["What is the name of this 90s Indian soft drink brand?", "Citra", ["Citra", "Gold Spot", "Limca", "Campa Cola"]],
    ["Guess this popular 90s Indian TV show.", "Surabhi", ["Surabhi", "Khana Khazana", "Antakshari", "Sa Re Ga Ma Pa"]],
    ["Identify this 90s Indian music television channel.", "Channel V", ["Channel V", "MTV India", "B4U Music", "9XM"]]
];

const getGenY = () => {
    const result = [];
    for (let i = 0; i < 100; i++) {
        const base = yQuestions[i % yQuestions.length];
        const prompt = `${base[1]} 1990s India Bollywood TV nostalgia`;
        result.push({
            era: "GenY",
            type: "image",
            question: base[0],
            mediaUrl: makeUrl(prompt),
            options: base[2],
            correctOption: base[2].indexOf(base[1])
        });
    }
    return result;
}

const outFile = path.join(__dirname, 'data', 'gen_y.json');
const current = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const updated = [...current, ...getGenY()];
fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
console.log('Added 100 GenY picture questions!');
