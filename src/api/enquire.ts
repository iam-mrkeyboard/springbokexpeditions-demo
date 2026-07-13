import type { APIRoute } from 'astro';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { sendEnquiryEmail } from '@/lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // 1. Ensure JSON request
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();

    // 2. Simple validation (we can do validation or use zod)
    const {
      tourId,
      tourTitle,
      activities,
      travelers,
      adults,
      children,
      when,
      budget,
      name,
      email,
      phone,
      message,
      turnstileToken,
      website, // Honeypot field
      _ts // Timestamp field
    } = body;

    // Honeypot check (bots fill this in)
    if (website && website.trim().length > 0) {
      console.warn('[Anti-Spam] Honeypot field filled. Rejecting submission.');
      return new Response(JSON.stringify({ error: 'Spam detected' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Time-trap check (bots submit too fast)
    if (_ts) {
      const renderTime = parseInt(_ts);
      const submitTime = Date.now();
      const elapsedSeconds = (submitTime - renderTime) / 1000;
      if (elapsedSeconds < 2) {
        console.warn(`[Anti-Spam] Form submitted too quickly (${elapsedSeconds.toFixed(2)}s). Rejecting submission.`);
        return new Response(JSON.stringify({ error: 'Spam detected' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Required fields check
    if (!tourId || !tourTitle || !name || !email) {
      return new Response(
        JSON.stringify({
          error: 'Please fill in all required fields.',
          field: !name ? 'name' : !email ? 'email' : 'general',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          error: 'Please enter a valid email address.',
          field: 'email',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 3. Verify Turnstile Token (if provided)
    if (turnstileToken) {
      const ip = request.headers.get('x-nf-client-connection-ip') || clientAddress || undefined;
      const turnstileVerify = await verifyTurnstileToken(turnstileToken, ip);
      if (!turnstileVerify.success) {
        console.warn('[Anti-Spam] Turnstile verification failed:', turnstileVerify.error);
        return new Response(
          JSON.stringify({
            error: 'Security verification failed. Please try again.',
            field: 'general',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // 4. Send email notifications via Resend
    const emailRes = await sendEnquiryEmail({
      tourId,
      tourTitle,
      activities: Array.isArray(activities) ? activities : [],
      travelers: travelers ? parseInt(String(travelers)) : undefined,
      adults: adults ? parseInt(String(adults)) : undefined,
      children: children !== undefined ? parseInt(String(children)) : undefined,
      when: when || undefined,
      budget: budget || undefined,
      name,
      email,
      phone: phone || undefined,
      message: message || undefined,
    });

    if (!emailRes.success) {
      return new Response(
        JSON.stringify({
          error: 'Failed to send enquiry. Please try again or WhatsApp us directly.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 5. Success response
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('[API /api/enquire] Internal error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
