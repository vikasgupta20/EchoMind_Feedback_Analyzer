import { motion } from 'framer-motion';

const colorPalettes = [
  'rgba(139, 92, 246, 0.15)',
  'rgba(59, 130, 246, 0.15)',
  'rgba(236, 72, 153, 0.15)',
  'rgba(16, 185, 129, 0.15)',
  'rgba(245, 158, 11, 0.15)',
  'rgba(99, 102, 241, 0.15)',
];

const textColors = [
  '#8b5cf6', '#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#6366f1',
];

export default function KeywordCloud({ keywords = [] }) {
  if (!keywords.length) return null;

  const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg'];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {keywords.map((keyword, i) => (
        <motion.span
          key={keyword}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          className={`${sizes[Math.floor(Math.random() * sizes.length)]} font-medium px-3 py-1.5 rounded-lg cursor-default`}
          style={{
            background: colorPalettes[i % colorPalettes.length],
            color: textColors[i % textColors.length],
            border: `1px solid ${textColors[i % textColors.length]}30`,
          }}
        >
          {keyword}
        </motion.span>
      ))}
    </div>
  );
}
