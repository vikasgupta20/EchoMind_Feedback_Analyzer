# 🧠 EchoMind AI - Feedback Intelligence Engine

[![GitHub](https://img.shields.io/badge/GitHub-vikasgupta20/EchoMind_Feedback_Analyzer-blue?logo=github)](https://github.com/vikasgupta20/EchoMind_Feedback_Analyzer)
[![License](https://img.shields.io/badge/License-MIT-green)]()
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19+-blue)](https://react.dev/)

An intelligent feedback analysis platform powered by Google's Gemini AI. Analyze customer feedback, extract sentiment, themes, complaints, and actionable insights with ease.

## ✨ Features

- 🎤 **Multi-Input Support**: Text, voice, and file uploads (.txt, .csv)
- 🧠 **AI-Powered Analysis**: Leverages Google Gemini 2.0-Flash for intelligent insights
- 📊 **Rich Visualizations**: Sentiment gauges, pie charts, bar graphs, and keyword clouds
- 🎨 **Modern UI**: Responsive design with Tailwind CSS, dark/light theme support
- 🔐 **Secure Authentication**: User signup/login with localStorage persistence
- 💾 **Analysis History**: Store and revisit past analyses (up to 20)
- 📄 **Export Options**: Download results as PDF or copy as formatted text
- 🔄 **API Key Rotation**: Automatic fallback with multiple API keys for reliability
- 📱 **Fully Responsive**: Mobile, tablet, and desktop optimized
- 🌓 **Dark/Light Mode**: Eye-friendly theme toggle

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Gemini API key (get free from [aistudio.google.com](https://aistudio.google.com/apikey))

### Local Development

#### 1. Clone the Project
```bash
git clone https://github.com/vikasgupta20/EchoMind_Feedback_Analyzer.git
cd EchoMind_Feedback_Analyzer
```

#### 2. Setup Backend
```bash
cd backend

# Create .env file from example
cp .env.example .env

# Add your Gemini API keys to .env:
# GEMINI_API_KEY_1=your_api_key_here
# GEMINI_API_KEY_2=your_backup_key_here (optional)

npm install
npm start
# Backend runs on http://localhost:5000
```

#### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

Visit `http://localhost:5173` in your browser. Done! 🎉

## 📁 Project Structure

```
EchoMind_Feedback_Analyzer/
├── backend/                      # Express.js server
│   ├── server.js                # Main server file
│   ├── controllers/
│   │   └── analyzeController.js # Feedback analysis logic
│   ├── routes/
│   │   └── analyze.js           # API routes
│   ├── utils/
│   │   └── gemini.js            # Gemini API integration
│   ├── .env.example             # Environment variables template
│   └── package.json
│
├── frontend/                     # React Vite App
│   ├── src/
│   │   ├── pages/              # Route pages
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # Auth & Theme contexts
│   │   ├── hooks/              # Custom hooks (speech recognition)
│   │   ├── utils/              # API client & sample data
│   │   ├── App.jsx             # Main app router
│   │   └── main.jsx            # Entry point
│   ├── .env.example            # Environment variables template
│   └── package.json
│
├── DEPLOYMENT.md               # Detailed deployment guide
└── README.md                   # This file
```

## 🔐 Security Features

✅ **API Keys Protected**
- All sensitive credentials stored in `.env` files (never committed)
- `.gitignore` configured to exclude sensitive files
- Multiple API keys supported for automatic rotation

✅ **Secure by Default**
- No hardcoded secrets in code
- Environment variables for all sensitive config
- CORS enabled for controlled access

## 🌐 Deployment

### Quick Deploy Options

**Easiest:** [Vercel](https://vercel.com) + [Render.com](https://render.com)
```bash
# 1. Connect GitHub repo to Vercel (frontend) and Render (backend)
# 2. Add environment variables in each service
# 3. Deploy!
```

**Full Documentation:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

Supported platforms:
- ✅ Vercel (Frontend + Backend)
- ✅ Railway.app (Full Stack)
- ✅ Render.com (Full Stack)
- ✅ Heroku + Docker
- ✅ AWS EC2
- ✅ DigitalOcean
- ✅ Any Node.js hosting

## 📊 How It Works

1. **Input Feedback**: Users submit text, voice, or file data
2. **AI Processing**: Feedback sent to Gemini API for analysis
3. **Analysis Results**: 
   - **Sentiment Score** (0-100)
   - **Key Themes** (main topics)
   - **Complaints** (issues identified)
   - **Improvements** (suggested fixes)
   - **Positives** (praised aspects)
   - **Keywords** (word cloud)
4. **Visualization**: Results displayed in interactive charts and cards
5. **Storage**: Analyses saved to browser history and can be exported

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **Google Generative AI** - Gemini API integration
- **Node.js** - Runtime
- **dotenv** - Configuration management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications

## 📱 Pages

- **Landing Page** (`/`) - Public homepage with features showcase
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - User registration
- **Dashboard** (`/dashboard`) - Main feedback input interface
- **Results** (`/results`) - Analysis visualization and export
- **History** (`/history`) - Past analyses library

## 🎯 API Endpoints

### POST `/api/analyze`
Analyze feedback and return AI insights

**Request:**
```json
{
  "text": "The conference was great but WiFi was terrible"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "Mixed feedback with strong content but infrastructure issues",
    "sentiment": 65,
    "themes": ["venue", "content quality"],
    "complaints": ["WiFi issues"],
    "improvements": ["Upgrade WiFi infrastructure"],
    "positives": ["Great conference content"],
    "keywords": ["wifi", "conference", "quality"]
  }
}
```

## 🔄 Environment Variables

### Backend (.env)
```
PORT=5000
GEMINI_API_KEY_1=your_api_key_1
GEMINI_API_KEY_2=your_api_key_2
GEMINI_API_KEY_3=your_api_key_3
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000
```

## 📖 Usage Examples

### Analyze Event Feedback
```
Input: "The keynote was inspiring but the venue was too crowded"
Output:
- Sentiment: 72/100
- Themes: Event Organization, Venue Management
- Positives: Inspiring keynote
- Complaints: Overcrowded venue
```

### Analyze Product Review
```
Input: "Love the design, but battery life is disappointing"
Output:
- Sentiment: 60/100
- Positives: Great design
- Complaints: Poor battery life
- Improvements: Optimize power consumption
```

## 🚀 Performance Tips

- **Caching**: Feedback analyses are cached to reduce API calls
- **Rate Limiting**: Automatic API key rotation handles rate limits
- **Debouncing**: Analysis button has 2-second debounce
- **Fallback Mode**: Demo mode if APIs are unavailable

## 🐛 Troubleshooting

### API Key Not Working
1. Verify key is active at [aistudio.google.com](https://aistudio.google.com)
2. Check `.env` file has correct format
3. Ensure no extra spaces in `.env`

### CORS Errors
1. Update `FRONTEND_URL` in backend `.env`
2. Check both services are running
3. Verify API URL in frontend `.env.local`

### Analysis Taking Too Long
1. Check internet connection
2. Verify API key has quota
3. Try with another API key

## 📈 Roadmap

- [ ] Database integration (MongoDB)
- [ ] Advanced filtering & search
- [ ] Team collaboration features
- [ ] Bulk analysis uploads
- [ ] Custom AI prompts
- [ ] API webhooks
- [ ] Sentiment trend graphs
- [ ] Integration with CRM tools

## 🤝 Contributing

Contributions welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Vikas Gupta**
- GitHub: [@vikasgupta20](https://github.com/vikasgupta20)
- Repository: [EchoMind_Feedback_Analyzer](https://github.com/vikasgupta20/EchoMind_Feedback_Analyzer)

## 🙏 Acknowledgments

- Built with [Google Gemini API](https://ai.google.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Charts by [Recharts](https://recharts.org)
- Powered by [Vite](https://vitejs.dev) & [React](https://react.dev)

## 📞 Support

For issues, questions, or suggestions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
2. Open an [issue on GitHub](https://github.com/vikasgupta20/EchoMind_Feedback_Analyzer/issues)
3. Review code comments for implementation details

---

**Happy feedback analyzing! 🧠✨**

**[Deploy Now →](./DEPLOYMENT.md)**
