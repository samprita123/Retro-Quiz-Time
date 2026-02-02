import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizCard from '../components/QuizCard';
import './QuizPage.css';

const QuizPage = () => {
    const { era } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuestions();
    }, [era]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.get(`${apiUrl}/api/quiz/${era}`);
            setQuestions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setLoading(false);
        }
    };

    const handleAnswerSelect = (optionIndex) => {
        if (isAnswered) return;

        setSelectedAnswer(optionIndex);
        setIsAnswered(true);

        if (optionIndex === questions[currentIndex].correctOption) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
        } else {
            // Quiz completed - save score and navigate to score page
            localStorage.setItem('quizScore', score + (selectedAnswer === questions[currentIndex].correctOption ? 1 : 0));
            localStorage.setItem('quizEra', era);
            navigate('/score');
        }
    };

    if (loading) {
        return (
            <div className="quiz-page">
                <div className="spinner"></div>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading retro questions...</p>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="quiz-page">
                <h2>No questions found for this era!</h2>
                <button className="btn btn-pink" onClick={() => navigate('/')}>
                    Go Back
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div className="quiz-page">
            <div className="quiz-header">
                <h2 className="era-title">{era} Quiz</h2>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
                <div className="quiz-info">
                    <span>Question {currentIndex + 1}/{questions.length}</span>
                    <span>Score: {score}/{questions.length}</span>
                </div>
            </div>

            <QuizCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                isAnswered={isAnswered}
                onAnswerSelect={handleAnswerSelect}
            />

            {isAnswered && (
                <button
                    className="btn btn-blue next-btn"
                    onClick={handleNextQuestion}
                >
                    {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
                </button>
            )}
        </div>
    );
};

export default QuizPage;
