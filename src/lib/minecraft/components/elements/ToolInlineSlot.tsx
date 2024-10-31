import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import { cn, quoteString } from "@/lib/utils.ts";
import type { Action } from "src/lib/minecraft/core/engine/actions";
import type { Condition } from "src/lib/minecraft/core/engine/condition";
import TranslateText, { type TranslateTextType } from "@/lib/minecraft/components/elements/text/TranslateText.tsx";

export type ToolInlineType = {
    type: "InlineSlot";
    description?: TranslateTextType;
    title: TranslateTextType;
    image: string;
    action?: Action;
    condition?: Condition;
    lock?: ValueParams<string>;
};

export default function ToolInline(props: {
    title: TranslateTextType | string;
    image: string;
    description?: TranslateTextType | string;
    value?: boolean | string | number;
    lock?: string;
    onChange?: (value: boolean | string | number) => void;
    checked?: boolean;
}) {
    const handleChange = (option: boolean) => {
        if (props.lock) return;
        props.onChange?.(option);
    };

    return (
        <div
            className={cn(
                "bg-blue-50/5 group select-none ring-0 h-48 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 rounded-xl",
                { "ring-1 ring-rose-900": props.checked },
                { "opacity-50 ring-1 ring-rose-950": !!props.lock }
            )}
            onClick={() => handleChange(!props.checked)}
            onKeyDown={() => handleChange(!props.checked)}
        >
            {props.checked && !props.lock && (
                <div className="absolute z-30 top-0 right-0 p-2 bg-zinc-950/80 rounded-bl-xl rounded-tr-2xl">
                    <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                </div>
            )}

            {props.lock && (
                <span className="absolute top-0 p-4 text-xs text-zinc-400 font-light">
                    <TranslateText
                        content={{
                            type: "translate",
                            value: "tools.enchantments.section.technical.components.reason"
                        }}
                    />
                    {quoteString(Identifier.fromString(props.lock).renderResourceName())}
                </span>
            )}

            <div className="stack h-full rounded-2xl overflow-hidden">
                <div className="pb-2 self-end px-4 relative z-20">
                    <h3 className="text-xl font-semibold text-white">
                        <TranslateText content={props.title} />
                    </h3>
                    {props.description && (
                        <p className="text-sm text-zinc-400">
                            <TranslateText content={props.description} />
                        </p>
                    )}
                </div>
                <div className="rounded-2xl relative shadow-bottom z-10" />
                <div
                    className="w-full h-full rounded-2xl bg-cover bg-center group-hover:scale-110 duration-500 ease-in-out transition"
                    style={{ backgroundImage: `url(${props.image})` }}
                />
            </div>
        </div>
    );
}
