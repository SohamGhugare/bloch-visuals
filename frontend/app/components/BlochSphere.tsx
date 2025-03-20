"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';

// Calculates position on the Bloch sphere for a given state
const calculateBlochVector = (state: string) => {
  switch (state) {
    case '0':
      return [0, 0, 1]; // |0⟩ - North pole
    case '1':
      return [0, 0, -1]; // |1⟩ - South pole
    case 'plus':
      return [1, 0, 0]; // |+⟩ - X-axis positive
    case 'minus':
      return [-1, 0, 0]; // |-⟩ - X-axis negative
    case 'i':
      return [0, 1, 0]; // |i⟩ - Y-axis positive
    case '-i':
      return [0, -1, 0]; // |-i⟩ - Y-axis negative
    default:
      return [0, 0, 1];
  }
};

// Represents state as a point on the Bloch sphere
const StateVector = ({ state }: { state: string }) => {
  const [x, y, z] = calculateBlochVector(state);
  
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial 
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

// State point indicators without a label
const StatePoint = ({ position }: { position: [number, number, number] }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.04, 12, 12]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
    </mesh>
  );
};

// Creates the X, Y, Z axes with quantum state labels
const Axes = () => {
  const xPoints = [new THREE.Vector3(-1.2, 0, 0), new THREE.Vector3(1.2, 0, 0)];
  const yPoints = [new THREE.Vector3(0, -1.2, 0), new THREE.Vector3(0, 1.2, 0)];
  const zPoints = [new THREE.Vector3(0, 0, -1.2), new THREE.Vector3(0, 0, 1.2)];
  
  return (
    <>
      {/* X Axis (faint white) - |+⟩ and |-⟩ states */}
      <Line points={xPoints} color="#ffffff" lineWidth={2.0} opacity={0.65} transparent />
      <Html position={[1.3, 0, 0]}>
        <div className="font-mono text-white/80 text-sm whitespace-nowrap bg-black/40 px-1 py-0.5 rounded">|+⟩</div>
      </Html>
      <Html position={[-1.3, 0, 0]}>
        <div className="font-mono text-white/80 text-sm whitespace-nowrap bg-black/40 px-1 py-0.5 rounded">|-⟩</div>
      </Html>
      <StatePoint position={[1, 0, 0]} />
      <StatePoint position={[-1, 0, 0]} />
      
      {/* Y Axis (faint white) - |i⟩ and |-i⟩ states */}
      <Line points={yPoints} color="#ffffff" lineWidth={2.0} opacity={0.65} transparent />
      <Html position={[0, 1.3, 0]}>
        <div className="font-mono text-white/80 text-sm whitespace-nowrap bg-black/40 px-1 py-0.5 rounded">|i⟩</div>
      </Html>
      <Html position={[0, -1.3, 0]}>
        <div className="font-mono text-white/80 text-sm whitespace-nowrap bg-black/40 px-1 py-0.5 rounded">|-i⟩</div>
      </Html>
      <StatePoint position={[0, 1, 0]} />
      <StatePoint position={[0, -1, 0]} />
      
      {/* Z Axis (faint white) - |0⟩ and |1⟩ states */}
      <Line points={zPoints} color="#ffffff" lineWidth={2.0} opacity={0.65} transparent />
      <Html position={[0, 0, 1.3]}>
        <div className="font-mono text-white/80 text-sm whitespace-nowrap bg-black/40 px-1 py-0.5 rounded">|0⟩</div>
      </Html>
      <Html position={[0, 0, -1.3]}>
        <div className="font-mono text-white/80 text-sm whitespace-nowrap bg-black/40 px-1 py-0.5 rounded">|1⟩</div>
      </Html>
      <StatePoint position={[0, 0, 1]} />
      <StatePoint position={[0, 0, -1]} />
      
      
    </>
  );
};

// Rotating Bloch Sphere
const RotatingSphere = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow automatic rotation for better view of the sphere
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    }
  });
  
  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
};

interface BlochSphereProps {
  currentState: string;
}

export default function BlochSphere({ currentState }: BlochSphereProps) {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [3, 3, 3], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <RotatingSphere>
          {/* Subtle whitish-tinted sphere */}
          <Sphere args={[1, 64, 32]}>
            <meshPhysicalMaterial 
              color="#b3c5d7"
              transparent
              opacity={0.12}
              roughness={0.2}
              metalness={0.1}
              clearcoat={0.5}
              clearcoatRoughness={0.2}
              side={THREE.DoubleSide}
            />
          </Sphere>
          
          {/* Bloch sphere axes */}
          <Axes />
          
          {/* State vector representation */}
          <StateVector state={currentState} />
          
          {/* Line from center to state */}
          <Line 
            points={[
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(...calculateBlochVector(currentState))
            ]} 
            color="#22d3ee" 
            lineWidth={2.5}
          />
        </RotatingSphere>
        
        {/* Controls for rotating the view */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3.5}
          maxDistance={7}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
} 