import Button from "@/components/ui/react/Button.tsx";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import translate from "@/lib/minecraft/i18n/translate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { cn } from "@/lib/utils.ts";
import type React from "react";

export default function ToolSection(props: {
    title: TranslateTextType | string;
    id: string;
    toggle?: ToggleSection[];
    children?: React.ReactNode;
    button?: { text: TranslateTextType | string; url: string };
}) {
    const store = useConfiguratorStore();
    const toggleSection = store.toggleSection;
    const changeToggleValue = store.changeToggleValue;

    return (
        <div className="bg-black/50 p-4 flex flex-col ring-0 transition-all rounded-xl">
            <div className="py-2 px-2 flex justify-between items-center cursor-pointer">
                <div>
                    <h2 className="text-2xl font-semibold">{translate(props.title)}</h2>
                    {props.toggle?.some((toggle) => toggle.name === toggleSection?.[props.id]?.name) && (
                        <div className="text-xs text-zinc-400 font-light">
                            {translate(props.toggle?.find((toggle) => toggle.name === toggleSection?.[props.id]?.name)?.description)}
                        </div>
                    )}
                </div>
                {props.button && (
                    <Button href={props.button.url} variant="ghost">
                        {translate(props.button.text)}
                    </Button>
                )}
                {props.toggle && (
                    <div className="flex gap-x-2 py-2 px-2 items-center rounded-2xl p-1 bg-header-cloudy shrink-0">
                        {props.toggle?.map((element) => (
                            <div
                                className={cn("px-4 py-2 rounded-xl", {
                                    "bg-rose-900 text-white": toggleSection?.[props.id]?.name === element.name
                                })}
                                key={element.name}
                                onKeyDown={() => changeToggleValue(props.id, element)}
                                onClick={() => changeToggleValue(props.id, element)}>
                                <p className="text-sm font-semibold">{translate(element.title)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="transition-height duration-100 ease-in-out overflow-hidden pb-1 px-1">
                <div className="pt-4 gap-4 flex items flex-col">{props.children}</div>
            </div>
        </div>
    );
}
