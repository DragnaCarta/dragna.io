import '@/styles/reset.css'
import '@/styles/globals.css'
import '@/styles/dracula.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
