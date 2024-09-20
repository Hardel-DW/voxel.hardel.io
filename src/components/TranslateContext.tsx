import type { TranslationRecord } from "@/lib/i18n.ts";
import React, { createContext } from "react";

interface TranslateContextType {
    translate: TranslationRecord;
    setTranslate: (lang: TranslationRecord) => void;
    lang: string;
    setLang: (lang: string) => void;
}

const TranslateContext = createContext<TranslateContextType | undefined>(undefined);

export const TranslateProvider = (props: {
    children: React.ReactNode;
    translate: TranslationRecord;
    lang: string;
}) => {
    const [translate, setTranslate] = React.useState<TranslationRecord>(props.translate);
    const [lang, setLang] = React.useState<string>(props.lang);

    return <TranslateContext.Provider value={{ translate, setTranslate, lang, setLang }}>{props.children}</TranslateContext.Provider>;
};

export const useTranslate = () => {
    const context = React.useContext(TranslateContext);

    if (!context) {
        throw new Error("useTranslate must be used within a TranslateProvider");
    }

    return context;
};
