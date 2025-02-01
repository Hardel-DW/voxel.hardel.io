import { resolve } from "@/lib/minecraft/core/engine/renderer/resolve_field";
import type { InterfaceConfiguration } from "@/lib/minecraft/core/schema/primitive";
import type { ToolSectionType } from "@/lib/minecraft/core/schema/primitive/component";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export function calculateInitialToggle(interface_: InterfaceConfiguration[]): ToggleSectionMap {
    const result: ToggleSectionMap = {};

    for (const section of interface_) {
        for (const component of section.components) {
            if (component.type === "Section") {
                const sectionComponent = component as ToolSectionType;
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
