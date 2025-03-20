"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import BlochVisBackground from '../components/BlochVisBackground';
import BlochSphere from '../components/BlochSphere';

export default function BlochVisualizer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialState = searchParams.get('state') || '0';
  
  // State management for current quantum state
  const [currentState, setCurrentState] = useState(initialState);
  const [activeTab, setActiveTab] = useState<'states' | 'gates'>('states');
  
  // Display name for the current state
  const getStateName = (state: string) => {
    switch(state) {
      case '0': return '|0⟩';
      case '1': return '|1⟩';
      case 'plus': return '|+⟩';
      case 'minus': return '|-⟩';
      case 'i': return '|i⟩';
      case '-i': return '|-i⟩';
      default: return '|0⟩';
    }
  };
  
  // Initial quantum states
  const initialStates = [
    { id: '0', name: '|0⟩', description: 'Z-basis (North Pole)', basis: 'Z' },
    { id: '1', name: '|1⟩', description: 'Z-basis (South Pole)', basis: 'Z' },
    { id: 'plus', name: '|+⟩', description: 'X-basis (Positive)', basis: 'X' },
    { id: 'minus', name: '|-⟩', description: 'X-basis (Negative)', basis: 'X' },
    { id: 'i', name: '|i⟩', description: 'Y-basis (Positive)', basis: 'Y' },
    { id: '-i', name: '|-i⟩', description: 'Y-basis (Negative)', basis: 'Y' },
  ];
  
  // Function to change initial state
  const changeInitialState = (stateId: string) => {
    setCurrentState(stateId);
    // Update URL to reflect the new state (for sharing/bookmarking)
    router.push(`/bloch-visualizer?state=${stateId}`);
  };
  
  // Gates that can be applied
  const quantumGates = [
    { id: 'x', name: 'X', description: 'Pauli-X (NOT)', category: 'pauli' },
    { id: 'y', name: 'Y', description: 'Pauli-Y', category: 'pauli' },
    { id: 'z', name: 'Z', description: 'Pauli-Z', category: 'pauli' },
    { id: 'h', name: 'H', description: 'Hadamard', category: 'special' },
    { id: 's', name: 'S', description: 'Phase (π/2)', category: 'phase' },
    { id: 't', name: 'T', description: 'π/8 Gate', category: 'phase' },
    { id: 'rx', name: 'Rx', description: 'X-Rotation', category: 'rotation' },
    { id: 'ry', name: 'Ry', description: 'Y-Rotation', category: 'rotation' },
    { id: 'rz', name: 'Rz', description: 'Z-Rotation', category: 'rotation' },
  ];
  
  // Calculate state information
  const getStateInfo = (state: string) => {
    // Default values for |0⟩ state
    let prob0 = '100%';
    let prob1 = '0%';
    let theta = '0°';
    let phi = '0°';

    switch(state) {
      case '0':
        break; // Use defaults
      case '1':
        prob0 = '0%';
        prob1 = '100%';
        theta = '180°';
        break;
      case 'plus':
        prob0 = '50%';
        prob1 = '50%';
        theta = '90°';
        phi = '0°';
        break;
      case 'minus':
        prob0 = '50%';
        prob1 = '50%';
        theta = '90°';
        phi = '180°';
        break;
      case 'i':
        prob0 = '50%';
        prob1 = '50%';
        theta = '90°';
        phi = '90°';
        break;
      case '-i':
        prob0 = '50%';
        prob1 = '50%';
        theta = '90°';
        phi = '270°';
        break;
    }
    
    return { prob0, prob1, theta, phi };
  };
  
  // Function to apply a gate (this would calculate the new state in a real implementation)
  const applyGate = (gateId: string) => {
    console.log(`Applying gate ${gateId} to state ${currentState}`);
    // Simple gate application logic for demonstration
    // In a real implementation, this would use proper quantum mechanics
    switch(gateId) {
      case 'x': // X gate flips between |0⟩ and |1⟩
        setCurrentState(currentState === '0' ? '1' : currentState === '1' ? '0' : 
                      currentState === 'plus' ? 'plus' : currentState === 'minus' ? 'minus' :
                      currentState === 'i' ? 'i' : '-i');
        break;
      case 'h': // H gate converts between Z and X basis
        setCurrentState(currentState === '0' ? 'plus' : currentState === '1' ? 'minus' :
                      currentState === 'plus' ? '0' : currentState === 'minus' ? '1' :
                      currentState === 'i' ? 'i' : '-i'); // Simplified for demo purposes
        break;
      case 'z': // Z gate flips the phase of |1⟩ component
        setCurrentState(currentState === 'plus' ? 'minus' : currentState === 'minus' ? 'plus' :
                      currentState === 'i' ? '-i' : currentState === '-i' ? 'i' : 
                      currentState);
        break;
      case 'y': // Y gate
        setCurrentState(currentState === '0' ? 'i' : currentState === '1' ? '-i' :
                      currentState === 'i' ? '1' : currentState === '-i' ? '0' : 
                      currentState === 'plus' ? 'plus' : 'minus');
        break;
      // Other gates would be implemented similarly
      default:
        // Just a placeholder, no change
        break;
    }
  };

  const stateInfo = getStateInfo(currentState);
  
  return (
    <div className="flex flex-col min-h-screen text-white font-[family-name:var(--font-geist-sans)] bg-black">
      {/* Static grid background without hover effect */}
      <BlochVisBackground />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Main content with split layout */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Left panel - Circuit controls with redesigned UI */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 backdrop-blur-md rounded-2xl border border-cyan-900/30 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            {/* Header section with state display */}
            <div className="bg-black/60 px-8 py-6 border-b border-cyan-900/20">
              <h2 className="text-2xl font-bold mb-2 text-cyan-300 flex items-center">
                <span className="mr-3">Quantum State</span>
                <div className="h-px flex-grow bg-gradient-to-r from-cyan-900/40 to-transparent"></div>
              </h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="font-mono text-4xl bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
                  {getStateName(currentState)}
                </div>
                <div className="h-8 w-px bg-cyan-900/20 mx-2"></div>
                <div className="text-sm text-gray-400 font-light">
                  {initialStates.find(s => s.id === currentState)?.description}
                </div>
              </div>
            </div>
            
            {/* Tab navigation */}
            <div className="flex border-b border-cyan-900/20">
              <button 
                onClick={() => setActiveTab('states')}
                className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'states' 
                  ? 'text-cyan-300 border-b-2 border-cyan-400' 
                  : 'text-gray-400 hover:text-gray-300'}`}
              >
                Quantum States
              </button>
              <button 
                onClick={() => setActiveTab('gates')}
                className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'gates' 
                  ? 'text-cyan-300 border-b-2 border-cyan-400' 
                  : 'text-gray-400 hover:text-gray-300'}`}
              >
                Quantum Gates
              </button>
            </div>
            
            {/* Content area */}
            <div className="px-8 py-6">
              {/* States tab */}
              {activeTab === 'states' && (
                <div>
                  {/* Computational Basis States (Z) */}
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                      <span>Z-Basis States</span>
                      <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700/50 to-transparent ml-3"></div>
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {initialStates.filter(s => s.basis === 'Z').map(state => (
                        <button
                          key={state.id}
                          onClick={() => changeInitialState(state.id)}
                          className={`flex items-center p-3 rounded-lg ${currentState === state.id 
                            ? 'bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                            : 'bg-black/40 border border-cyan-800/20 hover:border-cyan-700/40'} 
                            transition-all duration-300 group`}
                        >
                          <div className="w-12 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black border border-cyan-900/50 mr-3">
                            <span className="text-lg font-mono text-cyan-300 group-hover:text-cyan-200 whitespace-nowrap">{state.name}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-white group-hover:text-cyan-100">{state.name}</div>
                            <div className="text-xs text-gray-400">{state.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* X-Basis States */}
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                      <span>X-Basis States</span>
                      <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700/50 to-transparent ml-3"></div>
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {initialStates.filter(s => s.basis === 'X').map(state => (
                        <button
                          key={state.id}
                          onClick={() => changeInitialState(state.id)}
                          className={`flex items-center p-3 rounded-lg ${currentState === state.id 
                            ? 'bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                            : 'bg-black/40 border border-cyan-800/20 hover:border-cyan-700/40'} 
                            transition-all duration-300 group`}
                        >
                          <div className="w-12 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black border border-cyan-900/50 mr-3">
                            <span className="text-lg font-mono text-cyan-300 group-hover:text-cyan-200 whitespace-nowrap">{state.name}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-white group-hover:text-cyan-100">{state.name}</div>
                            <div className="text-xs text-gray-400">{state.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Y-Basis States */}
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                      <span>Y-Basis States</span>
                      <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700/50 to-transparent ml-3"></div>
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {initialStates.filter(s => s.basis === 'Y').map(state => (
                        <button
                          key={state.id}
                          onClick={() => changeInitialState(state.id)}
                          className={`flex items-center p-3 rounded-lg ${currentState === state.id 
                            ? 'bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                            : 'bg-black/40 border border-cyan-800/20 hover:border-cyan-700/40'} 
                            transition-all duration-300 group`}
                        >
                          <div className="w-12 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black border border-cyan-900/50 mr-3">
                            <span className="text-lg font-mono text-cyan-300 group-hover:text-cyan-200 whitespace-nowrap">
                              {state.id === 'i' ? '|i⟩' : '|-i⟩'}
                            </span>
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-white group-hover:text-cyan-100">
                              {state.id === 'i' ? '|i⟩' : '|-i⟩'}
                            </div>
                            <div className="text-xs text-gray-400">{state.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Measurement section */}
                  <div className="mt-10">
                    <div className="bg-gradient-to-r from-cyan-900/20 via-cyan-800/10 to-cyan-900/20 rounded-xl p-5 border border-cyan-900/30">
                      <h3 className="text-lg font-medium text-cyan-300 mb-4">State Properties</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Probability |0⟩</div>
                          <div className="font-mono text-lg text-white">{stateInfo.prob0}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Probability |1⟩</div>
                          <div className="font-mono text-lg text-white">{stateInfo.prob1}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">θ (Theta)</div>
                          <div className="font-mono text-lg text-white">{stateInfo.theta}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">φ (Phi)</div>
                          <div className="font-mono text-lg text-white">{stateInfo.phi}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Gates tab */}
              {activeTab === 'gates' && (
                <div>
                  {/* Pauli Gates */}
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                      <span>Pauli Gates</span>
                      <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700/50 to-transparent ml-3"></div>
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {quantumGates.filter(g => g.category === 'pauli').map(gate => (
                        <button
                          key={gate.id}
                          onClick={() => applyGate(gate.id)}
                          className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/40 border border-cyan-800/20 hover:border-cyan-700/40 transition-all duration-300 group"
                        >
                          <span className="text-2xl font-mono text-cyan-300 mb-1 group-hover:text-cyan-200">{gate.name}</span>
                          <span className="text-xs text-gray-400">{gate.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Special Gates */}
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                      <span>Special Gates</span>
                      <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700/50 to-transparent ml-3"></div>
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {quantumGates.filter(g => g.category === 'special').map(gate => (
                        <button
                          key={gate.id}
                          onClick={() => applyGate(gate.id)}
                          className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/40 border border-cyan-800/20 hover:border-cyan-700/40 transition-all duration-300 group"
                        >
                          <span className="text-2xl font-mono text-cyan-300 mb-1 group-hover:text-cyan-200">{gate.name}</span>
                          <span className="text-xs text-gray-400">{gate.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Phase Gates */}
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                      <span>Phase Gates</span>
                      <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700/50 to-transparent ml-3"></div>
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {quantumGates.filter(g => g.category === 'phase').map(gate => (
                        <button
                          key={gate.id}
                          onClick={() => applyGate(gate.id)}
                          className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/40 border border-cyan-800/20 hover:border-cyan-700/40 transition-all duration-300 group"
                        >
                          <span className="text-2xl font-mono text-cyan-300 mb-1 group-hover:text-cyan-200">{gate.name}</span>
                          <span className="text-xs text-gray-400">{gate.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Rotation Gates */}
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3 flex items-center">
                      <span>Rotation Gates</span>
                      <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-700/50 to-transparent ml-3"></div>
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {quantumGates.filter(g => g.category === 'rotation').map(gate => (
                        <button
                          key={gate.id}
                          onClick={() => applyGate(gate.id)}
                          className="flex flex-col items-center justify-center p-4 rounded-lg bg-black/40 border border-cyan-800/20 hover:border-cyan-700/40 transition-all duration-300 group"
                        >
                          <span className="text-2xl font-mono text-cyan-300 mb-1 group-hover:text-cyan-200">{gate.name}</span>
                          <span className="text-xs text-gray-400">{gate.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Measure button with premium design */}
                  <div className="mt-8">
                    <button className="w-full py-4 rounded-lg bg-gradient-to-r from-cyan-900 to-cyan-700 hover:from-cyan-800 hover:to-cyan-600 text-white font-medium transition-all duration-300 shadow-[0_2px_10px_rgba(6,182,212,0.2)] border border-cyan-600/50 flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Measure Qubit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right panel - Bloch Sphere Visualization */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 backdrop-blur-md rounded-2xl border border-cyan-900/30 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <div className="bg-black/60 px-8 py-6 border-b border-cyan-900/20">
              <h2 className="text-2xl font-bold text-cyan-300 flex items-center">
                <span className="mr-3">Bloch Sphere</span>
                <div className="h-px flex-grow bg-gradient-to-r from-cyan-900/40 to-transparent"></div>
              </h2>
            </div>
            
            <div className="p-6">
              {/* 3D Bloch sphere visualization */}
              <div className="rounded-xl overflow-hidden border border-cyan-900/20">
                <BlochSphere currentState={currentState} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 