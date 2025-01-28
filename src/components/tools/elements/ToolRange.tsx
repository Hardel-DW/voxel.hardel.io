import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import translate from "@/lib/minecraft/i18n/translate";
import type { InputHTMLAttributes } from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: TranslateTextType | string;
    onChange?: (option: number) => void;
    value?: number;
    lock?: TranslateTextType | string;
    min?: number;
    max?: number;
    step?: number;
}

export default function ToolRange({ id, label, onChange, min = 0, max = 100, step = 1, ...props }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.lock) return;

        onChange?.(+e.currentTarget.value);
    };

    return (
        <div className="relative w-full mt-4">
            <div className="flex justify-between items-center w-full">
                {props.lock ? (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(props.lock)}</span>
                ) : (
                    label && (
                        <label htmlFor={id} className="block line-clamp-1 text-sm font-medium text-zinc-400 mb-1">
                            {translate(label)}
                        </label>
                    )
                )}

                <span className="text-sm font-medium text-zinc-400">{props.value}</span>
            </div>
            <input
                id={id}
                type="range"
                disabled={!!props.lock}
                min={min}
                max={max}
                step={step}
                onInput={handleChange}
                className="w-full text-sm font-normal"
                {...props}
            />
        </div>
    );
}
