import { Resend } from 'resend';

export interface EnquiryData {
  tourId: string;
  tourTitle: string;
  activities?: string[];
  travelers?: number;
  adults?: number;
  children?: number;
  when?: string;
  budget?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

export async function sendEnquiryEmail(data: EnquiryData): Promise<{ success: boolean; messageId?: string }> {
  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'noreply@springbokexpeditions.com';
  const toEmail = import.meta.env.RESEND_TO_EMAIL || process.env.RESEND_TO_EMAIL || 'info@springbokexpeditions.com';

  const formattedActivities = data.activities && data.activities.length > 0
    ? data.activities.map(a => a.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(', ')
    : 'None selected';

  let travelersBreakdown = 'Not specified';
  if (data.travelers) {
    travelersBreakdown = `${data.travelers} ${data.travelers === 1 ? 'traveler' : 'travelers'}`;
    if (data.adults || data.children !== undefined) {
      const parts = [];
      if (data.adults) parts.push(`${data.adults} ${data.adults === 1 ? 'adult' : 'adults'}`);
      if (data.children !== undefined && data.children > 0) parts.push(`${data.children} ${data.children === 1 ? 'child' : 'children'}`);
      if (parts.length > 0) {
        travelersBreakdown += ` (${parts.join(', ')})`;
      }
    }
  }

  // Build the Internal Notification HTML (Inlined CSS with Light Theme matching Logo)
  const internalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Tour Enquiry: ${data.tourTitle}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #475569; background-color: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <!-- Logo Centered on White Header with Logo-Gold Accent Border -->
        <div style="background-color: #ffffff; padding: 32px 24px; text-align: center; border-bottom: 3px solid #bfa38a;">
          <img src="https://springbokexpeditions.com/logo.png" alt="Springbok Expeditions" style="height: 56px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="margin: 16px 0 0 0; font-size: 20px; font-weight: 700; color: #3d2a1d; letter-spacing: 0.05em; text-transform: uppercase;">New Custom Quote Request</h1>
        </div>
        <div style="padding: 32px 24px;">
          <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569;">You have received a new tour enquiry from the website.</p>
          
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 28px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; width: 35%; vertical-align: top;">Tour Name</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${data.tourTitle}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Customer Name</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Email</th>
              <td style="text-align: left; padding: 12px 8px; font-size: 15px;"><a href="mailto:${data.email}" style="color: #3d2a1d; text-decoration: underline; font-weight: 600;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Phone/WhatsApp</th>
              <td style="text-align: left; padding: 12px 8px; font-size: 15px;">${data.phone ? `<a href="tel:${data.phone}" style="color: #3d2a1d; text-decoration: underline; font-weight: 600;">${data.phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Travelers</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${travelersBreakdown}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Travel Dates</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${data.when || 'Not specified'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Budget Per Person</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${data.budget || 'Not specified'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Selected Activities</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-size: 15px;">${formattedActivities}</td>
            </tr>
          </table>

          <h3 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 700; color: #3d2a1d; text-transform: uppercase; letter-spacing: 0.02em;">User Message / Notes:</h3>
          <div style="background: #f8fafc; border-left: 4px solid #bfa38a; padding: 16px; border-radius: 6px; font-style: italic; color: #475569; font-size: 15px;">
            ${data.message ? data.message.replace(/\n/g, '<br>') : 'No additional notes provided.'}
          </div>
        </div>
        <div style="text-align: center; padding: 24px; font-size: 12px; color: #8a7a71; border-top: 1px solid #f1f5f9; background: #f8fafc;">
          This message was sent automatically from the Springbok Expeditions website enquiry system.
        </div>
      </div>
    </body>
    </html>
  `;

  // Build the Customer Confirmation HTML (Warm, welcoming, matching logo color palettes)
  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank you for contacting Springbok Expeditions</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #475569; background-color: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <!-- Logo Centered on White Header with Gold Border Accent -->
        <div style="background-color: #ffffff; padding: 36px 24px; text-align: center; border-bottom: 3px solid #bfa38a;">
          <img src="https://springbokexpeditions.com/logo.png" alt="Springbok Expeditions" style="height: 56px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="margin: 16px 0 4px 0; font-size: 22px; font-weight: 700; color: #3d2a1d;">Jambo ${data.name}!</h1>
          <p style="margin: 0; font-size: 14px; color: #bfa38a; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">We've received your custom quote request</p>
        </div>
        <div style="padding: 32px 24px;">
          <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #3d2a1d;">Thank you for your interest in exploring Tanzania with Springbok Expeditions!</p>
          <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569;">Our safari and trekking planners in Arusha are already reviewing your preferences to construct a custom quote and day-by-day itinerary tailored precisely to you. We typically get back to you within 24 hours (and often much quicker during East Africa business hours).</p>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h4 style="margin: 0 0 14px 0; color: #3d2a1d; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Enquiry Details</h4>
            <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; width: 35%; vertical-align: top;">Tour Package</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${data.tourTitle}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Travelers</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${travelersBreakdown}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Preferred Dates</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${data.when || 'Not specified'}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Activities</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${formattedActivities}</td>
              </tr>
            </table>
          </div>

          <p style="margin: 0 0 16px 0; font-size: 15px; color: #475569;">If you want to make immediate adjustments, add extra details, or speak directly with our team in Arusha, you can chat with us on WhatsApp right away:</p>
          <div style="text-align: center; margin: 24px 0 28px 0;">
            <a href="https://wa.me/255784136616?text=${encodeURIComponent(`Hi Springbok! My name is ${data.name} and I just submitted a custom quote request for the "${data.tourTitle}" tour. Let's chat!`)}" 
               style="display: inline-block; background-color: #bfa38a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px rgba(191, 163, 138, 0.2); transition: background-color 0.2s ease-in-out;" 
               target="_blank" rel="noopener">Chat with us on WhatsApp</a>
          </div>

          <p style="margin: 0 0 8px 0; font-size: 15px; color: #475569;">We look forward to giving you a warm welcome to Tanzania very soon!</p>
          <p style="margin: 0; font-size: 15px; color: #475569;">Best regards,<br><strong style="color: #3d2a1d;">The Springbok Expeditions Team</strong></p>
        </div>
        <div style="text-align: center; padding: 32px 24px; font-size: 12px; color: #8a7a71; border-top: 1px solid #f1f5f9; background: #f8fafc; line-height: 1.8;">
          <p style="margin: 0 0 4px 0; font-weight: 600; color: #3d2a1d; font-size: 13px;">Springbok Expeditions Ltd.</p>
          <p style="margin: 0 0 8px 0;">Arusha, Tanzania | <a href="mailto:info@springbokexpeditions.com" style="color: #bfa38a; text-decoration: underline;">info@springbokexpeditions.com</a></p>
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">You received this automated email to confirm your quote request submission on springbokexpeditions.com.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Local console / mock email delivery if API key is not set
  if (!apiKey || apiKey.includes('replace_with_your_resend_api_key') || apiKey === '') {
    console.log('\n================== MOCK RESEND EMAIL START ==================');
    console.log(`[FROM]: ${fromEmail}`);
    console.log(`[TO/INTERNAL]: ${toEmail}`);
    console.log(`[TO/CUSTOMER]: ${data.email}`);
    console.log(`[SUBJECT - INTERNAL]: New Tour Enquiry: ${data.tourTitle}`);
    console.log(`[SUBJECT - CUSTOMER]: Thank you for contacting Springbok Expeditions`);
    console.log('----------------- INTERNAL NOTIFICATION HTML -----------------');
    console.log(internalHtml.trim());
    console.log('------------------- CUSTOMER CONFIRMATION HTML -------------------');
    console.log(customerHtml.trim());
    console.log('=================== MOCK RESEND EMAIL END ===================\n');
    return { success: true, messageId: 'mock-message-id' };
  }

  try {
    const resendClient = new Resend(apiKey);

    // 1. Send Internal Alert
    const internalRes = await resendClient.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Tour Enquiry: ${data.tourTitle} - ${data.name}`,
      html: internalHtml,
      replyTo: data.email,
    });

    if (internalRes.error) {
      console.error('[Resend] Error sending internal notification email:', internalRes.error);
      throw new Error(`Failed to send internal email: ${internalRes.error.message}`);
    }

    // 2. Send Customer Auto-Reply
    try {
      await resendClient.emails.send({
        from: fromEmail,
        to: data.email,
        subject: `Thank you for contacting Springbok Expeditions`,
        html: customerHtml,
      });
    } catch (customerErr) {
      console.error('[Resend] Failed to send customer auto-reply confirmation:', customerErr);
    }

    return { success: true, messageId: internalRes.data?.id };
  } catch (err: any) {
    console.error('[Resend] API error:', err);
    return { success: false };
  }
}

export interface PlanTripData {
  tripType: string;
  destinations?: string[];
  addons?: string[];
  adults?: number;
  kids?: number;
  budget?: string;
  dates?: string;
  duration?: string;
  accommodation?: string;
  activities?: string[];
  details?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export async function sendPlanTripEmail(data: PlanTripData): Promise<{ success: boolean; messageId?: string }> {
  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'noreply@springbokexpeditions.com';
  const toEmail = import.meta.env.RESEND_TO_EMAIL || process.env.RESEND_TO_EMAIL || 'info@springbokexpeditions.com';

  const tripTypeLabels: Record<string, string> = {
    safari: 'Wildlife Safari',
    trekking: 'Trekking Climb',
    zanzibar: 'Zanzibar Beach',
    combined: 'Combined Safari',
  };
  const tripTypeDisplay = tripTypeLabels[data.tripType] || data.tripType;

  const formattedDestinations = data.destinations && data.destinations.length > 0
    ? data.destinations.map(d => d.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(', ')
    : 'None selected';

  const formattedAddons = data.addons && data.addons.length > 0
    ? data.addons.map(a => a.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(', ')
    : 'None selected';

  const formattedActivities = data.activities && data.activities.length > 0
    ? data.activities.map(a => a.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(', ')
    : 'None selected';

  const accommodationLabels: Record<string, string> = {
    luxury: 'Luxury',
    'mid-range': 'Mid-range',
    budget: 'Budget',
    mixed: 'Flexible',
  };
  const accommodationDisplay = data.accommodation ? (accommodationLabels[data.accommodation] || data.accommodation) : 'Not specified';

  const budgetLabels: Record<string, string> = {
    'under-2000': 'Under $2,000/person',
    '2000-4000': '$2,000–$4,000/person',
    '4000-6000': '$4,000–$6,000/person',
    '6000-10000': '$6,000–$10,000/person',
    '10000-plus': '$10,000+/person',
    flexible: 'Flexible budget',
  };
  const budgetDisplay = data.budget ? (budgetLabels[data.budget] || data.budget) : 'Not specified';

  const durationLabels: Record<string, string> = {
    '1-5': '1–5 days',
    '6-10': '6–10 days',
    '11-15': '11–15 days',
    '16-plus': '16+ days',
    flexible: 'Flexible duration',
  };
  const durationDisplay = data.duration ? (durationLabels[data.duration] || data.duration) : 'Not specified';

  const fullName = `${data.firstName} ${data.lastName}`;
  const travelersBreakdown = `${data.adults || 1} adult${data.adults !== 1 ? 's' : ''}${data.kids ? `, ${data.kids} kid${data.kids !== 1 ? 's' : ''}` : ''}`;

  // Build the Internal Notification HTML
  const internalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Custom Trip Plan Request</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #475569; background-color: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <!-- Logo Centered on White Header with Logo-Gold Accent Border -->
        <div style="background-color: #ffffff; padding: 32px 24px; text-align: center; border-bottom: 3px solid #bfa38a;">
          <img src="https://springbokexpeditions.com/logo.png" alt="Springbok Expeditions" style="height: 56px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="margin: 16px 0 0 0; font-size: 20px; font-weight: 700; color: #3d2a1d; letter-spacing: 0.05em; text-transform: uppercase;">New Custom Trip Plan</h1>
        </div>
        <div style="padding: 32px 24px;">
          <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569;">You have received a new custom trip plan request from the website builder.</p>
          
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 28px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; width: 35%; vertical-align: top;">Trip Type</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${tripTypeDisplay}</td>
            </tr>
            ${data.destinations && data.destinations.length > 0 ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Destinations</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${formattedDestinations}</td>
            </tr>` : ''}
            ${data.addons && data.addons.length > 0 ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Add-ons</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${formattedAddons}</td>
            </tr>` : ''}
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Customer Name</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Email</th>
              <td style="text-align: left; padding: 12px 8px; font-size: 15px;"><a href="mailto:${data.email}" style="color: #3d2a1d; text-decoration: underline; font-weight: 600;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Phone/WhatsApp</th>
              <td style="text-align: left; padding: 12px 8px; font-size: 15px;">${data.phone ? `<a href="tel:${data.phone}" style="color: #3d2a1d; text-decoration: underline; font-weight: 600;">${data.phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Travelers</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${travelersBreakdown}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Proposed Dates</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${data.dates || 'Not specified'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Duration</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${durationDisplay}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Budget Level</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${budgetDisplay}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Accommodation</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${accommodationDisplay}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Selected Activities</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-size: 15px;">${formattedActivities}</td>
            </tr>
          </table>

          <h3 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 700; color: #3d2a1d; text-transform: uppercase; letter-spacing: 0.02em;">Custom Request Details:</h3>
          <div style="background: #f8fafc; border-left: 4px solid #bfa38a; padding: 16px; border-radius: 6px; font-style: italic; color: #475569; font-size: 15px;">
            ${data.details ? data.details.replace(/\n/g, '<br>') : 'No additional details provided.'}
          </div>
        </div>
        <div style="text-align: center; padding: 24px; font-size: 12px; color: #8a7a71; border-top: 1px solid #f1f5f9; background: #f8fafc;">
          This message was sent automatically from the Springbok Expeditions Trip Builder.
        </div>
      </div>
    </body>
    </html>
  `;

  // Build the Customer Confirmation HTML
  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>We are building your custom Tanzania itinerary</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #475569; background-color: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <!-- Logo Centered on White Header with Gold Border Accent -->
        <div style="background-color: #ffffff; padding: 36px 24px; text-align: center; border-bottom: 3px solid #bfa38a;">
          <img src="https://springbokexpeditions.com/logo.png" alt="Springbok Expeditions" style="height: 56px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="margin: 16px 0 4px 0; font-size: 22px; font-weight: 700; color: #3d2a1d;">Jambo ${data.firstName}!</h1>
          <p style="margin: 0; font-size: 14px; color: #bfa38a; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">We've received your custom trip details</p>
        </div>
        <div style="padding: 32px 24px;">
          <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #3d2a1d;">Thank you for planning your custom trip with Springbok Expeditions!</p>
          <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569;">Our travel planners in Arusha are reviewing your design to craft a comprehensive, tailor-made day-by-day itinerary proposal. We will email your proposal within 24 hours (usually much faster during East Africa business hours).</p>
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <h4 style="margin: 0 0 14px 0; color: #3d2a1d; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Your Custom Trip Profile</h4>
            <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; width: 35%; vertical-align: top;">Trip Type</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${tripTypeDisplay}</td>
              </tr>
              ${data.destinations && data.destinations.length > 0 ? `
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Destinations</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${formattedDestinations}</td>
              </tr>` : ''}
              ${data.addons && data.addons.length > 0 ? `
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Add-ons</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${formattedAddons}</td>
              </tr>` : ''}
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Travelers</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${travelersBreakdown}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Proposed Dates</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${data.dates || 'Not specified'}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Duration</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${durationDisplay}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Budget Level</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${budgetDisplay}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Accommodation</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${accommodationDisplay}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 6px 0; color: #8a7a71; font-weight: 500; vertical-align: top;">Activities</th>
                <td style="text-align: left; padding: 6px 0; color: #3d2a1d; font-weight: 600;">${formattedActivities}</td>
              </tr>
            </table>
          </div>

          <p style="margin: 0 0 16px 0; font-size: 15px; color: #475569;">If you want to immediately adjust details or talk directly to our safari designers in Arusha, feel free to start a chat with us on WhatsApp:</p>
          <div style="text-align: center; margin: 24px 0 28px 0;">
            <a href="https://wa.me/255784136616?text=${encodeURIComponent(`Hi Springbok! My name is ${fullName} and I just built a custom "${tripTypeDisplay}" trip. Let's talk about my options!`)}" 
               style="display: inline-block; background-color: #bfa38a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px rgba(191, 163, 138, 0.2); transition: background-color 0.2s ease-in-out;" 
               target="_blank" rel="noopener">Chat with us on WhatsApp</a>
          </div>

          <p style="margin: 0 0 8px 0; font-size: 15px; color: #475569;">We are excited to build your dream trip to East Africa!</p>
          <p style="margin: 0; font-size: 15px; color: #475569;">Warm regards,<br><strong style="color: #3d2a1d;">The Springbok Expeditions Team</strong></p>
        </div>
        <div style="text-align: center; padding: 32px 24px; font-size: 12px; color: #8a7a71; border-top: 1px solid #f1f5f9; background: #f8fafc; line-height: 1.8;">
          <p style="margin: 0 0 4px 0; font-weight: 600; color: #3d2a1d; font-size: 13px;">Springbok Expeditions Ltd.</p>
          <p style="margin: 0 0 8px 0;">Arusha, Tanzania | <a href="mailto:info@springbokexpeditions.com" style="color: #bfa38a; text-decoration: underline;">info@springbokexpeditions.com</a></p>
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">You received this automated email to confirm your custom trip preferences on springbokexpeditions.com.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!apiKey || apiKey.includes('replace_with_your_resend_api_key') || apiKey === '') {
    console.log('\n================== MOCK PLAN TRIP EMAIL START ==================');
    console.log(`[FROM]: ${fromEmail}`);
    console.log(`[TO/INTERNAL]: ${toEmail}`);
    console.log(`[TO/CUSTOMER]: ${data.email}`);
    console.log(`[SUBJECT - INTERNAL]: New Custom Trip Plan: ${tripTypeDisplay} - ${fullName}`);
    console.log(`[SUBJECT - CUSTOMER]: We are building your custom Tanzania itinerary`);
    console.log('----------------- INTERNAL NOTIFICATION HTML -----------------');
    console.log(internalHtml.trim());
    console.log('------------------- CUSTOMER CONFIRMATION HTML -------------------');
    console.log(customerHtml.trim());
    console.log('=================== MOCK PLAN TRIP EMAIL END ===================\n');
    return { success: true, messageId: 'mock-message-id' };
  }

  try {
    const resendClient = new Resend(apiKey);

    const internalRes = await resendClient.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Custom Trip Plan: ${tripTypeDisplay} - ${fullName}`,
      html: internalHtml,
      replyTo: data.email,
    });

    if (internalRes.error) {
      console.error('[Resend] Error sending internal plan email:', internalRes.error);
      throw new Error(`Failed to send internal email: ${internalRes.error.message}`);
    }

    try {
      await resendClient.emails.send({
        from: fromEmail,
        to: data.email,
        subject: `We are building your custom Tanzania itinerary`,
        html: customerHtml,
      });
    } catch (customerErr) {
      console.error('[Resend] Failed to send customer plan confirmation:', customerErr);
    }

    return { success: true, messageId: internalRes.data?.id };
  } catch (err: any) {
    console.error('[Resend] API error:', err);
    return { success: false };
  }
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  message: string;
}

export async function sendContactEmail(data: ContactData): Promise<{ success: boolean; messageId?: string }> {
  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'noreply@springbokexpeditions.com';
  const toEmail = import.meta.env.RESEND_TO_EMAIL || process.env.RESEND_TO_EMAIL || 'info@springbokexpeditions.com';

  const internalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New General Inquiry</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #475569; background-color: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <!-- Logo Centered on White Header with Logo-Gold Accent Border -->
        <div style="background-color: #ffffff; padding: 32px 24px; text-align: center; border-bottom: 3px solid #bfa38a;">
          <img src="https://springbokexpeditions.com/logo.png" alt="Springbok Expeditions" style="height: 56px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="margin: 16px 0 0 0; font-size: 20px; font-weight: 700; color: #3d2a1d; letter-spacing: 0.05em; text-transform: uppercase;">New General Inquiry</h1>
        </div>
        <div style="padding: 32px 24px;">
          <p style="margin: 0 0 20px 0; font-size: 16px;">You have received a new general inquiry from the contact form.</p>
          
          <table style="border-collapse: collapse; width: 100%; margin-bottom: 28px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; width: 35%; vertical-align: top;">Customer Name</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Email</th>
              <td style="text-align: left; padding: 12px 8px; font-size: 15px;"><a href="mailto:${data.email}" style="color: #3d2a1d; text-decoration: underline; font-weight: 600;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Phone/WhatsApp</th>
              <td style="text-align: left; padding: 12px 8px; font-size: 15px;">${data.phone ? `<a href="tel:${data.phone}" style="color: #3d2a1d; text-decoration: underline; font-weight: 600;">${data.phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <th style="text-align: left; padding: 12px 8px; color: #8a7a71; font-weight: 500; font-size: 14px; vertical-align: top;">Country</th>
              <td style="text-align: left; padding: 12px 8px; color: #3d2a1d; font-weight: 600; font-size: 15px;">${data.country || 'Not provided'}</td>
            </tr>
          </table>

          <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #3d2a1d; text-transform: uppercase; letter-spacing: 0.02em;">User Custom Message:</h3>
          <div style="background: #f8fafc; border-left: 4px solid #bfa38a; padding: 16px; border-radius: 6px; font-style: italic; color: #475569; font-size: 15px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <div style="text-align: center; padding: 24px; font-size: 12px; color: #8a7a71; border-top: 1px solid #f1f5f9; background: #f8fafc;">
          This message was sent automatically from the Springbok Expeditions website contact form.
        </div>
      </div>
    </body>
    </html>
  `;

  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank you for contacting Springbok Expeditions</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #475569; background-color: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <!-- Logo Centered on White Header with Gold Border Accent -->
        <div style="background-color: #ffffff; padding: 40px 24px; text-align: center; border-bottom: 3px solid #bfa38a;">
          <img src="https://springbokexpeditions.com/logo.png" alt="Springbok Expeditions" style="height: 56px; width: auto; display: block; margin: 0 auto;" />
          <h1 style="margin: 16px 0 6px 0; font-size: 24px; font-weight: 700; color: #3d2a1d;">Jambo ${data.name}!</h1>
          <p style="margin: 0; font-size: 15px; color: #bfa38a; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">We've received your message</p>
        </div>
        <div style="padding: 32px 24px;">
          <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #3d2a1d;">Thank you for reaching out to Springbok Expeditions!</p>
          <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569;">We have received your message and our team in Arusha will get back to you as soon as possible. We typically reply within 24 hours (and usually much faster during East Africa business hours).</p>
          
          <p style="margin: 0 0 16px 0; font-size: 15px; color: #475569;">If your inquiry is urgent or you would like to speak directly with an expert right now, feel free to contact us via WhatsApp:</p>
          <div style="text-align: center; margin: 24px 0 28px 0;">
            <a href="https://wa.me/255784136616" 
               style="display: inline-block; background-color: #bfa38a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px rgba(191, 163, 138, 0.2); transition: background-color 0.2s ease-in-out;" 
               target="_blank" rel="noopener">Chat with us on WhatsApp</a>
          </div>

          <p style="margin: 0 0 8px 0; font-size: 15px; color: #475569;">We look forward to connecting with you!</p>
          <p style="margin: 0; font-size: 15px; color: #475569;">Warm regards,<br><strong style="color: #3d2a1d;">The Springbok Expeditions Team</strong></p>
        </div>
        <div style="text-align: center; padding: 32px 24px; font-size: 12px; color: #8a7a71; border-top: 1px solid #f1f5f9; background: #f8fafc; line-height: 1.8;">
          <p style="margin: 0 0 4px 0; font-weight: 600; color: #3d2a1d; font-size: 13px;">Springbok Expeditions Ltd.</p>
          <p style="margin: 0 0 8px 0;">Arusha, Tanzania | <a href="mailto:info@springbokexpeditions.com" style="color: #bfa38a; text-decoration: underline;">info@springbokexpeditions.com</a></p>
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">You received this automated email because you contacted us via springbokexpeditions.com.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  if (!apiKey || apiKey.includes('replace_with_your_resend_api_key') || apiKey === '') {
    console.log('\n================== MOCK GENERAL CONTACT EMAIL START ==================');
    console.log(`[FROM]: ${fromEmail}`);
    console.log(`[TO/INTERNAL]: ${toEmail}`);
    console.log(`[TO/CUSTOMER]: ${data.email}`);
    console.log(`[SUBJECT - INTERNAL]: New General Inquiry - ${data.name}`);
    console.log(`[SUBJECT - CUSTOMER]: Thank you for contacting Springbok Expeditions`);
    console.log('----------------- INTERNAL NOTIFICATION HTML -----------------');
    console.log(internalHtml.trim());
    console.log('------------------- CUSTOMER CONFIRMATION HTML -------------------');
    console.log(customerHtml.trim());
    console.log('=================== MOCK GENERAL CONTACT EMAIL END ===================\n');
    return { success: true, messageId: 'mock-message-id' };
  }

  try {
    const resendClient = new Resend(apiKey);

    const internalRes = await resendClient.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New General Inquiry - ${data.name}`,
      html: internalHtml,
      replyTo: data.email,
    });

    if (internalRes.error) {
      console.error('[Resend] Error sending internal contact email:', internalRes.error);
      throw new Error(`Failed to send internal email: ${internalRes.error.message}`);
    }

    try {
      await resendClient.emails.send({
        from: fromEmail,
        to: data.email,
        subject: `Thank you for contacting Springbok Expeditions`,
        html: customerHtml,
      });
    } catch (customerErr) {
      console.error('[Resend] Failed to send customer contact confirmation:', customerErr);
    }

    return { success: true, messageId: internalRes.data?.id };
  } catch (err: any) {
    console.error('[Resend] API error:', err);
    return { success: false };
  }
}
