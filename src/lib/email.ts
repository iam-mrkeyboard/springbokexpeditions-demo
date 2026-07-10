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
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@springbokexpeditions.com';
  const toEmail = process.env.RESEND_TO_EMAIL || 'info@springbokexpeditions.com';

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

  // Build the Internal Notification HTML
  const internalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Tour Enquiry: ${data.tourTitle}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
        .header { background-color: #2b5c3f; padding: 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
        .content { padding: 24px; }
        .lead-detail { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
        .lead-detail th, .lead-detail td { text-align: left; padding: 12px; border-bottom: 1px solid #f1f5f9; }
        .lead-detail th { font-weight: 600; color: #64748b; width: 35%; }
        .lead-detail td { color: #0f172a; }
        .message-box { background: #f8fafc; border-left: 4px solid #2b5c3f; padding: 16px; border-radius: 4px; margin-top: 8px; font-style: italic; }
        .footer { text-align: center; padding: 16px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; background: #f8fafc; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Custom Quote Request</h1>
        </div>
        <div class="content">
          <p>You have received a new tour enquiry from the website.</p>
          
          <table class="lead-detail">
            <tr>
              <th>Tour Name</th>
              <td><strong>${data.tourTitle}</strong> (ID: ${data.tourId})</td>
            </tr>
            <tr>
              <th>Customer Name</th>
              <td>${data.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <th>Phone/WhatsApp</th>
              <td>${data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <th>Travelers</th>
              <td>${travelersBreakdown}</td>
            </tr>
            <tr>
              <th>Travel Dates</th>
              <td>${data.when || 'Not specified'}</td>
            </tr>
            <tr>
              <th>Budget Per Person</th>
              <td>${data.budget || 'Not specified'}</td>
            </tr>
            <tr>
              <th>Selected Activities</th>
              <td>${formattedActivities}</td>
            </tr>
          </table>

          <h3>User Custom Message:</h3>
          <div class="message-box">
            ${data.message ? data.message.replace(/\n/g, '<br>') : 'No additional notes provided.'}
          </div>
        </div>
        <div class="footer">
          This message was sent automatically from Springbok Expeditions website.
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
      <title>Thank you for contacting Springbok Expeditions</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
        .header { background-color: #2b5c3f; padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0 0 8px 0; font-size: 24px; font-weight: 500; }
        .header p { margin: 0; font-size: 14px; color: #d1fae5; font-weight: 300; }
        .content { padding: 32px 24px; }
        .details-summary { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0; }
        .details-summary h4 { margin: 0 0 10px 0; color: #2b5c3f; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        .details-summary ul { margin: 0; padding-left: 20px; font-size: 14px; }
        .details-summary li { margin-bottom: 6px; }
        .cta-btn { display: inline-block; background-color: #e2a85c; color: #1e293b; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; margin-top: 10px; }
        .footer { text-align: center; padding: 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; background: #f8fafc; }
        .footer p { margin: 4px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Jambo ${data.name}!</h1>
          <p>We've received your custom quote request</p>
        </div>
        <div class="content">
          <p>Thank you for requesting a custom quote for the <strong>${data.tourTitle}</strong>.</p>
          <p>Our safari and trekking experts in Arusha are already looking at your details and will begin building a tailor-made itinerary for you. We typically respond within 24 hours (usually much faster during East Africa business hours).</p>
          
          <div class="details-summary">
            <h4>Enquiry Summary</h4>
            <ul>
              <li><strong>Tour:</strong> ${data.tourTitle}</li>
              <li><strong>Travelers:</strong> ${travelersBreakdown}</li>
              <li><strong>Preferred Dates:</strong> ${data.when || 'Not specified'}</li>
              <li><strong>Selected Activities:</strong> ${formattedActivities}</li>
            </ul>
          </div>

          <p>If you'd like to make immediate adjustments or want to speak directly to a planner, you can also chat with us on WhatsApp:</p>
          <p style="text-align: center;">
            <a href="https://wa.me/255784136616?text=${encodeURIComponent(`Hi Springbok! My name is ${data.name} and I just submitted a custom quote request for the "${data.tourTitle}" tour. Let's chat!`)}" class="cta-btn" target="_blank" rel="noopener">Chat on WhatsApp</a>
          </p>

          <p>We look forward to welcoming you to Tanzania!</p>
          <p>Best regards,<br><strong>The Springbok Expeditions Team</strong></p>
        </div>
        <div class="footer">
          <p><strong>Springbok Expeditions Ltd.</strong></p>
          <p>Arusha, Tanzania | <a href="mailto:info@springbokexpeditions.com">info@springbokexpeditions.com</a></p>
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
      // Don't fail the whole request if the customer auto-reply fails (e.g. invalid customer email format)
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
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@springbokexpeditions.com';
  const toEmail = process.env.RESEND_TO_EMAIL || 'info@springbokexpeditions.com';

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
    luxury: 'Luxury (High-end lodges/fly-in camps)',
    'mid-range': 'Mid-range (Comfortable tents & lodges)',
    budget: 'Budget (Simple camping & public sites)',
    mixed: 'Mixed (A bit of everything)',
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

  const internalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Custom Trip Plan Request</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
        .header { background-color: #2b5c3f; padding: 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
        .content { padding: 24px; }
        .lead-detail { border-collapse: collapse; width: 100%; margin-bottom: 24px; }
        .lead-detail th, .lead-detail td { text-align: left; padding: 12px; border-bottom: 1px solid #f1f5f9; }
        .lead-detail th { font-weight: 600; color: #64748b; width: 35%; }
        .lead-detail td { color: #0f172a; }
        .message-box { background: #f8fafc; border-left: 4px solid #2b5c3f; padding: 16px; border-radius: 4px; margin-top: 8px; font-style: italic; }
        .footer { text-align: center; padding: 16px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; background: #f8fafc; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Custom Trip Plan</h1>
        </div>
        <div class="content">
          <p>You have received a new custom trip plan request from the builder.</p>
          
          <table class="lead-detail">
            <tr>
              <th>Trip Type</th>
              <td><strong>${tripTypeDisplay}</strong></td>
            </tr>
            ${data.destinations && data.destinations.length > 0 ? `
            <tr>
              <th>Destinations</th>
              <td>${formattedDestinations}</td>
            </tr>` : ''}
            ${data.addons && data.addons.length > 0 ? `
            <tr>
              <th>Add-ons</th>
              <td>${formattedAddons}</td>
            </tr>` : ''}
            <tr>
              <th>Customer Name</th>
              <td>${fullName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr>
              <th>Phone/WhatsApp</th>
              <td>${data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <th>Travelers</th>
              <td>${travelersBreakdown}</td>
            </tr>
            <tr>
              <th>Travel Dates</th>
              <td>${data.dates || 'Not specified'}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>${durationDisplay}</td>
            </tr>
            <tr>
              <th>Budget Per Person</th>
              <td>${budgetDisplay}</td>
            </tr>
            <tr>
              <th>Accommodation</th>
              <td>${accommodationDisplay}</td>
            </tr>
            <tr>
              <th>Activities</th>
              <td>${formattedActivities}</td>
            </tr>
          </table>

          <h3>User Custom Message / Details:</h3>
          <div class="message-box">
            ${data.details ? data.details.replace(/\n/g, '<br>') : 'No additional details provided.'}
          </div>
        </div>
        <div class="footer">
          This message was sent automatically from Springbok Expeditions Custom Trip Builder.
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
      <title>We are building your custom Tanzania itinerary</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
        .header { background-color: #2b5c3f; padding: 32px 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0 0 8px 0; font-size: 24px; font-weight: 500; }
        .header p { margin: 0; font-size: 14px; color: #d1fae5; font-weight: 300; }
        .content { padding: 32px 24px; }
        .details-summary { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0; }
        .details-summary h4 { margin: 0 0 10px 0; color: #2b5c3f; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
        .details-summary ul { margin: 0; padding-left: 20px; font-size: 14px; }
        .details-summary li { margin-bottom: 6px; }
        .cta-btn { display: inline-block; background-color: #e2a85c; color: #1e293b; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; margin-top: 10px; }
        .footer { text-align: center; padding: 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; background: #f8fafc; }
        .footer p { margin: 4px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Jambo ${data.firstName}!</h1>
          <p>We've received your custom trip details</p>
        </div>
        <div class="content">
          <p>Thank you for submitting your custom travel preferences to Springbok Expeditions.</p>
          <p>Our safari and trekking planners in Arusha are reviewing your selections and will begin designing a custom day-by-day itinerary tailored to your group, style, and budget. We will email your proposal within 24 hours.</p>
          
          <div class="details-summary">
            <h4>Your Travel Profile</h4>
            <ul>
              <li><strong>Trip Type:</strong> ${tripTypeDisplay}</li>
              ${data.destinations && data.destinations.length > 0 ? `<li><strong>Destinations:</strong> ${formattedDestinations}</li>` : ''}
              ${data.addons && data.addons.length > 0 ? `<li><strong>Add-ons:</strong> ${formattedAddons}</li>` : ''}
              <li><strong>Travelers:</strong> ${travelersBreakdown}</li>
              <li><strong>Proposed Dates:</strong> ${data.dates || 'Not specified'}</li>
              <li><strong>Duration:</strong> ${durationDisplay}</li>
              <li><strong>Budget Level:</strong> ${budgetDisplay}</li>
              <li><strong>Accommodation Style:</strong> ${accommodationDisplay}</li>
              <li><strong>Selected Activities:</strong> ${formattedActivities}</li>
            </ul>
          </div>
 
          <p>If you have any questions or want to speak directly with an expert right now, feel free to contact us via WhatsApp:</p>
          <p style="text-align: center;">
            <a href="https://wa.me/255784136616?text=${encodeURIComponent(`Hi Springbok! My name is ${fullName} and I just built a custom "${tripTypeDisplay}" trip. Let's talk about my options!`)}" class="cta-btn" target="_blank" rel="noopener">Chat on WhatsApp</a>
          </p>
 
          <p>We can't wait to share your custom itinerary with you!</p>
          <p>Warmly,<br><strong>The Springbok Expeditions Team</strong></p>
        </div>
        <div class="footer">
          <p><strong>Springbok Expeditions Ltd.</strong></p>
          <p>Arusha, Tanzania | <a href="mailto:info@springbokexpeditions.com">info@springbokexpeditions.com</a></p>
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
