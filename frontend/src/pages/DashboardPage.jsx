import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { analyzeFeedback } from '../utils/api';
import { sampleFeedback } from '../utils/sampleData';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import SkeletonLoader from '../components/SkeletonLoader';

export default function DashboardPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const lastClickRef = useRef(0);

  const { isListening, transcript, isSupported, startListening, stopListening } = useSpeechRecognition();

  // Append voice transcript
  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        setText(prev => (prev ? prev + '\n' + transcript : transcript));
        toast.success('Voice input added!');
      }
    } else {
      startListening();
      toast('🎤 Listening...', { duration: 2000 });
    }
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validExtensions = ['.txt', '.csv'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExtensions.includes(ext)) {
      toast.error('Please upload a .txt or .csv file');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target.result);
      toast.success(`File "${file.name}" loaded!`);
    };
    reader.readAsText(file);
  };

  // Load sample data
  const handleSampleData = () => {
    setText(sampleFeedback);
    setFileName('');
    toast.success('Sample feedback loaded!');
  };

  // Debounced analyze
  const handleAnalyze = useCallback(async () => {
    const now = Date.now();
    if (now - lastClickRef.current < 2000) return;
    lastClickRef.current = now;

    if (!text.trim()) {
      toast.error('Please enter some feedback to analyze');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeFeedback(text.trim());

      if (result.success) {
        // Save to history
        const history = JSON.parse(localStorage.getItem('echomind-history') || '[]');
        const entry = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          preview: text.trim().slice(0, 100) + '...',
          data: result.data,
        };
        history.unshift(entry);
        if (history.length > 20) history.pop();
        localStorage.setItem('echomind-history', JSON.stringify(history));

        // Cache current result
        localStorage.setItem('echomind-current-result', JSON.stringify(result.data));

        navigate('/results');
      } else {
        toast.error('Analysis failed. Please try again.');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to analyze. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, [text, navigate]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' }}>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
            </svg>
            <span className="font-medium">AI is analyzing your feedback...</span>
          </div>
        </motion.div>
        <SkeletonLoader />
      </div>
    );
  }

  // Word count
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Analyze <span className="gradient-text">Feedback</span>
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Paste your event feedback below, upload a file, or use voice input
          </p>
        </div>

        {/* Input Card */}
        <div className="glass-card p-6 mb-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button onClick={handleSampleData} className="btn-secondary text-xs flex items-center gap-1.5">
              <span>⚡</span> Use Sample Data
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary text-xs flex items-center gap-1.5"
            >
              <span>📁</span> Upload File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            {isSupported && (
              <button
                onClick={handleVoiceToggle}
                className={`btn-secondary text-xs flex items-center gap-1.5 ${isListening ? 'ring-2 ring-red-400' : ''}`}
                style={isListening ? { borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' } : {}}
              >
                <span>{isListening ? '⏹️' : '🎤'}</span> {isListening ? 'Stop Recording' : 'Voice Input'}
              </button>
            )}
            {fileName && (
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-green)' }}>
                📎 {fileName}
              </span>
            )}
          </div>

          {/* Textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your event feedback here... Each piece of feedback can be on a new line or separated by quotes."
            className="input-field resize-none"
            rows={12}
            maxLength={5000}
            style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}
          />

          {/* Stats bar */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span>{wordCount} words</span>
              <span>{charCount}/5000 chars</span>
            </div>
            {text.trim() && (
              <button
                onClick={() => { setText(''); setFileName(''); }}
                className="text-xs hover:underline cursor-pointer"
                style={{ color: 'var(--text-muted)', background: 'none', border: 'none' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Preview */}
        {text.trim() && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-card p-4 mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>📋 Preview</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' }}>
                {text.trim().split(/\n/).filter(l => l.trim()).length} entries detected
              </span>
            </div>
            <div className="text-xs space-y-1 max-h-32 overflow-y-auto" style={{ color: 'var(--text-muted)' }}>
              {text.trim().split(/\n/).filter(l => l.trim()).slice(0, 5).map((line, i) => (
                <div key={i} className="truncate">• {line.trim().replace(/^["']|["']$/g, '')}</div>
              ))}
              {text.trim().split(/\n/).filter(l => l.trim()).length > 5 && (
                <div className="italic">...and {text.trim().split(/\n/).filter(l => l.trim()).length - 5} more</div>
              )}
            </div>
          </motion.div>
        )}

        {/* Analyze Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
        >
          <span>🧠</span> Analyze with AI
        </motion.button>
      </motion.div>
    </div>
  );
}
