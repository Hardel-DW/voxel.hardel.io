import { checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { Lock, LockRenderer } from "@/lib/minecraft/core/schema/primitive/component";

export function checkLocks(locks: Lock[] | undefined, element: Record<string, unknown>): LockRenderer {
    if (!locks) return { isLocked: false };

    for (const lock of locks) {
        if (checkCondition(lock.condition, element)) {
            return { isLocked: true, text: lock.text };
        }
    }

    return { isLocked: false };
}
