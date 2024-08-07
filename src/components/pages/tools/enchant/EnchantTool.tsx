import { TranslateProvider } from "@/components/TranslateContext.tsx";
import EnchantmentConfig from "@/components/pages/tools/enchant/EnchantmentConfig.tsx";
import EnchantmentList from "@/components/pages/tools/enchant/EnchantmentList.tsx";
import { EnchantmentsProvider } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
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
            <EnchantmentsProvider>
                <section className="flex relative h-dvh xl:pl-4 overflow-y-hidden">
                    <EnchantmentList />

                    <div className="size-full py-4 pr-4 pl-4 xl:pl-2 overflow-y-auto">
                        <HelpGuide>{children}</HelpGuide>
                        <EnchantmentConfig>{children}</EnchantmentConfig>
                    </div>
                </section>

                <Toaster richColors />
            </EnchantmentsProvider>
        </TranslateProvider>
    );
}
