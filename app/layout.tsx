import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll'
import { Cursor } from '@/components/cursor'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/sections/footer'
import { site } from '@/lib/data'
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

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Data Scientist & Analytics Engineer`,
    template: `%s — ${site.name}`,
  },
  description:
    'Portfolio of Surjya Sarathi Rout, a data scientist and analytics engineer turning data into decisions with Python, SQL, Power BI and machine learning.',
  keywords: ['Data Scientist', 'Analytics Engineer', 'Python', 'SQL', 'Power BI', 'Portfolio'],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — I turn data into decisions.`,
    description: site.tagline,
    type: 'website',
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — I turn data into decisions.`,
    description: site.tagline,
    images: ['/images/og.png'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
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
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`}>
      <body className="grain antialiased">
        <SmoothScrollProvider>
          <Cursor />
          <Nav />
          {children}
          <Footer />
        </SmoothScrollProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
