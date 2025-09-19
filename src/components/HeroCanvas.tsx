'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float waveX = sin((pos.x + uTime * 0.4) * 3.2);
    float waveY = cos((pos.y + uTime * 0.6) * 3.6);
    pos.z += (waveX + waveY) * 0.12;
    pos.x += sin(uTime * 0.5 + pos.y * 2.4) * 0.02;
    pos.y += cos(uTime * 0.45 + pos.x * 2.0) * 0.02;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    float ripple = sin((vUv.x + vUv.y + uTime * 0.3) * 6.0) * 0.1;
    vec3 sage = vec3(0.608, 0.659, 0.553);
    vec3 light = vec3(0.976, 0.976, 0.976);
    vec3 dark = vec3(0.090, 0.090, 0.090);
    vec3 tint = mix(sage, light, vUv.y + ripple);
    vec3 finalColor = mix(dark, tint, 0.65);
    gl_FragColor = vec4(finalColor, 0.85);
  }
`;

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const geometry = new THREE.PlaneGeometry(4.5, 4.5, 256, 256);
    const uniforms = {
      uTime: { value: 0 }
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resize();

    const targetRotation = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let frame = 0;

    const renderLoop = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      mesh.rotation.x += (targetRotation.x - mesh.rotation.x) * 0.06;
      mesh.rotation.y += (targetRotation.y - mesh.rotation.y) * 0.06;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -2;
      gsap.to(targetRotation, {
        x: y * 0.25,
        y: x * 0.25,
        duration: 0.8,
        ease: 'power3.out'
      });
    };

    const handleResize = () => {
      resize();
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

