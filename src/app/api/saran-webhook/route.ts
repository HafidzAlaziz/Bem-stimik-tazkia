import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { webhookUrl, payload } = data;

    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL not provided' }, { status: 400 });
    }

    // Forward data to Google Apps Script Web App
    // We use no-cors if needed, but a server-side fetch doesn't have CORS issues.
    // However, Google Apps Script responds with redirects sometimes.
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    // Google Apps Script usually returns HTML or JSON
    const text = await response.text();
    let result = text;
    try {
      result = JSON.parse(text);
    } catch (e) {
      // It's fine, it might be HTML or simple text
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Error forwarding to webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
