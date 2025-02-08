import { TranslateProvider } from "@/components/tools/TranslateContext";
import type React from "react";
import { Toaster } from "sonner";

export default function PanelProvider({ lang, children }: { lang: string; children?: React.ReactNode }) {
    return (
        <TranslateProvider initialLang={lang}>
            <div id="portal" />
            {children}
            <Toaster richColors />
        </TranslateProvider>
    );
}
