import { QueryClient } from '@tanstack/react-query';
import { isRetryable } from '@/api/errors';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos sin refetch para catálogo estable
      gcTime: 30 * 60 * 1000, // 30 minutos conservado en memoria (garbage collection)
      retry: (failureCount, error) => {
        // Solo reintenta si es error de red/timeout/5xx y máximo 3 intentos
        return isRetryable(error) && failureCount < 3;
      },
      retryDelay: (attemptIndex) => {
        // Backoff exponencial: 1s, 2s, 4s, con tope de 8s
        return Math.min(1000 * 2 ** attemptIndex, 8000);
      },
      refetchOnReconnect: true,
      refetchOnWindowFocus: false, // En RN el foco se maneja con focusManager
    },
  },
});
