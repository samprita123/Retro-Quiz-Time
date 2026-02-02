import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const eras = [
        { name: '80s', color: 'pink', description: 'Doordarshan & Maruti 800', bg: '/assets/doodle_80s.png' },
        { name: '90s', color: 'blue', description: 'Shaktimaan & Parle-G', bg: '/assets/doodle_90s.jpg' },
        { name: 'Millennials', color: 'purple', description: 'Nokia 1100 & Orkut Days', bg: '/assets/doodle_millennials.png' },
        { name: 'GenZ', color: 'green', description: 'UPI, Reels & OTT Hits', bg: '/assets/doodle_genz.png' }
    ];

    return (
        <div className="landing-page">
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>

            <h1 className="title">
                <span className="title-retro">Retro</span>
                <span className="title-quiz">Quiz</span>
                <span className="title-time">Time</span>
            </h1>

            <div className="character-hero">
                <div className="character-row">
                    <span className="char" title="Spider-Man">🕷️</span>
                    <span className="char" title="Ninja Hattori">🥷</span>
                    <span className="char" title="Oggy">🐱</span>
                    <span className="char" title="Krishna (Roll No 21)">🕉️</span>
                    <span className="char" title="Tom & Jerry">🐭</span>
                    <span className="char" title="Motu Patlu">💪</span>
                </div>
            </div>

            <p className="subtitle">
                Which generation are you from?
            </p>

            <div className="era-grid">
                {eras.map((era) => (
                    <Link
                        key={era.name}
                        to={`/quiz/${era.name}`}
                        className={`era-card era-${era.color}`}
                        style={{ '--bg-img': `url(${era.bg})` }}
                    >
                        <div className="era-name">{era.name}</div>
                        <div className="era-description">{era.description}</div>
                        <div className="era-arrow">→</div>
                    </Link>
                ))}
            </div>

            <Link to="/admin" className="admin-link">
                ⚙️ Admin Panel
            </Link>
        </div>
    );
};

export default LandingPage;
