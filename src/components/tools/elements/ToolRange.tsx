import { translate } from "@/lib/hook/useTranslate";
import type { ToolRangeType } from "@voxelio/breeze/core";
import { getKey } from "@voxelio/breeze/i18n";
import type { InteractiveComponentProps } from "./InteractiveComponent";

export default function ToolRange({ component, interactiveProps }: InteractiveComponentProps<number, ToolRangeType>) {
    const { value, lock, handleChange } = interactiveProps;

    return (
        <div className="relative w-full mt-4">
            <div className="flex justify-between items-center w-full">
                {lock.isLocked ? (
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(lock.text)}</span>
                ) : (
                    component.label && (
                        <label htmlFor={getKey(component.label)} className="block line-clamp-1 text-sm font-medium text-zinc-400 mb-1">
                            {translate(component.label)}
                        </label>
                    )
                )}
                <span className="text-sm font-medium text-zinc-400">{value}</span>
            </div>
            <input
                id={getKey(component.label)}
                type="range"
                disabled={lock.isLocked}
                min={component.min}
                max={component.max}
                step={component.step}
                value={value}
                onChange={(e) => handleChange(+e.target.value)}
                className="w-full text-sm font-normal"
            />
        </div>
    );
}
