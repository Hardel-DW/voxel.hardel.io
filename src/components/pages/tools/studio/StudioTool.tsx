import Sidebar from "@/components/pages/tools/studio/Sidebar.tsx";
import Studio from "@/components/pages/tools/studio/Studio.tsx";
import { StudioProvider } from "@/components/pages/tools/studio/StudioContext.tsx";
import StudioProviders from "@/components/pages/tools/studio/StudioProviders.tsx";
import type { TranslationRecord } from "@/lib/i18n.ts";
import type React from "react";

export default function StudioTool(props: {
    children?: React.ReactNode;
    translate: TranslationRecord;
    lang: string;
}) {
    return (
        <StudioProviders translate={props.translate} lang={props.lang}>
            <StudioProvider>
                <section className="flex z-0 relative h-dvh w-dvw overflow-y-hidden">
                    <div className="pointer-events-auto fixed left-0 top-0 z-10">
                        <Sidebar />
                    </div>
                    <div className="absolute inset-0 z-0">
                        <Studio />
                    </div>
                </section>
            </StudioProvider>
        </StudioProviders>
    );
}
