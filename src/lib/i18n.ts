export type Locale = "en-us" | "fr-fr";

import { en } from "@/i18n/en-us";
import { fr } from "@/i18n/fr-fr";

export type TranslationParams = Record<string, string | number>;

export interface I18nConfig {
    defaultLocale: Locale;
    supportedLocales: readonly Locale[];
}

export const i18nConfig = {
    defaultLocale: "en-us",
    supportedLocales: ["en-us", "fr-fr"]
} as const satisfies I18nConfig;

const interpolate = (template: string, params: TranslationParams): string => {
    return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
};

export const createTranslator = (translations: Record<string, string>) => {
    return (key: string, params?: TranslationParams): string => {
        const translation = translations[key];

        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }

        return params ? interpolate(translation, params) : translation;
    };
};

const translations = { "en-us": en, "fr-fr": fr } as const;

export const getTranslations = (locale: Locale) => {
    return translations[locale] ?? translations["en-us"];
};

export const t = (locale: string) => createTranslator(getTranslations(locale as Locale));
