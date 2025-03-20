import React from "react";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 sm:px-10 flex items-center justify-between border-b border-cyan-900/40 backdrop-blur-sm bg-black/70 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="Intrico Labs Logo" 
          width={40} 
          height={40} 
          className="object-contain"
        />
        <span className="text-xl font-semibold text-white">
          Intrico Labs
        </span>
      </div>
      
      <a 
        href="/about"
        className="text-base sm:text-lg text-white hover:text-cyan-300 transition-colors duration-300"
      >
        About
      </a>
    </nav>
  );
} 