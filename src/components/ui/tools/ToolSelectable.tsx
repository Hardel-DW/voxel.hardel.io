import { cn } from "@/lib/utils.ts";

export type ToolSelectableType = {
    type: "Selectable";
    name: string[] | string;
    title: string;
    image: string;
    value: string;
    defaultChecked?: boolean;
};

interface Props {
    title: string;
    image: string;
    onChange?: (option: string) => void;
    currentValue?: string | string[];
    value: string;
}

export default function ToolSelectable({ title, image, value, onChange, currentValue }: Props) {
    const handleChange = (option: string | undefined) => {
        if (option === undefined) return;
        onChange?.(option);
    };

    return (
        <div
            className={cn("bg-blue-50/5 ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl", {
                "ring-1 ring-rose-900": value === currentValue
            })}
            onClick={() => handleChange(value)}
            onKeyDown={() => handleChange(value)}
        >
            {Array.isArray(currentValue)
                ? currentValue.includes(value)
                : currentValue === value && (
                      <div className="absolute p-4 top-0 right-0">
                          <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                      </div>
                  )}
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold mb-8">{title}</h3>
                <img src={image} alt={title} className="h-16 pixelated" />
            </div>
        </div>
    );
}
