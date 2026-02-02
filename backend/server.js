require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quiz', quizRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.json({ message: '🎮 Welcome to Retro Quiz Time API!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
