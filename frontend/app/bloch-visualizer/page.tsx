"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import BlochVisBackground from '../components/BlochVisBackground';
import BlochSphere from '../components/BlochSphere';

export default function BlochVisualizer() {
  const searchParams = useSearchParams();
  const initialState = searchParams.get('state') || '0';
  
  // State management for current quantum state
  const [currentState, setCurrentState] = useState(initialState);
  
  // Display name for the current state
  const getStateName = (state: string) => {
    switch(state) {
      case '0': return '|0⟩';
      case '1': return '|1⟩';
      case 'plus': return '|+⟩';
      case 'minus': return '|-⟩';
      default: return '|0⟩';
    }
  };
  
  // Gates that can be applied
  const quantumGates = [
    { id: 'x', name: 'X', description: 'Pauli-X (NOT)' },
    { id: 'y', name: 'Y', description: 'Pauli-Y' },
    { id: 'z', name: 'Z', description: 'Pauli-Z' },
    { id: 'h', name: 'H', description: 'Hadamard' },
    { id: 's', name: 'S', description: 'Phase' },
    { id: 't', name: 'T', description: 'π/8' },
  ];
  
  // Function to apply a gate (this would calculate the new state in a real implementation)
  const applyGate = (gateId: string) => {
    console.log(`Applying gate ${gateId} to state ${currentState}`);
    // Simple gate application logic for demonstration
    // In a real implementation, this would use proper quantum mechanics
    switch(gateId) {
      case 'x': // X gate flips between |0⟩ and |1⟩
        setCurrentState(currentState === '0' ? '1' : currentState === '1' ? '0' : 
                        currentState === 'plus' ? 'plus' : 'minus');
        break;
      case 'h': // H gate converts between Z and X basis
        setCurrentState(currentState === '0' ? 'plus' : currentState === '1' ? 'minus' :
                        currentState === 'plus' ? '0' : '1');
        break;
      case 'z': // Z gate flips the phase of |1⟩ component (flips between |+⟩ and |-⟩)
        setCurrentState(currentState === 'plus' ? 'minus' : currentState === 'minus' ? 'plus' :
                        currentState);
        break;
      // Other gates would be implemented similarly
      default:
        // Just a placeholder, no change
        break;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen text-white font-[family-name:var(--font-geist-sans)]">
      {/* Static grid background without hover effect */}
      <BlochVisBackground />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
      
      {/* Main content with split layout */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Left panel - Circuit controls */}
          <div className="w-full lg:w-1/2 bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-900/50">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300">Quantum Circuit</h2>
            
            <div className="mb-8">
              <h3 className="text-xl mb-4">Current State: <span className="font-mono text-2xl bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">{getStateName(currentState)}</span></h3>
              
              <div className="p-4 bg-black/40 rounded-xl mb-6 min-h-20 flex items-center justify-center border border-cyan-900/30">
                {/* This would render the actual circuit in a real implementation */}
                <div className="font-mono text-cyan-300">— {getStateName(currentState)} —</div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl mb-4">Quantum Gates</h3>
              <div className="grid grid-cols-3 gap-3">
                {quantumGates.map(gate => (
                  <button
                    key={gate.id}
                    onClick={() => applyGate(gate.id)}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-gradient-to-br from-black to-gray-900 border border-cyan-800/50 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] group"
                    title={gate.description}
                  >
                    <span className="text-2xl font-mono bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400">{gate.name}</span>
                    <span className="text-xs text-gray-400 mt-1">{gate.description}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl mb-4">Measurement</h3>
              <button
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-900/60 to-cyan-700/40 hover:from-cyan-800 hover:to-cyan-600 text-white font-medium transition-all duration-300 border border-cyan-700/50"
              >
                Measure Qubit
              </button>
            </div>
          </div>
          
          {/* Right panel - Bloch Sphere Visualization */}
          <div className="w-full lg:w-1/2 bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-900/50 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300">Bloch Sphere</h2>
            
            {/* 3D Bloch sphere visualization */}
            <div className="flex-1">
              <BlochSphere currentState={currentState} />
            </div>
            
            <div className="mt-6 bg-black/40 rounded-xl p-4 border border-cyan-900/30">
              <h3 className="text-lg font-semibold mb-2">State Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Probability |0⟩:</p>
                  <p className="font-mono text-cyan-300">{currentState === '0' ? '100%' : currentState === '1' ? '0%' : '50%'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Probability |1⟩:</p>
                  <p className="font-mono text-cyan-300">{currentState === '1' ? '100%' : currentState === '0' ? '0%' : '50%'}</p>
                </div>
                <div>
                  <p className="text-gray-400">θ (Theta):</p>
                  <p className="font-mono text-cyan-300">{currentState === '0' ? '0°' : currentState === '1' ? '180°' : '90°'}</p>
                </div>
                <div>
                  <p className="text-gray-400">φ (Phi):</p>
                  <p className="font-mono text-cyan-300">{currentState === 'plus' ? '0°' : currentState === 'minus' ? '180°' : '0°'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 