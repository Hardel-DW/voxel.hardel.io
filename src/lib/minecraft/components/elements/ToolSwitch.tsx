import { useTranslate } from "@/components/TranslateContext.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import { quoteString } from "@/lib/utils.ts";
import type { Action } from "src/lib/minecraft/core/engine/actions";
import type { Condition } from "src/lib/minecraft/core/engine/condition";

interface Props {
    title: string;
    description: string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    name?: string;
    lock?: string;
}

export type ToolSwitchType = {
    type: "Switch";
    title: string;
    description: string;
    action: Action;
    condition?: Condition;
    lock?: ValueParams<string> | null;
};

export default function ToolSwitch({ title, description, checked, onChange, name, lock }: Props) {
    const { translate } = useTranslate();

    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <label className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">{title}</span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{description}</span>
                </div>
                <div className="flex gap-4">
                    {lock && (
                        <span className="text-xs text-zinc-400 font-light w-max">
                            {translate["tools.enchantments.section.technical.components.reason"].replace(
                                "%s",
                                quoteString(Identifier.fromString(lock).renderResourceName())
                            )}
                        </span>
                    )}
                    <input
                        type="checkbox"
                        name={name}
                        id={name}
                        disabled={!!lock}
                        checked={checked || !!lock}
                        onChange={(e) => onChange?.(e.target.checked)}
                    />
                </div>
            </label>
        </div>
    );
}
