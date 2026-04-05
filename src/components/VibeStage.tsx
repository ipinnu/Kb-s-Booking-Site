'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import EQBars from './EQBars';
import VibeBottomBar from './VibeBottomBar';

const CANDIDATE_IMAGES = [
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%281%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%282%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%283%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%284%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%285%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%286%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%287%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%288%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%289%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.34%20PM%20%2810%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.00.41%20PM.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.01.03%20PM.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.01.52%20PM.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.01.52%20PM%20%281%29.jpeg',
  '/images/WhatsApp%20Image%202026-03-28%20at%202.02.04%20PM.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.17%20PM.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.17%20PM%20%281%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.17%20PM%20%282%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.17%20PM%20%283%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.17%20PM%20%284%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.17%20PM%20%285%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%281%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%282%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%283%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%284%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%285%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%286%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%287%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%288%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.18%20PM%20%289%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.19%20PM.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.19%20PM%20%281%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.19%20PM%20%282%29.jpeg',
  '/images/WhatsApp%20Image%202026-04-01%20at%206.57.20%20PM.jpeg',
];


interface Particle { id: number; left: string; size: number; color: string; dur: number; delay: number }
interface Star      { id: number; top: string; left: string; size: number; dur: number; delay: number }

const PARTICLE_COLORS = ['var(--purple)', 'var(--purple3)', 'var(--gold)', 'var(--lilac)'];

const ORB_CFG = [
  { color: '#6f4371', anim: 'orbFloat1 14s ease-in-out infinite', top: '12%', left: '8%',  size: 320 },
  { color: '#3d1f5e', anim: 'orbFloat2 18s ease-in-out infinite', top: '48%', left: '52%', size: 380 },
  { color: '#9b5ca0', anim: 'orbFloat3 11s ease-in-out infinite', top: '68%', left: '18%', size: 270 },
];

