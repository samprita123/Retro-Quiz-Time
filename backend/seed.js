require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');

const sampleQuestions = [
    // 80s Era
    {
        era: '80s',
        question: 'Which iconic phone was popular in the 80s?',
        options: ['Nokia 3310', 'Motorola DynaTAC', 'iPhone', 'Samsung Galaxy S1'],
        correctOption: 1
    },
    {
        era: '80s',
        question: 'What arcade game featured a yellow character eating dots?',
        options: ['Space Invaders', 'Pac-Man', 'Donkey Kong', 'Galaga'],
        correctOption: 1
    },
    {
        era: '80s',
        question: 'Which movie franchise started in 1977 but became huge in the 80s?',
        options: ['Star Wars', 'Indiana Jones', 'Back to the Future', 'The Terminator'],
        correctOption: 0
    },
    {
        era: '80s',
        question: 'What was the first music video ever played on MTV in 1981?',
        options: ['Thriller', 'Video Killed the Radio Star', 'Billie Jean', 'Take On Me'],
        correctOption: 1
    },
    {
        era: '80s',
        question: 'Which console did Nintendo release in 1985?',
        options: ['Sega Genesis', 'Atari 2600', 'NES', 'PlayStation'],
        correctOption: 2
    },
    {
        era: '80s',
        question: 'What toy allowed you to solve a colorful puzzle by rotating faces?',
        options: ['Rubik\'s Cube', 'Etch A Sketch', 'Simon', 'Tamagotchi'],
        correctOption: 0
    },
    {
        era: '80s',
        question: 'Which band sang "Sweet Child O\' Mine"?',
        options: ['Bon Jovi', 'Guns N\' Roses', 'Metallica', 'AC/DC'],
        correctOption: 1
    },
    {
        era: '80s',
        question: 'What was the name of Michael Jackson\'s famous album released in 1982?',
        options: ['Bad', 'Dangerous', 'Thriller', 'Off the Wall'],
        correctOption: 2
    },
    {
        era: '80s',
        question: 'Which TV show featured Mr. T and a group of mercenaries?',
        options: ['Knight Rider', 'The A-Team', 'Miami Vice', 'MacGyver'],
        correctOption: 1
    },
    {
        era: '80s',
        question: 'What technology did Sony introduce in 1979 that became huge in the 80s?',
        options: ['CD Player', 'Walkman', 'VHS Player', 'Boom Box'],
        correctOption: 1
    },
    {
        era: '80s',
        question: 'Which movie featured a DeLorean time machine?',
        options: ['Ghostbusters', 'Back to the Future', 'E.T.', 'The Goonies'],
        correctOption: 1
    },
    {
        era: '80s',
        question: 'What cartoon featured He-Man?',
        options: ['ThunderCats', 'G.I. Joe', 'Masters of the Universe', 'Transformers'],
        correctOption: 2
    },

    // 90s Era
    {
        era: '90s',
        question: 'Which cartoon has these characters: Tommy, Chuckie, Angelica?',
        options: ['Rugrats', 'Dexter\'s Lab', 'Powerpuff Girls', 'Sailor Moon'],
        correctOption: 0
    },
    {
        era: '90s',
        question: 'What was the most popular gaming console of the 90s?',
        options: ['Sega Saturn', 'Nintendo 64', 'PlayStation', 'Dreamcast'],
        correctOption: 2
    },
    {
        era: '90s',
        question: 'Which boy band sang "I Want It That Way"?',
        options: ['NSYNC', 'Backstreet Boys', 'Boyz II Men', '98 Degrees'],
        correctOption: 1
    },
    {
        era: '90s',
        question: 'What virtual pet was a must-have toy in the 90s?',
        options: ['Furby', 'Polly Pocket', 'Tamagotchi', 'Beanie Babies'],
        correctOption: 2
    },
    {
        era: '90s',
        question: 'Which sitcom featured 6 friends living in New York?',
        options: ['Seinfeld', 'Friends', 'Frasier', 'Will & Grace'],
        correctOption: 1
    },
    {
        era: '90s',
        question: 'What movie featured the line "Life is like a box of chocolates"?',
        options: ['The Shawshank Redemption', 'Pulp Fiction', 'Forrest Gump', 'Titanic'],
        correctOption: 2
    },
    {
        era: '90s',
        question: 'Which cartoon featured characters Blossom, Bubbles, and Buttercup?',
        options: ['Sailor Moon', 'Powerpuff Girls', 'Totally Spies', 'Kim Possible'],
        correctOption: 1
    },
    {
        era: '90s',
        question: 'What was the first widely-used internet browser?',
        options: ['Internet Explorer', 'Mozilla Firefox', 'Netscape Navigator', 'Google Chrome'],
        correctOption: 2
    },
    {
        era: '90s',
        question: 'Which game featured a spiky blue hedgehog?',
        options: ['Mario', 'Crash Bandicoot', 'Sonic', 'Spyro'],
        correctOption: 2
    },
    {
        era: '90s',
        question: 'What fashion trend involved wearing pants low on the hips?',
        options: ['Bell-bottoms', 'Baggy Jeans', 'Skinny Jeans', 'Cargo Pants'],
        correctOption: 1
    },
    {
        era: '90s',
        question: 'Which show had the catchphrase "D\'oh!"?',
        options: ['Family Guy', 'The Simpsons', 'South Park', 'King of the Hill'],
        correctOption: 1
    },
    {
        era: '90s',
        question: 'What portable music player did Apple NOT release in the 90s?',
        options: ['iPod', 'Walkman', 'Discman', 'MiniDisc'],
        correctOption: 0
    },

    // Millennials Era (2000s-2010s)
    {
        era: 'Millennials',
        question: 'Which social media platform was released first?',
        options: ['Instagram', 'Facebook', 'Twitter', 'Snapchat'],
        correctOption: 1
    },
    {
        era: 'Millennials',
        question: 'What game involved building with blocks in a pixelated world?',
        options: ['Roblox', 'Minecraft', 'Terraria', 'Fortnite'],
        correctOption: 1
    },
    {
        era: 'Millennials',
        question: 'Which vampire romance series was hugely popular?',
        options: ['The Vampire Diaries', 'True Blood', 'Twilight', 'Buffy'],
        correctOption: 2
    },
    {
        era: 'Millennials',
        question: 'What was the name of the first iPhone released in 2007?',
        options: ['iPhone 3G', 'iPhone 2G', 'iPhone', 'iPhone 1'],
        correctOption: 2
    },
    {
        era: 'Millennials',
        question: 'Which boy wizard series concluded in 2011?',
        options: ['Percy Jackson', 'Harry Potter', 'The Chronicles of Narnia', 'Eragon'],
        correctOption: 1
    },
    {
        era: 'Millennials',
        question: 'What video-sharing platform launched in 2005?',
        options: ['Vimeo', 'YouTube', 'Dailymotion', 'TikTok'],
        correctOption: 1
    },
    {
        era: 'Millennials',
        question: 'Which TV show featured a chemistry teacher turned drug lord?',
        options: ['The Wire', 'Breaking Bad', 'Weeds', 'Narcos'],
        correctOption: 1
    },
    {
        era: 'Millennials',
        question: 'What dance move became viral in the mid-2010s?',
        options: ['The Floss', 'Gangnam Style', 'Harlem Shake', 'Dab'],
        correctOption: 3
    },
    {
        era: 'Millennials',
        question: 'Which superhero movie started the MCU in 2008?',
        options: ['The Incredible Hulk', 'Iron Man', 'Thor', 'Captain America'],
        correctOption: 1
    },
    {
        era: 'Millennials',
        question: 'What was the popular farming game on Facebook?',
        options: ['FarmVille', 'Hay Day', 'Township', 'Farm Heroes'],
        correctOption: 0
    },
    {
        era: 'Millennials',
        question: 'Which book series featured Katniss Everdeen?',
        options: ['Divergent', 'The Maze Runner', 'The Hunger Games', 'The 5th Wave'],
        correctOption: 2
    },
    {
        era: 'Millennials',
        question: 'What messaging app had a ghost logo?',
        options: ['WhatsApp', 'Telegram', 'Snapchat', 'Kik'],
        correctOption: 2
    },

    // Gen Z Era (2015-present)
    {
        era: 'GenZ',
        question: 'Which app is known for short-form videos and dances?',
        options: ['Instagram Reels', 'TikTok', 'Vine', 'Snapchat'],
        correctOption: 1
    },
    {
        era: 'GenZ',
        question: 'What battle royale game became hugely popular in 2017?',
        options: ['PUBG', 'Apex Legends', 'Fortnite', 'Call of Duty Warzone'],
        correctOption: 2
    },
    {
        era: 'GenZ',
        question: 'Which streaming platform is known for "Stranger Things"?',
        options: ['Hulu', 'Disney+', 'Netflix', 'Amazon Prime'],
        correctOption: 2
    },
    {
        era: 'GenZ',
        question: 'What does "stan" mean in internet slang?',
        options: ['A superfan', 'A hater', 'A friend', 'A critic'],
        correctOption: 0
    },
    {
        era: 'GenZ',
        question: 'Which artist released the album "When We All Fall Asleep, Where Do We Go?"',
        options: ['Ariana Grande', 'Billie Eilish', 'Taylor Swift', 'Olivia Rodrigo'],
        correctOption: 1
    },
    {
        era: 'GenZ',
        question: 'What does "VSCO girl" refer to?',
        options: ['A gamer', 'An aesthetic/lifestyle trend', 'A dance move', 'A social media platform'],
        correctOption: 1
    },
    {
        era: 'GenZ',
        question: 'Which game involves crewmates and imposters?',
        options: ['Among Us', 'Fall Guys', 'Roblox', 'Valorant'],
        correctOption: 0
    },
    {
        era: 'GenZ',
        question: 'What phrase means something is really good or cool?',
        options: ['Cap', 'Slay', 'Mid', 'Ratio'],
        correctOption: 1
    },
    {
        era: 'GenZ',
        question: 'Which artist sang "drivers license"?',
        options: ['Olivia Rodrigo', 'Sabrina Carpenter', 'Conan Gray', 'Gracie Abrams'],
        correctOption: 0
    },
    {
        era: 'GenZ',
        question: 'What does "no cap" mean?',
        options: ['No lie/for real', 'No way', 'Not cool', 'No problem'],
        correctOption: 0
    },
    {
        era: 'GenZ',
        question: 'Which shoe brand became a trend with chunky sneakers?',
        options: ['Nike', 'Adidas', 'Fila', 'New Balance'],
        correctOption: 2
    },
    {
        era: 'GenZ',
        question: 'What does "rizz" mean?',
        options: ['Being lucky', 'Charisma/flirting skills', 'Being tired', 'Being rich'],
        correctOption: 1
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB');

        // Clear existing questions
        await Quiz.deleteMany({});
        console.log('🗑️  Cleared existing questions');

        // Insert sample questions
        await Quiz.insertMany(sampleQuestions);
        console.log(`✨ Added ${sampleQuestions.length} sample questions`);

        // Show count per era
        const counts = await Quiz.aggregate([
            { $group: { _id: '$era', count: { $sum: 1 } } }
        ]);

        console.log('\n📊 Questions per era:');
        counts.forEach(({ _id, count }) => {
            console.log(`   ${_id}: ${count} questions`);
        });

        console.log('\n✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
