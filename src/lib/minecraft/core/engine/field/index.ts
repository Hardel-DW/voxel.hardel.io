import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { toast } from "sonner";

export type Field = string | ToggleField;

export type ToggleField = {
    type: "Toggle";
    group: string;
};

export function getField<T extends keyof Analysers>(
    params: Field,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): keyof GetAnalyserVoxel<T> {
    const { toggleSection } = context;
    if (!toggleSection) {
        toast.error("Internal Server", {
            description: `An error occurred while trying to get the field ${params}`
        });

        throw new Error(`An error occurred while trying to get the field ${params}`);
    }

    if (typeof params === "string") {
        return params as keyof GetAnalyserVoxel<T>;
    }

    switch (params.type) {
        case "Toggle": {
            return toggleSection[params.group] as keyof GetAnalyserVoxel<T>;
        }
    }
}
