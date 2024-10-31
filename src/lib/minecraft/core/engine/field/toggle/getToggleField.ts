import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { toast } from "sonner";

export type ToggleField = {
    type: "get_toggle_field";
    group: string;
};

export function getToggleField<T extends keyof Analysers>(
    params: ToggleField,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): keyof GetAnalyserVoxel<T> {
    const { toggleSection } = context;
    if (!toggleSection) {
        toast.error("Internal Server", {
            description: `An error occurred while trying to get the field ${params.group}`
        });
        throw new Error(`An error occurred while trying to get the field ${params.group}`);
    }

    return toggleSection[params.group]?.field as keyof GetAnalyserVoxel<T>;
}
