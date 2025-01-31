import type { ToolSlotType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { getKey } from "@/lib/minecraft/i18n/translations";
import { cn } from "@/lib/utils";
import type { InteractiveComponentProps } from "./InteractiveComponent";

export default function ToolSlot({ component, interactiveProps }: InteractiveComponentProps<boolean, ToolSlotType>) {
    const { value, isLocked, lockText, handleChange } = interactiveProps;

    return (
        <div
            className={cn(
                "bg-blue-50/5 select-none ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl",
                { "ring-1 ring-rose-900": value },
                { "opacity-50 ring-1 ring-rose-950": isLocked }
            )}
            onClick={() => handleChange(!value)}
            onKeyDown={() => handleChange(!value)}>
            {(value || isLocked) && (
                <div className="absolute p-4 top-0 right-0">
                    <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                </div>
            )}

            {isLocked && <span className="absolute p-4 bottom-0 right-0 text-xs text-zinc-400 font-light">{translate(lockText)}</span>}

            <div className="flex flex-col items-center justify-between h-full">
                <div className="mb-8 text-center">
                    <h3 className="text-lg font-semibold mb-1">{translate(component.title)}</h3>
                    {component.description && <p className="text-sm text-zinc-400">{translate(component.description)}</p>}
                </div>

                <img
                    src={component.image}
                    alt={getKey(component.title)}
                    className="mb-8 pixelated"
                    style={{
                        height: component.size ? component.size : "64px"
                    }}
                />
            </div>
        </div>
    );
}
