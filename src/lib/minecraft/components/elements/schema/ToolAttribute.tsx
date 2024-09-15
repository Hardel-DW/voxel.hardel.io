import LevelBasedValue from "@/lib/minecraft/components/elements/schema/ToolLevelBasedValue.tsx";
import type { AttributeEffectFields } from "@/lib/minecraft/schema/enchantment/AttributeEffectFields.ts";

export default function ToolAttribute({
    effect
}: {
    effect: AttributeEffectFields;
}) {
    return (
        <div className="flex flex-col w-full">
            <span className="text-gray-300 font-semibold text-sm w-fit bg-black/50 p-2 rounded-t-xl">{effect.attribute}</span>
            <div className="grid items-center gap-4 bg-black/50 p-2 rounded-xl rounded-tl-none w-full">
                <div className="flex items-center gap-4 relative">
                    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center p-1" />
                    <LevelBasedValue element={effect.amount} title={"Amount"} />
                </div>
            </div>
        </div>
    );
}
