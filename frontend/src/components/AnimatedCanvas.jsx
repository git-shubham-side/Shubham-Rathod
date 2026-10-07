import React, { useEffect, useRef } from 'react';

/**
 * Animated Interactive Canvas
 * Features:
 * - Floating joyful glowing particle orbs
 * - Connected constellation lines with mouse proximity
 * - Interactive mouse repulsion / attraction ripples
 * - Floating emoji stickers in the background (✨, 🚀, 💻, ⚡, 💖, 🎨)
 */
export const AnimatedCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particles setup
    const particleCount = Math.min(Math.floor((width * height) / 12000), 75);
    const particles = [];
    const colors = [
      'rgba(99, 102, 241, ',   // Indigo
      'rgba(236, 72, 153, ',   // Pink
      'rgba(14, 165, 233, ',   // Cyan / Sky
      'rgba(245, 158, 11, ',   // Amber
      'rgba(168, 85, 247, '    // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 3 + 2,
        baseRadius: Math.random() * 3 + 2,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    // Floating Stickers in canvas
    const floatingStickers = [
      { text: '✨', x: width * 0.15, y: height * 0.25, vx: 0.3, vy: -0.2, rot: 0, vRot: 0.01, size: 28 },
      { text: '🚀', x: width * 0.85, y: height * 0.2, vx: -0.25, vy: 0.15, rot: 0, vRot: -0.008, size: 32 },
      { text: '💻', x: width * 0.1, y: height * 0.75, vx: 0.2, vy: 0.2, rot: 0, vRot: 0.012, size: 30 },
      { text: '⚡', x: width * 0.88, y: height * 0.8, vx: -0.3, vy: -0.2, rot: 0, vRot: -0.01, size: 26 },
      { text: '🎨', x: width * 0.5, y: height * 0.12, vx: 0.15, vy: 0.18, rot: 0, vRot: 0.006, size: 28 },
      { text: '🔥', x: width * 0.55, y: height * 0.88, vx: -0.18, vy: -0.15, rot: 0, vRot: -0.007, size: 28 }
    ];

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle animated glowing gradient mesh
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(t * 0.5) * 200,
        height * 0.5 + Math.cos(t * 0.5) * 150,
        100,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, 'rgba(30, 27, 75, 0.25)'); // deep indigo glow
      bgGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.4)');
      bgGrad.addColorStop(1, 'rgba(3, 7, 18, 0.8)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Floating Animated Stickers
      floatingStickers.forEach((stk) => {
        stk.x += stk.vx;
        stk.y += stk.vy;
        stk.rot += stk.vRot;

        if (stk.x < -40) stk.x = width + 40;
        if (stk.x > width + 40) stk.x = -40;
        if (stk.y < -40) stk.y = height + 40;
        if (stk.y > height + 40) stk.y = -40;

        ctx.save();
        ctx.translate(stk.x, stk.y);
        ctx.rotate(stk.rot + Math.sin(t + stk.x) * 0.15);
        ctx.font = `${stk.size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.55 + Math.sin(t * 2 + stk.x) * 0.15;
        // subtle shadow
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.shadowBlur = 12;
        ctx.fillText(stk.text, 0, 0);
        ctx.restore();
      });

      // Update & Draw Particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wall bouncing with soft padding
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction (push away gently or pull)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 5;
          p.y -= (dy / dist) * force * 5;
          p.radius = p.baseRadius * (1 + force * 1.5);
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        // Draw connections
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.18 * (1 - dist2 / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${p.alpha})`;
        ctx.shadowColor = `${p.colorPrefix}0.8)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Interactive mouse ripple cursor aura
      if (mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          100
        );
        cursorGlow.addColorStop(0, 'rgba(147, 51, 234, 0.25)');
        cursorGlow.addColorStop(0.5, 'rgba(236, 72, 153, 0.12)');
        cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="canvas-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};
