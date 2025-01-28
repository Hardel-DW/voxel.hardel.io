import { useTranslate } from "@/components/useTranslate";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type React from "react";

export function ToolPropertyElement(props: {
    name: string;
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { t } = useTranslate();

    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <label htmlFor={props.name} className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">
                        {Identifier.fromString(props.name, "enchantment_effect_type").renderResource()}
                    </span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{t(`tools.effects.${props.name}`)}</span>
                </div>
                <input id={props.name} name={props.name} type="checkbox" checked={props.isChecked} onChange={props.onChange} />
            </label>
        </div>
    );
}
