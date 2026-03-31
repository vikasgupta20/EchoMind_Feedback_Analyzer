import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: '🧠', title: 'AI-Powered Analysis', desc: 'Deep semantic analysis of feedback using Google Gemini AI' },
  { icon: '📊', title: 'Visual Insights', desc: 'Beautiful charts, gauges, and keyword clouds at a glance' },
  { icon: '⚡', title: 'Instant Results', desc: 'Get structured insights in seconds, not hours' },
  { icon: '📥', title: 'Export & Share', desc: 'Download PDF reports or copy insights instantly' },
  { icon: '🎤', title: 'Voice Input', desc: 'Speak your feedback directly using voice recognition' },
  { icon: '🕓', title: 'History Tracking', desc: 'Access all your previous analyses anytime' },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="animated-gradient-bg relative overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'var(--accent-purple)', top: '-10%', right: '-5%' }} />
          <div className="absolute w-72 h-72 rounded-full opacity-15 blur-3xl" style={{ background: 'var(--accent-blue)', bottom: '10%', left: '-5%' }} />
          <div className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'var(--accent-pink)', top: '40%', right: '20%' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', border: '1px solid rgba(139, 92, 246, 0.25)' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI-Powered Feedback Intelligence
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Turn Raw Feedback Into{' '}
              <span className="gradient-text">Clear Decisions</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Stop spending hours reading feedback manually. EchoMind AI converts unstructured event feedback 
              into deep, structured, visual insights — in seconds.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to={isAuthenticated ? '/dashboard' : '/signup'}
                className="btn-primary text-base px-8 py-3.5 no-underline inline-flex items-center justify-center gap-2"
                style={{ textDecoration: 'none' }}
              >
                Start Analyzing
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to={isAuthenticated ? '/dashboard' : '/login'}
                className="btn-secondary text-base px-8 py-3.5 no-underline inline-flex items-center justify-center"
                style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Understand Feedback</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="text-lg max-w-2xl mx-auto">
              From raw text to actionable insights, EchoMind handles it all.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-6"
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <div className="glass-card p-10 md:p-14" style={{ borderImage: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue)) 1', borderImageSlice: 1, border: '1px solid' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Feedback?</h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              Join thousands of event organizers who save hours every week.
            </p>
            <Link
              to={isAuthenticated ? '/dashboard' : '/signup'}
              className="btn-primary text-base px-10 py-4 no-underline inline-flex items-center gap-2"
              style={{ textDecoration: 'none' }}
            >
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2024 EchoMind AI — Feedback Intelligence Engine. Built with ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
