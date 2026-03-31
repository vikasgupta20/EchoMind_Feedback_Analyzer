import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Navbar */}
      <nav className="glass-card sticky top-0 z-50" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' }}>
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Echo<span className="gradient-text">Mind</span>
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                )}
              </button>

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className="btn-secondary text-sm no-underline hidden sm:inline-flex"
                    style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/history"
                    className="btn-secondary text-sm no-underline hidden sm:inline-flex"
                    style={{ textDecoration: 'none', color: 'var(--text-primary)' }}
                  >
                    History
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))' }}>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <button onClick={handleLogout} className="btn-secondary text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Logout
                    </button>
                  </div>
                </>
              )}

              {!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup' && (
                <Link to="/login" className="btn-primary text-sm no-underline" style={{ textDecoration: 'none' }}>
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-1"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
