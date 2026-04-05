'use client';

import { useRef, useState, useEffect } from 'react';

const EMBED_URL =
  'https://open.spotify.com/embed/track/0vHeAq4KElneV1ICabcvyr?utm_source=generator&theme=0';

export default function VibeBottomBar() {
  const iframeRef  = useRef<HTMLIFrameElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const phase      = useRef(0);
  const [playing, setPlaying] = useState(false);

  const send = (cmd: 'play' | 'pause') =>
    iframeRef.current?.contentWindow?.postMessage({ command: cmd }, '*');

  const handlePlay = () => { send('play');  setPlaying(true);  };
  const handleStop = () => { send('pause'); setPlaying(false); };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Speed up wave when playing
      const speed = playing ? 0.055 : 0.028;

      // ── filled glow wave (bottom layer) ─────────────────────────────────
      const fillGrad = ctx.createLinearGradient(0, 0, W, 0);
      fillGrad.addColorStop(0,    'transparent');
      fillGrad.addColorStop(0.18, 'rgba(111,67,113,0.08)');
      fillGrad.addColorStop(0.5,  'rgba(155,92,160,0.13)');
      fillGrad.addColorStop(0.82, 'rgba(245,217,142,0.06)');
      fillGrad.addColorStop(1,    'transparent');

      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const t  = x / W;
        // Bell-curve envelope: wave is fullest in the center
        const env = Math.sin(t * Math.PI);
        const amp = playing ? H * 0.42 * env : H * 0.28 * env;
        const y =
          H * 0.52 +
          Math.sin(t * Math.PI * 5  + phase.current)       * amp * 0.60 +
          Math.sin(t * Math.PI * 9  + phase.current * 1.4) * amp * 0.25 +
          Math.sin(t * Math.PI * 2.5 + phase.current * 0.6) * amp * 0.15;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // ── secondary ghost wave ─────────────────────────────────────────────
      const ghostGrad = ctx.createLinearGradient(0, 0, W, 0);
      ghostGrad.addColorStop(0,    'transparent');
      ghostGrad.addColorStop(0.2,  'rgba(192,132,200,0.09)');
      ghostGrad.addColorStop(0.55, 'rgba(245,217,142,0.12)');
      ghostGrad.addColorStop(0.8,  'rgba(155,92,160,0.07)');
      ghostGrad.addColorStop(1,    'transparent');

      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const t   = x / W;
        const env = Math.sin(t * Math.PI);
        const amp = playing ? H * 0.32 * env : H * 0.18 * env;
        const y =
          H * 0.48 +
          Math.sin(t * Math.PI * 7  + phase.current * 1.1 + 1.2) * amp * 0.55 +
          Math.sin(t * Math.PI * 12 + phase.current * 1.7 + 0.5) * amp * 0.25 +
          Math.sin(t * Math.PI * 3  + phase.current * 0.5 + 2.1) * amp * 0.20;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.fillStyle = ghostGrad;
      ctx.fill();

      // ── crisp top-line stroke ────────────────────────────────────────────
      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0,    'transparent');
      lineGrad.addColorStop(0.12, `rgba(192,132,200,${playing ? 0.75 : 0.45})`);
      lineGrad.addColorStop(0.5,  `rgba(155,92,160,${playing ? 1    : 0.7})`);
      lineGrad.addColorStop(0.85, `rgba(245,217,142,${playing ? 0.8  : 0.45})`);
      lineGrad.addColorStop(1,    'transparent');

      ctx.strokeStyle = lineGrad;
      ctx.lineWidth   = playing ? 1.8 : 1.3;
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const t   = x / W;
        const env = Math.sin(t * Math.PI);
        const amp = playing ? H * 0.42 * env : H * 0.28 * env;
        const y =
          H * 0.52 +
          Math.sin(t * Math.PI * 5  + phase.current)       * amp * 0.60 +
          Math.sin(t * Math.PI * 9  + phase.current * 1.4) * amp * 0.25 +
          Math.sin(t * Math.PI * 2.5 + phase.current * 0.6) * amp * 0.15;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase.current += speed;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>

      {/* Hidden Spotify iframe — audio only */}
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <iframe
          ref={iframeRef}
          src={EMBED_URL}
          width="1"
          height="1"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>

      {/* Wave canvas — full width, sits behind everything */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Player row — floats on top of the canvas */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(8px, 2.5vw, 16px)',
        padding: 'clamp(10px, 2vw, 16px) 0 clamp(18px, 3.5vw, 28px)',
      }}>

        {/* Spinning disc */}
        <div style={{
          width:  'clamp(36px, 5.5vw, 46px)',
          height: 'clamp(36px, 5.5vw, 46px)',
          borderRadius: '50%',
          flexShrink: 0,
          background: 'linear-gradient(135deg, var(--purple) 0%, var(--purple3) 60%, var(--gold) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(16px, 3vw, 22px)',
          animation: playing ? 'ringRotateCW 4s linear infinite' : 'none',
          boxShadow: playing
            ? '0 0 22px rgba(192,132,200,0.7), 0 0 8px rgba(192,132,200,0.4)'
            : '0 0 8px rgba(111,67,113,0.4)',
          transition: 'box-shadow 0.4s ease',
        }}>
          🎵
        </div>

        {/* Track info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 'clamp(7px, 1.2vw, 9px)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 3,
          }}>
            {playing ? 'Now Playing' : 'On Deck'}
          </p>
          <p style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(13px, 2.2vw, 17px)',
            color: playing ? 'var(--purple3)' : 'var(--lilac)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'color 0.3s ease',
          }}>
            KB La Maestea
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
          <button
            onClick={handlePlay}
            style={{
              width:  'clamp(30px, 4.5vw, 38px)',
              height: 'clamp(30px, 4.5vw, 38px)',
              borderRadius: '50%',
              border: 'none',
              background: playing
                ? 'linear-gradient(135deg, var(--purple) 0%, var(--purple3) 100%)'
                : 'rgba(111,67,113,0.35)',
              color: '#fff',
              fontSize: 'clamp(10px, 1.8vw, 14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: playing ? '0 0 16px rgba(192,132,200,0.55)' : 'none',
              transition: 'background 0.25s ease, box-shadow 0.25s ease',
            }}
            aria-label="Play"
          >
            ▶
          </button>

          <button
            onClick={handleStop}
            style={{
              width:  'clamp(30px, 4.5vw, 38px)',
              height: 'clamp(30px, 4.5vw, 38px)',
              borderRadius: '50%',
              border: '1px solid rgba(192,132,200,0.2)',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--muted)',
              fontSize: 'clamp(9px, 1.5vw, 12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            aria-label="Stop"
          >
            ■
          </button>
        </div>
      </div>
    </div>
  );
}
