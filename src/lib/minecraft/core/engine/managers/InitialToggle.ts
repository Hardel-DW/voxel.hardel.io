import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type";
import type { InterfaceConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToolSectionType } from "@/lib/minecraft/core/schema/primitive/component";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";
import { resolve } from "../resolver/field/resolveField";

export function calculateInitialToggle(interface_: Unresolved<InterfaceConfiguration>[]): ToggleSectionMap {
    const result: ToggleSectionMap = {};

    for (const section of interface_) {
        for (const component of section.components) {
            if (component.type === "Section") {
                const sectionComponent = component as Unresolved<ToolSectionType>;
                if (sectionComponent.toggle && sectionComponent.toggle.length > 0) {
                    const firstToggle = sectionComponent.toggle[0];

                    if (typeof sectionComponent.id === "string" && firstToggle && typeof firstToggle === "object") {
                        result[sectionComponent.id] = resolve(firstToggle, {});
                    }
                }
            }
        }
    }

    return result;
}
