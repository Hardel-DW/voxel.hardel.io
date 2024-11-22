import TranslateText, { type TranslateTextType } from "@/lib/minecraft/components/elements/text/TranslateText.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import { cn, quoteString } from "@/lib/utils.ts";
import type { Action } from "src/lib/minecraft/core/engine/actions";
import type { Condition } from "src/lib/minecraft/core/engine/condition";

export type ToolSwitchSlotType = {
    type: "SwitchSlot";
    title: TranslateTextType;
    description: TranslateTextType;
    action: Action;
    condition?: Condition;
    lock?: ValueParams<string>;
    image?: string;
};

export default function ToolSwitchSlot(props: {
    title: TranslateTextType | string;
    description: TranslateTextType | string;
    checked?: boolean;
    lock?: string;
    image?: string;
    onChange?: (value: boolean) => void;
}) {
    const handleChange = () => {
        if (props.lock) return;
        props.onChange?.(!props.checked);
    };

    return (
        <div
            className={cn(
                "bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl cursor-pointer",
                { "ring-1 ring-rose-900": props.checked },
                { "opacity-50 ring-1 ring-rose-950": !!props.lock }
            )}
            onClick={handleChange}
            onKeyDown={handleChange}
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    {props.image && (
                        <div className="shrink-0">
                            <img src={props.image} alt="" className="w-8 h-8 object-contain pixelated" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-white line-clamp-1">
                            <TranslateText content={props.title} />
                        </span>
                        <span className="text-xs text-zinc-400 font-light line-clamp-2">
                            <TranslateText content={props.description} />
                        </span>
                    </div>
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
