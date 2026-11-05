import { getBaseUrl } from '@/lib/data';

export interface AppConfig {
  databaseUrl: string;
  telegramBotToken: string;
  telegramAdminIds: string[];
  telegramWebhookSecret: string;
  cronSecret: string;
  websiteUrl: string;
}

function parseAdminIds(raw?: string): string[] {
  if (!raw) return ['945425546'];
  return raw.split(',').map(id => id.trim()).filter(Boolean);
}

export const appConfig: AppConfig = {
  databaseUrl: process.env.DATABASE_URL || '',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '9258480979:AAE81B1_GY3DNRMLB6Mz340ftQS4GedskkA',
  telegramAdminIds: parseAdminIds(process.env.TELEGRAM_ADMIN_IDS),
  telegramWebhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET || 'surjya_telemetry_sec_945425546',
  cronSecret: process.env.CRON_SECRET || 'surjya_cron_sec_945425546',
  websiteUrl: (process.env.WEBSITE_URL || getBaseUrl()).replace(/\/+$/, ''),
};

export function isAuthorizedAdmin(userId: number | string): boolean {
  if (appConfig.telegramAdminIds.length === 0) return true;
  return appConfig.telegramAdminIds.includes(String(userId));
}

export function sanitizeLog(msg: string): string {
  if (!msg) return '';
  return msg.replace(/(bot[0-9]+:[a-zA-Z0-9_-]+)/gi, 'bot[REDACTED_TOKEN]');
}
