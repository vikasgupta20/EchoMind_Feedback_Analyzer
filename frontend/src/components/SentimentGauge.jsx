import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SentimentGauge({ score = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedScore / 100) * circumference;

  const getColor = (val) => {
    if (val >= 70) return '#10b981';
    if (val >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getLabel = (val) => {
    if (val >= 80) return 'Excellent';
    if (val >= 60) return 'Positive';
    if (val >= 40) return 'Neutral';
    if (val >= 20) return 'Negative';
    return 'Critical';
  };

  const color = getColor(animatedScore);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="var(--glass-border)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 1.5s ease-out, stroke 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={animatedScore}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold"
            style={{ color }}
          >
            {animatedScore}
          </motion.span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/100</span>
        </div>
      </div>
      <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: `${color}20`, color }}>
        {getLabel(animatedScore)}
      </span>
    </motion.div>
  );
}
