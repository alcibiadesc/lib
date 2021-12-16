# API Docs

[Config](https://github.com/jarda-svoboda/sveltekit-i18n/blob/master/docs/README.md#config)\
[Properties and methods](https://github.com/jarda-svoboda/sveltekit-i18n/blob/master/docs/README.md#instance-methods-and-properties)\
[Translations](https://github.com/jarda-svoboda/sveltekit-i18n/blob/master/docs/README.md#translations)


## Config

### `loaders`?: __Array<{ locale: string; key: string; loader: () => Promise<Record<any, any>>; routes?: Array<string | RegExp>; }>__

You can use `loaders` to define your asyncronous translation load. All loaded data are stored so loader is triggered only once – in case there is no previous version of the translation.
Each loader can include:

`locale`: __string__ – locale (e.g. `en`, `de`) which is this loader for.

`key`: __string__ – represents the translation module. This key is used as a translation prefix so it should be module-unique. You can access your translation later using `$t('key.yourTranslation')`. It shouldn't include `.` (dot) character.

`loader`:__() => Promise<Record<any, any>>__ – is a function returning a Promise with translation data. You can use it to load files locally, fetch it from your API etc...

`routes`?: __Array<string | RegExp>__ – can define routes this loader should be triggered for. You can use Regular expressions too. For example `[/\/.ome/]` will be triggered for `/home` and `/rome` route as well (but still only once). Leave this `undefined` in case you want to load this module with any route (useful for common translations).

### `initLocale`?: __string__
If you set this parameter, translations will be initialized immediately using this locale.


## Instance methods and properties

Each `sveltekit-i18n` instance includes these properties and methods:

### `loading`: __Readable\<boolean>__ 
This readable store indicates wheter translations are loading or not.

### `initialized`: __Readable\<boolean>__
This readable store returns `true` after first translation successfully initialized.

### `locale`: __Writable\<string>__
You can obtain and set current locale using this writable store.

### `locales`: __Readable<string[]>__
Readable store, containing all instance locales.

### `translations`: __Readable\<Translations>__
Readable store, containing all loaded translations.

### `t`: __Readable<(key: string, vars?: Record<any, any>) => string>__
This readable store returns a function you can use to obtain your translations for given translation key and interpolation variables.

### `l`: __Readable<(locale: string, key: string, vars?: Record<any, any>) => string>__
This readable store returns a function you can use to obtain your translations for given locale, translation key and interpolation variables.

### `loadConfig`: __(config: Config) => Promise\<void>__
You can load a new `config` using this method.

### `loadTranslations`: __(locale: string, route?: string) => Promise\<void>__
This method loads translation for given `locale` and `route`.

### `addTranslations`: __(translations: Record<string, Record<string, any>>, keys?: Record<string, string[]> | undefined) => void__
This method allows you to add your translations directly. 

`translations` – this parameter should contain an object, containing translations objects for locales you want to add.

For example: 
```jsonc
{
  "en": {
    "common": {
      "title": "text"
    }
  }
}
```

or with dot notation:
```json
{
  "en": {
    "common.text": "Enghlish text"
  },
  "es": {
    "common.text": "Spanish text"
  }
}
```

`keys` – this parameter should contain corresponding keys from your `loaders` config, so the translation is not loaded duplicitly in future. If `keys` are not provided, translation keys are taken automatically from the `translations` parameter as the first key (or value before the first dot in dot notation) under every locale.

For example, for the previous case it would be:
```json
{
  "en": ["common"],
  "es": ["common"]
}
```


## Translations
Your translations should be formatted as standard objects or dot-notated objects containing strings as translation values. You can use `{{placeholders}}` for interpolation.

Example:
```jsonc
// en/common.json

{
  "lang": "English",
  "module": {
    "title": "Title with {{placeholder}}."
  }
} 
```