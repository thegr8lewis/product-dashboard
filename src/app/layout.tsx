// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header';
import { Providers } from './providers'
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Product Dashboard',
    template: '%s | Product Dashboard',
  },
  description: 'A modern product dashboard with dark mode support',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var stored = localStorage.getItem('darkMode');
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (stored === 'true' || (stored === null && systemDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                console.error('Theme initialization error:', e);
              }
            })();
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}>
        <Providers>
          <Header />
          <main className="pt-4 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}