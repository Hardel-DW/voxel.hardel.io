import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import translate from "@/lib/minecraft/i18n/translate";
import { getKey } from "@/lib/minecraft/i18n/translations";
import { cn } from "@/lib/utils.ts";

export default function ToolSlot(props: {
    title: TranslateTextType | string;
    image: string;
    description?: TranslateTextType | string;
    value?: boolean | string | number;
    size?: number;
    lock?: TranslateTextType | string;
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
                "bg-blue-50/5 select-none ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl",
                { "ring-1 ring-rose-900": props.checked },
                { "opacity-50 ring-1 ring-rose-950": !!props.lock }
            )}
            onClick={() => handleChange(!props.checked)}
            onKeyDown={() => handleChange(!props.checked)}>
            {(props.checked || !!props.lock) && (
                <div className="absolute p-4 top-0 right-0">
                    <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                </div>
            )}

            {props.lock && <span className="absolute p-4 bottom-0 right-0 text-xs text-zinc-400 font-light">{translate(props.lock)}</span>}

            <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-8 text-center">
                    <h3 className="text-lg font-semibold mb-1">{translate(props.title)}</h3>
                    {props.description && <p className="text-sm text-zinc-400">{translate(props.description)}</p>}
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
