import { cn } from "@/lib/utils.ts";

interface Props {
    title: string;
    image: string;
    value?: boolean;
    description?: string;
    onChange?: (option: boolean) => void;
    checked?: boolean;
    forced?: string;
}

export type ToolSlotType = {
    type: "Slot";
    forced?: string;
    name: string;
    description?: string;
    title: string;
    image: string;
};

export default function ToolSlot({ title, image, checked, onChange, description, forced }: Props) {
    const handleChange = (option: boolean) => {
        if (forced) return;

        onChange?.(option);
    };

    return (
        <div
            className={cn(
                "bg-blue-50/5 ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl",
                { "ring-1 ring-rose-900": checked || !!forced },
                { "opacity-50": !!forced }
            )}
            onClick={() => handleChange(!checked)}
            onKeyDown={() => handleChange(!checked)}
        >
            {(checked || !!forced) && (
                <div className="absolute p-4 top-0 right-0">
                    <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                </div>
            )}

            {forced && <span className="absolute p-4 bottom-0 right-0 text-xs text-zinc-400 font-light">{forced}</span>}

            <div className="flex flex-col items-center justify-center">
                <div className="mb-8 text-center">
                    <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    {description && <p className="text-sm text-zinc-400">{description}</p>}
                </div>

                <img src={image} alt={title} className="h-16 mb-8 pixelated" />
            </div>
        </div>
    );
}
