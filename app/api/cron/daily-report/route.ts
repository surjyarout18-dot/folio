import { NextResponse } from 'next/server';
import { AnalyticsStore } from '@/lib/bot/analyticsStore';
import { TelegramService, escapeMarkdownV2 } from '@/lib/bot/telegram';

export async function GET() {
  try {
    const s = AnalyticsStore.getSummary();
    const dateStr = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const msg = [
      `🌅 *Daily Portfolio Intelligence Recap*`,
      `📅 *Date:* \`${escapeMarkdownV2(dateStr)}\``,
      ``,
      `• *Total Views:* \`${s.totalViews}\``,
      `• *Unique Sessions:* \`${s.uniqueSessions}\``,
      `• *Unique Visitors:* \`${s.uniqueVisitors}\``,
      ``,
      `*Top Visited Routes:*`,
      s.topPages.length > 0
        ? s.topPages.map(([p, count]) => `• \`${escapeMarkdownV2(p)}\`: *${count}*`).join('\n')
        : `• _No traffic logged in last interval_`,
      ``,
      `*Top Geo Origins:*`,
      s.topCountries.length > 0
        ? s.topCountries.map(([c, count]) => `• \`${escapeMarkdownV2(c || 'Global')}\`: *${count}*`).join('\n')
        : `• _No geo data logged_`,
    ].join('\n');

    await TelegramService.broadcastToAdmins(msg);
    return NextResponse.json({ ok: true, dispatched: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
