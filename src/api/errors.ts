export type ApiErrorKind = 'network' | 'timeout' | 'http' | 'not_found' | 'parse';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(kind: ApiErrorKind, status?: number, message?: string) {
    super(message || `ApiError: ${kind}${status ? ` (status ${status})` : ''}`);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Determina si el error es transitorio y vale la pena reintentar.
 * Reintenta en fallos de red, timeouts y errores 5xx del servidor.
 * NO reintenta en 404, not_found ni 4xx del cliente.
 */
export function isRetryable(error: unknown): boolean {
  if (error instanceof ApiError) {
    if (error.kind === 'network' || error.kind === 'timeout') return true;
    if (error.kind === 'http' && error.status && error.status >= 500) return true;
    return false;
  }
  return false;
}

/**
 * Devuelve la clave de traducción i18n según el tipo de ApiError.
 */
export function getErrorMessageKey(
  error: unknown,
): 'errors.network' | 'errors.timeout' | 'errors.notFound' | 'errors.server' | 'errors.unknown' {
  if (error instanceof ApiError) {
    switch (error.kind) {
      case 'network':
        return 'errors.network';
      case 'timeout':
        return 'errors.timeout';
      case 'not_found':
        return 'errors.notFound';
      case 'http':
        return error.status && error.status >= 500 ? 'errors.server' : 'errors.unknown';
      case 'parse':
        return 'errors.server';
    }
  }
  return 'errors.unknown';
}
