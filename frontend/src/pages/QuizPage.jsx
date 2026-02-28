import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const eraLabels = {
    GenX: 'Gen X',
    GenY: 'Gen Y / Millennials',
    GenZ: 'Gen Z',
    GenAlpha: 'Gen Alpha',
};

const eraColors = {
    GenX: { border: '#FF6FB0', bg: 'linear-gradient(135deg,#FFD6E8,#FFE0B2)', accent: '#FF6FB0' },
    GenY: { border: '#2D9EE0', bg: 'linear-gradient(135deg,#C9E8FF,#E8D5FF)', accent: '#8B44E0' },
    GenZ: { border: '#2DBF73', bg: 'linear-gradient(135deg,#B8F0D0,#FFF3B0)', accent: '#2DBF73' },
    GenAlpha: { border: '#FF8A00', bg: 'linear-gradient(135deg,#FFE0B2,#B8F0D0)', accent: '#FF8A00' },
};

const TOTAL = 10;

export default function QuizPage() {
    const { era } = useParams();
    const navigate = useNavigate();
    const colors = eraColors[era] || eraColors.GenY;

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);   // option index user tapped
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    const audioRef = useRef(null);

    /* ── Fetch ── */
    useEffect(() => {
        setLoading(true);
        axios.get(`${API_BASE}/api/quiz/${era}`)
            .then(res => {
                // pick 10 randomly on client side too, in case server returns more
                const shuffled = res.data.sort(() => Math.random() - 0.5).slice(0, TOTAL);
                setQuestions(shuffled);
                setLoading(false);
            })
            .catch(() => {
                setError('Could not load questions. Please check your connection or try again.');
                setLoading(false);
            });
    }, [era]);

    /* ── Select option ── */
    const handleSelect = (idx) => {
        if (showFeedback) return;
        setSelected(idx);
        setShowFeedback(true);
        if (idx === questions[current].correctOption) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (current + 1 < questions.length) {
                setCurrent(c => c + 1);
                setSelected(null);
                setShowFeedback(false);
                if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
            } else {
                navigate('/result', { state: { score: score + (idx === questions[current].correctOption ? 1 : 0), era } });
            }
        }, 1200);
    };

    const progress = questions.length > 0 ? ((current) / TOTAL) * 100 : 0;
    const q = questions[current];

    /* ── Loading ── */
    if (loading) return (
        <div className="doodle-bg min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="spinner-ring" />
            <p style={{ color: '#8B44E0', fontWeight: 700, fontSize: '1.1rem' }}>Loading questions...</p>
        </div>
    );

    /* ── Error ── */
    if (error) return (
        <div className="doodle-bg min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
            <div style={{ fontSize: '3rem' }}>😕</div>
            <p style={{ color: '#FF6B6B', fontWeight: 700, fontSize: '1.1rem' }}>{error}</p>
            <button
                onClick={() => navigate('/')}
                style={{
                    background: '#8B44E0', color: '#fff', border: 'none', borderRadius: '12px',
                    padding: '0.75rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
                }}
            >
                ← Back to Home
            </button>
        </div>
    );

    if (!q) return null;

    return (
        <div className="doodle-bg min-h-screen pb-12">
            {/* ── Header bar ── */}
            <div
                style={{
                    background: colors.bg,
                    borderBottom: `3px solid ${colors.border}`,
                    padding: '1rem 1.25rem',
                }}
            >
                <div style={{ maxWidth: '680px', margin: '0 auto' }}>
                    {/* Back + Counter */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '8px',
                                padding: '0.35rem 0.8rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem',
                                color: '#4A4760',
                            }}
                        >
                            ← Home
                        </button>
                        <span style={{ fontWeight: 800, color: colors.accent, fontSize: '1rem' }}>
                            {current + 1} / {TOTAL}
                        </span>
                    </div>
                    {/* Progress bar */}
                    <div className="progress-track">
                        <motion.div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#6B6880', marginTop: '0.35rem', fontWeight: 600 }}>
                        {eraLabels[era] || era} Quiz
                    </p>
                </div>
            </div>

            {/* ── Question card ── */}
            <div style={{ maxWidth: '680px', margin: '0 auto', padding: '1.25rem 1rem' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.32 }}
                        style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
                            border: `2.5px solid ${colors.border}`,
                            marginBottom: '1rem',
                        }}
                    >
                        {/* Question type badge */}
                        <span
                            style={{
                                display: 'inline-block',
                                background: colors.bg,
                                border: `2px solid ${colors.border}`,
                                color: colors.accent,
                                borderRadius: '99px',
                                padding: '0.2rem 0.75rem',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                marginBottom: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            {q.type === 'text' ? '📝 Text' : q.type === 'image' ? '🖼 Image' : q.type === 'audio' ? '🎧 Audio' : '🎬 Video'} Question
                        </span>

                        {/* Audio media */}
                        {q.type === 'audio' && q.mediaUrl && (
                            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                <audio ref={audioRef} src={q.mediaUrl} preload="auto" />
                                <button
                                    className="audio-play-btn"
                                    onClick={() => {
                                        if (audioRef.current.paused) {
                                            audioRef.current.play();
                                        } else {
                                            audioRef.current.pause();
                                            audioRef.current.currentTime = 0;
                                        }
                                    }}
                                >
                                    🎧 Play Audio
                                </button>
                            </div>
                        )}

                        {/* Image media */}
                        {q.type === 'image' && q.mediaUrl && (
                            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                <img
                                    src={q.mediaUrl}
                                    alt="Question visual"
                                    style={{ maxHeight: '220px', maxWidth: '100%', borderRadius: '12px', objectFit: 'cover' }}
                                />
                            </div>
                        )}

                        {/* Video media */}
                        {q.type === 'video' && q.mediaUrl && (
                            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                <video
                                    src={q.mediaUrl}
                                    controls
                                    style={{ maxHeight: '220px', maxWidth: '100%', borderRadius: '12px' }}
                                />
                            </div>
                        )}

                        {/* Question text */}
                        <h2
                            style={{
                                fontFamily: "'Baloo 2', cursive",
                                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                                fontWeight: 700,
                                color: '#2D2A3E',
                                lineHeight: 1.5,
                            }}
                        >
                            {q.question}
                        </h2>
                    </motion.div>
                </AnimatePresence>

                {/* ── Options ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`opts-${current}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                    >
                        {q.options.map((opt, idx) => {
                            let btnClass = 'option-btn';
                            if (showFeedback) {
                                if (idx === q.correctOption) btnClass += ' correct';
                                else if (idx === selected) btnClass += ' wrong';
                            }
                            return (
                                <motion.button
                                    key={idx}
                                    className={btnClass}
                                    disabled={showFeedback}
                                    onClick={() => handleSelect(idx)}
                                    whileTap={!showFeedback ? { scale: 0.97 } : {}}
                                >
                                    <span
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                            width: '28px', height: '28px', borderRadius: '50%',
                                            background: colors.bg, border: `2px solid ${colors.border}`,
                                            fontSize: '0.8rem', fontWeight: 800, marginRight: '0.7rem', flexShrink: 0,
                                            color: colors.accent,
                                        }}
                                    >
                                        {['A', 'B', 'C', 'D'][idx]}
                                    </span>
                                    {opt}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
