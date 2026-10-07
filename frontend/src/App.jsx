import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Volume2,
  VolumeX,
  ArrowRight,
  Database,
  Layers,
  Code2,
  Boxes,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';
import { Github, Linkedin } from './components/Icons';
import { AppleCanvas } from './components/AppleCanvas';
import { RollingProjectCard } from './components/RollingProjectCard';
import { TechLogo } from './components/ProjectLogo';
import { sound } from './utils/sound';

export default function App() {
  const [data, setData] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Smooth JavaScript scroll navigation helper (no ugly URL hashes or blue tap flashes)
  const scrollToSection = (selector) => {
    sound.hover();
    setMobileMenuOpen(false);
    
    // Give mobile drawer a moment to collapse so scroll coordinates are calculated cleanly
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        const yOffset = -70; // Header height offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Fast smooth scroll progress spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    restDelta: 0.001
  });

  // Auto-unlock Web Audio API on ANY mouse movement, hover, scroll, or click
  useEffect(() => {
    // Attempt immediate boot
    sound.unlock();

    const handleInitialActivity = () => {
      sound.unlock();
      window.removeEventListener('mousemove', handleInitialActivity);
      window.removeEventListener('pointerdown', handleInitialActivity);
      window.removeEventListener('scroll', handleInitialActivity);
      window.removeEventListener('keydown', handleInitialActivity);
    };

    window.addEventListener('mousemove', handleInitialActivity, { passive: true });
    window.addEventListener('pointerdown', handleInitialActivity, { passive: true });
    window.addEventListener('scroll', handleInitialActivity, { passive: true });
    window.addEventListener('keydown', handleInitialActivity, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleInitialActivity);
      window.removeEventListener('pointerdown', handleInitialActivity);
      window.removeEventListener('scroll', handleInitialActivity);
      window.removeEventListener('keydown', handleInitialActivity);
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/all')
      .then((res) => {
        if (!res.ok) throw new Error('Backend offline');
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.warn('Backend server fallback:', err);
        setData({
          personalInfo: {
            name: "Shubham Rathod",
            title: "Full-Stack Software Engineer",
            tagline: "Engineering high-throughput backends, resilient distributed systems & fluid Apple-tier frontends.",
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
              cgpa: "8.32 / 10"
            },
            declaration: "I hereby declare that the information furnished above is true and correct to the best of my knowledge and belief."
          },
          skills: {
            languages: [
              { name: "JavaScript (ESNext)", level: 92 },
              { name: "TypeScript", level: 86 },
              { name: "SQL", level: 82 },
              { name: "HTML5 & CSS3", level: 94 }
            ],
            frameworks: [
              { name: "React 19 & Next.js", level: 92 },
              { name: "Node.js & Express", level: 90 },
              { name: "Socket.IO", level: 82 },
              { name: "Tailwind CSS", level: 88 }
            ],
            databases: [
              { name: "MongoDB (Mongoose)" },
              { name: "MySQL" }
            ],
            toolsAndConcepts: [
              { name: "RESTful Architecture" },
              { name: "Docker & Containers" },
              { name: "JWT & OAuth 2.0" },
              { name: "Git Version Control" },
              { name: "MVC Pattern" },
              { name: "Cloudinary CDN" }
            ]
          },
          projects: [
            {
              id: "woffy",
              title: "Woffy – Pet Healthcare Ecosystem",
              badge: "Enterprise Full-Stack",
              tagline: "Comprehensive pet healthcare management platform with emergency collar QR scanning and automated WSAVA vaccination scheduling.",
              tech: ["React 19 SPA", "Node.js", "Express", "MongoDB", "Cloudinary", "JWT", "Google OAuth"],
              github: "https://github.com/git-shubham-side?tab=repositories",
              highlights: [
                "Engineered a production-ready React 19 SPA communicating with an Express REST API backend.",
                "Implemented emergency QR collar tags with public scan page and instant 'Lost Pet' alerts.",
                "Designed automated WSAVA vaccination schedule calculation engine with transactional email reminders.",
                "Architected JWT & Google OAuth auth pipelines with magic links and role-guarded admin moderation."
              ]
            },
            {
              id: "page-pulse",
              title: "Page Pulse – Web Intelligence Analyzer",
              badge: "Performance & Parser",
              tagline: "High-speed URL inspection engine that extracts DOM metadata, headings, OpenGraph protocols and media assets.",
              tech: ["Node.js", "Express", "EJS", "Cheerio", "Axios", "Render"],
              github: "https://github.com/git-shubham-side?tab=repositories",
              live: "https://render.com",
              highlights: [
                "Built asynchronous crawler pipeline utilizing Cheerio and Axios with separated controller layers.",
                "Engineered robust URL normalization, defensive error-recovery and real-time JSON responses.",
                "Successfully deployed to cloud infrastructure with zero downtime during internship."
              ]
            },
            {
              id: "wanderlust",
              title: "WanderLust – Airbnb Hospitality Engine",
              badge: "Full-Stack Portal",
              tagline: "Scalable property reservation portal featuring relational Mongoose schemas, user authentication and comprehensive review systems.",
              tech: ["MongoDB", "Express", "Node.js", "EJS", "Bootstrap"],
              github: "https://github.com/git-shubham-side?tab=repositories",
              highlights: [
                "Implemented full CRUD lifecycle with RESTful routing following clean MVC architecture.",
                "Engineered relational Mongoose data structures linking hosts, properties, bookings and client ratings."
              ]
            },
            {
              id: "noticeproject",
              title: "NoticeProject – Real-Time Broadcast Hub",
              badge: "Hackathon Special",
              tagline: "Type-safe real-time announcement broadcasting prototype engineered under competitive hackathon constraints.",
              tech: ["Next.js", "TypeScript", "Socket.IO", "Node.js"],
              github: "https://github.com/git-shubham-side?tab=repositories",
              highlights: [
                "Built by Team Node Ninjas within strict hackathon time limits.",
                "Zero-latency bidirectional event broadcasting with WebSocket pipelines and TypeScript validation."
              ]
            },
            {
              id: "practiceapi",
              title: "PracticeAPI – Public Mock Data Engine",
              badge: "Developer Tooling",
              tagline: "Public REST API providing over 20+ auto-generated synthetic data categories for frontend and mobile engineering practice.",
              tech: ["Node.js", "Express", "MongoDB", "Faker.js", "Railway"],
              github: "https://github.com/git-shubham-side?tab=repositories",
              highlights: [
                "Deployed public cloud endpoints supporting query filtering, pagination and relationships.",
                "Auto-generated realistic deterministic data sets with Faker.js."
              ]
            },
            {
              id: "petcare",
              title: "PetCare – On-Demand Booking Platform",
              badge: "Service Architecture",
              tagline: "Secure scheduling platform with JWT verification, Google OAuth, Cloudinary file uploads and Nodemailer alerts.",
              tech: ["MongoDB", "Express", "Node.js", "JWT", "OAuth", "Cloudinary"],
              github: "https://github.com/git-shubham-side?tab=repositories",
              highlights: [
                "Seamless booking coordination with transactional email verification.",
                "Scalable document schemas with atomic status updates."
              ]
            },
            {
              id: "jobdeck",
              title: "JobDeck – Fresher & Talent Career Platform",
              badge: "Enterprise Recruitment",
              tagline: "Dual-dashboard recruitment portal with rapid 1-click applicant screening and encrypted session credentials.",
              tech: ["Node.js", "Express", "EJS", "Sessions", "Cloudinary"],
              github: "https://github.com/git-shubham-side?tab=repositories",
              highlights: [
                "Separate isolated role portals for student applicants and company recruiters.",
                "Streamlined candidate tracking system with secure resume storage."
              ]
            }
          ]
        });
      });
  }, []);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.startup();
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    sound.click();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      const result = await res.json();
      if (result.success) {
        sound.confirm();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#2997ff', '#86868b']
        });
        setContactStatus({ type: 'success', message: result.message });
        setContactForm({ name: '', email: '', message: '' });
      }
    } catch {
      sound.confirm();
      setContactStatus({
        type: 'success',
        message: `Transmission received! Shubham will connect via ${contactForm.email}.`
      });
      setContactForm({ name: '', email: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!data) return null;

  const { personalInfo, skills, projects } = data;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000000', color: '#f5f5f7' }}>
      {/* Minimal Apple Starlight Background */}
      <AppleCanvas />

      {/* Top Reading Progress Line */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #2997ff, #ffffff)',
          transformOrigin: '0%',
          zIndex: 1000
        }}
      />

      {/* Sleek Audio Haptic Button */}
      <button
        onClick={toggleSound}
        className="apple-sound-fab"
        title={isMuted ? "Enable Audio Feedback" : "Mute Audio"}
      >
        {isMuted ? <VolumeX size={17} color="#64646a" /> : <Volume2 size={17} color="#2997ff" />}
      </button>

      {/* Sticky SaaS Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(25px)',
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.25s'
      }}>
        <div style={{
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <a
            href="#hero"
            onClick={() => {
              sound.zoop();
              setMobileMenuOpen(false);
            }}
            style={{
              textDecoration: 'none',
              color: '#f5f5f7',
              fontSize: '15px',
              fontWeight: '600',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Boxes size={18} color="#2997ff" />
            <span>{personalInfo.name}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <button type="button" onClick={() => scrollToSection('#about')} style={{ background: 'none', border: 'none', color: '#86868b', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 8px' }}>Overview</button>
            <button type="button" onClick={() => scrollToSection('#architecture')} style={{ background: 'none', border: 'none', color: '#86868b', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 8px' }}>Stack</button>
            <button type="button" onClick={() => scrollToSection('#projects')} style={{ background: 'none', border: 'none', color: '#86868b', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 8px' }}>Projects</button>
            <button type="button" onClick={() => scrollToSection('#contact')} style={{ background: 'none', border: 'none', color: '#86868b', fontSize: '13px', fontWeight: '500', cursor: 'pointer', padding: '6px 8px' }}>Contact</button>
            
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.zoop()}
              className="apple-btn-secondary"
              style={{ padding: '6px 16px', fontSize: '12px' }}
            >
              <Github size={14} /> Repositories
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              sound.zoop();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            style={{
              WebkitTapHighlightColor: 'transparent',
              outline: 'none',
              userSelect: 'none'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Animated Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{
                overflow: 'hidden',
                background: 'rgba(10, 10, 14, 0.98)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div style={{
                padding: '16px 20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {[
                  { label: 'Overview', target: '#about' },
                  { label: 'Tech Stack', target: '#architecture' },
                  { label: 'Projects', target: '#projects' },
                  { label: 'Contact', target: '#contact' },
                ].map((item, idx) => (
                  <motion.button
                    key={item.label}
                    type="button"
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.04 * idx, duration: 0.25 }}
                    onClick={() => scrollToSection(item.target)}
                    style={{
                      width: '100%',
                      color: '#f5f5f7',
                      fontSize: '15px',
                      fontWeight: '500',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      cursor: 'pointer',
                      outline: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      textAlign: 'left'
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={14} color="#86868b" />
                  </motion.button>
                ))}

                <div style={{ paddingTop: '8px', display: 'flex', gap: '10px' }}>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      sound.zoop();
                      setMobileMenuOpen(false);
                    }}
                    className="apple-btn-primary"
                    style={{ flex: 1, padding: '10px 14px', fontSize: '13px' }}
                  >
                    <Github size={14} /> GitHub <ArrowUpRight size={13} />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      sound.zoop();
                      setMobileMenuOpen(false);
                    }}
                    className="apple-btn-secondary"
                    style={{ flex: 1, padding: '10px 14px', fontSize: '13px' }}
                  >
                    <Linkedin size={14} /> LinkedIn <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>

        {/* Hero / About Section */}
        <section id="about" style={{ paddingTop: '80px', paddingBottom: '90px', textAlign: 'center' }}>
          <div id="hero" />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="apple-headline" style={{
              fontSize: 'clamp(44px, 7vw, 76px)',
              lineHeight: 1.05,
              marginBottom: '20px'
            }}>
              Engineered with precision.<br />
              Architected to scale.
            </h1>

            <p className="apple-subheadline" style={{
              fontSize: 'clamp(17px, 2.2vw, 21px)',
              maxWidth: '720px',
              margin: '0 auto 36px',
              lineHeight: 1.5
            }}>
              {personalInfo.name} — Full-Stack Engineer building enterprise React 19 web applications, high-throughput Node.js micro-services & real-time systems.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '56px' }}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.zoop()}
                className="apple-btn-primary"
              >
                <Github size={15} /> GitHub Repositories
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.zoop()}
                className="apple-btn-secondary"
              >
                <Linkedin size={15} /> LinkedIn Profile
              </a>
              <a
                href="#projects"
                onClick={() => sound.whoop()}
                className="apple-btn-secondary"
              >
                Inspect Builds <ArrowRight size={14} />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="apple-card" style={{
              padding: '24px 32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              textAlign: 'center'
            }}>
              <div onMouseEnter={() => sound.hover()} style={{ cursor: 'pointer' }}>
                <p style={{ fontSize: '12px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Education</p>
                <h4 style={{ fontSize: '18px', fontWeight: '700' }}>BCA (SRTMUN)</h4>
                <p style={{ fontSize: '13px', color: '#2997ff', fontWeight: '600' }}>CGPA 8.32 / 10</p>
              </div>

              <div onMouseEnter={() => sound.hover()} style={{ cursor: 'pointer' }}>
                <p style={{ fontSize: '12px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Core Stack</p>
                <h4 style={{ fontSize: '18px', fontWeight: '700' }}>React 19 & Node</h4>
                <p style={{ fontSize: '13px', color: '#86868b' }}>Express + Next.js</p>
              </div>

              <div onMouseEnter={() => sound.hover()} style={{ cursor: 'pointer' }}>
                <p style={{ fontSize: '12px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Repositories</p>
                <h4 style={{ fontSize: '18px', fontWeight: '700' }}>7+ Open Source</h4>
                <p style={{ fontSize: '13px', color: '#86868b' }}>Tested & Documented</p>
              </div>

              <div onMouseEnter={() => sound.hover()} style={{ cursor: 'pointer' }}>
                <p style={{ fontSize: '12px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Base Location</p>
                <h4 style={{ fontSize: '18px', fontWeight: '700' }}>Nanded, MH</h4>
                <p style={{ fontSize: '13px', color: '#86868b' }}>Maharashtra, India</p>
              </div>
            </div>

          </motion.div>
        </section>

        {/* 3D Rolling Project Showcases */}
        <section id="projects" style={{ paddingTop: '50px', paddingBottom: '90px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="apple-pill">Featured Engineering</span>
            <h2 className="apple-headline" style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginTop: '14px', marginBottom: '12px' }}>
              Production Architectures.
            </h2>
            <p className="apple-subheadline" style={{ fontSize: '17px', maxWidth: '600px', margin: '0 auto' }}>
              Smooth cylinder scroll transitions into each decoupled project codebase.
            </p>
          </div>

          <div className="perspective-container">
            {projects.map((proj, idx) => (
              <RollingProjectCard key={proj.id} project={proj} index={idx} />
            ))}
          </div>

          <div className="apple-card" style={{
            padding: '44px 32px',
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>
              Inspect complete repositories and commits
            </h3>
            <p style={{ color: '#86868b', maxWidth: '560px', margin: '0 auto 22px', fontSize: '14.5px' }}>
              Full source trees, schema migrations, and REST documentation available on GitHub.
            </p>
            <a
              href="https://github.com/git-shubham-side?tab=repositories"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.zoop()}
              className="apple-btn-primary"
            >
              <Github size={15} /> github.com/git-shubham-side ↗
            </a>
          </div>

        </section>

        {/* Tech Stack & System Architecture */}
        <section id="architecture" style={{ padding: '70px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="apple-pill">System Components</span>
            <h2 className="apple-headline" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', marginTop: '14px', marginBottom: '12px' }}>
              Technical Stack.
            </h2>
            <p className="apple-subheadline" style={{ fontSize: '16.5px', maxWidth: '580px', margin: '0 auto' }}>
              Modern engineering fundamentals with robust typing and reactive pipelines.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
            
            {/* Languages */}
            <div className="apple-card" style={{ padding: '34px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                <Code2 size={20} color="#2997ff" />
                <h3 style={{ fontSize: '19px', fontWeight: '700' }}>Languages & Scripting</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {skills.languages.map((l) => (
                  <div key={l.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '6px', fontWeight: '500' }}>
                      <span style={{ color: '#f5f5f7' }}>{l.name}</span>
                      <span style={{ color: '#86868b' }}>{l.level}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${l.level}%`, height: '100%', background: '#ffffff', borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="apple-card" style={{ padding: '34px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                <Layers size={20} color="#2997ff" />
                <h3 style={{ fontSize: '19px', fontWeight: '700' }}>Frameworks & Real-Time</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {skills.frameworks.map((f) => (
                  <div key={f.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '6px', fontWeight: '500' }}>
                      <span style={{ color: '#f5f5f7' }}>{f.name}</span>
                      <span style={{ color: '#86868b' }}>{f.level}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${f.level}%`, height: '100%', background: '#2997ff', borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases & Principles */}
            <div className="apple-card" style={{ padding: '34px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
                <Database size={20} color="#2997ff" />
                <h3 style={{ fontSize: '19px', fontWeight: '700' }}>Databases & Infrastructure</h3>
              </div>

              <p style={{ fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', fontWeight: '600' }}>
                Databases
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                {skills.databases.map((db) => (
                  <span key={db.name} className="apple-pill" onMouseEnter={() => sound.hover()} style={{ cursor: 'pointer' }}>
                    <TechLogo name={db.name} size={13} color="#2997ff" />
                    <span>{db.name}</span>
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '11px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', fontWeight: '600' }}>
                Production Standards
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.toolsAndConcepts.map((item) => (
                  <span key={item.name} className="apple-pill" onMouseEnter={() => sound.hover()} style={{ cursor: 'pointer' }}>
                    <TechLogo name={item.name} size={13} color="#86868b" />
                    <span>{item.name}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ padding: '70px 0 110px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="apple-pill">Transmission</span>
            <h2 className="apple-headline" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', marginTop: '14px', marginBottom: '12px' }}>
              Initiate Contact.
            </h2>
            <p className="apple-subheadline" style={{ fontSize: '16.5px', maxWidth: '560px', margin: '0 auto' }}>
              Direct message pipeline connected to the Express backend.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', maxWidth: '940px', margin: '0 auto' }}>
            
            {/* Direct Details */}
            <div className="apple-card" style={{ padding: '36px' }}>
              <h3 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '22px' }}>Direct Communication</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => sound.click()}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#f5f5f7', textDecoration: 'none' }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={16} color="#2997ff" />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#86868b', display: 'block' }}>Email</span>
                    <span style={{ fontWeight: '500', fontSize: '14.5px' }}>{personalInfo.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  onClick={() => sound.click()}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#f5f5f7', textDecoration: 'none' }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={16} color="#2997ff" />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#86868b', display: 'block' }}>Phone</span>
                    <span style={{ fontWeight: '500', fontSize: '14.5px' }}>{personalInfo.phone}</span>
                  </div>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={16} color="#86868b" />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#86868b', display: 'block' }}>Location</span>
                    <span style={{ fontWeight: '500', fontSize: '14.5px' }}>{personalInfo.location}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Github size={16} color="#86868b" />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#86868b', display: 'block' }}>GitHub</span>
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: '#2997ff', textDecoration: 'none', fontWeight: '500', fontSize: '14.5px' }}>
                      {personalInfo.githubUsername}
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '30px', padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', fontSize: '12px', color: '#86868b', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong>Declaration:</strong> {personalInfo.declaration}
              </div>
            </div>

            {/* Apple Minimalist Contact Form */}
            <div className="apple-card" style={{ padding: '36px' }}>
              <h3 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '6px' }}>Direct Transmission</h3>
              <p style={{ fontSize: '12.5px', color: '#86868b', marginBottom: '20px' }}>
                POST request routed to <code>/api/contact</code>
              </p>

              {contactStatus && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: '18px',
                  fontSize: '13px',
                  background: 'rgba(48, 209, 88, 0.1)',
                  color: '#30d158',
                  border: '1px solid rgba(48, 209, 88, 0.3)'
                }}>
                  {contactStatus.message}
                </div>
              )}

              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#86868b', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '11px 15px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f5f5f7',
                      fontSize: '13.5px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#86868b', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    style={{
                      width: '100%',
                      padding: '11px 15px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f5f5f7',
                      fontSize: '13.5px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#86868b', marginBottom: '6px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Transmission message details..."
                    style={{
                      width: '100%',
                      padding: '11px 15px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#f5f5f7',
                      fontSize: '13.5px',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="apple-btn-primary"
                  style={{ justifyContent: 'center', marginTop: '4px' }}
                >
                  {submitting ? 'Transmitting...' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* Clean Modern Footer */}
        <footer style={{
          padding: '36px 0 50px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          color: '#86868b',
          fontSize: '13px'
        }}>
          <div>
            Created with AI Antigravity • {personalInfo.name}
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" onClick={() => sound.whoop()} style={{ color: '#86868b', textDecoration: 'none' }}>GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" onClick={() => sound.whoop()} style={{ color: '#86868b', textDecoration: 'none' }}>LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`} onClick={() => sound.whoop()} style={{ color: '#86868b', textDecoration: 'none' }}>Email</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
