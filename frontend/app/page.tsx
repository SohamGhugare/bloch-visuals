import React from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
      {/* Include the modular Navbar component */}
      <Navbar />

      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl mx-auto text-center px-8 py-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-10 tracking-tight bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
          Bloch Sphere Visualizer
        </h1>
        
        <h2 className="text-xl sm:text-2xl mb-12 text-cyan-300 font-light">
          Select an initial state to get started
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {/* Quantum state buttons */}
          <button 
            className="flex items-center justify-center px-6 py-4 rounded-lg bg-gradient-to-br from-black to-gray-900 border border-cyan-700 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-700/30 group"
          >
            <span className="text-3xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400">|0⟩</span>
          </button>
          
          <button 
            className="flex items-center justify-center px-6 py-4 rounded-lg bg-gradient-to-br from-black to-gray-900 border border-cyan-700 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-700/30 group"
          >
            <span className="text-3xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400">|1⟩</span>
          </button>
          
          <button 
            className="flex items-center justify-center px-6 py-4 rounded-lg bg-gradient-to-br from-black to-gray-900 border border-cyan-700 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-700/30 group"
          >
            <span className="text-3xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400">|+⟩</span>
          </button>
          
          <button 
            className="flex items-center justify-center px-6 py-4 rounded-lg bg-gradient-to-br from-black to-gray-900 border border-cyan-700 hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-700/30 group"
          >
            <span className="text-3xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400">|-⟩</span>
          </button>
        </div>
        
        <div className="mt-16 w-full max-w-md">
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-700 to-transparent"></div>
        </div>
      </main>
    </div>
  );
}
