import type { Analysers } from "../../Analyser";

import type { RegistryElement } from "@/lib/minecraft/mczip";
import type { GetAnalyserVoxel } from "../../Analyser";

export type ConditionNamespace = {
    condition: "check_namespace";
    values: string;
};

export function CheckNamespaceCondition<T extends keyof Analysers>(
    condition: ConditionNamespace,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    return condition.values === element.identifier.getNamespace();
}
