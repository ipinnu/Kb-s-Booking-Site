'use client';

import { useState } from 'react';
import VibeStage from '@/components/VibeStage';
import BookingConsole from '@/components/BookingConsole';
import Cursor from '@/components/Cursor';

export interface BookingData {
  date: string;
  location: string;
  eventType: string;
  hour: string;
  minute: string;
  ampm: string;
  duration: string;
  equipment: string[];
  contact: string;
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingData>({
    date: '',
    location: '',
    eventType: '',
    hour: '10',
    minute: '00',
    ampm: 'PM',
    duration: '',
    equipment: [],
    contact: '',
  });

  const goTo = (n: number) => setStep(n);

  return (
    <div className="page-root">
      <VibeStage />
      <BookingConsole
        step={step}
        formData={formData}
        setFormData={setFormData}
        goTo={goTo}
      />
      <Cursor />
    </div>
  );
}
