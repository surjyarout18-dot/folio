import { NextResponse } from 'next/server';
import { SeoAuditor } from '@/lib/bot/seoAuditor';
import { TelegramService, escapeMarkdownV2 } from '@/lib/bot/telegram';
import { appConfig } from '@/lib/bot/config';

export async function GET() {
  try {
    const report = await SeoAuditor.runAudit(appConfig.websiteUrl);
    const statusEmoji = report.score >= 90 ? '🟢' : report.score >= 70 ? '🟡' : '🔴';

    const msg = [
      `${statusEmoji} *Scheduled Weekly SEO Audit*`,
      `• *URL:* \`${escapeMarkdownV2(report.targetUrl)}\``,
      `• *Health Score:* \`${report.score}/100\``,
      `• *Pages Crawled:* \`${report.pagesCrawled}\``,
      `• *Critical Anomalies:* \`${report.criticalIssues}\``,
      `• *Warnings:* \`${report.warnings}\``,
      report.issues.length === 0 ? `\n🎉 *Perfect Indexability Score!*` : '',
    ].filter(Boolean).join('\n');

    await TelegramService.broadcastToAdmins(msg);
    return NextResponse.json({ ok: true, score: report.score, dispatched: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

