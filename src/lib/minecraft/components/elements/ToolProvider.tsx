import { TranslateProvider } from "@/components/TranslateContext.tsx";
import { getTranslations } from "@/lib/i18n.ts";
import { ConfiguratorProvider } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { ToolConfiguration } from "@/lib/minecraft/core/engine";
import React, { useEffect } from "react";
import { Toaster } from "sonner";

export default function ToolProvider(props: {
    url: URL;
    lang: string;
    config: ToolConfiguration;
    initialToggleSection: Record<string, string>;
    children?: React.ReactNode;
}) {
    const [translate, setTranslate] = React.useState<any>();
    useEffect(() => {
        getTranslations(props.url).then((res) => setTranslate(res.translate));
    }, [props.url]);

    if (!translate) {
        return <div className="w-96 h-6 animate-pulse bg-zinc-900/50 rounded-3xl" />;
    }

    return (
        <TranslateProvider translate={translate} lang={props.lang}>
            <ConfiguratorProvider config={props.config} initialToggleSection={props.initialToggleSection}>
                <div id="portal" />
                {props.children}
                <Toaster richColors />
            </ConfiguratorProvider>
        </TranslateProvider>
    );
}
