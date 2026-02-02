# 🎮 Retro Quiz Time

A fun, nostalgic MERN stack quiz application that takes users on a trip down memory lane! Test your knowledge of different eras from the 80s to Gen Z with interactive quizzes featuring retro-themed UI.

![Retro Quiz Time](https://img.shields.io/badge/MERN-Stack-green) ![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🎨 **Retro 80s-90s Aesthetic**: Neon colors, pixel fonts, animated grid backgrounds, and scanline effects
- 🎯 **Era-Based Quizzes**: Choose from 80s, 90s, Millennials, or Gen Z
- 📊 **Smart Randomization**: Get 10 random questions from MongoDB for each quiz
- 💾 **Local Score Tracking**: Scores saved in localStorage
- 🎉 **Confetti Celebration**: Animated confetti for high scores (7+/10)
- ⚙️ **Full Admin Panel**: Add, edit, and delete quiz questions with ease
- 📱 **Fully Responsive**: Works beautifully on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**: RESTful API server
- **MongoDB** + **Mongoose**: Database and ORM
- **CORS**: Cross-origin resource sharing
- **Nodemon**: Development auto-reload

### Frontend
- **React 18**: Component-based UI
- **Vite**: Lightning-fast build tool
- **React Router**: Client-side routing
- **Axios**: HTTP requests
- **Canvas Confetti**: Celebration animations

## 📂 Project Structure

```
Retro_QUIZ_App/
├─ backend/
│  ├─ config/
│  │  └─ db.js              # MongoDB connection
│  ├─ models/
│  │  └─ Quiz.js            # Quiz schema
│  ├─ routes/
│  │  └─ quizRoutes.js      # API endpoints
│  ├─ server.js             # Express server
│  └─ seed.js               # Database seeding script
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  └─ QuizCard.jsx    # Question card component
│  │  ├─ pages/
│  │  │  ├─ LandingPage.jsx # Era selection
│  │  │  ├─ QuizPage.jsx    # Quiz interface
│  │  │  ├─ ScorePage.jsx   # Results page
│  │  │  └─ AdminPage.jsx   # CRUD admin panel
│  │  ├─ App.jsx            # Main app router
│  │  └─ index.css          # Retro design system
│  └─ package.json
├─ .env                     # Environment variables
└─ package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running on `localhost:27017`
- npm or yarn package manager

### Installation

1. **Clone the repository** (or navigate to your project folder):
```bash
cd E:\WEB_DEV\Retro_QUIZ_App
```

2. **Install backend dependencies**:
```bash
npm install
```

3. **Install frontend dependencies**:
```bash
cd frontend
npm install
cd ..
```

4. **Set up environment variables**:
The `.env` file is already created with:
```
MONGODB_URI=mongodb://localhost:27017/retro-quiz
PORT=5000
```

5. **Start MongoDB**:
Make sure MongoDB is running on your system.

6. **Seed the database** with sample questions:
```bash
npm run seed
```

You should see:
```
✅ MongoDB Connected Successfully
🗑️  Cleared existing questions
✨ Added 48 sample questions

📊 Questions per era:
   80s: 12 questions
   90s: 12 questions
   Millennials: 12 questions
   GenZ: 12 questions

✅ Database seeded successfully!
```

### Running the Application

**Terminal 1 - Start Backend Server**:
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Start Frontend Dev Server**:
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 🎮 How to Use

### For Users

1. **Landing Page**: Choose your generation/era (80s, 90s, Millennials, GenZ)
2. **Quiz Page**: Answer 10 random multiple-choice questions
   - Click an answer to select it
   - See immediate feedback (correct answers glow green, incorrect ones show red)
   - Track your progress with the animated progress bar
3. **Score Page**: View your final score with fun messages
   - Perfect score (10/10): "🏆 Retro Master!"
   - High score (7-9): "🌟 Nostalgia Expert!" + Confetti animation
   - Good score (5-6): "👍 Getting There!"
   - Low score (0-4): "📚 Need More Nostalgia!"
4. **Replay**: Try the same era again or choose a different one

### For Admins

1. Navigate to `/admin` or click "⚙️ Admin Panel" on the landing page
2. **Add Questions**: Fill in the form with era, question, 4 options, and correct answer
3. **Edit Questions**: Click the "✏️ Edit" button on any question
4. **Delete Questions**: Click "🗑️ Delete" to remove a question
5. All questions are displayed with their correct answers highlighted

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quiz/:era` | Get 10 random questions for an era |
| GET | `/api/quiz` | Get all questions (admin) |
| POST | `/api/quiz` | Add a new question |
| PUT | `/api/quiz/:id` | Update a question by ID |
| DELETE | `/api/quiz/:id` | Delete a question by ID |

## 🎨 Design Features

- **Pixel Fonts**: Press Start 2P, VT323, Orbitron
- **Neon Color Palette**: Pink (#ff006e), Blue (#00d4ff), Purple (#b967ff), Green (#05ffa1)
- **Animated Background**: Scrolling grid and floating stars
- **Scanline Effect**: Retro CRT monitor aesthetic
- **Glow Effects**: Text shadows and box shadows for neon glow
- **Smooth Animations**: Card entrances, hover effects, confetti

## 📦 Sample Questions Included

The database is pre-seeded with **48 nostalgic questions**:
- **80s**: Walkmans, Pac-Man, Rubik's Cube, MTV, Michael Jackson
- **90s**: Tamagotchis, Rugrats, Backstreet Boys, Friends, Netscape
- **Millennials**: Facebook, Minecraft, Twilight, Breaking Bad, Harry Potter, iPhone
- **GenZ**: TikTok, Fortnite, Among Us, Billie Eilish, "no cap" slang

## 🚢 Deployment Ready

This project is ready to deploy on:
- **Backend**: Render, Railway, Heroku
- **Frontend**: Vercel, Netlify
- **Database**: MongoDB Atlas

## 📝 License

MIT License - Feel free to use this for your portfolio!

## 🌟 Why This Project Rocks

✅ **Full MERN Stack** showcase  
✅ **CRUD Operations** with REST API  
✅ **State Management** in React  
✅ **Local Storage** integration  
✅ **Random Selection** algorithm  
✅ **Responsive Design**  
✅ **Stunning UI/UX** with animations  
✅ **Ready for interviews** and portfolio  

---

Made with 💜 and lots of nostalgia!
