import React from 'react';
import { motion } from 'framer-motion';
import { ProjectLogo } from './ProjectLogo';
import { sound } from '../utils/sound';
import { ArrowUpRight, Terminal, CheckCircle2 } from 'lucide-react';

/**
 * Mobile-First Responsive Apple-style Project Card
 * Completely unconstrained and wrapped for mobile screens without any half-cut content
 */
export const RollingProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="project-card-wrapper"
      style={{
        marginBottom: '32px',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="apple-card project-card-inner"
        onMouseEnter={() => sound.hover()}
      >
        {/* Left Column: Details */}
        <div className="project-info-col" style={{ width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(41, 151, 255, 0.12)',
              border: '1px solid rgba(41, 151, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ProjectLogo type={project.id} size={20} color="#2997ff" />
            </div>
            <span className="apple-pill" style={{ fontSize: '11px', padding: '4px 12px' }}>
              {project.badge}
            </span>
          </div>

          <h3 style={{
            fontSize: 'clamp(20px, 4.5vw, 26px)',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '10px',
            color: '#f5f5f7',
            lineHeight: 1.25,
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: '14.5px',
            color: '#86868b',
            lineHeight: 1.55,
            marginBottom: '16px',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
            {project.tagline}
          </p>

          <div style={{ marginBottom: '20px' }}>
            <ul style={{
              paddingLeft: '18px',
              margin: 0,
              color: '#a1a1a6',
              fontSize: '13px',
              lineHeight: 1.6,
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}>
              {project.highlights.map((point, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="project-action-buttons">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.zoop()}
              className="apple-btn-primary"
            >
              Source Code <ArrowUpRight size={14} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.zoop()}
                className="apple-btn-secondary"
              >
                Production Preview <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Stack & Technical Details */}
        <div className="project-tech-col" style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px',
          padding: '20px',
          boxSizing: 'border-box',
          width: '100%',
          minWidth: 0,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            paddingBottom: '10px'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <span style={{ fontSize: '10.5px', color: '#64646a', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              SYS // {project.id.toUpperCase()}
            </span>
          </div>

          <p style={{ fontSize: '10.5px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', fontWeight: '600' }}>
            Infrastructure Stack
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#e5e5ea',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word'
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '12px 14px',
            borderRadius: '10px',
            fontFamily: 'monospace',
            fontSize: '11.5px',
            lineHeight: 1.5,
            border: '1px solid rgba(255, 255, 255, 0.06)',
            boxSizing: 'border-box',
            width: '100%',
            overflowWrap: 'break-word',
            wordBreak: 'break-word'
          }}>
            <div style={{ color: '#2997ff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={12} style={{ flexShrink: 0 }} />
              <span style={{ overflowWrap: 'anywhere' }}>github.com/git-shubham-side</span>
            </div>
            <div style={{ color: '#86868b', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <CheckCircle2 size={12} color="#30d158" style={{ flexShrink: 0 }} />
              <span>Production verified</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
