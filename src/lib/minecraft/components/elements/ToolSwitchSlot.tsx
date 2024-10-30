import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import { cn, quoteString } from "@/lib/utils.ts";
import type { Action } from "src/lib/minecraft/core/engine/actions";
import type { Condition } from "src/lib/minecraft/core/engine/condition";
import TranslateText, { type TranslateTextType } from "@/lib/minecraft/components/elements/text/TranslateText.tsx";

export type ToolSwitchSlotType = {
    type: "SwitchSlot";
    title: TranslateTextType;
    description: TranslateTextType;
    action: Action;
    condition?: Condition;
    lock?: ValueParams<string>;
    hide?: Condition;
};

export default function ToolSwitchSlot(props: {
    title: TranslateTextType | string;
    description: TranslateTextType | string;
    checked?: boolean;
    hide?: boolean | unknown;
    lock?: string;
    onChange?: (value: boolean) => void;
}) {
    const handleChange = () => {
        if (props.lock) return;
        props.onChange?.(!props.checked);
    };

    if (props.hide) {
        return null;
    }

    return (
        <div
            className={cn(
                "bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl cursor-pointer",
                { "ring-1 ring-rose-900": props.checked },
                { "opacity-50 ring-1 ring-rose-950": !!props.lock }
            )}
            onClick={handleChange}
            onKeyDown={handleChange}
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">
                        <TranslateText content={props.title} />
                    </span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">
                        <TranslateText content={props.description} />
                    </span>
                </div>
                <div className="flex gap-4">
                    {props.lock && (
                        <span className="text-xs text-zinc-400 font-light w-max">
                            <TranslateText
                                content={{
                                    type: "translate",
                                    value: "tools.enchantments.section.technical.components.reason"
                                }}
                            />
                            {quoteString(Identifier.fromString(props.lock).renderResourceName())}
                        </span>
                    )}
                    {(props.checked || !!props.lock) && <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />}
                </div>
            </div>
        </div>
    );
}
