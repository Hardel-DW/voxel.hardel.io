import { EnchantmentEffects } from "@/components/pages/tools/enchant/EnchantmentEffects.tsx";
import { useEnchantments } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";

export type ToolEffectType = {
    type: "Effect";
    name: string;
};

export default function ToolEffect() {
    const { removedEffects, currentEnchantmentId, handleUpdateEffect } = useEnchantments();

    return (
        <div className="grid gap-4">
            <h1 className="text-2xl font-semibold mt-8">Effect of enchantment</h1>
            {currentEnchantmentId &&
                removedEffects.find((effect) => effect.enchant.equals(currentEnchantmentId))?.effects?.length === 0 && (
                    <div className="text-zinc-400">This enchantment has no effect.</div>
                )}

            {currentEnchantmentId &&
                removedEffects
                    .find((effect) => effect.enchant.equals(currentEnchantmentId))
                    ?.effects.map((effect) => (
                        <EnchantmentEffects
                            key={effect.type}
                            name={effect.type}
                            isChecked={effect.enabled}
                            onChange={(e) => handleUpdateEffect(currentEnchantmentId, effect.type, e.target.checked)}
                        />
                    ))}
        </div>
    );
}
