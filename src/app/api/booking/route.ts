import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend('re_6k8dxgE3_FJCaYDjKU4jzi5skvjseWVrA');

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { date, location, eventType, startTime, duration, equipment, contact } = body;

  // 1. Save to Supabase
  const { error: dbError } = await supabase.from('bookings').insert({
    date,
    location,
    event_type: eventType,
    start_time: startTime,
    duration,
    equipment,
    contact,
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // 2. Send email via Resend
  const { error: emailError } = await resend.emails.send({
    from: 'KB LA MAESTEA Bookings <Tech@ipinnuoluwa.com.ng>',
    to: 'kbsvision23@gmail.com',
    subject: `🦄 New Booking Request — ${eventType} on ${date}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a060f; color: #f0eaf2; padding: 32px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 36px; margin: 0; color: #c084c8;">KB LA MAESTEA</h1>
          <p style="color: #9b5ca0; margin: 4px 0 0;">New Booking Request 🦄⭐️</p>
        </div>

        <div style="background: #1a1128; border: 1px solid rgba(177,129,178,0.2); border-radius: 10px; padding: 24px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid rgba(177,129,178,0.15);">
              <td style="padding: 10px 0; color: #9b5ca0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 40%;">Date</td>
              <td style="padding: 10px 0; color: #f0eaf2; font-size: 14px;">${date}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(177,129,178,0.15);">
              <td style="padding: 10px 0; color: #9b5ca0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Location</td>
              <td style="padding: 10px 0; color: #f0eaf2; font-size: 14px;">${location}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(177,129,178,0.15);">
              <td style="padding: 10px 0; color: #9b5ca0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Event Type</td>
              <td style="padding: 10px 0; color: #f0eaf2; font-size: 14px;">${eventType}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(177,129,178,0.15);">
              <td style="padding: 10px 0; color: #9b5ca0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Time</td>
              <td style="padding: 10px 0; color: #f0eaf2; font-size: 14px;">${startTime}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(177,129,178,0.15);">
              <td style="padding: 10px 0; color: #9b5ca0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Duration</td>
              <td style="padding: 10px 0; color: #f0eaf2; font-size: 14px;">${duration}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(177,129,178,0.15);">
              <td style="padding: 10px 0; color: #9b5ca0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Equipment</td>
              <td style="padding: 10px 0; color: #f0eaf2; font-size: 14px;">${equipment?.length ? equipment.join(', ') : 'None'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9b5ca0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Contact</td>
              <td style="padding: 10px 0; color: #f5d98e; font-size: 14px; font-weight: bold;">${contact}</td>
            </tr>
          </table>
        </div>

        <p style="text-align: center; color: rgba(240,234,242,0.45); font-size: 13px; margin: 0;">
          Reply to this email or reach out to <strong style="color: #c084c8;">${contact}</strong> within 24 hours.
        </p>
      </div>
    `,
  });

  if (emailError) {
    // Booking saved but email failed — still return success, log the error
    console.error('Email error:', emailError);
  }

  return NextResponse.json({ success: true });
}
