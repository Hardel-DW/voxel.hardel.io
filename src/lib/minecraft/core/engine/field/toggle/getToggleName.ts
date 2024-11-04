import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { toast } from "sonner";

export type ToggleName = {
    type: "get_toggle_name";
    group: string;
};

export function getToggleName<T extends keyof Analysers>(
    params: ToggleName,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): keyof GetAnalyserVoxel<T> {
    const { toggleSection } = context;
    if (!toggleSection) {
        toast.error("Internal Server", {
            description: `An error occurred while trying to get the name ${params.group}`
        });
        throw new Error(`An error occurred while trying to get the name ${params.group}`);
    }

    return toggleSection[params.group]?.name as keyof GetAnalyserVoxel<T>;
}
