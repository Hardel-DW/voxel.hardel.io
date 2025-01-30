import type { ToolInlineType } from "@/lib/minecraft/core/schema/primitive/component";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { useElementLocks, useElementValue } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

export default function ToolInlineSlot({
    component
}: {
    component: ToolInlineType;
}) {
    const value = useElementValue<boolean>(component.renderer);
    if (value === null) return null;

    const { isLocked, text: lockText } = useElementLocks(component.lock);

    const handleChange = useConfiguratorStore((state) => state.handleChange);
    const currentElementId = useConfiguratorStore((state) => state.currentElementId);

    const handleClick = () => {
        if (isLocked || !component.action) return;
        handleChange(component.action, currentElementId, !value);
    };

    return (
        <div
            className={cn(
                "bg-blue-50/5 group select-none ring-0 h-48 cursor-pointer ring-zinc-700 relative transition-all hover:ring-1 rounded-xl",
                { "ring-1 ring-rose-900": value },
                { "opacity-50 ring-1 ring-rose-950": isLocked }
            )}
            onClick={handleClick}
            onKeyDown={handleClick}>
            {value && !isLocked && (
                <div className="absolute z-30 top-0 right-0 p-2 bg-zinc-950/80 rounded-bl-xl rounded-tr-2xl">
                    <img src="/icons/check.svg" alt="checkbox" className="w-6 h-6 invert" />
                </div>
            )}

            {isLocked && <span className="absolute top-0 p-4 text-xs text-zinc-400 font-light">{translate(lockText)}</span>}

            <div className="stack h-full rounded-2xl overflow-hidden">
                <div className="pb-2 self-end px-4 relative z-20">
                    <h3 className="text-xl font-semibold text-white">{translate(component.title)}</h3>
                    {component.description && <p className="text-sm text-zinc-400">{translate(component.description)}</p>}
                </div>
                <div className="rounded-2xl relative bg-shadow-bottom z-10" />
                <div
                    className="w-full h-full rounded-2xl bg-cover bg-center group-hover:scale-110 duration-500 ease-in-out transition"
                    style={{ backgroundImage: `url(${component.image})` }}
                />
            </div>
        </div>
    );
}
