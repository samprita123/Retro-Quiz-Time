import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({
        era: '80s',
        question: '',
        type: 'text',
        mediaUrl: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: 0
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/quiz');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            era: formData.era,
            era: formData.era,
            question: formData.question,
            type: formData.type,
            mediaUrl: formData.mediaUrl,
            options: [formData.option1, formData.option2, formData.option3, formData.option4],
            correctOption: parseInt(formData.correctOption)
        };

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/quiz/${editingId}`, payload);
                alert('Question updated successfully! 🎉');
            } else {
                await axios.post('http://localhost:5000/api/quiz', payload);
                alert('Question added successfully! ✨');
            }

            resetForm();
            fetchQuestions();
        } catch (error) {
            console.error('Error saving question:', error);
            alert('Error saving question. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (question) => {
        setFormData({
            era: question.era,
            era: question.era,
            question: question.question,
            type: question.type || 'text',
            mediaUrl: question.mediaUrl || '',
            option1: question.options[0],
            option2: question.options[1],
            option3: question.options[2],
            option4: question.options[3],
            correctOption: question.correctOption
        });
        setEditingId(question._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await axios.delete(`http://localhost:5000/api/quiz/${id}`);
                alert('Question deleted! 🗑️');
                fetchQuestions();
            } catch (error) {
                console.error('Error deleting question:', error);
                alert('Error deleting question. Please try again.');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            era: '80s',
            era: '80s',
            question: '',
            type: 'text',
            mediaUrl: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctOption: 0
        });
        setEditingId(null);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>⚙️ Admin Panel</h1>
                <Link to="/" className="btn btn-blue back-btn">← Back to Quiz</Link>
            </div>

            <div className="admin-form-container">
                <h2>{editingId ? 'Edit Question' : 'Add New Question'}</h2>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Era:</label>
                        <select
                            name="era"
                            value={formData.era}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="80s">80s</option>
                            <option value="90s">90s</option>
                            <option value="Millennials">Millennials</option>
                            <option value="GenZ">GenZ</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Question:</label>
                        <textarea
                            name="question"
                            value={formData.question}
                            onChange={handleInputChange}
                            placeholder="Enter your question here..."
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Type:</label>
                        <select
                            name="type"
                            value={formData.type || 'text'}
                            onChange={handleInputChange}
                        >
                            <option value="text">Text Only</option>
                            <option value="image">Image</option>
                            <option value="audio">Audio</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Media URL (Image/Audio):</label>
                        <input
                            type="text"
                            name="mediaUrl"
                            value={formData.mediaUrl || ''}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            disabled={!formData.type || formData.type === 'text'}
                        />
                    </div>

                    <div className="options-group">
                        <div className="form-group">
                            <label>Option A:</label>
                            <input
                                type="text"
                                name="option1"
                                value={formData.option1}
                                onChange={handleInputChange}
                                placeholder="First option"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Option B:</label>
                            <input
                                type="text"
                                name="option2"
                                value={formData.option2}
                                onChange={handleInputChange}
                                placeholder="Second option"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Option C:</label>
                            <input
                                type="text"
                                name="option3"
                                value={formData.option3}
                                onChange={handleInputChange}
                                placeholder="Third option"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Option D:</label>
                            <input
                                type="text"
                                name="option4"
                                value={formData.option4}
                                onChange={handleInputChange}
                                placeholder="Fourth option"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Correct Answer:</label>
                        <select
                            name="correctOption"
                            value={formData.correctOption}
                            onChange={handleInputChange}
                            required
                        >
                            <option value={0}>A - {formData.option1 || 'Option 1'}</option>
                            <option value={1}>B - {formData.option2 || 'Option 2'}</option>
                            <option value={2}>C - {formData.option3 || 'Option 3'}</option>
                            <option value={3}>D - {formData.option4 || 'Option 4'}</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-green" disabled={loading}>
                            {loading ? 'Saving...' : (editingId ? '💾 Update Question' : '➕ Add Question')}
                        </button>
                        {editingId && (
                            <button type="button" className="btn btn-pink" onClick={resetForm}>
                                ✖ Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="questions-list">
                <h2>All Questions ({questions.length})</h2>

                {questions.map((q) => (
                    <div key={q._id} className="question-item">
                        <div className="question-header">
                            <span className="question-era">{q.era}</span>
                            <div className="question-actions">
                                <button className="btn-icon edit" onClick={() => handleEdit(q)}>
                                    ✏️ Edit
                                </button>
                                <button className="btn-icon delete" onClick={() => handleDelete(q._id)}>
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>

                        <p className="question-text">{q.question}</p>

                        <div className="question-options">
                            {q.options.map((opt, idx) => (
                                <div
                                    key={idx}
                                    className={`option-item ${idx === q.correctOption ? 'correct-answer' : ''}`}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                                    <span>{opt}</span>
                                    {idx === q.correctOption && <span className="correct-badge">✓ Correct</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
