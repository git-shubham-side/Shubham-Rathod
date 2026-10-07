import React from 'react';
import {
  Activity,
  Search,
  Compass,
  HeartPulse,
  Database,
  Briefcase,
  Radio,
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  Globe,
  Server
} from 'lucide-react';

export const ProjectLogo = ({ type, size = 22, color = "#2997ff" }) => {
  const iconProps = { size, color, strokeWidth: 1.8 };
  
  switch (type) {
    case 'woffy':
      return <HeartPulse {...iconProps} />;
    case 'page-pulse':
      return <Search {...iconProps} />;
    case 'wanderlust':
      return <Compass {...iconProps} />;
    case 'petcare':
      return <Activity {...iconProps} />;
    case 'practiceapi':
      return <Database {...iconProps} />;
    case 'jobdeck':
      return <Briefcase {...iconProps} />;
    case 'noticeproject':
      return <Radio {...iconProps} />;
    default:
      return <Cpu {...iconProps} />;
  }
};

export const TechLogo = ({ name, size = 16, color = "#a1a1a6" }) => {
  const iconProps = { size, color, strokeWidth: 1.8 };
  const lower = name.toLowerCase();

  if (lower.includes('react') || lower.includes('frontend')) {
    return <Layers {...iconProps} />;
  }
  if (lower.includes('node') || lower.includes('express') || lower.includes('backend')) {
    return <Server {...iconProps} />;
  }
  if (lower.includes('mongo') || lower.includes('sql') || lower.includes('db')) {
    return <Database {...iconProps} />;
  }
  if (lower.includes('socket') || lower.includes('real-time')) {
    return <Zap {...iconProps} />;
  }
  if (lower.includes('auth') || lower.includes('jwt') || lower.includes('shield')) {
    return <ShieldCheck {...iconProps} />;
  }
  if (lower.includes('web') || lower.includes('html') || lower.includes('css')) {
    return <Globe {...iconProps} />;
  }
  return <Terminal {...iconProps} />;
};
