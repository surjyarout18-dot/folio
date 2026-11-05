import { NextRequest, NextResponse } from 'next/server';
import { SeoAuditor } from '@/lib/bot/seoAuditor';
import { appConfig } from '@/lib/bot/config';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const siteUrl = searchParams.get('url') || appConfig.websiteUrl;

  try {
    const report = await SeoAuditor.runAudit(siteUrl);
    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
