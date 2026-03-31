'use client';

import type { BookingData } from '@/app/page';
import { labelStyle, inputStyle, chipStyle, primaryBtnStyle, backBtnStyle, stepTitleStyle } from './shared';

interface Props {
  formData: BookingData;
  setFormData: React.Dispatch<React.SetStateAction<BookingData>>;
  onNext: () => void;
  onBack: () => void;
}

const HOURS   = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = ['00', '15', '30', '45'];
const DURATIONS = ['1 Hour', '2 Hours', '3 Hours', '4 Hours', '5+ Hours', 'All Night'];

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  width: 'auto',
  flex: 1,
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c084c8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: 30,
};

export default function Step2Time({ formData, setFormData, onNext, onBack }: Props) {
  const canProceed = !!(formData.hour && formData.duration);

  return (
    <div>
      <h3 style={stepTitleStyle}>Set the time<br />&amp; duration</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Time row */}
        <div>
          <span style={labelStyle}>Set Time</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            {/* Hour */}
            <select
              className="booking-input"
              value={formData.hour}
              onChange={e => setFormData(f => ({ ...f, hour: e.target.value }))}
              style={selectStyle}
            >
              <option value="">HH</option>
              {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>

            <span style={{ color: 'var(--muted)', fontSize: 18, fontFamily: 'var(--font-bebas-neue)' }}>:</span>

            {/* Minute */}
            <select
              className="booking-input"
              value={formData.minute}
              onChange={e => setFormData(f => ({ ...f, minute: e.target.value }))}
              style={selectStyle}
            >
              {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            {/* AM/PM toggle */}
            <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
              {(['AM', 'PM'] as const).map(ap => (
                <button
                  key={ap}
                  className="chip-btn"
                  onClick={() => setFormData(f => ({ ...f, ampm: ap }))}
                  style={{
                    padding: '10px 14px',
                    background: formData.ampm === ap ? 'rgba(192,132,200,0.15)' : 'var(--surface)',
                    color: formData.ampm === ap ? 'var(--purple3)' : 'var(--muted)',
                    fontFamily: 'var(--font-bebas-neue)',
                    fontSize: 15,
                    letterSpacing: '0.05em',
                    border: 'none',
                    borderRight: ap === 'AM' ? '1px solid var(--border)' : 'none',
                    transition: 'all 0.18s',
                  }}
                >
                  {ap}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Duration chips */}
        <div>
          <span style={labelStyle}>Duration</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {DURATIONS.map(d => (
              <button
                key={d}
                className="chip-btn"
                onClick={() => setFormData(f => ({ ...f, duration: d }))}
                style={chipStyle(formData.duration === d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="nav-btn" onClick={onBack} style={backBtnStyle}>‹</button>
          <button
            className="nav-btn"
            onClick={onNext}
            disabled={!canProceed}
            style={{ ...primaryBtnStyle(!canProceed), flex: 1, marginTop: 0 }}
          >
            NEXT ›
          </button>
        </div>
      </div>
    </div>
  );
}
