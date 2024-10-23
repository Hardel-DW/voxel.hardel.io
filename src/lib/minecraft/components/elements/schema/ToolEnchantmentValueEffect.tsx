import LevelBasedValue from "@/lib/minecraft/components/elements/schema/ToolLevelBasedValue.tsx";
import type { EnchantmentValueEffect } from "@voxel/definitions";

export default function ToolEnchantmentValueEffect({
    effect
}: {
    effect: EnchantmentValueEffect;
}) {
    switch (effect.type) {
        case "minecraft:add":
            return (
                <div className="border-zinc-700 border-t-2 pt-4 flex items-center justify-between">
                    <LevelBasedValue element={effect.value} title={"Add Value"} />
                </div>
            );

        case "minecraft:all_of":
            return (
                <div className="border-zinc-700 border-t-2 pt-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Multiple Operations</h3>
                    <div className="ml-4">
                        {effect.effects.map((subEffect, index) => (
                            <ToolEnchantmentValueEffect key={index.toString()} effect={subEffect} />
                        ))}
                    </div>
                </div>
            );

        case "minecraft:multiply":
            return (
                <div className="border-zinc-700 border-t-2 pt-4 flex items-center justify-between">
                    <LevelBasedValue element={effect.factor} title="Multiply Value" />
                </div>
            );

        case "minecraft:remove_binomial":
            return (
                <div className="border-zinc-700 border-t-2 pt-4 flex items-center justify-between">
                    <LevelBasedValue element={effect.chance} title="Remove Binomial" />
                </div>
            );

        case "minecraft:set":
            return (
                <div className="border-zinc-700 border-t-2 pt-4 flex items-center justify-between">
                    <LevelBasedValue element={effect.value} title="Set Value" />
                </div>
            );

        default:
            return <div className="ring-0 transition-all hover:ring-1 p-6 rounded-xl text-red-400">Unknown Effect</div>;
    }
}
