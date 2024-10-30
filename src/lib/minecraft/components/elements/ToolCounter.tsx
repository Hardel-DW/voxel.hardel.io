import Counter from "@/components/ui/react/Counter.tsx";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import type { Action } from "src/lib/minecraft/core/engine/actions";
import TranslateText, { type TranslateTextType } from "@/lib/minecraft/components/elements/text/TranslateText.tsx";

export type ToolCounterType = {
    type: "Counter";
    title: TranslateTextType;
    short?: TranslateTextType;
    description?: TranslateTextType;
    image: string;
    min: number;
    max: number;
    step: number;
    action: Action;
    value: ValueParams<number>;
};

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
                    <h3 className="text-lg font-semibold mb-1">
                        <TranslateText content={props.title} />
                    </h3>
                    {props.description && (
                        <p className="text-sm text-zinc-400">
                            <TranslateText content={props.description} />
                        </p>
                    )}
                </div>

                <img src={props.image} alt="Images" className="h-16 pixelated invert" />

                <Counter value={props.value ?? 0} min={props.min} max={props.max} step={props.step} onChange={handleChange} />
                {props.short && (
                    <p className="text-xs text-zinc-400 pt-4 mt-4 border-t border-zinc-700">
                        <TranslateText content={props.short} />
                    </p>
                )}
            </div>
        </div>
    );
}
