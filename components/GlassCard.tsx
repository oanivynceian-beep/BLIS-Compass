
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div className={`glass rounded-20 p-6 shadow-sm border border-white/40 ${hoverEffect ? 'transition-all duration-300 hover:shadow-xl hover:translate-y--1 hover:bg-white/80' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
