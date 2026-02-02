import './QuizCard.css';

const QuizCard = ({ question, selectedAnswer, isAnswered, onAnswerSelect }) => {
    return (
        <div className="quiz-card">
            {/* Multimedia Loading */}
            {question.type === 'image' && (
                <div className="media-container image-media">
                    <img src={question.mediaUrl} alt="Quiz Question" className="quiz-image" />
                </div>
            )}

            {question.type === 'audio' && (
                <div className="media-container audio-media">
                    <div className="audio-icon">🎵</div>
                    <audio controls className="quiz-audio">
                        <source src={question.mediaUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}

            <h3 className="question-text">{question.question}</h3>

            <div className="options-grid">
                {question.options.map((option, index) => {
                    const isCorrect = index === question.correctOption;
                    const isSelected = index === selectedAnswer;

                    let className = 'option-btn';

                    if (isAnswered) {
                        if (isCorrect) {
                            className += ' correct';
                        } else if (isSelected && !isCorrect) {
                            className += ' incorrect';
                        }
                    } else if (isSelected) {
                        className += ' selected';
                    }

                    return (
                        <button
                            key={index}
                            className={className}
                            onClick={() => onAnswerSelect(index)}
                            disabled={isAnswered}
                        >
                            <span className="option-letter">
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="option-text">{option}</span>
                            {isAnswered && isCorrect && <span className="icon">✓</span>}
                            {isAnswered && isSelected && !isCorrect && <span className="icon">✗</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuizCard;
