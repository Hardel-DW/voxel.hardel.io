import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type ToggleField, getToggleField } from "@/lib/minecraft/core/engine/field/toggle/getToggleField";
import { type ToggleName, getToggleName } from "@/lib/minecraft/core/engine/field/toggle/getToggleName";

export type Field = string | ToggleField | ToggleName;

export function getField<T extends keyof Analysers>(
    params: Field,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): keyof GetAnalyserVoxel<T> {
    if (typeof params === "string") {
        return params as keyof GetAnalyserVoxel<T>;
    }

    switch (params.type) {
        case "get_toggle_field": {
            return getToggleField(params, context);
        }
        case "get_toggle_name": {
            return getToggleName(params, context);
        }
    }
}

export type { ToggleField, ToggleName };
