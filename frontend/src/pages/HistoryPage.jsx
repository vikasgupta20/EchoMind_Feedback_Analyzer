import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('echomind-history') || '[]');
    setHistory(stored);
  }, []);

  const handleView = (entry) => {
    localStorage.setItem('echomind-current-result', JSON.stringify(entry.data));
    navigate('/results');
  };

  const handleDelete = (id) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('echomind-history', JSON.stringify(updated));
    toast.success('Analysis deleted');
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.setItem('echomind-history', '[]');
    toast.success('History cleared');
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getSentimentColor = (score) => {
    if (score >= 70) return '#10b981';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Analysis <span className="gradient-text">History</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {history.length} {history.length === 1 ? 'analysis' : 'analyses'} stored
            </p>
          </div>
          {history.length > 0 && (
            <button onClick={handleClearAll} className="btn-secondary text-sm" style={{ color: '#ef4444' }}>
              Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <span className="text-5xl mb-4 block">📭</span>
            <h3 className="text-lg font-semibold mb-2">No Analyses Yet</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              Your analysis history will appear here
            </p>
            <button onClick={() => navigate('/dashboard')} className="btn-primary">
              Start Analyzing
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {history.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-5 cursor-pointer group"
                  onClick={() => handleView(entry)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: `${getSentimentColor(entry.data.sentiment)}20`, color: getSentimentColor(entry.data.sentiment) }}
                        >
                          {entry.data.sentiment}/100
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {formatDate(entry.date)}
                        </span>
                      </div>
                      <h3 className="font-medium text-sm mb-1 truncate" style={{ color: 'var(--text-primary)' }}>
                        {entry.data.summary}
                      </h3>
                      <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                        {entry.preview}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }}
                        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', cursor: 'pointer' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                      <svg className="opacity-30 group-hover:opacity-60 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}
