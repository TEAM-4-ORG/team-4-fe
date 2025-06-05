import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/components/provider/queryProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <Component {...pageProps} />
      <Toaster />
    </QueryProvider>
  );
}
