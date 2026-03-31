'use client';

import { useState } from 'react';
import type { BookingData } from '@/app/page';
import { supabase } from '@/lib/supabase';
import Step1Event     from './steps/Step1Event';
import Step2Time      from './steps/Step2Time';
import Step3Logistics from './steps/Step3Logistics';
import Step4Confirm   from './steps/Step4Confirm';
import SuccessScreen  from './SuccessScreen';

interface Props {
  step: number;
  formData: BookingData;
  setFormData: React.Dispatch<React.SetStateAction<BookingData>>;
  goTo: (n: number) => void;
}

const STEP_LABELS = ['Event', 'Details', 'Logistics', 'Confirm'];

export default function BookingConsole({ step, formData, setFormData, goTo }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [flashKey,    setFlashKey]    = useState(0);
  const [flashing,    setFlashing]    = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const progress = step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;

  const djDrop = () => {
    setFlashing(true);
    setFlashKey(k => k + 1);
    setTimeout(() => setFlashing(false), 550);
  };

  const nav = (n: number) => { djDrop(); goTo(n); };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase.from('bookings').insert({
      date:        formData.date,
      location:    formData.location,
      event_type:  formData.eventType,
      start_time:  `${formData.hour}:${formData.minute} ${formData.ampm}`,
      duration:    formData.duration,
      equipment:   formData.equipment,
      contact:     formData.contact,
    });

    setSubmitting(false);

    if (error) {
      setSubmitError(error.message);
      return;
    }

    djDrop();
    setTimeout(() => setShowSuccess(true), 320);
  };

  return (
    <div
      className="console-panel"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--panel)',
        borderLeft: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Top purple glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 220,
        background: 'linear-gradient(to bottom, rgba(111,67,113,0.22), transparent)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* DJ flash overlay */}
      {flashing && (
        <div
          key={flashKey}
          style={{
            position: 'fixed', inset: 0,
            background: 'radial-gradient(ellipse at 70% 40%, rgba(155,92,160,0.72) 0%, transparent 65%)',
            animation: 'flashPop 0.55s ease forwards',
            pointerEvents: 'none',
            zIndex: 9990,
          }}
        />
      )}

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* ─── Header ─── */}
        <div style={{ padding: '1.6rem 1.8rem 1rem' }}>
          {/* macOS dots */}
          <div style={{ display: 'flex', gap: 7, marginBottom: 18 }}>
            {['#ff6b6b', '#ffd93d', '#6bcb77'].map(c => (
              <div key={c} style={{
                width: 12, height: 12, borderRadius: '50%', background: c,
                boxShadow: `0 0 8px ${c}55`,
              }} />
            ))}
          </div>

          {/* Eyebrow */}
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: 10,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--purple3)', marginBottom: 4,
          }}>Booking Console</p>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-bebas-neue)', fontSize: 36,
            background: 'linear-gradient(90deg, var(--text) 0%, var(--purple3) 55%, var(--gold) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            lineHeight: 1.05, marginBottom: 8,
          }}>
            Lock in your date 🎛️
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: 13,
            color: 'var(--muted)', marginBottom: 18, lineHeight: 1.65,
          }}>
            Fill in your event details and we&apos;ll get back to you within 24 hours.{' '}
            <a href="mailto:kbsvision23@gmail.com"
              style={{ color: 'var(--purple3)', textDecoration: 'none' }}>
              kbsvision23@gmail.com
            </a>
          </p>

          {/* Progress bar */}
          <div style={{
            height: 2, background: 'rgba(240,234,242,0.06)',
            borderRadius: 1, marginBottom: 10, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--purple), var(--purple3), var(--gold))',
              transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
              borderRadius: 1,
            }} />
          </div>

          {/* Step labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {STEP_LABELS.map((label, i) => {
              const s = i + 1;
              const color = s < step ? 'var(--gold)' : s === step ? 'var(--purple3)' : 'var(--muted)';
              return (
                <span key={label} style={{
                  fontFamily: 'var(--font-dm-sans)', fontSize: 11,
                  color, letterSpacing: '0.04em', transition: 'color 0.35s',
                }}>{label}</span>
              );
            })}
          </div>
        </div>

        {/* ─── Form body ─── */}
        <div style={{ flex: 1, padding: '0.5rem 1.8rem 1.5rem' }}>
          {showSuccess ? (
            <SuccessScreen />
          ) : (
            <div key={step} style={{ animation: 'fadeUp 0.45s ease forwards' }}>
              {step === 1 && (
                <Step1Event
                  formData={formData} setFormData={setFormData}
                  onNext={() => nav(2)} onBack={() => {}}
                />
              )}
              {step === 2 && (
                <Step2Time
                  formData={formData} setFormData={setFormData}
                  onNext={() => nav(3)} onBack={() => nav(1)}
                />
              )}
              {step === 3 && (
                <Step3Logistics
                  formData={formData} setFormData={setFormData}
                  onNext={() => nav(4)} onBack={() => nav(2)}
                />
              )}
              {step === 4 && (
                <Step4Confirm
                  formData={formData} setFormData={setFormData}
                  onNext={handleSubmit} onBack={() => nav(3)}
                  submitting={submitting} submitError={submitError}
                />
              )}
            </div>
          )}
        </div>

        {/* ─── Footer ─── */}
        <div style={{
          padding: '0.9rem 1.8rem',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: '#6bcb77',
              animation: 'fBlink 2.2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-dm-sans)', fontSize: 11,
              color: 'var(--muted)', letterSpacing: '0.04em',
            }}>Live Booking System</span>
          </div>
          <a href="mailto:kbsvision23@gmail.com" style={{
            fontFamily: 'var(--font-dm-sans)', fontSize: 11,
            color: 'var(--faint)', textDecoration: 'none',
          }}>kbsvision23@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
