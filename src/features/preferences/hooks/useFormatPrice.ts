import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { formatMoney, Currency } from '@/utils/money';

export function useFormatPrice() {
  const { i18n } = useTranslation();

  // En la Fase 1 la moneda base es USD. En la Fase 3 se enlazará con preferencesStore y tipo de cambio
  const currency: Currency = 'USD';
  const rate = 1;
  const locale = i18n.language.startsWith('es') ? 'es-MX' : 'en-US';

  const formatPrice = useCallback(
    (amountInUsd: number) => {
      return formatMoney(amountInUsd, {
        currency,
        rate,
        locale,
      });
    },
    [currency, rate, locale],
  );

  return {
    formatPrice,
    currency,
  };
}
