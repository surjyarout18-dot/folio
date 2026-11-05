import { appConfig } from './config';

/**
 * Escapes characters for Telegram MarkdownV2 formatting.
 */
export function escapeMarkdownV2(text: string): string {
  if (!text) return '';
  return String(text).replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

export class TelegramService {
  private static get baseUrl(): string {
    return `https://api.telegram.org/bot${appConfig.telegramBotToken}`;
  }

  static async sendMessage(
    chatId: string | number,
    text: string,
    options: {
      parseMode?: 'MarkdownV2' | 'HTML';
      replyMarkup?: any;
      disableWebPagePreview?: boolean;
    } = {}
  ): Promise<any> {
    const url = `${this.baseUrl}/sendMessage`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: options.parseMode ?? 'MarkdownV2',
          disable_web_page_preview: options.disableWebPagePreview ?? true,
          reply_markup: options.replyMarkup,
        }),
      });
      return await res.json();
    } catch (err) {
      console.error('TelegramService.sendMessage error:', err);
      return { ok: false, error: err };
    }
  }

  static async broadcastToAdmins(text: string, options: any = {}): Promise<void> {
    for (const adminId of appConfig.telegramAdminIds) {
      await this.sendMessage(adminId, text, options);
    }
  }

  static async answerCallbackQuery(callbackQueryId: string, text?: string): Promise<any> {
    const url = `${this.baseUrl}/answerCallbackQuery`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
      });
      return await res.json();
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  static async setWebhook(url: string, secretToken: string): Promise<any> {
    const target = `${this.baseUrl}/setWebhook?url=${encodeURIComponent(url)}&secret_token=${encodeURIComponent(secretToken)}&drop_pending_updates=true`;
    try {
      const res = await fetch(target);
      return await res.json();
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  static async getWebhookInfo(): Promise<any> {
    const target = `${this.baseUrl}/getWebhookInfo`;
    try {
      const res = await fetch(target);
      return await res.json();
    } catch (err) {
      return { ok: false, error: err };
    }
  }
}

