import { TooltipProvider } from "@radix-ui/react-tooltip";
import type React from "react";
import { Toaster } from "sonner";
import { TranslateProvider } from "@/components/TranslateContext";

export default function PanelProvider(props: {
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
