import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsStore } from '@/lib/bot/analyticsStore';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const country =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      'Global';

    const event = {
      sessionId: data.sessionId || 's_anon',
      visitorId: data.visitorId || 'v_anon',
      path: data.path || '/',
      country,
      referrer: data.referrer || '',
      deviceType: (data.screenWidth || 0) < 768 ? 'Mobile' : 'Desktop',
      utmSource: data.utmSource,
      timestamp: new Date(),
    };

    AnalyticsStore.recordEvent(event);

    // If it's a new visitor session, dispatch instant Telegram notification
    if (data.isNewSession) {
      AnalyticsStore.notifyNewVisitor(event).catch((err) => {
        console.error('Error sending Telegram notification:', err);
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}

