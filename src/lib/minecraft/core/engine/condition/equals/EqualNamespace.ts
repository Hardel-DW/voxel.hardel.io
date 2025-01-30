import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type ConditionNamespace = {
    condition: "check_namespace";
    values: string;
};

export function CheckNamespaceCondition(condition: ConditionNamespace, element: RegistryElement<Record<string, unknown>>): boolean {
    return condition.values === element.identifier.getNamespace();
}