export default function VibeStage() {
  const [validImages,  setValidImages]  = useState<string[]>([]);
  const [activeIdx,    setActiveIdx]    = useState(0);
  const [particles,    setParticles]    = useState<Particle[]>([]);
  const [stars,        setStars]        = useState<Star[]>([]);
  const [mounted,      setMounted]      = useState(false);

  /* Probe which images actually exist */
  useEffect(() => {
    setMounted(true);
    const found: string[] = [];
    let pending = CANDIDATE_IMAGES.length;
    CANDIDATE_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.onload  = () => { found.push(src); if (--pending === 0) setValidImages([...found]); };
      img.onerror = () => {                   if (--pending === 0) setValidImages([...found]); };
      img.src = src;
    });
  }, []);

  /* Slideshow interval */
  useEffect(() => {
    if (validImages.length < 2) return;
    const id = setInterval(() => setActiveIdx(i => (i + 1) % validImages.length), 5000);
    return () => clearInterval(id);
  }, [validImages]);


  /* Generate decorative elements client-side to avoid hydration mismatch */
  useEffect(() => {
    setParticles(Array.from({ length: 30 }, (_, i) => ({
      id:    i,
      left:  `${Math.random() * 100}%`,
      size:  Math.random() * 3 + 1,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      dur:   Math.random() * 20 + 8,
      delay: Math.random() * 12,
    })));
    setStars(Array.from({ length: 20 }, (_, i) => ({
      id:    i,
      top:   `${Math.random() * 88}%`,
      left:  `${Math.random() * 94}%`,
      size:  Math.random() * 12 + 8,
      dur:   Math.random() * 4 + 2,
      delay: Math.random() * 4,
    })));
  }, []);

  const hasImages = validImages.length > 0;

  return (
    <div
      className="vibe-stage"
      style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}
    >

      {/* ── Layer 1 · Image slideshow OR orb fallback ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {hasImages ? (
          <>
            {validImages.map((src, i) => (
              <div
                key={src}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: i === activeIdx ? 1 : 0,
                  transition: 'opacity 1.5s ease',
                }}
              >
                <Image src={src} alt="" fill style={{ objectFit: 'cover' }} priority={i === 0} />
              </div>
            ))}
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,6,15,0.60)', zIndex: 2 }} />
          </>
        ) : (
          /* Animated orb fallback */
          ORB_CFG.map((o, i) => (
            <div key={i} style={{
              position: 'absolute', top: o.top, left: o.left,
              width: o.size, height: o.size, borderRadius: '50%',
              background: o.color, filter: 'blur(80px)',
              mixBlendMode: 'screen', animation: o.anim, opacity: 0.65,
            }} />
          ))
        )}
      </div>

      {/* ── Layer 2 · Depth orbs (always) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden', pointerEvents: 'none' }}>
        {ORB_CFG.map((o, i) => (
          <div key={i} style={{
            position: 'absolute', top: o.top, left: o.left,
            width: o.size * 0.85, height: o.size * 0.85, borderRadius: '50%',
            background: o.color, filter: 'blur(90px)',
            mixBlendMode: 'screen', animation: o.anim, opacity: hasImages ? 0.35 : 0,
          }} />
        ))}
      </div>

      {/* ── Layer 3 · Particles ── */}
      {mounted && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none' }}>
          {particles.map(p => (
            <div key={p.id} style={{
              position: 'absolute', bottom: 0, left: p.left,
              width: p.size, height: p.size, borderRadius: '50%',
              background: p.color,
              animation: `pFloat ${p.dur}s ${p.delay}s linear infinite`,
            }} />
          ))}
        </div>
      )}

      {/* ── Layer 4 · Stars ── */}
      {mounted && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, overflow: 'hidden', pointerEvents: 'none' }}>
          {stars.map(s => (
            <span key={s.id} style={{
              position: 'absolute', top: s.top, left: s.left,
              fontSize: s.size, lineHeight: 1, userSelect: 'none',
              animation: `starTwinkle ${s.dur}s ${s.delay}s ease-in-out infinite`,
            }}>⭐</span>
          ))}
        </div>
      )}

      {/* ── Layer 5 · Overlays: grid + diagonals + vignette + scanlines ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(rgba(111,67,113,0.07) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(111,67,113,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Diagonals */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(155,92,160,0.035) 0, rgba(155,92,160,0.035) 1px, transparent 1px, transparent 22px)',
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(10,6,15,0.88) 100%)',
        }} />
        {/* Scanlines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.10) 0px, rgba(0,0,0,0.10) 1px, transparent 1px, transparent 4px)',
        }} />
      </div>

      {/* ── Layer 6 · Content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column',
        padding: '2.5rem 2.5rem 2rem',
      }}>

        {/* ─ Top: Brand ─ */}
        <div>
          <h1
            className="brand-name"
            style={{
              fontFamily: 'var(--font-bebas-neue)',
              fontSize: 'clamp(60px, 7vw, 96px)',
              lineHeight: 0.88,
              letterSpacing: '0.025em',
              background: 'linear-gradient(135deg, #ffffff 0%, var(--purple3) 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 22px rgba(192,132,200,0.55))',
            }}
          >
            KB LA<br />MAESTEA
          </h1>

          <p style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontStyle: 'italic',
            color: 'var(--purple3)',
            fontSize: 20,
            marginTop: 6,
            letterSpacing: '0.04em',
          }}>
            The Experience
          </p>

          <p style={{
            color: 'var(--lilac)',
            fontSize: 12,
            marginTop: 8,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-dm-sans)',
            opacity: 0.85,
          }}>
            🦄 Book Your Night ⭐️
          </p>
        </div>

        {/* ─ Center: Rings + Unicorn + EQ ─ */}
        <div className="vibe-center" style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 16,
        }}>
          {/* Rotating rings */}
          <div style={{
            position: 'relative', width: 170, height: 170,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Outer ring CW */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px dashed rgba(192,132,200,0.45)',
              animation: 'ringRotateCW 12s linear infinite',
            }} />
            {/* Inner ring CCW */}
            <div style={{
              position: 'absolute', inset: 20, borderRadius: '50%',
              border: '1.5px dashed rgba(245,217,142,0.38)',
              animation: 'ringRotateCCW 8s linear infinite',
            }} />
            {/* Innermost accent CCW */}
            <div style={{
              position: 'absolute', inset: 40, borderRadius: '50%',
              border: '1px solid rgba(192,132,200,0.2)',
              animation: 'ringRotateCW 6s linear infinite',
            }} />
            {/* Unicorn */}
            <span style={{
              fontSize: 58,
              animation: 'uFloat 3.2s ease-in-out infinite',
              userSelect: 'none',
              display: 'block',
            }}>🦄</span>
          </div>

          {/* EQ bars */}
          <div style={{ width: 150 }}>
            <EQBars />
          </div>
        </div>

        {/* ─ Bottom: merged wave + player bar ─ */}
        <div className="vibe-bottom">
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 4,
          }}>
            Now Spinning
          </p>
          <VibeBottomBar />
        </div>
      </div>
    </div>
  );
}
