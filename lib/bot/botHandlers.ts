import { TelegramService, escapeMarkdownV2 } from './telegram';
import { SeoAuditor } from './seoAuditor';
import { AnalyticsStore } from './analyticsStore';
import { isAuthorizedAdmin, appConfig } from './config';

export class BotHandlers {
  static async handleMessage(message: any) {
    const chatId = message.chat.id;
    const userId = message.from?.id;
    const text = (message.text || '').trim();

    // Security check: Only allow authorized admin IDs
    if (!isAuthorizedAdmin(userId)) {
      await TelegramService.sendMessage(
        chatId,
        '⛔ *Access Denied*\nYour Telegram account is not authorized to control this bot\\.'
      );
      return;
    }

    const command = text.split(' ')[0].toLowerCase();

    if (command === '/start' || command === '/help') {
      const msg = [
        `🤖 *Surjya Portfolio Intelligence Bot*`,
        `Connected to: \`${escapeMarkdownV2(appConfig.websiteUrl)}\``,
        ``,
        `*Available Commands:*`,
        `• \`/seo\` — Run live 20\\-rule on\\-page SEO audit`,
        `• \`/dashboard\` — Real\\-time visitor analytics overview`,
        `• \`/today\` — Today's visitor metrics & sessions`,
        `• \`/top\` — Top viewed paths & visitor countries`,
        `• \`/devices\` — Desktop vs mobile device split`,
        `• \`/status\` — Serverless health & webhook status`,
        `• \`/help\` — Display this command menu`,
      ].join('\n');

      const replyMarkup = {
        inline_keyboard: [
          [
            { text: '🔍 Run SEO Audit', callback_data: 'cmd_seo' },
            { text: '📊 Analytics Dashboard', callback_data: 'cmd_dashboard' },
          ],
          [
            { text: '🌐 View Portfolio', url: appConfig.websiteUrl },
            { text: '⚡ Health Check', callback_data: 'cmd_status' },
          ],
        ],
      };

      await TelegramService.sendMessage(chatId, msg, { replyMarkup });
    } else if (command === '/seo') {
      await TelegramService.sendMessage(
        chatId,
        `🔍 *Executing 20\\-Rule SEO Audit on* \`${escapeMarkdownV2(appConfig.websiteUrl)}\`\\.\\.\\.`
      );

      const report = await SeoAuditor.runAudit();
      const statusEmoji = report.score >= 90 ? '🟢' : report.score >= 70 ? '🟡' : '🔴';

      const lines = [
        `${statusEmoji} *SEO Audit Complete*`,
        `• *Target:* \`${escapeMarkdownV2(report.targetUrl)}\``,
        `• *Overall Score:* \`${report.score}/100\``,
        `• *Pages Crawled:* \`${report.pagesCrawled}\``,
        `• *Critical Issues:* \`${report.criticalIssues}\``,
        `• *Warnings:* \`${report.warnings}\``,
        ``,
      ];

      if (report.issues.length === 0) {
        lines.push(`🎉 *Flawless audit! All indexability signals are 100% optimal.*`);
      } else {
        lines.push(`*Key Observations:*`);
        for (const issue of report.issues.slice(0, 4)) {
          const badge = issue.severity === 'CRITICAL' ? '🔴' : issue.severity === 'WARNING' ? '⚠️' : 'ℹ️';
          lines.push(`${badge} *${escapeMarkdownV2(issue.title)}*`);
          lines.push(`  ↳ \`${escapeMarkdownV2(issue.recommendation)}\``);
        }
      }

      await TelegramService.sendMessage(chatId, lines.join('\n'));
    } else if (command === '/dashboard' || command === '/today') {
      const s = AnalyticsStore.getSummary();
      const msg = [
        `📊 *Visitor Analytics Dashboard*`,
        `• *Total Pageviews:* \`${s.totalViews}\``,
        `• *Unique Sessions:* \`${s.uniqueSessions}\``,
        `• *Unique Visitors:* \`${s.uniqueVisitors}\``,
        ``,
        `*Top Landing Pages:*`,
        s.topPages.length > 0
          ? s.topPages.map(([p, c]) => `• \`${escapeMarkdownV2(p)}\`: *${c}* views`).join('\n')
          : `• _No pageviews captured yet this session_`,
        ``,
        `*Top Geo Origins:*`,
        s.topCountries.length > 0
          ? s.topCountries.map(([geo, count]) => `• \`${escapeMarkdownV2(geo || 'Global')}\`: *${count}* visits`).join('\n')
          : `• _No visitor geos logged yet_`,
      ].join('\n');

      await TelegramService.sendMessage(chatId, msg);
    } else if (command === '/top') {
      const s = AnalyticsStore.getSummary();
      const msg = [
        `📈 *Top Traffic Breakdown*`,
        `*Pages:*`,
        s.topPages.length > 0
          ? s.topPages.map(([p, count]) => `• \`${escapeMarkdownV2(p)}\`: *${count}*`).join('\n')
          : `_None recorded_`,
        ``,
        `*Countries:*`,
        s.topCountries.length > 0
          ? s.topCountries.map(([c, count]) => `• \`${escapeMarkdownV2(c || 'Global')}\`: *${count}*`).join('\n')
          : `_None recorded_`,
      ].join('\n');

      await TelegramService.sendMessage(chatId, msg);
    } else if (command === '/devices') {
      const s = AnalyticsStore.getSummary();
      const devEntries = Object.entries(s.devices);
      const msg = [
        `📱 *Device & Client Breakdown*`,
        devEntries.length > 0
          ? devEntries.map(([d, c]) => `• *${escapeMarkdownV2(d)}:* \`${c}\` users`).join('\n')
          : `_No device telemetry recorded yet_`,
      ].join('\n');

      await TelegramService.sendMessage(chatId, msg);
    } else if (command === '/status') {
      const webhook = await TelegramService.getWebhookInfo();
      const isSet = webhook?.result?.url ? '🟢 Active' : '🟡 Inactive';

      const msg = [
        `⚡ *Surjya Intelligence Bot — Status Check*`,
        `• *Server Runtime:* \`Next.js 16 (App Router) on Vercel\``,
        `• *Target Site:* \`${escapeMarkdownV2(appConfig.websiteUrl)}\``,
        `• *Webhook Status:* ${isSet}`,
        `• *Pending Telegram Updates:* \`${webhook?.result?.pending_update_count ?? 0}\``,
        `• *Memory Buffer Size:* \`${AnalyticsStore.getSummary().totalViews} events\``,
        `• *Timestamp:* \`${escapeMarkdownV2(new Date().toUTCString())}\``,
      ].join('\n');

      await TelegramService.sendMessage(chatId, msg);
    } else {
      await TelegramService.sendMessage(
        chatId,
        `❓ Unknown command\\. Type \`/help\` to see the list of commands\\.`
      );
    }
  }

  static async handleCallbackQuery(query: any) {
    const callbackId = query.id;
    const data = query.data;
    const chatId = query.message?.chat?.id;
    const userId = query.from?.id;

    if (!isAuthorizedAdmin(userId)) {
      await TelegramService.answerCallbackQuery(callbackId, 'Unauthorized access.');
      return;
    }

    await TelegramService.answerCallbackQuery(callbackId);

    if (data === 'cmd_seo') {
      await this.handleMessage({ chat: { id: chatId }, from: { id: userId }, text: '/seo' });
    } else if (data === 'cmd_dashboard') {
      await this.handleMessage({ chat: { id: chatId }, from: { id: userId }, text: '/dashboard' });
    } else if (data === 'cmd_status') {
      await this.handleMessage({ chat: { id: chatId }, from: { id: userId }, text: '/status' });
    }
  }
}
