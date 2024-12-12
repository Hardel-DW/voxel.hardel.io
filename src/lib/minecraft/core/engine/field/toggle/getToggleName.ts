import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { toast } from "sonner";

export type ToggleName = {
    type: "get_toggle_name";
    group: string;
};

export function getToggleName<T extends keyof Analysers>(
    params: ToggleName,
    toggleSection: Record<string, ToggleSection> | undefined
): keyof GetAnalyserVoxel<T> {
    if (!toggleSection) {
        toast.error("Internal Server", {
            description: `An error occurred while trying to get the name ${params.group}`
        });
        throw new Error(`An error occurred while trying to get the name ${params.group}`);
    }

    return toggleSection[params.group]?.name as keyof GetAnalyserVoxel<T>;
}
