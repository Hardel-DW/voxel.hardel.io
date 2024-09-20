import { TranslateProvider } from "@/components/TranslateContext.tsx";
import type { TranslationRecord } from "@/lib/i18n.ts";
import { ConfiguratorProvider } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { ToolConfiguration } from "@/lib/minecraft/core/engine";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import type React from "react";
import { Toaster } from "sonner";

export default function PanelProvider(props: {
    translate: TranslationRecord;
    lang: string;
    config: ToolConfiguration;
    initialToggleSection: Record<string, string>;
    children?: React.ReactNode;
}) {
    return (
        <TranslateProvider translate={props.translate} lang={props.lang}>
            <ConfiguratorProvider config={props.config} initialToggleSection={props.initialToggleSection}>
                <TooltipProvider>
                    <div id="portal" />
                    {props.children}
                    <Toaster richColors />
                </TooltipProvider>
            </ConfiguratorProvider>
        </TranslateProvider>
    );
}
