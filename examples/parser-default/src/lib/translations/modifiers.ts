import { Modifier } from '@sveltekit-i18n/parser-default';

const findOption = (options, key, defaultValue) => ((options || []).find((option) => option.key === key) || {}).value || defaultValue;

export const test: Modifier.T = ({ value, defaultValue }) => `${value || defaultValue} 🥳`;

export const currency: Modifier.T = ({ value, options, defaultValue, locale }) => (
  new Intl.NumberFormat(locale, { style: 'currency', currency: findOption(options, 'currency', 'EUR') }).format(findOption(options, 'ratio', 1) * (value || defaultValue))
);