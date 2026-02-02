const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// GET /api/quiz/:era - Get 10 random questions for selected era
router.get('/:era', async (req, res) => {
    try {
        const { era } = req.params;

        // Validate era
        const validEras = ['80s', '90s', 'Millennials', 'GenZ'];
        if (!validEras.includes(era)) {
            return res.status(400).json({ message: 'Invalid era specified' });
        }

        // Get 10 random questions using MongoDB aggregate
        const questions = await Quiz.aggregate([
            { $match: { era } },
            { $sample: { size: 10 } }
        ]);

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this era' });
        }

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /api/quiz - Get all questions (for admin)
router.get('/', async (req, res) => {
    try {
        const questions = await Quiz.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /api/quiz - Add a new question
router.post('/', async (req, res) => {
    try {
        const { era, question, options, correctOption } = req.body;

        // Validation
        if (!era || !question || !options || correctOption === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (options.length !== 4) {
            return res.status(400).json({ message: 'Must provide exactly 4 options' });
        }

        if (correctOption < 0 || correctOption > 3) {
            return res.status(400).json({ message: 'Correct option must be between 0 and 3' });
        }

        const newQuiz = new Quiz({
            era,
            question,
            options,
            correctOption
        });

        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT /api/quiz/:id - Update question by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { era, question, options, correctOption } = req.body;

        // Validation
        if (options && options.length !== 4) {
            return res.status(400).json({ message: 'Must provide exactly 4 options' });
        }

        if (correctOption !== undefined && (correctOption < 0 || correctOption > 3)) {
            return res.status(400).json({ message: 'Correct option must be between 0 and 3' });
        }

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { era, question, options, correctOption },
            { new: true, runValidators: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE /api/quiz/:id - Delete question by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedQuiz = await Quiz.findByIdAndDelete(id);

        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.json({ message: 'Question deleted successfully', deletedQuiz });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
