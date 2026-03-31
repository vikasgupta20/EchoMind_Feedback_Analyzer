import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import SentimentGauge from '../components/SentimentGauge';
import KeywordCloud from '../components/KeywordCloud';
import InsightCard from '../components/InsightCard';

export default function ResultsPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const resultsRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('echomind-current-result');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  if (!data) return null;

  const positiveCount = data.positives?.length || 0;
  const negativeCount = data.complaints?.length || 0;
  const total = positiveCount + negativeCount || 1;
  const positivePercent = Math.round((positiveCount / total) * 100);
  const negativePercent = 100 - positivePercent;

  const pieData = [
    { name: 'Positive', value: positivePercent, color: '#10b981' },
    { name: 'Negative', value: negativePercent, color: '#ef4444' },
  ];

  const barData = [
    { name: 'Praises', count: positiveCount, fill: '#10b981' },
    { name: 'Complaints', count: negativeCount, fill: '#ef4444' },
    { name: 'Improvements', count: data.improvements?.length || 0, fill: '#f59e0b' },
    { name: 'Themes', count: data.themes?.length || 0, fill: '#8b5cf6' },
  ];

  // Copy insights as text
  const handleCopyInsights = () => {
    const text = `EchoMind AI Analysis Report
━━━━━━━━━━━━━━━━━━━━━━━━

📊 Summary: ${data.summary}
📈 Sentiment Score: ${data.sentiment}/100

🔍 Key Themes: ${data.themes?.join(', ')}

⚠️ Top Complaints:
${data.complaints?.map(c => `  • ${c}`).join('\n')}

💡 Improvements:
${data.improvements?.map(i => `  • ${i}`).join('\n')}

❤️ Positive Highlights:
${data.positives?.map(p => `  • ${p}`).join('\n')}

☁️ Keywords: ${data.keywords?.join(', ')}`;

    navigator.clipboard.writeText(text);
    toast.success('Insights copied to clipboard!');
  };

  // Export as PDF
  const handleExportPDF = async () => {
    toast.loading('Generating PDF...', { id: 'pdf' });
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const element = resultsRef.current;
      const canvas = await html2canvas(element, {
        backgroundColor: '#0a0a0f',
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('echomind-analysis.pdf');
      toast.success('PDF exported!', { id: 'pdf' });
    } catch {
      toast.error('Failed to export PDF', { id: 'pdf' });
    }
  };

  // Critical issue (first complaint)
  const criticalIssue = data.complaints?.[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <Link
          to="/dashboard"
          className="btn-secondary text-sm flex items-center gap-2 no-underline"
          style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          New Analysis
        </Link>
        <div className="flex gap-2">
          <button onClick={handleCopyInsights} className="btn-secondary text-sm flex items-center gap-1.5">
            📌 Copy Insights
          </button>
          <button onClick={handleExportPDF} className="btn-secondary text-sm flex items-center gap-1.5">
            📥 Export PDF
          </button>
        </div>
      </div>

      <div ref={resultsRef}>
        {/* AI Summary Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4" style={{ background: 'rgba(139, 92, 246, 0.12)', color: 'var(--accent-purple)' }}>
            🧠 AI Insight
          </span>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
            {data.summary}
          </h1>
        </motion.div>

        {/* Critical Issue Banner */}
        {criticalIssue && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4 mb-8 flex items-start gap-3"
            style={{ borderLeft: '4px solid #ef4444' }}
          >
            <span className="text-xl">🎯</span>
            <div>
              <h4 className="font-semibold text-sm mb-1" style={{ color: '#ef4444' }}>Most Critical Issue</h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{criticalIssue}</p>
            </div>
          </motion.div>
        )}

        {/* Sentiment + Mini Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Sentiment Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6 flex flex-col items-center justify-center"
          >
            <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>Sentiment Score</h3>
            <SentimentGauge score={data.sentiment} />
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-medium mb-4 text-center" style={{ color: 'var(--text-secondary)' }}>Sentiment Breakdown</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  formatter={(value) => [`${value}%`]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> {positivePercent}% Positive</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> {negativePercent}% Negative</span>
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-6"
          >
            <h3 className="text-sm font-medium mb-4 text-center" style={{ color: 'var(--text-secondary)' }}>Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Keyword Cloud */}
        <InsightCard icon="☁️" title="Keyword Cloud" color="#3b82f6" delay={0.3}>
          <KeywordCloud keywords={data.keywords} />
        </InsightCard>

        {/* Insight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Themes */}
          <InsightCard icon="🔍" title="Key Themes" color="#8b5cf6" delay={0.35}>
            <div className="flex flex-wrap gap-2">
              {data.themes?.map((theme, i) => (
                <span key={i} className="tag">{theme}</span>
              ))}
            </div>
          </InsightCard>

          {/* Complaints */}
          <InsightCard icon="⚠️" title="Top Complaints" color="#ef4444" delay={0.4}>
            <ul className="space-y-2">
              {data.complaints?.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-red-400">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </InsightCard>

          {/* Improvements */}
          <InsightCard icon="💡" title="Actionable Improvements" color="#f59e0b" delay={0.45}>
            <ul className="space-y-2">
              {data.improvements?.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-amber-400">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </InsightCard>

          {/* Positives */}
          <InsightCard icon="❤️" title="Positive Highlights" color="#10b981" delay={0.5}>
            <ul className="space-y-2">
              {data.positives?.map((pos, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>{pos}</span>
                </li>
              ))}
            </ul>
          </InsightCard>
        </div>
      </div>
    </div>
  );
}
