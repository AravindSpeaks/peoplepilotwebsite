"use strict";

const fetch = global.fetch || require('node-fetch');

// Simple in-memory rate limiter (best-effort in serverless runner)
const rateMap = global.__pp_rate_map || new Map();
global.__pp_rate_map = rateMap;

function sanitize(input){
  if(!input) return '';
  return String(input).replace(/<[^>]*>?/gm, '').trim();
}

function isValidEmail(email){
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}


exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try { payload = JSON.parse(event.body); } catch (e) { payload = {}; }

  const FORM_ENDPOINT = process.env.FORM_ENDPOINT || '';
  if (!FORM_ENDPOINT) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured. Set FORM_ENDPOINT in Netlify environment variables.' }) };
  }

  try {
    // basic honeypot spam check
    if (payload.hp && String(payload.hp).trim() !== '') {
      return { statusCode: 400, body: JSON.stringify({ error: 'Spam detected' }) };
    }

    // sanitize inputs
    const name = sanitize(payload.name || '');
    const email = sanitize(payload.email || '');
    const message = sanitize(payload.message || '');

    if (!isValidEmail(email) || message.length < 5 || message.length > 4000) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid submission' }) };
    }

    // simple rate-limiting: max 10 submissions per hour per key (IP or email)
    const ip = event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || email || 'anon';
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    const max = 10;
    const entry = rateMap.get(ip) || {ts: now, count: 0};
    if (now - entry.ts > windowMs) {
      entry.ts = now; entry.count = 0;
    }
    if (entry.count >= max) {
      return { statusCode: 429, body: JSON.stringify({ error: 'Rate limit exceeded' }) };
    }
    entry.count += 1;
    rateMap.set(ip, entry);

    // forward a sanitized payload
    const forward = { name, email, message };

    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forward)
    });
    const text = await res.text();
    return { statusCode: res.status, body: text };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Upstream request failed', details: String(err) }) };
  }
};
