'use client';

import { useRef, useEffect } from 'react';

export default function Waveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const phase     = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight || 48;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0,    'transparent');
      grad.addColorStop(0.15, 'rgba(192,132,200,0.7)');
      grad.addColorStop(0.5,  'rgba(155,92,160,1)');
      grad.addColorStop(0.82, 'rgba(245,217,142,0.75)');
      grad.addColorStop(1,    'transparent');

      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.5;
      ctx.beginPath();

      for (let x = 0; x <= w; x++) {
        const t = x / w;
        const y =
          h / 2 +
          Math.sin(t * Math.PI * 6  + phase.current)       * (h * 0.22) +
          Math.sin(t * Math.PI * 10 + phase.current * 1.3) * (h * 0.10) +
          Math.sin(t * Math.PI * 3  + phase.current * 0.7) * (h * 0.08);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase.current += 0.035;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: 48 }}
    />
  );
}
