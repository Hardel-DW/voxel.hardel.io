import type { ToggleSection } from "@/lib/minecraft/components/elements/ToolSection";
import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export function calculateInitialToggle(interfaces: InterfaceConfiguration[]): Record<string, ToggleSection> {
    const result: Record<string, ToggleSection> = {};

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
