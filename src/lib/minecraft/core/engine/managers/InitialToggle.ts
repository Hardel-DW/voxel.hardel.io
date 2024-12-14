import type { InterfaceConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { Unresolved } from "@/lib/minecraft/core/engine/resolver/field/type";
import type { ToolSectionType } from "@/lib/minecraft/core/schema/primitive/component";

export function calculateInitialToggle(interface_: Unresolved<InterfaceConfiguration>[]): ToggleSectionMap {
    const result: ToggleSectionMap = {};

    for (const section of interface_) {
        for (const component of section.components) {
            if (component.type === "Section") {
                const sectionComponent = component as Unresolved<ToolSectionType>;
                if (sectionComponent.toggle) {
                    const firstToggleName = sectionComponent.toggle[0];

                    if (typeof sectionComponent.id === "string") {
                        const id = sectionComponent.id;
                        if (firstToggleName) {
                            if (typeof firstToggleName === "string") {
                                result[id] = firstToggleName;
                            }
                        }
                    }
                }
            }
        }
    }

    return result;
}
