import ConceptTab from "@/components/pages/tools/copilot/sidebar/ConceptTab";
import DetailTab from "@/components/pages/tools/copilot/sidebar/DetailTab";
import ShareButton from "@/components/pages/tools/copilot/sidebar/ShareButton";
import { useState } from "react";
import Tabs from "@/components/ui/react/Tabs";

const tabs = [
    {
        label: "Concepts",
        value: "concepts"
    },
    {
        label: "Details",
        value: "details"
    }
];

export default function CopilotSidebar(props: { lang: string }) {
    const [activeTab, setActiveTab] = useState<string>("concepts");

    return (
        <div className="flex flex-col h-full pb-30 mb-4">
            {/* Zone de défilement */}
            <div className="overflow-hidden flex-1">
                <div className="overflow-y-auto overflow-x-hidden h-full pb-16">
                    {/* pb-16 pour laisser de l'espace pour le ShareButton */}
                    <div className="mt-4">
                        <Tabs tabs={tabs} defaultTab="concepts" className="w-auto" onChange={setActiveTab} />

                        {activeTab === "concepts" && <ConceptTab />}
                        {activeTab === "details" && <DetailTab />}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 pr-4 flex items-center gap-2">
                <ShareButton />
            </div>
        </div>
    );
}
