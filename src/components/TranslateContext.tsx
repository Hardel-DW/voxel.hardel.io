import { createContext, useContext, useState, useRef, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import type { LanguageCode, TranslationKey } from "@/lib/minecraft/i18n/types";
import { I18n } from "@/lib/minecraft/i18n/i18n";

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
    const i18nRef = useRef(new I18n(initialLang));

    const handleSetLang = useCallback((newLang: LanguageCode) => {
        i18nRef.current.setLanguage(newLang);
        setLang(newLang);
    }, []);

    const t = useCallback((key: TranslationKey, ...args: (string | number)[]) => {
        return i18nRef.current.translate(key, ...args);
    }, []);

    const value = useMemo(
        () => ({
            lang,
            setLang: handleSetLang,
            t
        }),
        [lang, handleSetLang, t]
    );

    return <TranslateContext.Provider value={value}>{children}</TranslateContext.Provider>;
}
