import React, { createContext } from "react";

interface TranslateContextType {
    translate: Record<string, string>;
    setTranslate: (lang: Record<string, string>) => void;
    lang: string;
    setLang: (lang: string) => void;
}

const TranslateContext = createContext<TranslateContextType | undefined>(undefined);

export const TranslateProvider = (props: {
    children: React.ReactNode;
    translate: Record<string, string>;
    lang: string;
}) => {
    const [translate, setTranslate] = React.useState<Record<string, string>>(props.translate);
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
