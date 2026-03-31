'use client';

import { useEffect, useState, useMemo } from 'react';

const REF = `MAESTEA-${Math.floor(1000 + Math.random() * 9000)}`;

interface Burst { id: number; x: string; delay: string }

export default function SuccessScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const bursts = useMemo<Burst[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: `${10 + i * 10}%`,
      delay: `${i * 0.08}s`,
    }))
  , []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center', padding: '2rem 1rem',
      opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease',
      position: 'relative', minHeight: 380,
    }}>
      {/* Star bursts */}
      {bursts.map(b => (
        <span key={b.id} style={{
          position: 'absolute', bottom: '55%', left: b.x,
          fontSize: 18, userSelect: 'none',
          animation: `starBurst 1.2s ${b.delay} ease-out forwards`,
          opacity: 0,
        }}>⭐</span>
      ))}

      {/* Icon */}
      <div style={{
        fontSize: 72, lineHeight: 1, marginBottom: 20,
        animation: 'sucPulse 2.5s ease-in-out infinite',
        userSelect: 'none',
      }}>
        🦄⭐️
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: 'var(--font-bebas-neue)',
        fontSize: 52,
        lineHeight: 0.95,
        background: 'linear-gradient(135deg, var(--text), var(--purple3), var(--gold))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 12,
      }}>
        Booking<br />Dropped!
      </h2>

      {/* Subtitle */}
      <p style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: 14,
        color: 'var(--muted)',
        lineHeight: 1.65,
        maxWidth: 300,
        marginBottom: 20,
      }}>
        Your request is in. KB LA MAESTEA will hit you back within{' '}
        <strong style={{ color: 'var(--text)' }}>24 hours</strong> to lock in the vibe. 🎶
      </p>

      {/* Ref badge */}
      <div style={{
        padding: '8px 20px',
        border: '1px solid var(--purple3)',
        borderRadius: 24,
        background: 'rgba(192,132,200,0.08)',
        marginBottom: 16,
      }}>
        <span style={{
          fontFamily: 'var(--font-bebas-neue)',
          fontSize: 15,
          letterSpacing: '0.16em',
          color: 'var(--purple3)',
        }}>REF: {REF}</span>
      </div>

      {/* Email */}
      <a
        href="mailto:kbsvision23@gmail.com"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 13,
          color: 'var(--muted)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
        }}
      >
        kbsvision23@gmail.com
      </a>
    </div>
  );
}
