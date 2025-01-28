import TextComponent from "@/components/tools/elements/text/TextComponent";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser";
import { checkLocks } from "@/lib/minecraft/core/engine/renderer";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { cn } from "@/lib/utils.ts";
import { useRef } from "react";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { checkCondition } from "@/lib/minecraft/core/engine/condition";
import { resolve } from "@/lib/minecraft/core/engine/renderer/resolve_field";

export function SidebarItem<T extends keyof Analysers>(props: {
    element: RegistryElement<GetAnalyserVoxel<T>>;
}) {
    if (props.element.data?.override?.configurator.hide) {
        return null;
    }

    const store = useConfiguratorStore();
    const switchRef = useRef<HTMLDivElement>(null);
    const configuration = store.configuration;
    const toggleSection = store.toggleSection;
    const currentElementId = store.currentElementId;
    const setCurrentElementId = store.setCurrentElementId;
    const handleChange = store.handleChange;
    const elements = store.elements;

    if (!currentElementId) return null;
    const currentElement = elements.find((element) => element.identifier.equals(currentElementId));

    if (!configuration || !toggleSection || !currentElement) return null;
    const resolvedSidebar = resolve(configuration.sidebar, toggleSection);
    if (!resolvedSidebar) return null;

    const lock = resolvedSidebar.lock;
    const lockData = checkLocks(lock, props.element);

    const descriptionField = resolvedSidebar.description;
    const descriptionValue = props.element.data[descriptionField] as string;
    const check = resolvedSidebar.enabled ? !checkCondition(resolvedSidebar.enabled, props.element) : true;

    const handleClick = () => {
        if (switchRef.current?.contains(document.activeElement)) return;
        setCurrentElementId(props.element.identifier);
    };

    const handleSwitch = (checked: boolean) => {
        if (!resolvedSidebar.action) return;
        handleChange(resolvedSidebar.action, props.element.identifier, checked);
    };

    return (
        <div
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": currentElement?.identifier?.equals(props.element.identifier)
            })}>
            <div className="flex items-center justify-between" onClick={handleClick} onKeyDown={handleClick}>
                <TextComponent data={descriptionValue} />
                <div className="flex items-center gap-8" ref={switchRef}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <label className="flex items-center justify-between gap-4">
                                <input
                                    type="checkbox"
                                    name="enable"
                                    disabled={lockData.isLocked}
                                    checked={check}
                                    onChange={(e) => handleSwitch(!e.target.checked)}
                                />
                            </label>
                        </TooltipTrigger>
                        <TooltipContent align="end" className="w-64">
                            {lockData.isLocked ? (
                                <span className="text-xs text-zinc-400 font-light w-max">{translate(lockData.text)}</span>
                            ) : (
                                <span className="text-xs text-zinc-400 font-light w-max">
                                    {translate({ type: "translate", value: "tooltip.safe_delete" })}
                                </span>
                            )}
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
