import { ApiError } from './errors';

interface RequestOptions {
  timeoutMs?: number;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

export const createClient = (baseUrl: string) => {
  return async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { timeoutMs = 10_000, signal, headers } = options;
    const controller = new AbortController();

    const timer = setTimeout(() => {
      controller.abort('timeout');
    }, timeoutMs);

    if (signal) {
      signal.addEventListener('abort', () => controller.abort(signal.reason));
    }

    try {
      const response = await fetch(`${baseUrl}${path}`, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          response.status === 404 ? 'not_found' : 'http',
          response.status,
          `HTTP Error ${response.status} fetching ${path}`,
        );
      }

      const text = await response.text();

      // FakeStoreAPI a veces responde 200 con cuerpo vacío cuando un ID no existe
      if (!text || text.trim() === '' || text.trim() === 'null') {
        throw new ApiError('not_found', 404, `Empty response received for ${path}`);
      }

      try {
        return JSON.parse(text) as T;
      } catch {
        throw new ApiError('parse', response.status, 'Failed to parse JSON response');
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        throw err;
      }

      if (controller.signal.aborted) {
        throw new ApiError('timeout', undefined, `Request timed out after ${timeoutMs}ms`);
      }

      throw new ApiError('network', undefined, (err as Error)?.message || 'Network error');
    } finally {
      clearTimeout(timer);
    }
  };
};

export const fakeStoreClient = createClient('https://fakestoreapi.com');
