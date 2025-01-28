import { TranslateProvider } from "@/components/TranslateContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import type React from "react";
import { Toaster } from "sonner";

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
