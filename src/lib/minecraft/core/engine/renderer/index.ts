import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import type { GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import { checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { Lock } from "@/lib/minecraft/core/schema/primitive/component";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { RegistryElement } from "@/lib/minecraft/mczip";

export function checkLocks<T extends keyof Analysers>(
    locks: Lock[] | undefined,
    element: RegistryElement<GetAnalyserVoxel<T>>
): { isLocked: boolean; text?: TranslateTextType } {
    if (!locks) return { isLocked: false };

    for (const lock of locks) {
        if (checkCondition<T>(lock.condition, element)) {
            return { isLocked: true, text: lock.text };
        }
    }

    return { isLocked: false };
}
