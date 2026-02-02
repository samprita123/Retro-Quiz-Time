const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    era: {
        type: String,
        required: true,
        enum: ['80s', '90s', 'Millennials', 'GenZ']
    },
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image', 'audio'],
        default: 'text'
    },
    mediaUrl: {
        type: String,
        required: function () {
            return this.type === 'image' || this.type === 'audio';
        }
    },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have exactly 4 options']
    },
    correctOption: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    }
}, {
    timestamps: true
});

function arrayLimit(val) {
    return val.length === 4;
}

module.exports = mongoose.model('Quiz', quizSchema);
