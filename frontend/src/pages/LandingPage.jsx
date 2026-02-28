import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const generations = [
    {
        era: 'GenX',
        label: 'Gen X',
        years: '1965 – 1980',
        emoji: '📺',
        tagline: 'Doordarshan, Sholay & Rajinikanth era!',
        bg: 'linear-gradient(135deg, #FFD6E8 0%, #FFE0B2 100%)',
        border: '#FF6FB0',
        accent: '#FF8A00',
        doodles: ['🎬', '📻', '🏏', '🎭', '✈️'],
    },
    {
        era: 'GenY',
        label: 'Gen Y / Millennials',
        years: '1981 – 1996',
        emoji: '📼',
        tagline: 'Shaktimaan, Maggi & Nokia 3310 vibes!',
        bg: 'linear-gradient(135deg, #C9E8FF 0%, #E8D5FF 100%)',
        border: '#2D9EE0',
        accent: '#8B44E0',
        doodles: ['🦸', '🍜', '📱', '🎮', '💿'],
    },
    {
        era: 'GenZ',
        label: 'Gen Z',
        years: '1997 – 2012',
        emoji: '🎮',
        tagline: 'Chhota Bheem, IPL & social media era!',
        bg: 'linear-gradient(135deg, #B8F0D0 0%, #FFF3B0 100%)',
        border: '#2DBF73',
        accent: '#FFCA28',
        doodles: ['🏏', '📸', '🎵', '😂', '🌐'],
    },
    {
        era: 'GenAlpha',
        label: 'Gen Alpha',
        years: '2013 – Present',
        emoji: '🚀',
        tagline: 'Minecraft, reels & memes generation!',
        bg: 'linear-gradient(135deg, #FFE0B2 0%, #B8F0D0 100%)',
        border: '#FF8A00',
        accent: '#2DBF73',
        doodles: ['🤖', '🎯', '📹', '🌟', '🔥'],
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' } }),
};

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="doodle-bg min-h-screen">
            {/* ── Header ── */}
            <header className="text-center px-4 pt-10 pb-6">
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'backOut' }}
                    className="inline-block"
                >
                    <div style={{ fontSize: 'clamp(2.2rem,6vw,3.5rem)', lineHeight: 1 }}>🎮</div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.55 }}
                    style={{
                        fontFamily: "'Baloo 2', cursive",
                        fontSize: 'clamp(1.6rem, 5vw, 3rem)',
                        fontWeight: 800,
                        color: '#2D2A3E',
                        lineHeight: 1.2,
                        marginTop: '0.5rem',
                    }}
                >
                    Generation Quiz
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.55 }}
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                        color: '#8B44E0',
                        fontWeight: 700,
                        marginTop: '0.4rem',
                    }}
                >
                    🇮🇳 Indian Nostalgia Edition
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                    style={{
                        color: '#6B6880',
                        fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                        marginTop: '0.6rem',
                        maxWidth: '480px',
                        margin: '0.7rem auto 0',
                    }}
                >
                    Pick your generation &amp; test how well you remember the good ol' days! 🥹
                </motion.p>
            </header>

            {/* ── Generation Cards ── */}
            <main
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                    gap: '1.25rem',
                    maxWidth: '960px',
                    margin: '0 auto',
                    padding: '0 1rem 3rem',
                }}
            >
                {generations.map((gen, i) => (
                    <motion.div
                        key={gen.era}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.04, rotate: 0.5 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate(`/quiz/${gen.era}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && navigate(`/quiz/${gen.era}`)}
                        style={{
                            background: gen.bg,
                            border: `3px solid ${gen.border}`,
                            borderRadius: '24px',
                            padding: '1.75rem 1.5rem',
                            cursor: 'pointer',
                            boxShadow: `0 8px 32px rgba(0,0,0,0.09)`,
                            position: 'relative',
                            overflow: 'hidden',
                            userSelect: 'none',
                            outline: 'none',
                            transition: 'box-shadow 0.2s',
                        }}
                    >
                        {/* Floating doodle emojis */}
                        <div
                            style={{
                                position: 'absolute', top: 8, right: 10,
                                display: 'flex', gap: '0.3rem', opacity: 0.35,
                                fontSize: '1.1rem', pointerEvents: 'none',
                            }}
                        >
                            {gen.doodles.slice(0, 3).map((d, j) => <span key={j}>{d}</span>)}
                        </div>

                        {/* Big emoji */}
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{gen.emoji}</div>

                        {/* Label */}
                        <h2
                            style={{
                                fontFamily: "'Baloo 2', cursive",
                                fontWeight: 800,
                                fontSize: '1.35rem',
                                color: '#2D2A3E',
                                marginBottom: '0.15rem',
                            }}
                        >
                            {gen.label}
                        </h2>

                        {/* Year badge */}
                        <span
                            style={{
                                display: 'inline-block',
                                background: '#fff',
                                color: gen.accent,
                                borderRadius: '99px',
                                padding: '0.2rem 0.75rem',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                marginBottom: '0.75rem',
                                border: `2px solid ${gen.accent}`,
                            }}
                        >
                            {gen.years}
                        </span>

                        {/* Tagline */}
                        <p
                            style={{
                                color: '#4A4760',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                lineHeight: 1.45,
                                marginBottom: '1.1rem',
                            }}
                        >
                            {gen.tagline}
                        </p>

                        {/* CTA */}
                        <motion.button
                            whileTap={{ scale: 0.93 }}
                            style={{
                                background: gen.border,
                                color: '#fff',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '0.65rem 1.4rem',
                                fontFamily: "'Nunito', sans-serif",
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                boxShadow: `0 4px 12px rgba(0,0,0,0.15)`,
                            }}
                        >
                            Play Now 🎯
                        </motion.button>
                    </motion.div>
                ))}
            </main>

            {/* Footer */}
            <footer style={{ textAlign: 'center', paddingBottom: '2rem', color: '#A09CB8', fontSize: '0.8rem' }}>
                Made with ❤️ for every desi kid's memories
            </footer>
        </div>
    );
}
