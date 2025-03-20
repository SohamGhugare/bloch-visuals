"use client";

import React from 'react';

export default function BlochVisBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      {/* Black background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Grid overlay with white lines only, no hover effect */}
      <div 
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
    </div>
  );
} 