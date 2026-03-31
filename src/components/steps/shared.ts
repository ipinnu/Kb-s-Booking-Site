import type React from 'react';

export const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: 7,
};

export const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '10px 14px',
  color: 'var(--text)',
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  colorScheme: 'dark' as const,
};

export const chipStyle = (selected: boolean): React.CSSProperties => ({
  padding: '7px 15px',
  borderRadius: 20,
  border: `1px solid ${selected ? 'var(--purple3)' : 'var(--border)'}`,
  background: selected ? 'rgba(192,132,200,0.13)' : 'var(--surface)',
  color: selected ? 'var(--purple3)' : 'var(--muted)',
  fontFamily: 'var(--font-dm-sans)',
  fontSize: 13,
  transition: 'all 0.18s ease',
  boxShadow: selected ? '0 0 12px rgba(192,132,200,0.28)' : 'none',
  whiteSpace: 'nowrap' as const,
});

export const primaryBtnStyle = (disabled = false): React.CSSProperties => ({
  width: '100%',
  padding: '13px',
  position: 'relative' as const,
  overflow: 'hidden',
  background: disabled
    ? 'var(--surface)'
    : 'linear-gradient(90deg, var(--purple), var(--purple2), var(--purple3))',
  color: disabled ? 'var(--muted)' : 'var(--text)',
  fontFamily: 'var(--font-bebas-neue)',
  fontSize: 18,
  letterSpacing: '0.12em',
  border: `1px solid ${disabled ? 'var(--border)' : 'var(--purple3)'}`,
  borderRadius: 8,
  opacity: disabled ? 0.5 : 1,
  marginTop: 8,
});

export const backBtnStyle: React.CSSProperties = {
  padding: '13px 20px',
  position: 'relative',
  overflow: 'hidden',
  background: 'transparent',
  color: 'var(--muted)',
  fontFamily: 'var(--font-bebas-neue)',
  fontSize: 18,
  letterSpacing: '0.1em',
  border: '1px solid var(--border)',
  borderRadius: 8,
};

export const stepTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-instrument-serif)',
  fontStyle: 'italic',
  fontSize: 32,
  lineHeight: 1.18,
  color: 'var(--text)',
  marginBottom: 24,
};
