import { TranslateProvider } from "@/components/tools/TranslateContext";
import type { TranslationRecord } from "@/lib/i18n.ts";
import type React from "react";
import { Toaster } from "sonner";
export default function StudioProviders(props: {
    translate: TranslationRecord;
    lang: string;
    children?: React.ReactNode;
}) {
    return (
        <TranslateProvider initialLang={props.lang}>
            <div id="portal" />
            {props.children}
            <Toaster richColors />
        </TranslateProvider>
    );
}
