'use client';

import { useRef, useState } from 'react';

const EMBED_URL =
  'https://open.spotify.com/embed/track/0vHeAq4KElneV1ICabcvyr?utm_source=generator&theme=0';

export default function SpotifyPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);

  const send = (cmd: 'play' | 'pause') =>
    iframeRef.current?.contentWindow?.postMessage({ command: cmd }, '*');

  const handlePlay = () => { send('play');  setPlaying(true);  };
  const handleStop = () => { send('pause'); setPlaying(false); };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(19,13,30,0.95) 0%, rgba(30,17,45,0.9) 100%)',
      border: `1px solid ${playing ? 'rgba(192,132,200,0.45)' : 'rgba(192,132,200,0.15)'}`,
      borderRadius: 14,
      padding: '14px 16px',
      backdropFilter: 'blur(12px)',
      boxShadow: playing
        ? '0 0 28px rgba(111,67,113,0.55), inset 0 0 24px rgba(111,67,113,0.06)'
        : '0 2px 16px rgba(0,0,0,0.4)',
      transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
    }}>

      {/* Hidden iframe — loaded but invisible, used only for audio */}
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

      {/* Player row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>

        {/* Disc */}
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, var(--purple) 0%, var(--purple3) 60%, var(--gold) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20,
          animation: playing ? 'ringRotateCW 4s linear infinite' : 'none',
          boxShadow: playing
            ? '0 0 18px rgba(192,132,200,0.6)'
            : '0 0 8px rgba(111,67,113,0.35)',
          transition: 'box-shadow 0.35s ease',
        }}>
          🎵
        </div>

        {/* Track info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 9,
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
            fontSize: 16,
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
              width: 36, height: 36, borderRadius: '50%',
              border: 'none',
              background: playing
                ? 'linear-gradient(135deg, var(--purple) 0%, var(--purple3) 100%)'
                : 'rgba(111,67,113,0.35)',
              color: '#fff',
              fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none',
              boxShadow: playing ? '0 0 14px rgba(192,132,200,0.5)' : 'none',
              transition: 'background 0.25s ease, box-shadow 0.25s ease',
            }}
            aria-label="Play"
          >
            ▶
          </button>

          <button
            onClick={handleStop}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid rgba(192,132,200,0.2)',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--muted)',
              fontSize: 11,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'none',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            aria-label="Stop"
          >
            ■
          </button>
        </div>
      </div>

      {/* Pulse bar when playing */}
      {playing && (
        <div style={{
          marginTop: 10,
          height: 2,
          borderRadius: 1,
          background: 'linear-gradient(90deg, var(--purple), var(--purple3), var(--gold))',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }} />
      )}
    </div>
  );
}
