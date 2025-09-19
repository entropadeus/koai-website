import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import '@/app/globals.css';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'KOAI Consulting — Plug and Play Modernization',
  description:
    'KOAI Consulting helps teams refresh legacy experiences with clean design, resilient systems, and a collaborative process.',
  openGraph: {
    title: 'KOAI Consulting',
    description:
      'Plug and play modernization for teams that need momentum without the baggage.'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-canvas text-ink antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}

