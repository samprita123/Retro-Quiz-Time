const fs = require('fs');
const path = require('path');

const makeUrl = (prompt) => {
    const seed = encodeURIComponent(prompt.substring(0, 30));
    return `https://picsum.photos/seed/${seed}/600/400`;
};

const zQuestions = [
    ["Identify this classic early 2000s cartoon character from India.", "Chhota Bheem", ["Chhota Bheem", "Roll No. 21", "Motu Patlu", "Little Singham"]],
    ["Which famous 2000s Bollywood film features this iconic college scene?", "3 Idiots", ["3 Idiots", "Munna Bhai M.B.B.S.", "Rang De Basanti", "Main Hoon Na"]],
    ["Name this legendary early IPL cricket captain.", "MS Dhoni", ["MS Dhoni", "Shane Warne", "Sachin Tendulkar", "Sourav Ganguly"]],
    ["Guess this iconic 2000s Indian reality TV show.", "Indian Idol", ["Indian Idol", "Sa Re Ga Ma Pa", "Bigg Boss", "Roadies"]],
    ["Identify this popular 2000s Indian snack.", "Kurkure", ["Kurkure", "Lays", "Uncle Chipps", "Haldiram's Bhujia"]],
    ["Which 2000s Bollywood actor is known as the 'Khiladi'?", "Akshay Kumar", ["Akshay Kumar", "Shah Rukh Khan", "Salman Khan", "Ajay Devgn"]],
    ["Name this early 2000s Indian pop music video.", "Kanta Laga", ["Kanta Laga", "Pari Hoon Main", "Gud Naal Ishq Mitha", "Made in India"]],
    ["Identify this classic 2000s Indian TV serial.", "Kyunki Saas Bhi Kabhi Bahu Thi", ["Kyunki Saas Bhi Kabhi Bahu Thi", "Kahaani Ghar Ghar Kii", "Kasautii Zindagii Kay", "Pavitra Rishta"]],
    ["Guess this legendary 2000s Indian cricket moment.", "Yuvraj Singh 6 Sixes", ["Yuvraj Singh 6 Sixes", "2007 T20 World Cup Win", "Sachin 200", "Sehwag 309"]],
    ["Identify this popular 2000s Indian ad character.", "ZooZoos", ["ZooZoos", "Pug (Hutch)", "Airtel Girl", "Nirma Girl"]],
    ["Which early 2000s kids show featured this magical boy?", "Son Pari (Fruity/Altamash)", ["Son Pari (Fruity/Altamash)", "Shararat", "Shaka Laka Boom Boom", "Hatim"]],
    ["Name this iconic 2000s Indian video game.", "Road Rash", ["Road Rash", "NFS Underground", "GTA Vice City", "Project IGI"]],
    ["Identify this 2000s Bollywood comedy movie.", "Hera Pheri", ["Hera Pheri", "Welcome", "Bhool Bhulaiyaa", "Dhamaal"]],
    ["Guess this famous 2000s Indian comedy show.", "The Great Indian Laughter Challenge", ["The Great Indian Laughter Challenge", "Comedy Circus", "Comedy Nights with Kapil", "Laughter Ke Phatke"]],
    ["Identify this classic 2000s Indian fast food item.", "Vada Pav", ["Vada Pav", "Pav Bhaji", "Pani Puri", "Samosa"]],
    ["Name this early 2000s Indian music channel VJ.", "Ranvijay Singha", ["Ranvijay Singha", "Ayushmann Khurrana", "Nikhil Chinapa", "Cyrus Sahukar"]],
    ["Which 2000s Indian film won a National Award for its portrayal of dyslexia?", "Taare Zameen Par", ["Taare Zameen Par", "Black", "Iqbal", "Paa"]],
    ["Identify this iconic 2000s Indian TV advertisement.", "Fevicol", ["Fevicol", "Center Shock", "Mentos", "Happydent"]],
    ["Guess this popular 2000s Indian cartoon show on Cartoon Network.", "Pokemon", ["Pokemon", "Beyblade", "Dragon Ball Z", "Digimon"]],
    ["Identify this legendary 2000s Indian playback singer.", "Sonu Nigam", ["Sonu Nigam", "Shaan", "KK", "Atif Aslam"]],
    ["Name this 2000s Bollywood actress known for 'Poo' character.", "Kareena Kapoor", ["Kareena Kapoor", "Priyanka Chopra", "Bipasha Basu", "Preity Zinta"]],
    ["Which 2000s Indian TV show featured cadets in a military academy?", "Left Right Left", ["Left Right Left", "Remix", "Sanjivani", "Dill Mill Gayye"]],
    ["Identify this classic 2000s Indian mobile phone.", "Nokia 3310", ["Nokia 3310", "Motorola Razr", "Sony Ericsson Walkman", "BlackBerry"]],
    ["Guess this famous 2000s Indian pop band.", "Indian Ocean", ["Indian Ocean", "Euphoria", "Silk Route", "Jal"]],
    ["Identify this 2000s Bollywood romantic drama.", "Kal Ho Naa Ho", ["Kal Ho Naa Ho", "Kabhi Khushi Kabhie Gham", "Veer-Zaara", "Main Prem Ki Diwani Hoon"]],
    ["Name this iconic 2000s Indian comic book.", "Tinkle", ["Tinkle", "Champak", "Raj Comics", "Amar Chitra Katha"]],
    ["Which 2000s Indian cricket legend is known as 'Dada'?", "Sourav Ganguly", ["Sourav Ganguly", "Rahul Dravid", "VVS Laxman", "Virender Sehwag"]],
    ["Identify this popular 2000s Indian TV dance show.", "Boogie Woogie", ["Boogie Woogie", "Dance India Dance", "Jhalak Dikhhla Jaa", "Nach Baliye"]],
    ["Guess this famous 2000s Indian advertisement tagline.", "Kuch Meetha Ho Jaye", ["Kuch Meetha Ho Jaye", "Thanda Matlab Coca Cola", "Yeh Dil Maange More", "Pappu Pass Ho Gaya"]],
    ["Identify this classic 2000s Indian video game console.", "PlayStation 2", ["PlayStation 2", "Xbox 360", "Nintendo Wii", "GameBoy Advance"]],
    ["Name this 2000s Bollywood movie featuring a superhero.", "Krrish", ["Krrish", "Koi Mil Gaya", "Drona", "Ra.One"]],
    ["Which 2000s Indian TV show featured medical interns?", "Dill Mill Gayye", ["Dill Mill Gayye", "Sanjivani", "Astitva", "Kuch Toh Log Kahenge"]],
    ["Identify this iconic 2000s Indian pop indie song.", "Pari Hoon Main", ["Pari Hoon Main", "Made in India", "Yaad Piya Ki Aane Lagi", "Piya Basanti"]],
    ["Guess this legendary 2000s Indian cricket match.", "NatWest Series Final 2002", ["NatWest Series Final 2002", "2003 World Cup Final", "Desert Storm 1998", "2001 Eden Gardens Test"]],
    ["Identify this popular 2000s Indian reality MTV show.", "Roadies", ["Roadies", "Splitsvilla", "Troll Police", "Ace Of Space"]],
    ["Name this early 2000s Indian social networking site.", "Orkut", ["Orkut", "Facebook", "Hi5", "MySpace"]],
    ["Which 2000s Bollywood film featured the 'Dhoom Machale' song?", "Dhoom", ["Dhoom", "Don", "Race", "Dus"]],
    ["Identify this classic 2000s Indian candy.", "Alpenliebe", ["Alpenliebe", "Center Fresh", "Chlor-mint", "Boomer"]],
    ["Guess this iconic 2000s Indian music television channel.", "Channel V", ["Channel V", "MTV India", "B4U Music", "9XM"]],
    ["Identify this 2000s Indian comedian.", "Raju Srivastav", ["Raju Srivastav", "Kapil Sharma", "Sunil Grover", "Sudesh Lehri"]],
    ["Name this famous 2000s Indian TV show about friends finding ghosts.", "Aahat", ["Aahat", "Ssshhhh...Koi Hai", "Mano Ya Na Mano", "Fear Files"]],
    ["Which 2000s Indian film won multiple Oscars?", "Slumdog Millionaire", ["Slumdog Millionaire", "Lagaan", "Water", "Monsoon Wedding"]],
    ["Identify this popular 2000s Indian cartoon show featuring beyblades.", "Beyblade", ["Beyblade", "Pokemon", "Digimon", "Yu-Gi-Oh!"]],
    ["Guess this legendary 2000s Indian playback singer (female).", "Shreya Ghoshal", ["Shreya Ghoshal", "Sunidhi Chauhan", "Alka Yagnik", "Kavita Krishnamurthy"]],
    ["Identify this classic 2000s Indian advertisement.", "Tata Safari (Reclaim Your Life)", ["Tata Safari (Reclaim Your Life)", "Bajaj Pulsar (Definitely Male)", "Hero Honda (Dhak Dhak Go)", "Maruti Suzuki (India Comes Home)"]],
    ["Name this 2000s Bollywood movie featuring a ghost.", "Bhool Bhulaiyaa", ["Bhool Bhulaiyaa", "Bhoot", "Raaz", "Makdee"]],
    ["Which 2000s Indian TV show featured a spelling bee competition?", "Bournvita Quiz Contest", ["Bournvita Quiz Contest", "Spell Bee India", "Kaun Banega Crorepati", "Mastermind India"]],
    ["Identify this iconic 2000s Indian video game character.", "Max Payne", ["Max Payne", "Hitman", "Prince of Persia", "Lara Croft"]],
    ["Guess this popular 2000s Indian pop indie singer.", "Lucky Ali", ["Lucky Ali", "Shaan", "Abhijeet", "KK"]],
    ["Identify this 2000s Indian cricket stadium.", "Eden Gardens", ["Eden Gardens", "Wankhede Stadium", "M. Chinnaswamy Stadium", "Feroz Shah Kotla"]]
];

const getGenZ = () => {
    const result = [];
    for (let i = 0; i < 100; i++) {
        const base = zQuestions[i % zQuestions.length];
        const prompt = `${base[1]} 2000s India Bollywood TV nostalgia`;
        result.push({
            era: "GenZ",
            type: "image",
            question: base[0],
            mediaUrl: makeUrl(prompt),
            options: base[2],
            correctOption: base[2].indexOf(base[1])
        });
    }
    return result;
}

const outFile = path.join(__dirname, 'data', 'gen_z.json');
const current = JSON.parse(fs.readFileSync(outFile, 'utf8'));
const updated = [...current, ...getGenZ()];
fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
console.log('Added 100 GenZ picture questions!');
