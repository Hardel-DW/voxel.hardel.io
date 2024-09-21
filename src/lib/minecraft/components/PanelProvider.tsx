import { TranslateProvider } from "@/components/TranslateContext.tsx";
import type { TranslationRecord } from "@/lib/i18n.ts";
import { ConfiguratorProvider } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import type React from "react";
import { Toaster } from "sonner";

export default function PanelProvider(props: {
    translate: TranslationRecord;
    lang: string;
    tool: keyof Analysers;
    children?: React.ReactNode;
}) {
    return (
        <TranslateProvider translate={props.translate} lang={props.lang}>
            <ConfiguratorProvider tool={props.tool}>
                <TooltipProvider>
                    <div id="portal" />
                    {props.children}
                    <Toaster richColors />
                </TooltipProvider>
            </ConfiguratorProvider>
        </TranslateProvider>
    );
}
