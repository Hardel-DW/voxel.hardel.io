import { translate } from "@/lib/hook/useTranslate";
import type { ToolSwitchType } from "@voxelio/breeze/core";
import type { InteractiveComponentProps } from "./InteractiveComponent";

export default function ToolSwitch({ component, interactiveProps }: InteractiveComponentProps<boolean, ToolSwitchType>) {
    const { value, lock, handleChange } = interactiveProps;

    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl relative">
            <label className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">{translate(component.title)}</span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">
                        {lock.isLocked ? (
                            <span className="text-xs text-zinc-400 font-light w-max">{translate(lock.text)}</span>
                        ) : (
                            translate(component.description)
                        )}
                    </span>
                </div>
                <div className="flex gap-4">
                    <input
                        type="checkbox"
                        name={translate(component.title) || "No name"}
                        disabled={lock.isLocked}
                        checked={value || lock.isLocked}
                        onChange={(e) => handleChange(e.target.checked)}
                    />
                </div>
            </label>
            <div className="absolute inset-0 -z-10 brightness-15 border-t border-l border-zinc-800">
                <img src="/images/shine.avif" alt="Shine" />
            </div>
        </div>
    );
}
