import i18n from 'sveltekit-i18n';
import lang from './lang.json';
import * as customModifiers from './modifiers';

export const config = ({
  initLocale: 'en',
  translations: {
    cs: { lang },
    en: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'content',
      loader: async () => (await import('./en/content.json')).default,
    },
    {
      locale: 'cs',
      key: 'content',
      loader: async () => (await import('./cs/content.json')).default,
    },
  ],
  customModifiers,
});

export const { t, loading, locales, locale, loadConfig } = new i18n();

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));