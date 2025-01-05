import translate from "@/lib/minecraft/i18n/translate";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import Counter from "@/components/ui/react/Counter.tsx";

export default function ToolCounter(props: {
    title: TranslateTextType | string;
    short?: TranslateTextType | string;
    description?: TranslateTextType | string;
    image: string;
    value?: number;
    min: number;
    max: number;
    step: number;
    onChange?: (value: number) => void;
}) {
    const handleChange = (option: number) => {
        props.onChange?.(option);
    };

    return (
        <div className="bg-blue-50/5 ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl">
            <div className="flex flex-col items-center justify-between gap-4 h-full">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">{translate(props.title)}</h3>
                    {props.description && <p className="text-sm text-zinc-400">{translate(props.description)}</p>}
                </div>

                <img src={props.image} alt="Images" className="h-16 pixelated invert" />

                <Counter value={props.value ?? 0} min={props.min} max={props.max} step={props.step} onChange={handleChange} />
                {props.short && <p className="text-xs text-zinc-400 pt-4 mt-4 border-t border-zinc-700">{translate(props.short)}</p>}
            </div>
        </div>
    );
}
