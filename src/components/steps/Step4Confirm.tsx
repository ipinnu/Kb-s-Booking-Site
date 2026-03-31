'use client';

import type { BookingData } from '@/app/page';
import { backBtnStyle, stepTitleStyle } from './shared';

interface Props {
  formData: BookingData;
  setFormData: React.Dispatch<React.SetStateAction<BookingData>>;
  onNext: () => void;
  onBack: () => void;
  submitting?: boolean;
  submitError?: string | null;
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    padding: '9px 0', borderBottom: '1px solid var(--border)', gap: 12,
  }}>
    <span style={{
      fontFamily: 'var(--font-dm-sans)', fontSize: 11,
      letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)',
      flexShrink: 0, paddingTop: 1,
    }}>{label}</span>
    <span style={{
      fontFamily: 'var(--font-dm-sans)', fontSize: 14,
      color: 'var(--text)', textAlign: 'right',
    }}>{value || '—'}</span>
  </div>
);

export default function Step4Confirm({ formData, onNext, onBack, submitting, submitError }: Props) {
  const timeStr = formData.hour
    ? `${formData.hour}:${formData.minute} ${formData.ampm}`
    : '—';

  return (
    <div>
      <h3 style={stepTitleStyle}>Confirm<br />&amp; drop 🎶</h3>

      {/* Summary card */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '4px 16px 8px', marginBottom: 16,
      }}>
        <Row label="Date"      value={formData.date} />
        <Row label="Location"  value={formData.location} />
        <Row label="Event"     value={formData.eventType} />
        <Row label="Time"      value={timeStr} />
        <Row label="Duration"  value={formData.duration} />
        <Row label="Equipment" value={formData.equipment.length ? formData.equipment.join(', ') : 'None'} />
        <Row label="Contact"   value={formData.contact} />
      </div>

      {/* What happens next */}
      <div style={{
        background: 'rgba(245,217,142,0.05)',
        border: '1px solid rgba(245,217,142,0.2)',
        borderRadius: 10, padding: '14px 16px', marginBottom: 20,
      }}>
        <p style={{
          fontFamily: 'var(--font-dm-sans)', fontSize: 10,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: 6,
        }}>⭐ What Happens Next</p>
        <p style={{
          fontFamily: 'var(--font-dm-sans)', fontSize: 13,
          color: 'var(--muted)', lineHeight: 1.65,
        }}>
          Your booking request lands straight in the inbox. KB LA MAESTEA will personally
          review your details and reach out within <strong style={{ color: 'var(--text)' }}>24 hours</strong> to
          confirm availability, discuss the vibe, and lock in the night. 🦄
        </p>
      </div>

      {/* Error message */}
      {submitError && (
        <div style={{
          background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 14,
          fontFamily: 'var(--font-dm-sans)', fontSize: 13, color: '#ff6b6b',
        }}>
          ⚠ {submitError}
        </div>
      )}

      {/* Nav */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="nav-btn" onClick={onBack} disabled={submitting} style={backBtnStyle}>‹</button>
        <button
          className="nav-btn"
          onClick={onNext}
          disabled={submitting}
          style={{
            flex: 1,
            padding: '13px',
            position: 'relative',
            overflow: 'hidden',
            background: submitting
              ? 'var(--surface)'
              : 'linear-gradient(90deg, var(--purple), var(--purple2), var(--purple3), var(--gold))',
            backgroundSize: '200% auto',
            color: submitting ? 'var(--muted)' : 'var(--bg)',
            fontFamily: 'var(--font-bebas-neue)',
            fontSize: 18,
            letterSpacing: '0.14em',
            border: submitting ? '1px solid var(--border)' : 'none',
            borderRadius: 8,
            fontWeight: 700,
            transition: 'all 0.2s',
          }}
        >
          {submitting ? 'SENDING...' : '🦄 DROP THE BOOKING'}
        </button>
      </div>
    </div>
  );
}
