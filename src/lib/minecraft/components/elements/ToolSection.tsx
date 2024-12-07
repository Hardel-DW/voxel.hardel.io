import Button from "@/components/ui/react/Button.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import TranslateText, { type TranslateTextType } from "@/lib/minecraft/components/elements/text/TranslateText.tsx";
import type { FormComponent } from "@/lib/minecraft/core/engine";
import { cn } from "@/lib/utils.ts";
import type React from "react";

export type ToolSectionType = {
    type: "Section";
    id: string;
    title: TranslateTextType;
    children: FormComponent[];
    toggle?: ToggleSection[];
    button?: { text: TranslateTextType; url: string };
};

export type ToggleSection = {
    name: string;
    field?: string;
    title: TranslateTextType;
    description: TranslateTextType;
};

export default function ToolSection(props: {
    title: TranslateTextType | string;
    id: string;
    toggle?: ToggleSection[];
    children?: React.ReactNode;
    button?: { text: TranslateTextType | string; url: string };
}) {
    const { toggleSection, changeToggleValue } = useConfigurator();

    return (
        <div className="bg-black/50 p-4 flex flex-col ring-0 transition-all rounded-xl">
            <div className="py-2 px-2 flex justify-between items-center cursor-pointer">
                <div>
                    <h2 className="text-2xl font-semibold">
                        <TranslateText content={props.title} />
                    </h2>
                    {props.toggle?.some((toggle) => toggle.name === toggleSection?.[props.id]?.name) && (
                        <div className="text-xs text-zinc-400 font-light">
                            <TranslateText
                                content={props.toggle?.find((toggle) => toggle.name === toggleSection?.[props.id]?.name)?.description}
                            />
                        </div>
                    )}
                </div>
                {props.button && (
                    <Button href={props.button.url} variant="ghost">
                        <TranslateText content={props.button.text} />
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
                                <p className="text-sm font-semibold">
                                    <TranslateText content={element.title} />
                                </p>
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
