const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const ERA_MAP = {
    GenX: 'gen_x.json',
    GenY: 'gen_y.json',
    GenZ: 'gen_z.json',
    GenAlpha: 'gen_alpha.json',
};

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// GET /api/quiz/:era  → 10 random questions
router.get('/:era', (req, res) => {
    const { era } = req.params;
    const file = ERA_MAP[era];

    if (!file) {
        return res.status(400).json({ message: 'Invalid era. Choose GenX, GenY, GenZ, or GenAlpha.' });
    }

    const filePath = path.join(__dirname, '../data', file);

    fs.readFile(filePath, 'utf-8', (err, raw) => {
        if (err) {
            return res.status(500).json({ message: 'Could not load questions.', error: err.message });
        }
        try {
            const all = JSON.parse(raw);
            const pick = shuffle([...all]).slice(0, 10);
            res.json(pick);
        } catch (parseErr) {
            res.status(500).json({ message: 'JSON parse error.', error: parseErr.message });
        }
    });
});

module.exports = router;
