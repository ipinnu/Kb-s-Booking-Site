'use client';

import { useState } from 'react';
import type { BookingData } from '@/app/page';
import { labelStyle, inputStyle, chipStyle, primaryBtnStyle, backBtnStyle, stepTitleStyle } from './shared';

interface Props {
  formData: BookingData;
  setFormData: React.Dispatch<React.SetStateAction<BookingData>>;
  onNext: () => void;
  onBack: () => void;
}

const EQUIPMENT = ['DJ Decks', 'Speakers', 'Mixer', 'Microphone', 'Lighting', 'None Needed'];

export default function Step3Logistics({ formData, setFormData, onNext, onBack }: Props) {
  const [contactError, setContactError] = useState(false);

  const toggleEquipment = (item: string) => {
    setFormData(f => {
      const eq = f.equipment.includes(item)
        ? f.equipment.filter(e => e !== item)
        : [...f.equipment, item];
      return { ...f, equipment: eq };
    });
  };

  const handleNext = () => {
    if (!formData.contact.trim()) {
      setContactError(true);
      return;
    }
    setContactError(false);
    onNext();
  };

  return (
    <div>
      <h3 style={stepTitleStyle}>Logistics &amp;<br />equipment</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Equipment multi-select */}
        <div>
          <span style={labelStyle}>Equipment Required</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {EQUIPMENT.map(item => (
              <button
                key={item}
                className="chip-btn"
                onClick={() => toggleEquipment(item)}
                style={chipStyle(formData.equipment.includes(item))}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Contact (required) */}
        <label>
          <span style={{ ...labelStyle, color: contactError ? '#ff6b6b' : undefined }}>
            Contact Details{contactError && ' — required'}
          </span>
          <input
            type="text"
            className="booking-input"
            placeholder="Email or phone number"
            value={formData.contact}
            onChange={e => {
              setContactError(false);
              setFormData(f => ({ ...f, contact: e.target.value }));
            }}
            style={{
              ...inputStyle,
              borderColor: contactError ? '#ff6b6b' : undefined,
              boxShadow: contactError ? '0 0 0 3px rgba(255,107,107,0.12)' : undefined,
            }}
          />
        </label>

        {/* Nav */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="nav-btn" onClick={onBack} style={backBtnStyle}>‹</button>
          <button
            className="nav-btn"
            onClick={handleNext}
            style={{ ...primaryBtnStyle(false), flex: 1, marginTop: 0 }}
          >
            NEXT ›
          </button>
        </div>
      </div>
    </div>
  );
}
