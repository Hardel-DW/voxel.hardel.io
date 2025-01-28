import { createContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import type { LanguageCode, TranslationKey } from "@/lib/minecraft/i18n/types";
import { I18n } from "@/lib/minecraft/i18n/i18n";

// Créer l'instance i18n en dehors du composant pour éviter les re-créations
export const i18nInstance = new I18n();

interface TranslateContextType {
    lang: LanguageCode;
    setLang: (lang: LanguageCode) => void;
    t: (key: TranslationKey, ...args: (string | number)[]) => string;
}

export const TranslateContext = createContext<TranslateContextType | undefined>(undefined);

interface TranslateProviderProps {
    children: ReactNode;
    initialLang: LanguageCode;
}

export function TranslateProvider({ children, initialLang }: TranslateProviderProps) {
    const [lang, setLang] = useState<LanguageCode>(initialLang);

    const value = useMemo(
        () => ({
            lang,
            setLang: (newLang: LanguageCode) => {
                i18nInstance.setLanguage(newLang);
                setLang(newLang);
            },
            t: (key: TranslationKey, ...args: (string | number)[]) => {
                return i18nInstance.translate(key, { lang, args });
            }
        }),
        [lang]
    );

    return <TranslateContext.Provider value={value}>{children}</TranslateContext.Provider>;
}
