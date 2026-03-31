'use client';

import { useMemo } from 'react';

interface Bar { lo: number; hi: number; dur: string; delay: string }

export default function EQBars() {
  const bars = useMemo<Bar[]>(() =>
    Array.from({ length: 12 }, () => ({
      lo:    Math.floor(Math.random() * 8  + 3),   // 3–11 px
      hi:    Math.floor(Math.random() * 28 + 14),  // 14–42 px
      dur:   (Math.random() * 0.5  + 0.22).toFixed(2) + 's',
      delay: (Math.random() * 0.35).toFixed(2)     + 's',
    }))
  , []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: 3,
      height: 48,
      width: '100%',
    }}>
      {bars.map((b, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            minWidth: 4,
            background: 'linear-gradient(to top, var(--purple), var(--purple3), var(--gold))',
            borderRadius: '2px 2px 0 0',
            '--lo':  `${b.lo}px`,
            '--hi':  `${b.hi}px`,
            animation: `eqBounce ${b.dur} ${b.delay} ease-in-out infinite alternate`,
            height: `${b.lo}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
