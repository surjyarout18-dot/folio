import { TelegramService, escapeMarkdownV2 } from './telegram';

export interface PageEvent {
  sessionId: string;
  visitorId: string;
  path: string;
  country: string;
  referrer: string;
  deviceType: string;
  browser?: string;
  os?: string;
  utmSource?: string;
  timestamp: Date;
}

// In-Memory Ring Buffer (Zero-DB Mode)
const memoryEvents: PageEvent[] = [];
const MAX_MEMORY_EVENTS = 5000;

export class AnalyticsStore {
  static recordEvent(event: PageEvent) {
    memoryEvents.unshift(event);
    if (memoryEvents.length > MAX_MEMORY_EVENTS) {
      memoryEvents.pop();
    }
  }

  static getSummary() {
    const totalViews = memoryEvents.length;
    const uniqueSessions = new Set(memoryEvents.map(e => e.sessionId)).size;
    const uniqueVisitors = new Set(memoryEvents.map(e => e.visitorId)).size;
    const countries = new Map<string, number>();
    const pages = new Map<string, number>();
    const devices = new Map<string, number>();

    for (const e of memoryEvents) {
      countries.set(e.country, (countries.get(e.country) || 0) + 1);
      pages.set(e.path, (pages.get(e.path) || 0) + 1);
      devices.set(e.deviceType, (devices.get(e.deviceType) || 0) + 1);
    }

    const topPages = Array.from(pages.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topCountries = Array.from(countries.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      totalViews,
      uniqueSessions,
      uniqueVisitors,
      topPages,
      topCountries,
      devices: Object.fromEntries(devices),
    };
  }

  static async notifyNewVisitor(event: PageEvent) {
    const text = [
      `🚀 *New Portfolio Visitor Detected*`,
      `• *Path:* \`${escapeMarkdownV2(event.path)}\``,
      `• *Country:* \`${escapeMarkdownV2(event.country || 'Global')}\``,
      `• *Device:* \`${escapeMarkdownV2(event.deviceType)}\``,
      `• *Referrer:* \`${escapeMarkdownV2(event.referrer || 'Direct / Organic')}\``,
      event.utmSource ? `• *Campaign Source:* \`${escapeMarkdownV2(event.utmSource)}\`` : '',
      `• *Time:* \`${escapeMarkdownV2(new Date().toUTCString())}\``,
    ].filter(Boolean).join('\n');

    await TelegramService.broadcastToAdmins(text);
  }
}

