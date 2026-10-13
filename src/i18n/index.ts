import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

export const defaultNS = 'translation';
export const resources = {
  es: { translation: es },
  en: { translation: en },
} as const;

// eslint-disable-next-line import/no-named-as-default-member
void i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  resources,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export default i18n;
