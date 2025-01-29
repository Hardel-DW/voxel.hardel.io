import { TranslateProvider } from "@/components/TranslateContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import type React from "react";
import { Toaster } from "sonner";

export default function PanelProvider({ lang, children }: { lang: string; children?: React.ReactNode }) {
    return (
        <TranslateProvider initialLang={lang}>
            <TooltipProvider>
                <div id="portal" />
                {children}
                <Toaster richColors />
            </TooltipProvider>
        </TranslateProvider>
    );
}
