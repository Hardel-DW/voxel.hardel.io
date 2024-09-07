import { TranslateProvider } from "@/components/TranslateContext.tsx";
import { ConfiguratorProvider } from "@/components/pages/tools/ConfiguratorContext.tsx";
import ConfiguratorPanel from "@/components/pages/tools/ConfiguratorPanel.tsx";
import EnchantmentList from "@/components/pages/tools/enchant/EnchantmentList.tsx";
import HelpGuide from "@/components/pages/tools/enchant/HelpGuide.tsx";
import { getTranslations } from "@/lib/i18n.ts";
import React from "react";
import { Toaster } from "sonner";

export default function EnchantTool({
    children,
    url,
    lang
}: {
    children?: React.ReactNode;
    url: URL;
    lang: string;
}) {
    const [translate, setTranslate] = React.useState<any>();

    React.useEffect(() => {
        getTranslations(url).then((res) => {
            setTranslate(res.translate);
        });
    }, [url]);

    if (!translate) {
        return <div className="w-96 h-6 animate-pulse bg-zinc-900/50 rounded-3xl" />;
    }

    return (
        <TranslateProvider translate={translate} lang={lang}>
            <ConfiguratorProvider initialToggleSection={{ supported: "supportedItems" }}>
                <section className="flex relative h-dvh overflow-y-hidden">
                    <EnchantmentList />

                    <div className="size-full p-4 overflow-y-auto">
                        <HelpGuide>{children}</HelpGuide>
                        <ConfiguratorPanel>{children}</ConfiguratorPanel>
                    </div>
                </section>

                <Toaster richColors />
            </ConfiguratorProvider>
        </TranslateProvider>
    );
}
