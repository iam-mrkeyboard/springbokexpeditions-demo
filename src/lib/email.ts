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
