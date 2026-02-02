import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import './ScorePage.css';

const ScorePage = () => {
    const navigate = useNavigate();
    const [score, setScore] = useState(0);
    const [era, setEra] = useState('');

    useEffect(() => {
        const savedScore = localStorage.getItem('quizScore');
        const savedEra = localStorage.getItem('quizEra');

        if (savedScore !== null) {
            setScore(parseInt(savedScore));
            setEra(savedEra || '');

            // Trigger confetti for high scores
            if (parseInt(savedScore) >= 7) {
                triggerConfetti();
            }
        } else {
            navigate('/');
        }
    }, [navigate]);

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const colors = ['#ff006e', '#00d4ff', '#b967ff', '#05ffa1', '#fffb00'];

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const getScoreMessage = () => {
        const percentage = (score / 10) * 100;

        if (percentage === 100) {
            return {
                title: '🏆 Retro Master!',
                message: 'Perfect score! You truly lived through this era!',
                color: 'var(--neon-green)'
            };
        } else if (percentage >= 70) {
            return {
                title: '🌟 Nostalgia Expert!',
                message: 'Impressive! The retro vibes are strong with you!',
                color: 'var(--neon-blue)'
            };
        } else if (percentage >= 50) {
            return {
                title: '👍 Getting There!',
                message: 'Not bad! You remember more than you think!',
                color: 'var(--neon-purple)'
            };
        } else {
            return {
                title: '📚 Need More Nostalgia!',
                message: 'Time to brush up on your retro knowledge!',
                color: 'var(--neon-pink)'
            };
        }
    };

    const scoreData = getScoreMessage();

    const handleRestart = () => {
        localStorage.removeItem('quizScore');
        localStorage.removeItem('quizEra');
        navigate(`/quiz/${era}`);
    };

    const handleHome = () => {
        localStorage.removeItem('quizScore');
        localStorage.removeItem('quizEra');
        navigate('/');
    };

    return (
        <div className="score-page">
            <div className="score-card">
                <h1 className="score-title" style={{ color: scoreData.color }}>
                    {scoreData.title}
                </h1>

                <div className="score-display">
                    <div className="score-number">{score}</div>
                    <div className="score-total">/ 10</div>
                </div>

                <p className="score-message">{scoreData.message}</p>

                <div className="score-bar">
                    <div
                        className="score-fill"
                        style={{
                            width: `${(score / 10) * 100}%`,
                            background: scoreData.color
                        }}
                    ></div>
                </div>

                <div className="era-badge">
                    {era} Quiz Completed ✓
                </div>

                <div className="action-buttons">
                    <button className="btn btn-pink" onClick={handleRestart}>
                        🔄 Try Again
                    </button>
                    <button className="btn btn-blue" onClick={handleHome}>
                        🏠 Choose Era
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScorePage;
