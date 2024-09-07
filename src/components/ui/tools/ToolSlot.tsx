import { useTranslate } from "@/components/TranslateContext.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Action } from "@/lib/minecraft/voxel/actions";
import type { Condition } from "@/lib/minecraft/voxel/condition";
import { cn } from "@/lib/utils.ts";

interface Props {
    title: string;
    image: string;
    description?: string;
    value?: boolean | string | number;
    hide?: boolean | unknown;
    lock?: Identifier;
    onChange?: (value: boolean | string | number) => void;
    checked?: boolean;
}

export type ToolSlotType = {
    type: "Slot";
    description?: string;
    title: string;
    image: string;
    action: Action;
    condition?: Condition[];
    lock?: Condition[];
    hide?: Condition[];
};

export default function ToolSlot(props: Props) {
    const { translate } = useTranslate();
    const handleChange = (option: boolean) => {
        if (props.lock) return;

        props.onChange?.(option);
    };

    if (props.hide) {
        return null;
    }

    return (
        <div
            className={cn(
                "bg-blue-50/5 ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl",
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
                    {translate["tools.enchantments.section.technical.components.reason"].replace("%s", props.lock.renderResourceName())}
                </span>
            )}

            <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-8 text-center">
                    <h3 className="text-lg font-semibold mb-1">{props.title}</h3>
                    {props.description && <p className="text-sm text-zinc-400">{props.description}</p>}
                </div>

                <img src={props.image} alt={props.title} className="h-16 mb-8 pixelated" />
            </div>
        </div>
    );
}
