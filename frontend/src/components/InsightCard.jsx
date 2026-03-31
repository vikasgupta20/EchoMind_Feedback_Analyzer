import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InsightCard({ icon, title, children, color = 'var(--accent-purple)', defaultExpanded = true, delay = 0 }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card overflow-hidden"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
        style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        </div>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5" style={{ color: 'var(--text-secondary)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
