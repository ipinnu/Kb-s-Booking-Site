'use client';

import type { BookingData } from '@/app/page';
import { labelStyle, inputStyle, chipStyle, primaryBtnStyle, stepTitleStyle } from './shared';

interface Props {
  formData: BookingData;
  setFormData: React.Dispatch<React.SetStateAction<BookingData>>;
  onNext: () => void;
  onBack: () => void;
}

const EVENT_TYPES = ['Club Night', 'Private Party', 'Wedding', 'Corporate', 'Festival', 'Other'];

export default function Step1Event({ formData, setFormData, onNext }: Props) {
  const canProceed = !!(formData.date && formData.location && formData.eventType);

  return (
    <div>
      <h3 style={stepTitleStyle}>Tell me about<br />the event</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Date */}
        <label>
          <span style={labelStyle}>Date of Event</span>
          <input
            type="date"
            className="booking-input"
            value={formData.date}
            onChange={e => setFormData(f => ({ ...f, date: e.target.value }))}
            style={inputStyle}
          />
        </label>

        {/* Location */}
        <label>
          <span style={labelStyle}>Location of Event</span>
          <input
            type="text"
            className="booking-input"
            placeholder="City, venue or address..."
            value={formData.location}
            onChange={e => setFormData(f => ({ ...f, location: e.target.value }))}
            style={inputStyle}
          />
        </label>

        {/* Event Type chips */}
        <div>
          <span style={labelStyle}>Event Type</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
            {EVENT_TYPES.map(type => (
              <button
                key={type}
                className="chip-btn"
                onClick={() => setFormData(f => ({ ...f, eventType: type }))}
                style={chipStyle(formData.eventType === type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          className="nav-btn"
          onClick={onNext}
          disabled={!canProceed}
          style={primaryBtnStyle(!canProceed)}
        >
          NEXT ›
        </button>
      </div>
    </div>
  );
}
