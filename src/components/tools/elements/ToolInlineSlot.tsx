import translate from "@/lib/minecraft/i18n/translate";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import { cn } from "@/lib/utils.ts";

export default function ToolInline(props: {
    title: TranslateTextType | string;
    image: string;
    description?: TranslateTextType | string;
    value?: boolean | string | number;
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
                "bg-blue-50/5 group select-none ring-0 h-48 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 rounded-xl",
                { "ring-1 ring-rose-900": props.checked },
                { "opacity-50 ring-1 ring-rose-950": !!props.lock }
            )}
            onClick={() => handleChange(!props.checked)}
            onKeyDown={() => handleChange(!props.checked)}>
            {props.checked && !props.lock && (
                <div className="absolute z-30 top-0 right-0 p-2 bg-zinc-950/80 rounded-bl-xl rounded-tr-2xl">
                    <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                </div>
            )}

            {props.lock && <span className="absolute top-0 p-4 text-xs text-zinc-400 font-light">{translate(props.lock)}</span>}

            <div className="stack h-full rounded-2xl overflow-hidden">
                <div className="pb-2 self-end px-4 relative z-20">
                    <h3 className="text-xl font-semibold text-white">{translate(props.title)}</h3>
                    {props.description && <p className="text-sm text-zinc-400">{translate(props.description)}</p>}
                </div>
                <div className="rounded-2xl relative bg-shadow-bottom z-10" />
                <div
                    className="w-full h-full rounded-2xl bg-cover bg-center group-hover:scale-110 duration-500 ease-in-out transition"
                    style={{ backgroundImage: `url(${props.image})` }}
                />
            </div>
        </div>
    );
}
