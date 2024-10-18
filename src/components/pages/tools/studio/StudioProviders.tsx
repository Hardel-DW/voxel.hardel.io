import { TranslateProvider } from "@/components/TranslateContext.tsx";
import type { TranslationRecord } from "@/lib/i18n.ts";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import type React from "react";
import { Toaster } from "sonner";

export default function PanelProvider(props: {
    translate: TranslationRecord;
    lang: string;
    children?: React.ReactNode;
}) {
    return (
        <TranslateProvider translate={props.translate} lang={props.lang}>
            <TooltipProvider>
                <div id="portal" />
                {props.children}
                <Toaster richColors />
            </TooltipProvider>
        </TranslateProvider>
    );
}
