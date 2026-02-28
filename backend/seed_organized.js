const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const fs = require('fs');

const seedData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing quizzes
        await Quiz.deleteMany({});
        console.log('Cleared existing quizzes');

        const eras = ['gen_x', 'gen_y', 'gen_z', 'gen_alpha'];
        let totalInserted = 0;

        for (const era of eras) {
            const filePath = path.join(__dirname, 'data', `${era}.json`);
            console.log(`Reading ${era}.json...`);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

            try {
                const result = await Quiz.insertMany(data);
                console.log(`Inserted ${result.length} questions for ${era}`);
                totalInserted += result.length;
            } catch (insertError) {
                console.error(`Error inserting data for ${era}:`, insertError.message);
                if (insertError.writeErrors) {
                    console.error('Write Errors:', insertError.writeErrors.slice(0, 3));
                }
                throw insertError;
            }
        }

        console.log(`Successfully seeded ${totalInserted} questions!`);
        process.exit(0);
    } catch (error) {
        console.error('CRITICAL SEEDING ERROR:', error);
        process.exit(1);
    }
};

seedData();
