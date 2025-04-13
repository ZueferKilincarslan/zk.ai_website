import React, { useEffect, useRef } from 'react';

const NetworkGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Increase canvas size for better quality
    const size = 400;
    canvas.width = size;
    canvas.height = size;

    // Points around the globe
    const points: { x: number; y: number; z: number; connections: number[] }[] = [];
    const numPoints = 50;
    const radius = size * 0.35;

    // Create points
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.random() * Math.PI;
      
      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        connections: []
      });
    }

    // Create connections
    points.forEach((point, i) => {
      for (let j = i + 1; j < points.length; j++) {
        const distance = Math.sqrt(
          Math.pow(point.x - points[j].x, 2) +
          Math.pow(point.y - points[j].y, 2) +
          Math.pow(point.z - points[j].z, 2)
        );
        if (distance < radius * 0.8) {
          point.connections.push(j);
        }
      }
    });

    let rotation = 0;
    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      // Rotate points
      rotation += 0.005;
      const rotatedPoints = points.map(point => ({
        ...point,
        x: point.x * Math.cos(rotation) - point.z * Math.sin(rotation),
        z: point.x * Math.sin(rotation) + point.z * Math.cos(rotation)
      }));

      // Draw connections with increased line width and opacity
      ctx.lineWidth = 1.5; // Increased from 1
      rotatedPoints.forEach((point, i) => {
        point.connections.forEach(j => {
          const connected = rotatedPoints[j];
          const depth = (point.z + connected.z) / 2;
          const alpha = Math.max(0, (radius - Math.abs(depth)) / radius);
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.35})`; // Increased from 0.2
          ctx.moveTo(point.x + size/2, point.y + size/2);
          ctx.lineTo(connected.x + size/2, connected.y + size/2);
          ctx.stroke();
        });
      });

      // Draw points with increased size and opacity
      rotatedPoints.forEach(point => {
        const depth = Math.max(0, (radius - Math.abs(point.z)) / radius);
        ctx.fillStyle = `rgba(168, 85, 247, ${depth * 0.9})`; // Increased from 0.8
        ctx.beginPath();
        ctx.arc(point.x + size/2, point.y + size/2, 2.5, 0, Math.PI * 2); // Increased from 2
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
};

export default NetworkGlobe;