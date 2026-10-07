import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

// Shubham Rathod's resume data & portfolio details
const portfolioData = {
  personalInfo: {
    name: "Shubham Rathod",
    title: "Full-Stack Developer & Software Engineer",
    tagline:
      "Building resilient web applications, interactive creative frontends & high-performance REST APIs",
    location: "Nanded, Maharashtra",
    phone: "+91-9529581848",
    email: "rathodshubham7711@gmail.com",
    linkedin: "https://linkedin.com/in/shubham-rathod-tech",
    github: "https://github.com/git-shubham-side?tab=repositories",
    githubUsername: "git-shubham-side",
    education: {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "MGM College of Computer Science & IT, Nanded (SRTMUN)",
      duration: "2023 – 2026",
      cgpa: "8.32 / 10",
    },
    declaration:
      "I hereby declare that the information furnished above is true and correct to the best of my knowledge and belief.",
  },
  skills: {
    languages: [
      { name: "JavaScript", icon: "⚡", level: 90 },
      { name: "TypeScript", icon: "🔷", level: 85 },
      { name: "SQL", icon: "🗄️", level: 82 },
      { name: "HTML5", icon: "🌐", level: 95 },
      { name: "CSS3", icon: "🎨", level: 92 },
    ],
    frameworks: [
      { name: "React.js (React 19)", icon: "⚛️", level: 92 },
      { name: "Node.js", icon: "🟢", level: 90 },
      { name: "Express.js", icon: "🚂", level: 90 },
      { name: "Next.js", icon: "▲", level: 84 },
      { name: "Socket.IO", icon: "🔌", level: 80 },
      { name: "Tailwind CSS", icon: "🌊", level: 88 },
      { name: "EJS", icon: "📄", level: 85 },
    ],
    databases: [
      { name: "MongoDB (Mongoose)", icon: "🍃", level: 88 },
      { name: "MySQL", icon: "🐬", level: 82 },
    ],
    toolsAndConcepts: [
      { name: "Git & GitHub", icon: "🐙" },
      { name: "Docker", icon: "🐳" },
      { name: "REST API Design", icon: "🛠️" },
      { name: "Session / JWT Auth", icon: "🔐" },
      { name: "Google OAuth", icon: "🔑" },
      { name: "MVC Architecture", icon: "🏗️" },
      { name: "Cloudinary", icon: "☁️" },
      { name: "Socket Real-Time", icon: "⚡" },
    ],
  },
  projects: [
    {
      id: "woffy",
      title: "Woffy – Pet Healthcare Platform",
      badge: "Full-Stack Featured",
      tagline:
        "Comprehensive pet healthcare management with emergency collar QR and vaccination scheduling",
      tech: [
        "React 19 SPA",
        "Node.js",
        "Express",
        "MongoDB",
        "Cloudinary",
        "JWT",
        "Google OAuth",
      ],
      github: "https://github.com/git-shubham-side?tab=repositories",
      highlights: [
        "Built a full-stack platform with a React 19 SPA frontend and a Node/Express REST API backend (MongoDB, Cloudinary).",
        "Implemented emergency QR collar tags with a public scan page and 'Lost Pet' alert, plus an automated WSAVA vaccination schedule engine with email reminders.",
        "Added JWT + Google OAuth login, OTP/magic-link password reset, and an admin panel for hospital and marketplace moderation.",
      ],
      sticker: "🐶",
      color: "#FF6B6B",
    },
    {
      id: "page-pulse",
      title: "Page Pulse – Webpage Analyzer",
      badge: "Analyzer & Parser",
      tagline:
        "SEO & Webpage metadata extractor with separated controllers and live JSON REST API",
      tech: ["Node.js", "Express", "EJS", "Cheerio", "Axios", "Render"],
      github: "https://github.com/git-shubham-side?tab=repositories",
      live: "https://render.com",
      highlights: [
        "Built a web app and JSON REST API that extracts a page’s title, description, headings, links, and images.",
        "Separated controllers, added URL validation and robust error handling; successfully deployed on Render (internship task).",
      ],
      sticker: "🔍",
      color: "#4D96FF",
    },
    {
      id: "wanderlust",
      title: "WanderLust – Airbnb-Style Listing Platform",
      badge: "Travel & Hospitality",
      tagline:
        "Scalable rental property booking portal with reviews, ratings & MVC architecture",
      tech: ["MongoDB", "Express", "Node.js", "EJS", "Bootstrap"],
      github: "https://github.com/git-shubham-side?tab=repositories",
      highlights: [
        "Built a property listing and booking app with CRUD, user authentication and a review/rating system using MVC and RESTful routing.",
        "Designed Mongoose schemas for listings, users and reviews with relational references and defensive validations.",
      ],
      sticker: "🏖️",
      color: "#6BCB77",
    },
    {
      id: "petcare",
      title: "PetCare – Pet Booking Platform",
      badge: "Service Platform",
      tagline:
        "Secure pet care service platform with Cloudinary uploads & Nodemailer notifications",
      tech: [
        "MongoDB",
        "Express",
        "Node.js",
        "JWT",
        "OAuth",
        "Nodemailer",
        "Cloudinary",
      ],
      github: "https://github.com/git-shubham-side?tab=repositories",
      highlights: [
        "Developed a pet care service platform with JWT and Google OAuth authentication; integrated Cloudinary uploads and Nodemailer transactional emails.",
        "Designed and deployed a scalable backend handling user, pet and booking scheduling.",
      ],
      sticker: "🐾",
      color: "#FFD93D",
    },
    {
      id: "practiceapi",
      title: "PracticeAPI – Free REST API for Developers",
      badge: "Open Source Tool",
      tagline:
        "Public testing API with 20+ dynamic dummy data endpoints generated on-the-fly",
      tech: ["Node.js", "Express", "MongoDB", "Faker.js", "Railway"],
      github: "https://github.com/git-shubham-side?tab=repositories",
      highlights: [
        "Built and deployed (Railway) a public REST API with 20+ dummy data categories, auto-generated using Faker.js, for frontend and mobile dev practice.",
        "Includes filtering, pagination, search, and realistic mock relations.",
      ],
      sticker: "🚀",
      color: "#9D4EDD",
    },
    {
      id: "jobdeck",
      title: "JobDeck – Job Portal for Freshers & Pros",
      badge: "Career Platform",
      tagline:
        "Dual-dashboard hiring ecosystem with fast 1-click application workflows",
      tech: ["Node.js", "Express", "EJS", "Sessions", "Cloudinary"],
      github: "https://github.com/git-shubham-side?tab=repositories",
      highlights: [
        "Created separate dashboards for students and recruiters, with a few-click easy-apply option for jobs.",
        "Implemented session auth, role-based guard rails, and resume asset pipeline.",
      ],
      sticker: "💼",
      color: "#00B4D8",
    },
    {
      id: "noticeproject",
      title: "NoticeProject – Real-Time Campus Notice Board",
      badge: "Hackathon Winner Prototype",
      tagline:
        "Type-safe real-time instant broadcast board engineered in high-pressure hackathon",
      tech: ["Next.js", "TypeScript", "Socket.IO", "Node.js"],
      github: "https://github.com/git-shubham-side?tab=repositories",
      highlights: [
        "Built a type-safe real-time notice broadcasting prototype with Socket.IO in a team (Team Node Ninjas) within hackathon time limits.",
        "Instant pushes to connected student and faculty clients with zero polling lag.",
      ],
      sticker: "📢",
      color: "#FF9F43",
    },
  ],
  funFacts: [
    "🚀 Passionate about Clean Code, Event-driven systems & Reactive UX",
    "☕ Fueled by curiosity, Chai, and building end-to-end web apps",
    "🌟 Team Node Ninjas Hackathon builder",
    "🎧 Loving micro-interactions and auditory feedback in UI",
  ],
};

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Shubham Rathod Portfolio Backend is running smoothly 🚀",
    timestamp: new Date(),
  });
});

app.get("/api/profile", (req, res) => {
  res.json(portfolioData.personalInfo);
});

app.get("/api/skills", (req, res) => {
  res.json(portfolioData.skills);
});

app.get("/api/projects", (req, res) => {
  res.json(portfolioData.projects);
});

app.get("/api/all", (req, res) => {
  res.json(portfolioData);
});

// Contact endpoint simulation with feedback
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide name, email, and message.",
      });
  }
  console.log(
    `[Contact Received] From: ${name} (${email}) - Message: ${message}`,
  );
  return res.json({
    success: true,
    message: `Thank you ${name}! Shubham received your message and will reach out at ${email} shortly!`,
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio Backend Server is live on http://localhost:${PORT}`);
});
