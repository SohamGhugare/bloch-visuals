import React from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import GridBackground from "./components/GridBackground";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white font-[family-name:var(--font-geist-sans)]">
      {/* Interactive grid background */}
      <GridBackground />
      
      {/* Include the modular Navbar component */}
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl mx-auto text-center px-8 py-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-12 tracking-tight bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
          Bloch Sphere Visualizer
        </h1>
        
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 mb-12 leading-relaxed font-light">
          Explore quantum states in real-time. Apply quantum gates and see how they affect a qubit's position on the Bloch sphere.
        </p>
        
        {/* Elegant separator with increased width */}
        <div className="w-48 sm:w-64 h-[1px] mb-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"></div>
        
        <h2 className="text-xl sm:text-2xl mb-12 text-cyan-300 font-light">
          Select an initial state to get started
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-7">
          {/* Quantum state buttons */}
          <button 
            className="flex items-center justify-center px-6 py-5 rounded-xl bg-gradient-to-br from-black to-gray-900 border border-cyan-800/50 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-3xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400 relative z-10">|0⟩</span>
          </button>
          
          <button 
            className="flex items-center justify-center px-6 py-5 rounded-xl bg-gradient-to-br from-black to-gray-900 border border-cyan-800/50 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-3xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400 relative z-10">|1⟩</span>
          </button>
          
          <button 
            className="flex items-center justify-center px-6 py-5 rounded-xl bg-gradient-to-br from-black to-gray-900 border border-cyan-800/50 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-3xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400 relative z-10">|+⟩</span>
          </button>
          
          <button 
            className="flex items-center justify-center px-6 py-5 rounded-xl bg-gradient-to-br from-black to-gray-900 border border-cyan-800/50 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-3xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400 relative z-10">|-⟩</span>
          </button>
        </div>
      </main>
    </div>
  );
}
