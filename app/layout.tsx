import type { Metadata } from 'next';
import React from 'react';

import Footer from './ui/Footer';
import Header from './ui/Header';

import './styles/dracula.css';
import './styles/global.css';

export const metadata: Metadata = {
  title: `Dragna.io - DragnaCarta's Workspace`,
  description: '',
  authors: [{ name: 'dannyrb', url: 'https://github.com/dannyrb' }],
  openGraph: {
    title: `Dragna.io - DragnaCarta's Workspace`,
    description: '',
    url: 'https://dragna.io',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <section className="grid" style={{ gridTemplateRows: 'auto 1fr auto' }}>
          <Header />
          <main style={{ marginTop: 50 }}>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
