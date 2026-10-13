export type Currency = 'USD' | 'MXN';

/**
 * Convierte un importe decimal en dólares a centavos enteros (evita imprecisiones float de JS)
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Convierte centavos enteros a valor decimal
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

interface FormatOptions {
  currency?: Currency;
  rate?: number; // Tasa de conversión de USD a MXN (por defecto 1 si es USD)
  locale?: string;
}

/**
 * Formatea un importe recibido en dólares a la moneda y locale especificados.
 */
export function formatMoney(
  dollars: number,
  options: FormatOptions = {},
): string {
  const { currency = 'USD', rate = 1, locale = 'en-US' } = options;

  const targetAmount = currency === 'MXN' ? dollars * rate : dollars;

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formatter.format(targetAmount)} ${currency}`;
}
