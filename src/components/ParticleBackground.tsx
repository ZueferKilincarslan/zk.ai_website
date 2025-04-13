import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    targetX: number;
    targetY: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create initial particles with increased size
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 1.5 + (i * 0.15), // Increased base size and scaling
        targetX: canvas.width / 2,
        targetY: canvas.height / 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update each particle with easing
      particlesRef.current.forEach((particle, index) => {
        const target = index === 0 ? mouseRef.current : {
          x: particlesRef.current[index - 1].x,
          y: particlesRef.current[index - 1].y,
        };

        const easing = 0.15 - (index * 0.01);
        particle.x += (target.x - particle.x) * easing;
        particle.y += (target.y - particle.y) * easing;

        // Draw particle with increased opacity
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${0.9 - (index * 0.05)})`; // Increased opacity
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default ParticleBackground;