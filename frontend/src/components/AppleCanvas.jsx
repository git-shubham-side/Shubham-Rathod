import React, { useEffect, useRef } from 'react';

/**
 * Minimalist Apple-style Interactive Canvas
 * Subtle dark ambient particle dust with smooth mouse refraction spotlight
 */
export const AppleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const mouse = { x: width * 0.5, y: height * 0.3, targetX: width * 0.5, targetY: height * 0.3 };

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Starlight / subtle ambient dust particles
    const count = 55;
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      pulse: Math.random() * Math.PI
    }));

    let t = 0;

    const render = () => {
      t += 0.015;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Deep Apple OLED black base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Mouse following ambient moonlight / sapphire glow
      const spotlight = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        450
      );
      spotlight.addColorStop(0, 'rgba(41, 151, 255, 0.08)');
      spotlight.addColorStop(0.4, 'rgba(120, 80, 255, 0.03)');
      spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);

      // Secondary top ambient glow
      const topGlow = ctx.createRadialGradient(
        width * 0.5,
        -100,
        0,
        width * 0.5,
        -100,
        width * 0.7
      );
      topGlow.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
      topGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);

      // Render micro ambient particles
      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;
        star.pulse += 0.02;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const dynamicAlpha = star.alpha * (0.6 + 0.4 * Math.sin(star.pulse));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
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
