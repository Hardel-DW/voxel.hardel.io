import type { TranslationRecord } from "@/lib/i18n.ts";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import type React from "react";
import { Toaster } from "sonner";
import { TranslateProvider } from "@/components/TranslateContext";
export default function StudioProviders(props: {
    translate: TranslationRecord;
    lang: string;
    children?: React.ReactNode;
}) {
    return (
        <TranslateProvider initialLang={props.lang}>
            <TooltipProvider>
                <div id="portal" />
                {props.children}
                <Toaster richColors />
            </TooltipProvider>
        </TranslateProvider>
    );
}
