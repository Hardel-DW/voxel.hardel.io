import Counter from "@/components/ui/Counter.tsx";
import type { Action } from "@/lib/minecraft/voxel/actions";
import type { Condition } from "@/lib/minecraft/voxel/condition";

interface Props {
    title: string;
    image: string;
    value?: number;
    min: number;
    max: number;
    step: number;
    description?: string;
    onChange?: (value: number) => void;
}

export type ToolCounterType = {
    type: "Counter";
    title: string;
    description: string;
    image: string;
    value: number;
    min: number;
    max: number;
    step: number;
    action: Action;
    condition: Condition[];
};

export default function ToolCounter(props: Props) {
    const handleChange = (option: number) => {
        props.onChange?.(option);
    };

    return (
        <div className="bg-blue-50/5 ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">{props.title}</h3>
                    {props.description && <p className="text-sm text-zinc-400">{props.description}</p>}
                </div>

                <img src={props.image} alt={props.title} className="h-16 pixelated invert" />

                <Counter value={props.value ?? 0} min={props.min} max={props.max} step={props.step} onChange={handleChange} />
            </div>
        </div>
    );
}
