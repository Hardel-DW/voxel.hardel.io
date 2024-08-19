import { useTranslate } from "@/components/TranslateContext.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type React from "react";

export function EnchantmentEffects({
    name,
    isChecked,
    onChange
}: {
    name: keyof EffectComponentsRecord;
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { translate } = useTranslate();

    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <div className="flex items-center justify-between w-full h-auto">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">{Identifier.fromString(name, "EnchantmentEffect").render()}</span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate[`tools.effects.${name}`]}</span>
                </div>
                <label htmlFor="">
                    <input type="checkbox" checked={isChecked} onChange={onChange} />
                </label>
            </div>
        </div>
    );
}
