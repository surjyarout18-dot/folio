import { NextRequest, NextResponse } from 'next/server';
import { TelegramService } from '@/lib/bot/telegram';
import { appConfig } from '@/lib/bot/config';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const action = searchParams.get('action') || 'info';

  if (action === 'set') {
    const webhookUrl = `${appConfig.websiteUrl}/api/telegram/webhook`;
    const result = await TelegramService.setWebhook(webhookUrl, appConfig.telegramWebhookSecret);
    return NextResponse.json({
      action: 'setWebhook',
      webhookUrl,
      result,
    });
  }

  const info = await TelegramService.getWebhookInfo();
  return NextResponse.json({
    action: 'getWebhookInfo',
    targetUrl: `${appConfig.websiteUrl}/api/telegram/webhook`,
    info,
  });
}
