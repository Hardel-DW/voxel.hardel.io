import type { LanguageCode, TranslationKey } from "@voxelio/breeze/i18n";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { TranslateContext, i18nInstance } from "@/components/useTranslate";

export interface TranslateContextType {
    lang: LanguageCode;
    setLang: (lang: LanguageCode) => void;
    t: (key: TranslationKey, ...args: (string | number)[]) => string;
}

interface TranslateProviderProps {
    children: ReactNode;
    initialLang: LanguageCode;
}

export function TranslateProvider({ children, initialLang }: TranslateProviderProps) {
    const [lang, setLang] = useState<LanguageCode>(initialLang);

    useEffect(() => {
        i18nInstance.setLanguage(lang);
    }, [lang]);

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
