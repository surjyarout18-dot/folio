import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll'
import { Cursor } from '@/components/cursor'
import { ScrollProgress } from '@/components/scroll-progress'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/sections/footer'
import { site, getBaseUrl } from '@/lib/data'
import './globals.css'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — Data Scientist & Analytics Engineer`,
    template: `%s — ${site.name}`,
  },
  description:
    'Portfolio of Surjya Sarathi Rout, a data scientist and analytics engineer turning data into decisions with Python, SQL, Power BI and machine learning.',
  keywords: [
    'Data Scientist',
    'Analytics Engineer',
    'Python',
    'SQL',
    'Power BI',
    'Machine Learning',
    'Portfolio',
    'Surjya Sarathi Rout',
    'Data Analytics',
    'Business Intelligence',
  ],
  authors: [{ name: site.name, url: baseUrl }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'yGIGDt1zqZCrHh141PacDti81CvoHzyV7SCH3hNNvVU',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${site.name} — I turn data into decisions.`,
    description: site.tagline,
    url: '/',
    siteName: `${site.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — I turn data into decisions.`,
    description: site.tagline,
    images: ['/images/og.png'],
    creator: '@Surjya123',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#08090B',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: site.name,
        jobTitle: site.role,
        url: baseUrl,
        sameAs: [site.linkedin, site.github].filter(Boolean),
        description: site.tagline,
        knowsAbout: [
          'Data Science',
          'Analytics Engineering',
          'Python',
          'SQL',
          'Machine Learning',
          'Business Intelligence',
          'Power BI',
          'Predictive Modeling',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: `${site.name} Portfolio`,
        description: site.tagline,
        publisher: {
          '@id': `${baseUrl}/#person`,
        },
      },
    ],
  }

  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <ScrollProgress />
          <Cursor />
          <Nav />
          {children}
          <Footer />
        </SmoothScrollProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <script src="/tracker.js" defer />
      </body>
    </html>
  )
}
