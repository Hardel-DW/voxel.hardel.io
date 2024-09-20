import { ENCHANT_TOOL_CONFIG } from "@/components/pages/tools/enchant/Config.ts";
import HelpGuide from "@/components/pages/tools/enchant/HelpGuide.tsx";
import type { TranslationRecord } from "@/lib/i18n.ts";
import ConfiguratorPanel from "@/lib/minecraft/components/ConfiguratorPanel.tsx";
import PanelProvider from "@/lib/minecraft/components/PanelProvider.tsx";
import SidebarPanel from "@/lib/minecraft/components/SidebarPanel.tsx";
import type React from "react";

export default function EnchantTool(props: {
    children?: React.ReactNode;
    translate: TranslationRecord;
    lang: string;
}) {
    return (
        <PanelProvider
            translate={props.translate}
            lang={props.lang}
            config={ENCHANT_TOOL_CONFIG}
            initialToggleSection={{ items: "supportedItems" }}
        >
            <section className="flex relative h-dvh overflow-y-hidden">
                <SidebarPanel />

                <div className="size-full p-4 overflow-y-auto">
                    <HelpGuide>{props.children}</HelpGuide>
                    <ConfiguratorPanel>{props.children}</ConfiguratorPanel>
                </div>
            </section>
        </PanelProvider>
    );
}
