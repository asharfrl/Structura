"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";

function Network({ count = 180, color = "#000000" }) {
  const gRef = useRef<THREE.BufferGeometry>(null);
  const mRef = useRef<THREE.Points>(null);
  const lRef = useRef<THREE.LineSegments>(null);

  // Generate initial node positions forming "S"
  const [anchors, phases] = useMemo(() => {
    const anchors = [];
    const phases = [];
    while (anchors.length < count) {
      const x = (Math.random() - 0.5) * 3;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 1.5;

      let inside = false;
      // Defines a blocky 'S' shape made of 5 segments
      // Top bar
      if (y >= 1.5 && y <= 2.5 && x >= -1.5 && x <= 1.5) inside = true;
      // Top-Left vertical
      else if (y >= 0.5 && y <= 1.5 && x >= -1.5 && x <= -0.5) inside = true;
      // Middle bar
      else if (y >= -0.5 && y <= 0.5 && x >= -1.5 && x <= 1.5) inside = true;
      // Bottom-Right vertical
      else if (y >= -1.5 && y <= -0.5 && x >= 0.5 && x <= 1.5) inside = true;
      // Bottom bar
      else if (y >= -2.5 && y <= -1.5 && x >= -1.5 && x <= 1.5) inside = true;

      // Small chance to scatter slightly outside for the "broken/blocky" logo feel
      if (!inside && Math.random() < 0.05) {
        if (Math.abs(x) < 2.0 && Math.abs(y) < 3.0) inside = true;
      }

      if (inside) {
        anchors.push(new THREE.Vector3(x, y, z));
        phases.push(new THREE.Vector3(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2));
      }
    }
    return [anchors, phases];
  }, [count]);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    const posAttr = gRef.current?.attributes.position as THREE.BufferAttribute;
    if (!posAttr) return;

    const p = posAttr.array as Float32Array;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      // Jiggle around anchor slowly to enforce the 'S' shape overall
      p[i * 3] = anchors[i].x + Math.sin(time * 0.5 + phases[i].x) * 0.2;
      p[i * 3 + 1] = anchors[i].y + Math.cos(time * 0.5 + phases[i].y) * 0.2;
      p[i * 3 + 2] = anchors[i].z + Math.sin(time * 0.5 + phases[i].z) * 0.2;
    }
    posAttr.needsUpdate = true;

    // Draw dynamic lines linking nearby nodes
    const connections = [];
    const maxDist = 0.9; // threshold for drawing lines
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = p[i * 3] - p[j * 3];
        const dy = p[i * 3 + 1] - p[j * 3 + 1];
        const dz = p[i * 3 + 2] - p[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDist * maxDist) {
          connections.push(
            p[i * 3], p[i * 3 + 1], p[i * 3 + 2],
            p[j * 3], p[j * 3 + 1], p[j * 3 + 2]
          );
        }
      }
    }

    if (lRef.current) {
      lRef.current.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(connections, 3)
      );
    }
  });

  return (
    <group>
      <points ref={mRef}>
        <bufferGeometry ref={gRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        {/* Nodes material: default square shape mimics the blocky S */}
        <pointsMaterial size={0.15} color={color} transparent opacity={0.9} sizeAttenuation />
      </points>

      {/* Edges material */}
      <lineSegments ref={lRef}>
        <bufferGeometry />
        <lineBasicMaterial color={color} transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

export default function Graph3D({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use white for dark mode, black for light mode to match visibility theme
  const color = mounted && resolvedTheme === "light" ? "#000000" : "#ffffff";

  return (
    <div className={`absolute inset-0 aspect-square w-full mx-auto z-0 max-w-[600px] ${className || ""}`}>
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <ambientLight intensity={1} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={1.2} />
        <Network count={200} color={color} />
      </Canvas>
    </div>
  );
}
