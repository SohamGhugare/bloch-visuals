"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function GridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    // Add event listener to document for mouse movement
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1]">
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Base grid overlay with white lines */}
      <div 
        ref={gridRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundSize: '100px 100px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Cyan grid overlay that's masked by a radial gradient */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundSize: '100px 100px',
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundPosition: 'center center',
          maskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.2) 60%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.2) 60%, transparent 70%)`
        }}
      />
      
      {/* Extremely subtle glow effect */}
      <div 
        className="absolute pointer-events-none"
        style={{
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          filter: 'blur(30px)'
        }}
      />
    </div>
  );
} 