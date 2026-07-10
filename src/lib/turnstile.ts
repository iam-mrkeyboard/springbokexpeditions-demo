export async function verifyTurnstileToken(token: string, ip?: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If secret key is not set (e.g., local development), bypass verification
  if (!secretKey || secretKey.includes('replace_with_your_secret_key') || secretKey === '') {
    console.log('[Turnstile] Secret key not configured. Bypassing token verification.');
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'missing-input-response' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const outcome = await response.json() as {
      success: boolean;
      'error-codes'?: string[];
    };

    if (outcome.success) {
      return { success: true };
    }

    const firstError = outcome['error-codes']?.[0] || 'verification-failed';
    return { success: false, error: firstError };
  } catch (err) {
    console.error('[Turnstile] Verification request failed:', err);
    return { success: false, error: 'verification-request-failed' };
  }
}
