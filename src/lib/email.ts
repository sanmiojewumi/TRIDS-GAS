import nodemailer from 'nodemailer';
import { getSiteSettings } from './settings';
import { cleanText, escapeHtml } from './security';

const OFFICIAL_EMAIL = 'tridsgasandplumbing@gmail.com';

// Transporter configuration: Supports SMTP env vars or fallback logger transporter
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || '';
  const pass = process.env.SMTP_PASS || process.env.GMAIL_PASS || '';

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Fallback for development/testing when SMTP credentials are not yet added to env
  return null;
}

export interface SendEnquiryNotificationParams {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  message: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
}

export interface SendBookingNotificationParams {
  customerName: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  date: string;
  time: string;
  notes?: string | null;
}

// 1. Dispatch Enquiry / Quote Request Notification Email
export async function sendEnquiryEmailNotification(params: SendEnquiryNotificationParams) {
  const settings = await getSiteSettings();
  const recipientEmail = settings.email || OFFICIAL_EMAIL;
  const safe = {
    name: escapeHtml(params.name),
    phone: escapeHtml(params.phone),
    email: escapeHtml(params.email),
    postcode: escapeHtml(params.postcode),
    service: escapeHtml(params.service),
    message: escapeHtml(params.message).replace(/\r?\n/g, '<br>'),
    preferredDate: escapeHtml(params.preferredDate || ''),
    preferredTime: escapeHtml(params.preferredTime || 'Flexible'),
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Quote Request - ${settings.companyName}</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #070d1e; color: #f8fafc; margin: 0; padding: 20px; }
        .card { background-color: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; max-width: 600px; margin: 0 auto; padding: 24px; }
        .header { border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 20px; }
        .title { color: #ffffff; font-size: 20px; font-weight: bold; }
        .badge { background-color: #f59e0b; color: #070d1e; font-weight: bold; padding: 4px 10px; border-radius: 8px; font-size: 12px; }
        .row { margin-bottom: 12px; }
        .label { color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { color: #ffffff; font-size: 15px; font-weight: 600; margin-top: 2px; }
        .box { background-color: #070d1e; border: 1px solid #1e3a8a; padding: 14px; border-radius: 12px; margin-top: 16px; }
        .footer { margin-top: 24px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #1e3a8a; padding-top: 12px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <span class="badge">NEW QUOTE ENQUIRY</span>
          <div class="title" style="margin-top: 8px;">${settings.companyName}</div>
        </div>

        <div class="row">
          <div class="label">Customer Name</div>
          <div class="value">${safe.name}</div>
        </div>

        <div class="row">
          <div class="label">Phone Number</div>
          <div class="value">${safe.phone}</div>
        </div>

        <div class="row">
          <div class="label">Email Address</div>
          <div class="value">${safe.email}</div>
        </div>

        <div class="row">
          <div class="label">Postcode / Location</div>
          <div class="value">${safe.postcode}</div>
        </div>

        <div class="row">
          <div class="label">Requested Service</div>
          <div class="value" style="color: #f59e0b;">${safe.service}</div>
        </div>

        ${params.preferredDate ? `
        <div class="row">
          <div class="label">Preferred Date & Time</div>
          <div class="value">${safe.preferredDate} (${safe.preferredTime})</div>
        </div>
        ` : ''}

        <div class="box">
          <div class="label" style="margin-bottom: 4px;">Job Description & Notes</div>
          <div class="value" style="color: #e2e8f0; font-weight: normal; font-size: 14px; line-height: 1.5;">${safe.message}</div>
        </div>

        <div class="footer">
          Received via TRIDS Gas & Plumbing Official Site • Gas Safe Reg ${settings.gasSafeNumber}
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${settings.companyName} Web Portal" <${OFFICIAL_EMAIL}>`,
    to: recipientEmail,
    subject: `NEW ENQUIRY: ${cleanText(params.service, 80)} - ${cleanText(params.name, 80)} (${cleanText(params.postcode, 12)})`.replace(/[\r\n]/g, ''),
    html: htmlContent,
  };

  try {
    const transporter = getTransporter();
    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log(`[EMAIL DISPATCH SUCCESS] Enquiry notification sent to ${recipientEmail}`);
    } else {
      console.log(`[EMAIL NOTIFICATION LOGGED] Target: ${recipientEmail} | Subject: ${mailOptions.subject}`);
    }
  } catch (error) {
    console.error(`[EMAIL DISPATCH ERROR] Failed to send enquiry email:`, error);
  }
}

// 2. Dispatch Online Booking Notification Email
export async function sendBookingEmailNotification(params: SendBookingNotificationParams) {
  const settings = await getSiteSettings();
  const recipientEmail = settings.email || OFFICIAL_EMAIL;
  const safe = {
    customerName: escapeHtml(params.customerName),
    phone: escapeHtml(params.phone),
    email: escapeHtml(params.email),
    postcode: escapeHtml(params.postcode),
    service: escapeHtml(params.service),
    date: escapeHtml(params.date),
    time: escapeHtml(params.time),
    notes: escapeHtml(params.notes || '').replace(/\r?\n/g, '<br>'),
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Online Booking - ${settings.companyName}</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #070d1e; color: #f8fafc; margin: 0; padding: 20px; }
        .card { background-color: #0f1c3f; border: 1px solid #1e3a8a; border-radius: 16px; max-width: 600px; margin: 0 auto; padding: 24px; }
        .header { border-bottom: 2px solid #10b981; padding-bottom: 12px; margin-bottom: 20px; }
        .title { color: #ffffff; font-size: 20px; font-weight: bold; }
        .badge { background-color: #10b981; color: #070d1e; font-weight: bold; padding: 4px 10px; border-radius: 8px; font-size: 12px; }
        .row { margin-bottom: 12px; }
        .label { color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { color: #ffffff; font-size: 15px; font-weight: 600; margin-top: 2px; }
        .box { background-color: #070d1e; border: 1px solid #1e3a8a; padding: 14px; border-radius: 12px; margin-top: 16px; }
        .footer { margin-top: 24px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #1e3a8a; padding-top: 12px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <span class="badge">NEW APPOINTMENT BOOKED</span>
          <div class="title" style="margin-top: 8px;">${settings.companyName}</div>
        </div>

        <div class="row">
          <div class="label">Customer Name</div>
          <div class="value">${safe.customerName}</div>
        </div>

        <div class="row">
          <div class="label">Booked Service</div>
          <div class="value" style="color: #f59e0b;">${safe.service}</div>
        </div>

        <div class="row">
          <div class="label">Date & Time Slot</div>
          <div class="value" style="color: #10b981; font-size: 17px;">${safe.date} at ${safe.time}</div>
        </div>

        <div class="row">
          <div class="label">Phone Number</div>
          <div class="value">${safe.phone}</div>
        </div>

        <div class="row">
          <div class="label">Email Address</div>
          <div class="value">${safe.email}</div>
        </div>

        <div class="row">
          <div class="label">Postcode / Address</div>
          <div class="value">${safe.postcode}</div>
        </div>

        ${params.notes ? `
        <div class="box">
          <div class="label" style="margin-bottom: 4px;">Access Notes / Comments</div>
          <div class="value" style="color: #e2e8f0; font-weight: normal; font-size: 14px; line-height: 1.5;">${safe.notes}</div>
        </div>
        ` : ''}

        <div class="footer">
          Received via TRIDS Gas & Plumbing Official Site • Gas Safe Reg ${settings.gasSafeNumber}
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${settings.companyName} Web Portal" <${OFFICIAL_EMAIL}>`,
    to: recipientEmail,
    subject: `BOOKING REQUEST: ${cleanText(params.service, 80)} - ${cleanText(params.date, 10)} ${cleanText(params.time, 5)} (${cleanText(params.customerName, 80)})`.replace(/[\r\n]/g, ''),
    html: htmlContent,
  };

  try {
    const transporter = getTransporter();
    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log(`[EMAIL DISPATCH SUCCESS] Booking notification sent to ${recipientEmail}`);
    } else {
      console.log(`[EMAIL NOTIFICATION LOGGED] Target: ${recipientEmail} | Subject: ${mailOptions.subject}`);
    }
  } catch (error) {
    console.error(`[EMAIL DISPATCH ERROR] Failed to send booking email:`, error);
  }
}
