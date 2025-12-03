'use client';

import { useEffect, useRef } from 'react';

class Star {
  id: number;
  x: number;
  y: number;
  radius: number;
  alpha: number;
  velocity: number;

  constructor(id: number, w: number, h: number) {
    this.id = id;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random();
    this.alpha = Math.random();
    this.velocity = 0.02 * this.radius; // <- movement speed
  }

  onUpdate(ctx: CanvasRenderingContext2D, time: number) {
    this.alpha = Math.abs(0.8 * Math.sin(time * 0.5 + this.id)); // (time * 0.5 + this.id) <- blinking speed
    this.x -= this.velocity;

    if (this.x <= 0) {
      this.x = window.innerWidth;
    }

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  onResize(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
  }
}

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Star[]>([]);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationFrameId: number;

    // Reduce star count on mobile for better performance
    const isMobile = window.innerWidth < 1024;
    const starsCounter = isMobile ? 300 : 500;

    const init = () => {
      const maxW = window.innerWidth;
      const maxH = window.innerHeight;

      canvas.width = maxW;
      canvas.height = maxH;

      for (let i = 0; i < starsCounter; i++) {
        const star = new Star(i, maxW, maxH);
        particlesRef.current.push(star);
      }

      window.addEventListener('resize', onResize, false);

      animate();
    };

    // Debounced resize handler
    const onResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        const maxW = window.innerWidth;
        const maxH = window.innerHeight;

        canvas.width = maxW;
        canvas.height = maxH;

        particlesRef.current.forEach((particle) => particle.onResize(maxW, maxH));
      }, 150);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      // Use performance.now() for better performance
      const time = 0.00075 * performance.now();
      const maxW = canvas.width;
      const maxH = canvas.height;

      ctx.clearRect(0, 0, maxW, maxH);

      particlesRef.current.forEach((particle) => {
        particle.onUpdate(ctx, time);
      });
    };

    init();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute inset-0 w-full h-full bg-black'
      id='star-field'
      style={{ willChange: 'transform' }}
    />
  );
}
