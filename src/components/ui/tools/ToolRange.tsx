import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label?: string;
    onValueChange?: (value: number) => void;
    value?: number;
}

export type ToolRangeType = {
    type: "Range";
    name: string;
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
};

export default function ToolRange({ id, label, onValueChange, ...props }: Props) {
    return (
        <div className="relative w-full mt-4">
            <div className="flex justify-between items-center w-full">
                {label && (
                    <label htmlFor={id} className="block line-clamp-1 text-sm font-medium text-zinc-400 mb-1">
                        {label}
                    </label>
                )}

                <span className="text-sm font-medium text-zinc-400">{props.value}</span>
            </div>
            <input
                id={id}
                type="range"
                min={0}
                max={100}
                step={1}
                onInput={(e) => onValueChange?.(+e.currentTarget.value)}
                className="w-full text-sm font-normal"
                {...props}
            />
        </div>
    );
}
