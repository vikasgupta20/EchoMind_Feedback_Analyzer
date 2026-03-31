# 🚀 EchoMind AI - Deployment Guide

## ✅ What's Been Done for Security

1. **API Keys Protected**
   - Removed hardcoded API keys from `backend/utils/gemini.js`
   - Now uses environment variables only
   - Updated `.gitignore` to exclude `.env` files

2. **Configuration Files**
   - Created `backend/.env.example` showing required variables
   - Never commit actual `.env` files

3. **GitHub Security**
   - All sensitive data excluded from repository
   - Safe to share publicly

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Gemini API keys (get from https://aistudio.google.com/apikey)
- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] A deployment service account (if using managed hosting)

---

## 🔧 Local Setup (for testing)

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env and add your API keys:
# GEMINI_API_KEY_1=your_key_here
# GEMINI_API_KEY_2=your_backup_key_here
npm install
npm start  # Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

---

## 🌐 Deployment Options

### **Option 1: Vercel (Recommended for Full Stack)**

#### Backend Deployment
1. **Prepare Backend**
   ```bash
   # Ensure backend has a .env file with API keys
   # Add a vercelJson config
   ```

2. **Create `backend/vercel.json`**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ],
     "env": {
       "GEMINI_API_KEY_1": "@GEMINI_API_KEY_1",
       "GEMINI_API_KEY_2": "@GEMINI_API_KEY_2",
       "GEMINI_API_KEY_3": "@GEMINI_API_KEY_3"
     }
   }
   ```

3. **Deploy Backend**
   - Go to https://vercel.com
   - Connect GitHub: `vikasgupta20/EchoMind_Feedback_Analyzer`
   - Select `backend` folder as root
   - Add environment variables in Vercel dashboard
   - Deploy!

#### Frontend Deployment
1. **Create `backend/vite.config.js` update** (if not already done)
   ```javascript
   // Change API calls to use environment variable
   const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

2. **Create `.env.example` in frontend**
   ```
   VITE_API_URL=https://your-backend.vercel.app
   ```

3. **Deploy Frontend**
   - Go to Vercel
   - Create new project from the same repo
   - Select `frontend` folder as root
   - Add `VITE_API_URL` environment variable pointing to backend
   - Deploy!

---

### **Option 2: Railway.app (Simple & Powerful)**

#### Deploy Both Backend & Frontend
1. Go to https://railway.app
2. Create new project → Import from GitHub
3. Select your repo
4. Add services:
   - **Backend Service**
     - Root directory: `backend`
     - Start command: `npm install && npm start`
     - Add environment variables
   - **Frontend Service**
     - Root directory: `frontend`
     - Build command: `npm install && npm run build`
     - Start command: `npm run preview`

---

### **Option 3: Docker + Heroku / AWS / DigitalOcean**

#### Create `Dockerfile` for Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Create `Dockerfile` for Frontend
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### Deploy to Heroku
```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set GEMINI_API_KEY_1=your_key

# Deploy
git push heroku master
```

---

### **Option 4: Render.com (Zero Configuration)**

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. **For Backend:**
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `node server.js`
   - Add environment variables
5. **For Frontend:**
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Start command: `npm run preview`

---

### **Option 5: AWS (Full Control)**

#### EC2 Deployment
```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repo
git clone https://github.com/vikasgupta20/EchoMind_Feedback_Analyzer.git
cd EchoMind_Feedback_Analyzer

# Setup backend
cd backend
cp .env.example .env
# Edit .env with your credentials
npm install
npm start &

# Setup frontend (in another terminal)
cd ../frontend
npm install
npm run build
npm run preview
```

---

## 🔐 Environment Variables Setup

### For Any Deployment:

1. **Backend Variables**
   ```
   PORT=5000
   GEMINI_API_KEY_1=your_first_api_key
   GEMINI_API_KEY_2=your_second_api_key (optional)
   GEMINI_API_KEY_3=your_third_api_key (optional)
   FRONTEND_URL=https://your-frontend-url.com
   ```

2. **Frontend Variables**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

---

## 📊 Recommended Deployment Architecture

```
┌─────────────────────────────────────────────┐
│         Frontend (Vercel / Netlify)         │
│  React SPA - Static Files + Client Routing  │
└────────────────┬────────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────────┐
│    Backend (Vercel / Railway / Render)      │
│  Express.js - REST API + Gemini Integration │
└────────────────┬────────────────────────────┘
                 │ HTTPS
                 ▼
      Google Gemini API Cloud
```

---

## 🧪 Testing Before Deployment

```bash
# Backend test
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text":"This product is amazing!"}'

# Should return JSON with sentiment analysis
```

---

## 🐛 Common Issues & Solutions

### Issue: "API key not found"
**Solution:** Check `.env` file exists and has correct keys. Verify key is active on aistudio.google.com

### Issue: CORS errors on frontend
**Solution:** Update `FRONTEND_URL` in backend `.env` to match frontend domain

### Issue: 502 Bad Gateway
**Solution:** Check backend logs, ensure `PORT` environment variable is set

### Issue: Rate limiting from Gemini API
**Solution:** Add multiple API keys to `GEMINI_API_KEY_1`, `GEMINI_API_KEY_2`, etc.

---

## 📈 Scaling Tips

- **Add Redis caching** for duplicate feedback analyses
- **Implement request queuing** for high volume
- **Use database** (MongoDB) to persist analysis history instead of localStorage
- **Add CDN** for frontend static assets
- **Implement API rate limiting** on backend

---

## 🔗 Useful Links

- Gemini API: https://ai.google.dev
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Docker Docs: https://docs.docker.com

---

**Good luck with deployment! 🚀**
