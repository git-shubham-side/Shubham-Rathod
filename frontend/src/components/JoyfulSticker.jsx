import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

/**
 * Animated Sticker Badge Component
 * Interactive, bouncy, sound-enabled sticker with rotation and shine effects
 */
export const JoyfulSticker = ({
  emoji,
  label,
  color = '#6366f1',
  rotation = 0,
  size = 'md',
  onClick,
  floating = false,
  tooltip
}) => {
  const [bounced, setBounced] = useState(false);

  const handleClick = (e) => {
    sound.boing();
    setBounced(true);
    setTimeout(() => setBounced(false), 600);

    // Mini confetti burst around the sticker
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 15,
      spread: 45,
      startVelocity: 15,
      origin: { x, y },
      colors: ['#FF6B6B', '#4D96FF', '#FFD93D', '#6BCB77', '#A66CFF']
    });

    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    sound.pop();
  };

  const sizeClasses = {
    sm: { padding: '4px 10px', fontSize: '13px', emojiSize: '16px' },
    md: { padding: '8px 16px', fontSize: '14px', emojiSize: '22px' },
    lg: { padding: '12px 22px', fontSize: '17px', emojiSize: '28px' }
  }[size] || { padding: '8px 16px', fontSize: '14px', emojiSize: '22px' };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      title={tooltip || label}
      className={`joyful-sticker ${floating ? 'animate-float' : ''} ${bounced ? 'animate-jiggle' : ''}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: sizeClasses.padding,
        fontSize: sizeClasses.fontSize,
        fontWeight: '700',
        color: '#ffffff',
        background: `linear-gradient(135deg, ${color}ee, ${color}aa)`,
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.4)',
        boxShadow: `0 8px 24px -4px ${color}66, inset 0 2px 4px rgba(255,255,255,0.4)`,
        borderRadius: '24px',
        cursor: 'pointer',
        transform: `rotate(${rotation}deg) scale(1)`,
        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        userSelect: 'none',
        position: 'relative'
      }}
    >
      <span style={{ fontSize: sizeClasses.emojiSize, display: 'inline-block' }} className="sticker-emoji">
        {emoji}
      </span>
      {label && <span>{label}</span>}
      <span className="sticker-glare" />
    </div>
  );
};
