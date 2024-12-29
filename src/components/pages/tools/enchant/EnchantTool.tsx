import HelpGuide from "@/components/pages/tools/enchant/HelpGuide.tsx";
import ConfiguratorPanel from "@/components/tools/ConfiguratorPanel.tsx";
import PanelProvider from "@/components/tools/PanelProvider.tsx";
import { Island } from "@/components/tools/artificial/Island.tsx";
import SidebarPanel from "@/components/tools/SidebarPanel.tsx";
import type { FaqType } from "@/content/config.ts";
import type React from "react";

export default function EnchantTool(props: {
    children?: React.ReactNode;
    lang: string;
    faq?: FaqType[];
}) {
    return (
        <PanelProvider lang={props.lang}>
            <Island />
            <section className="flex relative h-dvh overflow-y-hidden">
                <SidebarPanel />

                <div className="size-full p-4 overflow-y-auto">
                    <HelpGuide tool="enchantment" faq={props.faq}>
                        {props.children}
                    </HelpGuide>
                    <ConfiguratorPanel defaultTab="enchant.global">{props.children}</ConfiguratorPanel>
                </div>
            </section>
        </PanelProvider>
    );
}
