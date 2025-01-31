import Counter from "@/components/ui/react/Counter";
import type { ToolCounterType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import type { InteractiveComponentProps } from "./InteractiveComponent";

export default function ToolCounter({ component, interactiveProps }: InteractiveComponentProps<number, ToolCounterType>) {
    const { value, isLocked, lockText, handleChange } = interactiveProps;

    return (
        <div className="bg-blue-50/5 ring-0 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 p-6 rounded-xl">
            <div className="flex flex-col items-center justify-between gap-4 h-full">
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-1">{translate(component.title)}</h3>
                    {isLocked ? (
                        <span className="text-xs text-zinc-400 font-light line-clamp-2">{translate(lockText)}</span>
                    ) : (
                        component.description && <p className="text-sm text-zinc-400">{translate(component.description)}</p>
                    )}
                </div>

                <img src={component.image} alt="Images" className="h-16 pixelated invert" />

                <Counter
                    value={value}
                    min={component.min}
                    max={component.max}
                    step={component.step}
                    onChange={handleChange}
                    disabled={!!component.lock}
                />

                {component.short && (
                    <p className="text-xs text-zinc-400 pt-4 mt-4 border-t border-zinc-700">{translate(component.short)}</p>
                )}
            </div>
        </div>
    );
}
