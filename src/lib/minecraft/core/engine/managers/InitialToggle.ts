import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export function calculateInitialToggle(interfaces: InterfaceConfiguration[]): ToggleSectionMap {
    const result: ToggleSectionMap = {};

    for (const section of interfaces) {
        for (const component of section.components) {
            if (component.type === "Section" && component.toggle) {
                const firstToggleName = component.toggle[0];
                if (firstToggleName) {
                    result[component.id] = firstToggleName;
                }
            }
        }
    }

    return result;
}
