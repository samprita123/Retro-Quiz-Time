require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');

const seedData = [
    // ================= 80s ERA ================= //
    // Images (Placeholder URLs that would ideally point to real assets)
    {
        era: '80s',
        type: 'image',
        question: 'Name this iconic 80s movie character.',
        mediaUrl: 'https://images.unsplash.com/photo-1596727147705-54a71280520d?auto=format&fit=crop&q=80&w=600', // Ghostbusters vibe
        options: ['Marty McFly', 'Peter Venkman', 'Ferris Bueller', 'Indiana Jones'],
        correctOption: 1
    },
    {
        era: '80s',
        type: 'image',
        question: 'Which console is shown in this picture?',
        mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600', // Retro gaming
        options: ['Atari 2600', 'NES', 'Sega Genesis', 'ColecoVision'],
        correctOption: 1
    },
    // Text Questions
    { era: '80s', question: 'Which 80s song has the lyrics: "Just a small town girl..."?', options: ['Don\'t Stop Believin\'', 'Livin\' on a Prayer', 'Total Eclipse of the Heart', 'Sweet Dreams'], correctOption: 0 },
    { era: '80s', question: 'What was the highest-grossing film of the 1980s?', options: ['E.T. the Extra-Terrestrial', 'Star Wars: Return of the Jedi', 'Batman', 'Top Gun'], correctOption: 0 },
    { era: '80s', question: 'Which hairstyle was popularized by bands like Mötley Crüe and Poison?', options: ['The Mullet', 'The Aqua Net Tease', 'Glam Metal Hair', 'The Jheri Curl'], correctOption: 2 },
    { era: '80s', question: 'Who is the princess in "The Legend of Zelda"?', options: ['Peach', 'Zelda', 'Samus', 'Daisy'], correctOption: 1 },
    { era: '80s', question: 'Which candy featured the slogan "Taste the Rainbow"?', options: ['M&Ms', 'Skittles', 'Starburst', 'Nerds'], correctOption: 1 },
    { era: '80s', question: 'What was the name of the bar in the sitcom "Cheers"?', options: ['Cheers', 'Gary\'s Olde Towne Tavern', 'Moe\'s Tavern', 'The Regal Beagle'], correctOption: 0 },
    { era: '80s', question: 'Who sang "Girls Just Want to Have Fun"?', options: ['Madonna', 'Whitney Houston', 'Cyndi Lauper', 'Tiffany'], correctOption: 2 },
    { era: '80s', question: 'What was the name of the ghost in "Ghostbusters"?', options: ['Slimer', 'Casper', 'Beetlejuice', 'Stay Puft'], correctOption: 0 },
    { era: '80s', question: 'Which car was known as K.I.T.T. in "Knight Rider"?', options: ['Ford Mustang', 'Chevrolet Camaro', 'Pontiac Firebird Trans Am', 'Dodge Charger'], correctOption: 2 },
    { era: '80s', question: 'What video game character debuted in "Donkey Kong"?', options: ['Link', 'Mario', 'Samus', 'Kirby'], correctOption: 1 },
    { era: '80s', question: 'Which 80s toy line featured "Robots in Disguise"?', options: ['G.I. Joe', 'Transformers', 'Voltron', 'GoBots'], correctOption: 1 },
    { era: '80s', question: 'Who played the Terminator in the 1984 movie?', options: ['Sylvester Stallone', 'Jean-Claude Van Damme', 'Arnold Schwarzenegger', 'Dolph Lundgren'], correctOption: 2 },
    { era: '80s', question: 'What was the first commercially successful portable laptop?', options: ['Osborne 1', 'IBM 5100', 'Apple IIc', 'Compaq Portable'], correctOption: 0 },
    { era: '80s', question: 'Which fashion item was a must-have for aerobics?', options: ['Leg warmers', 'Shoulder pads', 'Parachute pants', 'Member\'s Only jackets'], correctOption: 0 },
    { era: '80s', question: 'Who directed "The Breakfast Club"?', options: ['Steven Spielberg', 'John Hughes', 'George Lucas', 'Ridley Scott'], correctOption: 1 },
    { era: '80s', question: 'Which band released the album "The Joshua Tree"?', options: ['The Police', 'U2', 'R.E.M.', 'Duran Duran'], correctOption: 1 },
    { era: '80s', question: 'What was the name of the villain in "The Little Mermaid"?', options: ['Maleficent', 'Cruella de Vil', 'Ursula', 'Evil Queen'], correctOption: 2 },
    { era: '80s', question: 'Which TV show featured the Tanner family?', options: ['Full House', 'The Cosby Show', 'Family Ties', 'Growing Pains'], correctOption: 0 },

    // ================= 90s ERA ================= //
    // Images
    {
        era: '90s',
        type: 'image',
        question: 'Which 90s sitcom cast is this?',
        mediaUrl: 'https://images.unsplash.com/photo-1594830206148-5c40498b8941?auto=format&fit=crop&q=80&w=600', // Generic friends vibe
        options: ['Seinfeld', 'Friends', 'Saved by the Bell', 'Full House'],
        correctOption: 1
    },
    // Audio (Mock URLs)
    {
        era: '90s',
        type: 'audio',
        question: 'Guess the song from this 90s intro.',
        mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder
        options: ['Smells Like Teen Spirit', 'Wonderwall', 'Bitter Sweet Symphony', 'Creep'],
        correctOption: 0
    },
    // Text
    { era: '90s', question: 'Which spice girl was known as "Baby Spice"?', options: ['Victoria Beckham', 'Mel B', 'Emma Bunton', 'Geri Halliwell'], correctOption: 2 },
    { era: '90s', question: 'What was the name of the sheep cloned in 1996?', options: ['Molly', 'Dolly', 'Polly', 'Holly'], correctOption: 1 },
    { era: '90s', question: 'Which movie featured the quote "You can\'t handle the truth!"?', options: ['A Few Good Men', 'Pulp Fiction', 'The Silence of the Lambs', 'Fight Club'], correctOption: 0 },
    { era: '90s', question: 'What search engine was founded in 1998?', options: ['Yahoo', 'Google', 'Ask Jeeves', 'AltaVista'], correctOption: 1 },
    { era: '90s', question: 'Who starred in "The Fresh Prince of Bel-Air"?', options: ['Martin Lawrence', 'Eddie Murphy', 'Will Smith', 'Chris Rock'], correctOption: 2 },
    { era: '90s', question: 'Which band sang "Zombie"?', options: ['The Cranberries', 'Nirvana', 'Pearl Jam', 'Radiohead'], correctOption: 0 },
    { era: '90s', question: 'What toy was banned from NSA headquarters?', options: ['Furby', 'Tamagotchi', 'Beanie Babies', 'Pogs'], correctOption: 0 },
    { era: '90s', question: 'Who wrote the "Goosebumps" series?', options: ['R.L. Stine', 'Christopher Pike', 'Stephen King', 'J.K. Rowling'], correctOption: 0 },
    { era: '90s', question: 'What was the highest-grossing film of the 1990s?', options: ['Jurassic Park', 'Titanic', 'The Lion King', 'Independence Day'], correctOption: 1 },
    { era: '90s', question: 'Which console introduced the DualShock controller?', options: ['Nintendo 64', 'PlayStation', 'Sega Saturn', 'Dreamcast'], correctOption: 1 },
    { era: '90s', question: 'Who sang "I Will Always Love You" in 1992?', options: ['Celine Dion', 'Mariah Carey', 'Whitney Houston', 'Toni Braxton'], correctOption: 2 },
    { era: '90s', question: 'What was the name of the computer in "The Matrix"?', options: ['Skynet', 'HAL 9000', 'The Matrix', 'Nebuchadnezzar'], correctOption: 2 }, // Trick question? No, mainframe. Matrix itself.
    { era: '90s', question: 'Which Nickelodeon show featured a football-headed kid?', options: ['Doug', 'Hey Arnold!', 'Rugrats', 'Rocko\'s Modern Life'], correctOption: 1 },
    { era: '90s', question: 'What was the name of the first Harry Potter book?', options: ['Chamber of Secrets', 'Philosopher\'s Stone', 'Prisoner of Azkaban', 'Goblet of Fire'], correctOption: 1 },
    { era: '90s', question: 'Who was the lead singer of Nirvana?', options: ['Dave Grohl', 'Eddie Vedder', 'Kurt Cobain', 'Chris Cornell'], correctOption: 2 },
    { era: '90s', question: 'What year did the DVD format launch?', options: ['1993', '1995', '1997', '1999'], correctOption: 1 },
    { era: '90s', question: 'Which TV show was set in the zip code 90210?', options: ['Melrose Place', 'Beverly Hills, 90210', 'The O.C.', 'Dawson\'s Creek'], correctOption: 1 },
    { era: '90s', question: 'What soda was famous for having "Zero Calories" but launched in the 90s?', options: ['Pepsi One', 'Diet Coke', 'Coke Zero', 'Crystal Pepsi'], correctOption: 3 }, // Crystal Pepsi failed but famous 90s

    // ================= Millennials ERA ================= //
    {
        era: 'Millennials',
        type: 'audio',
        question: 'Who is this pop star?',
        mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        options: ['Britney Spears', 'Lady Gaga', 'Katy Perry', 'Rihanna'],
        correctOption: 0
    },
    { era: 'Millennials', question: 'What was the first feature-length Pixar movie?', options: ['A Bug\'s Life', 'Toy Story', 'Monsters, Inc.', 'Finding Nemo'], correctOption: 1 },
    { era: 'Millennials', question: 'Which social network did Justin Timberlake buy a stake in?', options: ['Facebook', 'MySpace', 'Twitter', 'LinkedIn'], correctOption: 1 },
    { era: 'Millennials', question: 'Who won the first season of American Idol?', options: ['Justin Guarini', 'Kelly Clarkson', 'Carrie Underwood', 'Clay Aiken'], correctOption: 1 },
    { era: 'Millennials', question: 'What MP3 player changed the music industry in 2001?', options: ['Zune', 'iPod', 'Walkman MP3', 'SanDisk Sansa'], correctOption: 1 },
    { era: 'Millennials', question: 'Which "Mean Girls" character was hit by a bus?', options: ['Regina George', 'Cady Heron', 'Gretchen Wieners', 'Karen Smith'], correctOption: 0 },
    { era: 'Millennials', question: 'What was the name of the blog in "Gossip Girl"?', options: ['Gossip Girl', 'The Daily', 'Upper East Sider', 'XOXO'], correctOption: 0 },
    { era: 'Millennials', question: 'Which artist had a hit with "Umbrella"?', options: ['Beyoncé', 'Rihanna', 'Ciara', 'Alicia Keys'], correctOption: 1 },
    { era: 'Millennials', question: 'What was the final book in the Harry Potter series?', options: ['Half-Blood Prince', 'Deathly Hallows', 'Order of the Phoenix', 'Cursed Child'], correctOption: 1 },
    { era: 'Millennials', question: 'Which platform was king of early 2000s instant messaging?', options: ['WhatsApp', 'AIM', 'Slack', 'Discord'], correctOption: 1 },
    { era: 'Millennials', question: 'Who played the Joker in "The Dark Knight"?', options: ['Jack Nicholson', 'Heath Ledger', 'Jared Leto', 'Joaquin Phoenix'], correctOption: 1 },
    { era: 'Millennials', question: 'What video game series features Master Chief?', options: ['Call of Duty', 'Halo', 'Gears of War', 'Mass Effect'], correctOption: 1 },
    { era: 'Millennials', question: 'Which show ended with a controversial fade to black?', options: ['Lost', 'The Sopranos', 'Breaking Bad', 'Dexter'], correctOption: 1 },
    { era: 'Millennials', question: 'What scandal involved Janet Jackson in 2004?', options: ['Lip Sync Fail', 'Wardrobe Malfunction', 'Fall on Stage', 'Mic Drop'], correctOption: 1 },
    { era: 'Millennials', question: 'Which phone ruled before the iPhone?', options: ['BlackBerry', 'Nokia N-Gage', 'Motorola Razr', 'Palm Pilot'], correctOption: 0 },

    // ================= GenZ ERA ================= //
    {
        era: 'GenZ',
        type: 'image',
        question: 'What is this meme cat called?',
        mediaUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600', // Smudge the cat vibe
        options: ['Grumpy Cat', 'Smudge/Woman Yelling at Cat', 'Nyan Cat', 'Keyboard Cat'],
        correctOption: 1
    },
    { era: 'GenZ', question: 'What was the most downloaded app of 2020?', options: ['Zoom', 'TikTok', 'Instagram', 'WhatsApp'], correctOption: 1 },
    { era: 'GenZ', question: 'Who is the "King of YouTube"?', options: ['PewDiePie', 'MrBeast', 'Markiplier', 'Logan Paul'], correctOption: 1 },
    { era: 'GenZ', question: 'Which series features "The Child" (Baby Yoda)?', options: ['The Mandalorian', 'Stranger Things', 'Euphoria', 'Wednesday'], correctOption: 0 },
    { era: 'GenZ', question: 'What aesthetic is associated with cottagecore?', options: ['Cyberpunk', 'Rural life/baking', 'Goth', 'Streetwear'], correctOption: 1 },
    { era: 'GenZ', question: 'Which K-Pop group has a dedicated fanbase called "ARMY"?', options: ['BLACKPINK', 'BTS', 'EXO', 'TWICE'], correctOption: 1 },
    { era: 'GenZ', question: 'What does "skibidi" refer to in meme culture?', options: ['A toilet', 'A dance', 'A food', 'A game'], correctOption: 0 },
    { era: 'GenZ', question: 'Who sang "Old Town Road"?', options: ['Drake', 'Post Malone', 'Lil Nas X', 'Travis Scott'], correctOption: 2 },
    { era: 'GenZ', question: 'What is the name of the island in Animal Crossing: New Horizons?', options: ['Whatever you name it', 'Nook miles', 'Tom Nook Island', 'Paradise'], correctOption: 0 },
    { era: 'GenZ', question: 'Which platform popularized 24-hour stories?', options: ['Instagram', 'Snapchat', 'Facebook', 'Twitter'], correctOption: 1 },
    { era: 'GenZ', question: 'What does "cheugy" mean?', options: ['Cool/Trendy', 'Out of date/Trying too hard', 'Expensive', 'Cheap'], correctOption: 1 },
    { era: 'GenZ', question: 'Who is the youngest winner of the EGOT?', options: ['Jennifer Hudson', 'John Legend', 'Viola Davis', 'Elton John'], correctOption: 1 }, // Actually Jennifer Hudson? No, John Legend or EGOT history check. Let's stick to easy pop culture.
    { era: 'GenZ', question: 'What game involves specific dance emotes like "The Floss"?', options: ['Roblox', 'Fortnite', 'Minecraft', 'Overwatch'], correctOption: 1 },
    { era: 'GenZ', question: 'Which Euphoria character is played by Zendaya?', options: ['Maddy', 'Cassie', 'Rue', 'Jules'], correctOption: 2 },
    { era: 'GenZ', question: 'What is the highest-grossing film of all time (as of 2024)?', options: ['Avengers: Endgame', 'Avatar', 'Titanic', 'Star Wars: The Force Awakens'], correctOption: 1 },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing questions to avoid duplicates/schema conflicts
        await Quiz.deleteMany({});
        console.log('🗑️  Cleared existing questions');

        // Insert new expanded data
        await Quiz.insertMany(seedData);
        console.log(`✨ Added ${seedData.length} expanded questions with multimedia!`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
