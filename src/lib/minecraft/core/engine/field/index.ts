import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type ToggleField, getToggleField } from "@/lib/minecraft/core/engine/field/toggle/getToggleField";
import { type ToggleName, getToggleName } from "@/lib/minecraft/core/engine/field/toggle/getToggleName";

export type Field = string | ToggleField | ToggleName;

export function getField<T extends keyof Analysers>(
    params: Field,
    toggleSection: Record<string, ToggleSection> | undefined
): keyof GetAnalyserVoxel<T> {
    if (typeof params === "string") {
        return params as keyof GetAnalyserVoxel<T>;
    }

    switch (params.type) {
        case "get_toggle_field": {
            return getToggleField(params, toggleSection);
        }
        case "get_toggle_name": {
            return getToggleName(params, toggleSection);
        }
    }
}

export type { ToggleField, ToggleName };
