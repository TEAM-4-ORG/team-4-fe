import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WithQueryBoundary } from './withQueryBoundary';

interface QueryProviderProps {
  children: React.ReactNode;
}

const develop_mode = false;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 20,
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
    },
  },
});
export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WithQueryBoundary>
        {develop_mode && <ReactQueryDevtools initialIsOpen={false} />}
        {children}
      </WithQueryBoundary>
    </QueryClientProvider>
  );
}
