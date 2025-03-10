import type { TranslateContextType } from "@/components/tools/TranslateContext";
import type { TranslateTextType } from "@voxelio/breeze/core";
import { I18n } from "@voxelio/breeze/i18n";
import { translate as translateCore } from "@voxelio/breeze/i18n";
import { createContext, useContext } from "react";

export const TranslateContext = createContext<TranslateContextType | undefined>(undefined);
export const i18nInstance = new I18n();

export function useTranslate() {
    const context = useContext(TranslateContext);
    if (context === undefined) {
        throw new Error("useTranslate must be used within a TranslateProvider");
    }
    return context;
}

export function translate(content: TranslateTextType | undefined, replace?: string[]) {
    return translateCore(i18nInstance, content, replace);
}
