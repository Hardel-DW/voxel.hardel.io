import type { ToolSwitchSlotType } from "@voxelio/breeze/core";
import { cn } from "@/lib/utils";
import type { InteractiveComponentProps } from "./InteractiveComponent";
import { translate } from "@/components/useTranslate";

export default function ToolSwitchSlot({ component, interactiveProps }: InteractiveComponentProps<boolean, ToolSwitchSlotType>) {
    const { value, lock, handleChange } = interactiveProps;

    return (
        <div
            className={cn(
                "bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl cursor-pointer",
                { "ring-1 ring-rose-900": value },
                { "opacity-50 ring-1 ring-rose-950": lock.isLocked }
            )}
            onClick={() => handleChange(!value)}
            onKeyDown={() => handleChange(!value)}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                    {component.image && (
                        <div className="shrink-0">
                            <img src={component.image} alt="" className="w-8 h-8 object-contain pixelated" />
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-white line-clamp-1">{translate(component.title)}</span>
                        <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(component.description)}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    {lock.isLocked && (
                        <span className="text-xs text-zinc-400 font-light w-max flex items-center">{translate(lock.text)}</span>
                    )}
                    {(value || lock.isLocked) && <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />}
                </div>
            </div>
        </div>
    );
}
