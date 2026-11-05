import { NextRequest, NextResponse } from 'next/server';
import { BotHandlers } from '@/lib/bot/botHandlers';
import { appConfig } from '@/lib/bot/config';

export async function POST(req: NextRequest) {
  try {
    if (appConfig.telegramWebhookSecret) {
      const secret = req.headers.get('x-telegram-bot-api-secret-token');
      if (secret !== appConfig.telegramWebhookSecret) {
        return NextResponse.json({ error: 'Unauthorized secret token' }, { status: 401 });
      }
    }

    const update = await req.json();

    if (update.message) {
      await BotHandlers.handleMessage(update.message);
    } else if (update.callback_query) {
      await BotHandlers.handleCallbackQuery(update.callback_query);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Telegram webhook handler error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

