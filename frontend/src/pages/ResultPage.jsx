import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const eraLabels = {
    GenX: 'Gen X',
    GenY: 'Gen Y / Millennials',
    GenZ: 'Gen Z',
    GenAlpha: 'Gen Alpha',
};

const eraColors = {
    GenX: { accent: '#FF6FB0', bg: 'linear-gradient(135deg,#FFD6E8,#FFE0B2)' },
    GenY: { accent: '#8B44E0', bg: 'linear-gradient(135deg,#C9E8FF,#E8D5FF)' },
    GenZ: { accent: '#2DBF73', bg: 'linear-gradient(135deg,#B8F0D0,#FFF3B0)' },
    GenAlpha: { accent: '#FF8A00', bg: 'linear-gradient(135deg,#FFE0B2,#B8F0D0)' },
};

const TOTAL = 10;

function getMessage(score) {
    if (score >= 9) return { text: 'Nostalgia Master 🔥', sub: "You remember EVERYTHING! You're a legend!" };
    if (score >= 6) return { text: 'Memory Champion 😄', sub: 'Great job! Your memory is awesome!' };
    if (score >= 3) return { text: 'Getting There 🙂', sub: 'Not bad! A little revision and you\'ll ace it!' };
    return { text: 'Time Travel Needed 😂', sub: "Looks like you need to revisit those memories!" };
}

export default function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { score = 0, era = 'GenY' } = location.state || {};
    const colors = eraColors[era] || eraColors.GenY;
    const { text, sub } = getMessage(score);
    const pct = (score / TOTAL) * 100;

    useEffect(() => {
        if (score >= 6) {
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#FF6FB0', '#8B44E0', '#FFCA28', '#2DBF73'] });
        }
    }, [score]);

    return (
        <div className="doodle-bg min-h-screen flex flex-col items-center justify-center px-4 py-10">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'backOut' }}
                style={{
                    background: '#fff',
                    borderRadius: '28px',
                    padding: '2rem 1.75rem',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
                    border: `3px solid ${colors.accent}`,
                    maxWidth: '420px',
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                {/* Header gradient strip */}
                <div style={{ background: colors.bg, borderRadius: '16px', padding: '1rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 800, color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {eraLabels[era]} Quiz
                    </p>
                    <h1 style={{ fontFamily: "'Baloo 2', cursive", fontSize: '1.6rem', fontWeight: 800, color: '#2D2A3E', marginTop: '0.3rem' }}>
                        Your Result!
                    </h1>
                </div>

                {/* Score ring */}
                <div
                    className="score-ring"
                    style={{ '--score-pct': `${pct}%` }}
                >
                    <div className="score-ring-inner">
                        <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: '2rem', fontWeight: 900, color: colors.accent, lineHeight: 1 }}>
                            {score}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#A09CB8', fontWeight: 700, marginTop: '0.1rem' }}>/ {TOTAL}</span>
                    </div>
                </div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ marginTop: '1.5rem' }}
                >
                    <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: '1.35rem', fontWeight: 800, color: '#2D2A3E', marginBottom: '0.4rem' }}>
                        {text}
                    </h2>
                    <p style={{ color: '#6B6880', fontSize: '0.92rem', fontWeight: 600 }}>{sub}</p>
                </motion.div>

                {/* Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '2rem' }}>
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => navigate(`/quiz/${era}`)}
                        style={{
                            background: colors.accent,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '14px',
                            padding: '0.9rem 1.25rem',
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.13)',
                        }}
                    >
                        🔄 Play Again
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => navigate('/')}
                        style={{
                            background: 'transparent',
                            color: colors.accent,
                            border: `2.5px solid ${colors.accent}`,
                            borderRadius: '14px',
                            padding: '0.85rem 1.25rem',
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: 'pointer',
                        }}
                    >
                        🏠 Choose Another Generation
                    </motion.button>
                </div>
            </motion.div>

            {/* Score bar explanation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ maxWidth: '420px', width: '100%', marginTop: '1.25rem', padding: '0 0.5rem' }}
            >
                {[
                    { range: '9–10', label: 'Nostalgia Master 🔥', color: '#2DBF73' },
                    { range: '6–8', label: 'Memory Champion 😄', color: '#8B44E0' },
                    { range: '3–5', label: 'Getting There 🙂', color: '#FFCA28' },
                    { range: '0–2', label: 'Time Travel Needed 😂', color: '#FF6B6B' },
                ].map(tier => (
                    <div
                        key={tier.range}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.6rem',
                            padding: '0.45rem 0.75rem', borderRadius: '10px',
                            background: score >= parseInt(tier.range) ? `${tier.color}18` : 'transparent',
                            marginBottom: '0.3rem',
                        }}
                    >
                        <span style={{ width: '36px', fontWeight: 800, fontSize: '0.8rem', color: tier.color }}>{tier.range}</span>
                        <span style={{ color: '#6B6880', fontSize: '0.85rem', fontWeight: 600 }}>{tier.label}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
