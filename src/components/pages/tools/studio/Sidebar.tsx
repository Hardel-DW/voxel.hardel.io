import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import BaseComponent from "@/components/pages/tools/studio/hud/BaseComponent";
import DropdownContent from "@/components/pages/tools/studio/hud/DropdownContent.tsx";
import { DropdownProvider } from "@/components/pages/tools/studio/hud/DropdownContext.tsx";
import DropdownElement from "@/components/pages/tools/studio/hud/DropdownElement";
import DropdownTrigger from "@/components/pages/tools/studio/hud/DropdownTrigger.tsx";
import { snakeToTitleCase } from "@/lib/utils";
import { DynamicDropdown } from "./hud/DynamicDropdown";

export default function Sidebar() {
    const { createBlueprint } = useStudioContext();

    return (
        <DropdownProvider>
            <div className="flex flex-row gap-4 p-4">
                <DropdownTrigger dropdownId="main">
                    <BaseComponent hover icons="/icons/tools/studio/plus.svg">
                        <p className="py-4 font-semibold text-zinc-300">Add a new component</p>
                    </BaseComponent>
                </DropdownTrigger>

                <DropdownContent dropdownId="main">
                    <BaseComponent variant="dropdown">
                        <DropdownElement icons="/icons/star.svg" dropdownId="main.effects">
                            New Effects
                        </DropdownElement>

                        <DropdownElement icons="/icons/tools/studio/condition.svg" dropdownId="main.conditions">
                            New Conditions
                        </DropdownElement>

                        <DropdownElement icons="/icons/debug.svg">New Actions</DropdownElement>
                        <DropdownElement icons="/icons/tools/studio/variable.svg">New Variables</DropdownElement>
                    </BaseComponent>
                </DropdownContent>

                <DynamicDropdown
                    dropdownId="main.effects"
                    registryType="enchantment_effect_component_type"
                    onItemClick={createBlueprint}
                    itemIcon="/icons/star.svg"
                    formatLabel={(item) => snakeToTitleCase(item)}
                />

                <DropdownContent dropdownId="main.conditions">
                    <BaseComponent variant="dropdown">
                        <DropdownElement icons="/icons/tools/studio/condition.svg">New Simple Condition</DropdownElement>
                        <DropdownElement icons="/icons/tools/studio/condition.svg">New Complex Condition</DropdownElement>
                    </BaseComponent>
                </DropdownContent>
            </div>
        </DropdownProvider>
    );
}
