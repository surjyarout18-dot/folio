import * as cheerio from 'cheerio';
import { appConfig } from './config';
import { projects } from '@/lib/data';

export interface SeoIssue {
  url: string;
  ruleId: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  recommendation: string;
}

export class SeoAuditor {
  static async runAudit(siteUrl: string = appConfig.websiteUrl) {
    const baseUrl = siteUrl.replace(/\/+$/, '');
    const issues: SeoIssue[] = [];

    // Core URLs to audit
    const projectSlugs = projects.slice(0, 3).map(p => `/projects/${p.slug}`);
    const paths = ['/', ...projectSlugs];
    const urls = paths.map(p => `${baseUrl}${p}`);

    const results: Array<{
      url: string;
      title?: string;
      desc?: string;
      hasH1: boolean;
      hasCanonical: boolean;
    }> = [];

    for (const u of urls) {
      try {
        const res = await fetch(u, {
          headers: { 'User-Agent': 'SurjyaPortfolioBot/1.0 (SEO Audit Engine)' },
        });

        if (!res.ok) {
          issues.push({
            url: u,
            ruleId: 'http_error',
            severity: 'CRITICAL',
            title: `HTTP Status ${res.status}`,
            description: `Route returned non-200 status code: ${res.status}`,
            recommendation: 'Ensure route compiles and returns HTTP 200 OK.',
          });
          continue;
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        // Rule 1: Title Tag
        const title = $('title').text().trim();
        if (!title) {
          issues.push({
            url: u,
            ruleId: 'missing_title',
            severity: 'CRITICAL',
            title: 'Missing <title> Tag',
            description: 'No title element found in <head>.',
            recommendation: 'Add a descriptive page title (40-65 characters).',
          });
        } else if (title.length < 15 || title.length > 75) {
          issues.push({
            url: u,
            ruleId: 'suboptimal_title_length',
            severity: 'INFO',
            title: 'Suboptimal Title Length',
            description: `Title is ${title.length} characters long.`,
            recommendation: 'Aim for 40-65 characters for optimal Google SERP display.',
          });
        }

        // Rule 2: Meta Description
        const desc = $('meta[name="description"]').attr('content')?.trim();
        if (!desc) {
          issues.push({
            url: u,
            ruleId: 'missing_description',
            severity: 'WARNING',
            title: 'Missing Meta Description',
            description: 'No meta description found.',
            recommendation: 'Add a 120-160 character meta description explaining value.',
          });
        }

        // Rule 3: Single H1 Heading
        const h1Count = $('h1').length;
        if (h1Count === 0) {
          issues.push({
            url: u,
            ruleId: 'missing_h1',
            severity: 'CRITICAL',
            title: 'Missing <h1> Heading',
            description: 'No H1 heading found on page.',
            recommendation: 'Include exactly one primary <h1> heading per route.',
          });
        } else if (h1Count > 1) {
          issues.push({
            url: u,
            ruleId: 'multiple_h1',
            severity: 'INFO',
            title: 'Multiple <h1> Headings',
            description: `Found ${h1Count} H1 elements.`,
            recommendation: 'Best practice is having a single primary <h1> per document.',
          });
        }

        // Rule 4: Canonical Parity
        const canonical = $('link[rel="canonical"]').attr('href');
        if (!canonical) {
          issues.push({
            url: u,
            ruleId: 'missing_canonical',
            severity: 'WARNING',
            title: 'Missing Canonical Tag',
            description: 'No self-referencing canonical tag.',
            recommendation: 'Add <link rel="canonical"> to avoid duplicate content penalties.',
          });
        }

        // Rule 5: OpenGraph Tags
        const ogTitle = $('meta[property="og:title"]').attr('content');
        const ogImage = $('meta[property="og:image"]').attr('content');
        if (!ogTitle || !ogImage) {
          issues.push({
            url: u,
            ruleId: 'incomplete_opengraph',
            severity: 'WARNING',
            title: 'Incomplete OpenGraph Tags',
            description: 'Missing og:title or og:image tag.',
            recommendation: 'Configure full OpenGraph social cards in metadata.',
          });
        }

        // Rule 6: Schema.org JSON-LD Structured Data
        const jsonLd = $('script[type="application/ld+json"]').html();
        if (!jsonLd && u === `${baseUrl}/`) {
          issues.push({
            url: u,
            ruleId: 'missing_json_ld',
            severity: 'WARNING',
            title: 'Missing JSON-LD Structured Data',
            description: 'Homepage is missing Schema.org JSON-LD markup.',
            recommendation: 'Add Person/WebSite Schema.org structured data.',
          });
        }

        // Rule 7: Images without Alt Attributes
        const missingAltImages = $('img:not([alt])').length;
        if (missingAltImages > 0) {
          issues.push({
            url: u,
            ruleId: 'images_missing_alt',
            severity: 'WARNING',
            title: 'Images Missing Alt Text',
            description: `${missingAltImages} image(s) have no alt attribute.`,
            recommendation: 'Add descriptive alt attributes for accessibility and image search.',
          });
        }

        results.push({
          url: u,
          title,
          desc,
          hasH1: h1Count > 0,
          hasCanonical: Boolean(canonical),
        });
      } catch (err: any) {
        issues.push({
          url: u,
          ruleId: 'crawl_exception',
          severity: 'CRITICAL',
          title: 'Crawl Exception',
          description: err.message || 'Failed to fetch route during audit.',
          recommendation: 'Verify server is reachable and responsive.',
        });
      }
    }

    // Rule 20: Cross-Page Duplicate Title Check
    const titleOccurrences = new Map<string, string[]>();
    for (const r of results) {
      if (r.title) {
        const list = titleOccurrences.get(r.title) || [];
        list.push(r.url);
        titleOccurrences.set(r.title, list);
      }
    }
    for (const [titleStr, matchedUrls] of titleOccurrences.entries()) {
      if (matchedUrls.length > 1) {
        issues.push({
          url: matchedUrls[0],
          ruleId: 'duplicate_title',
          severity: 'WARNING',
          title: 'Duplicate Page Title Detected',
          description: `Title "${titleStr}" shared across ${matchedUrls.length} pages.`,
          recommendation: 'Ensure dynamic routes and pages output unique titles.',
        });
      }
    }

    // Score computation (100 base)
    let score = 100;
    for (const issue of issues) {
      if (issue.severity === 'CRITICAL') score -= 10;
      else if (issue.severity === 'WARNING') score -= 4;
      else score -= 1;
    }
    score = Math.max(0, Math.min(100, score));

    const criticalCount = issues.filter(i => i.severity === 'CRITICAL').length;
    const warningCount = issues.filter(i => i.severity === 'WARNING').length;

    return {
      targetUrl: baseUrl,
      score,
      pagesCrawled: urls.length,
      totalIssues: issues.length,
      criticalIssues: criticalCount,
      warnings: warningCount,
      issues,
      timestamp: new Date().toISOString(),
    };
  }
}
