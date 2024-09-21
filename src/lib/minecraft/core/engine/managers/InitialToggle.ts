import type { InterfaceConfiguration } from "@/lib/minecraft/core/engine";

export function calculateInitialToggle(interfaces: InterfaceConfiguration[]): Record<string, string> {
    const result: Record<string, string> = {};

    for (const section of interfaces) {
        for (const component of section.components) {
            if (component.type === "Section" && component.toggle) {
                const firstToggleName = component.toggle[0]?.name;
                if (firstToggleName) {
                    result[component.id] = firstToggleName;
                }
            }
        }
    }

    return result;
}
