import ErrorPage from '@/pages/error';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

export function WithQueryBoundary({ children }: { children: React.ReactNode }) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} fallbackRender={() => <ErrorPage />}>
      {children}
    </ErrorBoundary>
  );
}
