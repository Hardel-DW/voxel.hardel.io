import type { ToolConfiguration } from "@/lib/minecraft/core/engine";

export function calculateInitialToggleSection(config: ToolConfiguration): Record<string, string> {
    const result: Record<string, string> = {};

    function traverse(obj: any, currentPath: string[] = []) {
        if (typeof obj !== "object" || obj === null) return;

        for (const [key, value] of Object.entries(obj)) {
            if (key === "type" && value === "Switch") {
                const sectionKey = currentPath[currentPath.length - 2] || "";
                if (!result[sectionKey]) {
                    result[sectionKey] = currentPath[currentPath.length - 1];
                }
            } else if (typeof value === "object") {
                traverse(value, [...currentPath, key]);
            }
        }
    }

    traverse(config);
    return result;
}
