import type { TargetSelector } from "@/lib/minecraft/registry/DamagaTypeRegistry.ts";

export interface TargetedConditionalEffect<T> {
    enchanted: TargetSelector;
    affected?: TargetSelector;
    effect: T;
    requirements?: any | any[];
}
