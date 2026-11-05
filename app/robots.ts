import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/data'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl().replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
