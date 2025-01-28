import { createContext, useContext } from "react";
import type { TranslateContextType } from "./TranslateContext";
import { I18n } from "@/lib/minecraft/i18n/i18n";

export const TranslateContext = createContext<TranslateContextType | undefined>(undefined);
export const i18nInstance = new I18n();

export function useTranslate() {
    const context = useContext(TranslateContext);
    if (context === undefined) {
        throw new Error("useTranslate must be used within a TranslateProvider");
    }
    return context;
}
