import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'motion/react';
import { Sparkles, Eye, Pause, Play } from 'lucide-react';

interface Hero3DCanvasProps {
  onInteraction?: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ onInteraction }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(true);
  const [lanternCount, setLanternCount] = useState(6);
  const [webglSupported, setWebglSupported] = useState(true);

  // References to keep track across re-renders
  const animFrameIdRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lanternsRef = useRef<{ mesh: THREE.Group; light: THREE.PointLight; basePos: THREE.Vector3; freq: number; phase: number }[]>([]);
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const dustParticlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0e231c, 0.04);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Handle Context Lost & Restored
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
    const handleContextRestored = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // 4. Ambient and Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xd9c3a5, 0.6);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xe4d6c1, 0.8);
    moonLight.position.set(5, 8, -4);
    scene.add(moonLight);

    // 5. 3D Serene Water Surface of Lake Badi
    const waterGeo = new THREE.PlaneGeometry(28, 20, 48, 48);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x091713,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: false,
      transparent: true,
      opacity: 0.72,
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -0.6;
    scene.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // 6. Floating Royal Sandstone & Brass Lanterns (Diyas)
    const lanternList: typeof lanternsRef.current = [];

    const createLantern = (x: number, y: number, z: number, phase: number, colorHex: number) => {
      const group = new THREE.Group();

      // Sandstone Base (octagonal tapered tier)
      const baseGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.08, 8);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0xb89e7c,
        roughness: 0.7,
        metalness: 0.2,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      group.add(baseMesh);

      // Muted Brass Lantern Cage
      const cageGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.22, 8, 1, true);
      const cageMat = new THREE.MeshStandardMaterial({
        color: 0xc5a880,
        metalness: 0.8,
        roughness: 0.3,
        wireframe: true,
      });
      const cageMesh = new THREE.Mesh(cageGeo, cageMat);
      cageMesh.position.y = 0.14;
      group.add(cageMesh);

      // Glowing Inner Flame Core
      const flameGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const flameMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.95,
      });
      const flameMesh = new THREE.Mesh(flameGeo, flameMat);
      flameMesh.position.y = 0.14;
      group.add(flameMesh);

      // Lotus Petals Ring floating on water
      const petalsGeo = new THREE.RingGeometry(0.2, 0.32, 12);
      const petalsMat = new THREE.MeshStandardMaterial({
        color: 0xd9c3a5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const petalsMesh = new THREE.Mesh(petalsGeo, petalsMat);
      petalsMesh.rotation.x = -Math.PI / 2;
      petalsMesh.position.y = -0.04;
      group.add(petalsMesh);

      // Real 3D Point Light illuminating the water & surroundings
      const pointLight = new THREE.PointLight(colorHex, 1.8, 3.8);
      pointLight.position.y = 0.16;
      group.add(pointLight);

      group.position.set(x, y, z);
      scene.add(group);

      return {
        mesh: group,
        light: pointLight,
        basePos: new THREE.Vector3(x, y, z),
        freq: 0.8 + Math.random() * 0.4,
        phase,
      };
    };

    // Pre-populate with tranquil floating diyas along the lake view line
    const initialPositions = [
      { x: -2.2, z: 0.6, color: 0xffb74d },
      { x: -0.8, z: 1.6, color: 0xffa726 },
      { x: 1.1, z: 0.9, color: 0xffcc80 },
      { x: 2.3, z: -0.4, color: 0xffb74d },
      { x: -1.7, z: -1.0, color: 0xffa000 },
      { x: 0.4, z: -0.8, color: 0xffd54f },
    ];

    initialPositions.forEach((pos, idx) => {
      const lantern = createLantern(pos.x, -0.4, pos.z, idx * 1.1, pos.color);
      lanternList.push(lantern);
    });
    lanternsRef.current = lanternList;

    // 7. 3D Golden Amber Stardust & Floating Petals Particle Field
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3 + 0] = (Math.random() - 0.5) * 16;
      posArray[i * 3 + 1] = Math.random() * 5 - 0.5;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10 + 1;
      scaleArray[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a880,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    dustParticlesRef.current = particles;

    // 8. Pointer Movement & Parallax Tracking
    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX * 0.35;
      mouseRef.current.targetY = normY * 0.25;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 9. Resize Handling
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // If reduced motion is requested, render static frame and halt loop updates
      if (shouldReduceMotion) {
        renderer.render(scene, camera);
        return;
      }

      // Smooth camera lerp based on pointer parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      camera.position.x = mouseRef.current.x;
      camera.position.y = 1.2 + mouseRef.current.y;
      camera.lookAt(0, 0.4, 0);

      // Animate floating lanterns with gentle water bobbing and harmonic rotation
      lanternsRef.current.forEach((item) => {
        const t = elapsedTime * item.freq + item.phase;
        item.mesh.position.y = item.basePos.y + Math.sin(t) * 0.045;
        item.mesh.rotation.y = Math.sin(t * 0.5) * 0.25;
        item.mesh.rotation.z = Math.cos(t * 0.8) * 0.04;

        // Subtle gentle flame flicker
        item.light.intensity = 1.7 + Math.sin(elapsedTime * 6 + item.phase) * 0.35;
      });

      // Animate Lake Badi water vertices
      if (waterMeshRef.current) {
        const positions = (waterMeshRef.current.geometry as THREE.BufferGeometry).attributes.position;
        const count = positions.count;
        for (let i = 0; i < count; i++) {
          const u = positions.getX(i);
          const v = positions.getY(i);
          // Gentle radial water ripples
          const z = Math.sin(u * 0.6 + elapsedTime * 0.9) * 0.04 + Math.cos(v * 0.5 + elapsedTime * 0.7) * 0.03;
          positions.setZ(i, z);
        }
        positions.needsUpdate = true;
      }

      // Slowly drift golden stardust particles
      if (dustParticlesRef.current) {
        dustParticlesRef.current.rotation.y = elapsedTime * 0.015;
        const positions = (dustParticlesRef.current.geometry as THREE.BufferGeometry).attributes.position;
        const count = positions.count;
        for (let i = 0; i < count; i++) {
          let y = positions.getY(i);
          y += Math.sin(elapsedTime + i) * 0.001;
          positions.setY(i, y);
        }
        positions.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      waterGeo.dispose();
      waterMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [shouldReduceMotion]);

  // Handle click to spawn an interactive 3D floating diya/lantern on Lake Badi
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sceneRef.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Convert mouse to normalized 3D plane coordinates
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const spawnX = normX * 3.5;
    const spawnZ = (1 - (normY + 1) / 2) * 3 - 0.5;

    // Create subtle new lantern
    const group = new THREE.Group();
    const baseGeo = new THREE.CylinderGeometry(0.16, 0.22, 0.07, 8);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xb89e7c, roughness: 0.7 });
    group.add(new THREE.Mesh(baseGeo, baseMat));

    const flameGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb74d, transparent: true, opacity: 0.95 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.12;
    group.add(flame);

    const pointLight = new THREE.PointLight(0xffb74d, 2.0, 3.5);
    pointLight.position.y = 0.14;
    group.add(pointLight);

    group.position.set(spawnX, -0.4, spawnZ);
    sceneRef.current.add(group);

    lanternsRef.current.push({
      mesh: group,
      light: pointLight,
      basePos: new THREE.Vector3(spawnX, -0.4, spawnZ),
      freq: 0.9,
      phase: Math.random() * Math.PI,
    });

    setLanternCount((prev) => prev + 1);
    if (onInteraction) onInteraction();
  };

  const toggleAnimation = () => {
    if (isPlaying) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  if (!webglSupported) return null;

  return (
    <div className="absolute inset-0 z-[5] pointer-events-auto overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        title="Interactive 3D Spatial Lake: Click anywhere to release a floating diya"
        className="w-full h-full cursor-crosshair"
      />

      {/* Subtle, restrained floating 3D status & interaction indicator */}
      <div className="absolute top-24 right-6 sm:right-12 z-20 hidden md:flex items-center gap-2.5 bg-[#091713]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#C5A880]/25 text-[11px] text-[#F7F4EE]/80 shadow-md">
        <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-subtle" />
        <span className="font-medium text-[#C5A880]">3D Spatial Lake Badi</span>
        <span className="text-[#F7F4EE]/40">·</span>
        <span className="text-[#F7F4EE]/70 font-light">Interactive Parallax · Click to float diya ({lanternCount})</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAnimation();
          }}
          className="p-1 hover:text-[#C5A880] text-white/60 ml-1 focus:outline-none"
          aria-label={isPlaying ? 'Pause 3D animation' : 'Resume 3D animation'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
