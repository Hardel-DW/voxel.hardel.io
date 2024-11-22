import { useTranslate } from "@/components/TranslateContext.tsx";
import TranslateText, { getKey, type TranslateTextType } from "@/lib/minecraft/components/elements/text/TranslateText.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import { cn, quoteString } from "@/lib/utils.ts";

export type ToolSlotType = {
    type: "Slot";
    description?: TranslateTextType;
    title: TranslateTextType;
    image: string;
    action: Action;
    size?: number;
    condition?: Condition;
    lock?: ValueParams<string>;
};

export default function ToolSlot(props: {
    title: TranslateTextType | string;
    image: string;
    description?: TranslateTextType | string;
    value?: boolean | string | number;
    size?: number;
    lock?: string;
    onChange?: (value: boolean | string | number) => void;
    checked?: boolean;
}) {
    const { translate } = useTranslate();
    const handleChange = (option: boolean) => {
        if (props.lock) return;

        props.onChange?.(option);
    };

    return (
        <div
            className={cn(
                "bg-blue-50/5 select-none ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl",
                { "ring-1 ring-rose-900": props.checked },
                { "opacity-50 ring-1 ring-rose-950": !!props.lock }
            )}
            onClick={() => handleChange(!props.checked)}
            onKeyDown={() => handleChange(!props.checked)}
        >
            {(props.checked || !!props.lock) && (
                <div className="absolute p-4 top-0 right-0">
                    <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                </div>
            )}

            {props.lock && (
                <span className="absolute p-4 bottom-0 right-0 text-xs text-zinc-400 font-light">
                    {translate["tools.enchantments.section.technical.components.reason"].replace(
                        "%s",
                        quoteString(Identifier.fromString(props.lock).renderResourceName())
                    )}
                </span>
            )}

            <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-8 text-center">
                    <h3 className="text-lg font-semibold mb-1">
                        <TranslateText content={props.title} />
                    </h3>
                    {props.description && (
                        <p className="text-sm text-zinc-400">
                            <TranslateText content={props.description} />
                        </p>
                    )}
                </div>

                <img
                    src={props.image}
                    alt={getKey(props.title)}
                    className="mb-8 pixelated"
                    style={{
                        height: props.size ? props.size : "64px"
                    }}
                />
            </div>
        </div>
    );
}
