# ✨ Shubham Rathod - Full-Stack Portfolio

Professional, joyful, interactive portfolio application built with **React (Frontend)** and **Node.js Express (Backend)**, featuring an animated interactive canvas, bouncy sticker badges with Web Audio API sound effects, and confetti celebrations.

---

## 📁 Project Architecture

```
React Portfolio/
├── backend/                  # Node.js + Express API
│   ├── package.json
│   └── server.js             # Resume endpoints, Projects API, Contact form handler
│
├── frontend/                 # React 19 + Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedCanvas.jsx   # Interactive canvas with particles, glow & floating stickers
│   │   │   ├── JoyfulSticker.jsx    # Bouncy interactive stickers with sound & confetti
│   │   │   └── Icons.jsx            # GitHub & LinkedIn SVGs
│   │   ├── utils/
│   │   │   └── sound.js             # Web Audio API Synthesizer (pops, boings, sparkles, fanfare)
│   │   ├── App.jsx                  # Main responsive UI with all Resume details & GitHub links
│   │   ├── index.css                # Custom glassmorphism, animations & styles
│   │   └── main.jsx
│   └── package.json
```

---

## 🚀 How to Run

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
# Server will start on http://localhost:5000
```

### 2. Start Frontend App
```bash
cd frontend
npm install
npm run dev
# Frontend will start on http://127.0.0.1:5173
```

---

## 🎨 Features & Highlights

1. **Animated Joyful Canvas Background (`AnimatedCanvas.jsx`)**:
   - Interactive mouse glow aura and repulsion physics
   - Constellation connecting lines
   - Floating joyful animated emoji stickers (`✨`, `🚀`, `💻`, `⚡`, `🎨`, `🔥`)

2. **Web Audio API Sound Effects (`sound.js`)**:
   - Zero external audio files required (synthesized dynamically using Web Audio oscillators)
   - Pop, Boing, Sparkle, Hover, and Success fanfare sounds
   - Dedicated floating mute/unmute control button

3. **Joyful Sticker Badges (`JoyfulSticker.jsx`)**:
   - Bouncy jiggle animations on click with localized mini-confetti burst
   - Shimmer glare reflections

4. **Detailed Resume Integration**:
   - **Personal Info**: Shubham Rathod, Nanded, Maharashtra, Phone & Email
   - **Education**: MGM College of Computer Science & IT (BCA, CGPA: 8.32/10)
   - **Technical Skills**: JavaScript, TypeScript, SQL, HTML5, CSS3, React 19, Node.js, Express, Next.js, Socket.IO, Tailwind CSS, EJS, MongoDB, MySQL, Docker, OAuth, JWT, MVC
   - **Projects**:
     - 🐶 *Woffy* – Pet Healthcare Platform
     - 🔍 *Page Pulse* – Webpage Analyzer
     - 🏖️ *WanderLust* – Airbnb-Style Listing Platform
     - 🐾 *PetCare* – Pet Booking Platform
     - 🚀 *PracticeAPI* – Free REST API for Developers
     - 💼 *JobDeck* – Job Portal for Freshers & Professionals
     - 📢 *NoticeProject* – Real-Time Campus Notice Board (Team Node Ninjas)
   - **Direct GitHub Repositories Link**: [github.com/git-shubham-side](https://github.com/git-shubham-side?tab=repositories)
   - **Interactive Contact Form**: Sends messages directly to the Express backend
"# Shubham-Rathod" 
