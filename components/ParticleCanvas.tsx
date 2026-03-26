'use client';

import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      targetCanvas: HTMLCanvasElement;
      targetCtx: CanvasRenderingContext2D;

      constructor(c: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        this.targetCanvas = c;
        this.targetCtx = context;
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * -0.5 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y < 0) {
          this.y = this.targetCanvas.height;
          this.x = Math.random() * this.targetCanvas.width;
        }
        if (this.x < 0 || this.x > this.targetCanvas.width) {
          this.speedX = -this.speedX;
        }
      }

      draw() {
        this.targetCtx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`; // brand-gold
        this.targetCtx.beginPath();
        this.targetCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.targetCtx.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < 70; i++) {
        if (canvas && ctx) {
          particles.push(new Particle(canvas, ctx));
        }
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(canvas);

    const animate = () => {
      if (isVisible && ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
