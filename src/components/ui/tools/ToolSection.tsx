import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { ToggleSection } from "@/lib/minecraft/voxel";
import { cn } from "@/lib/utils.ts";
import type React from "react";

interface Props {
    title: string;
    id: string;
    toggle?: ToggleSection[];
    children?: React.ReactNode;
}

export default function ToolSection({ title, children, toggle, id }: Props) {
    const { toggleSection, setToggleSection } = useConfigurator();
    const { translate } = useTranslate();

    return (
        <div className="bg-black/50 p-4 flex flex-col ring-0 transition-all rounded-xl">
            <div className="py-2 px-2 flex justify-between items-center cursor-pointer">
                <div>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    {toggle?.some((toggle) => toggle.name === toggleSection?.[id]) && (
                        <div className="text-xs text-zinc-400 font-light">
                            {
                                translate[
                                    toggle?.find((toggle) => toggle.name === toggleSection?.[id])?.description ??
                                        "generic.translation.missing"
                                ]
                            }
                        </div>
                    )}
                </div>
                <div className="flex gap-x-2 py-2 px-2 items-center rounded-2xl p-1 bg-header-cloudy">
                    {toggle?.map((element) => (
                        <div
                            className={cn("px-4 py-2 rounded-xl", {
                                "bg-rose-900 text-white": toggleSection?.[id] === element.name
                            })}
                            key={element.name}
                            onKeyDown={() => setToggleSection(id, element.name)}
                            onClick={() => setToggleSection(id, element.name)}
                        >
                            <p className="text-sm font-semibold">{translate[element.title]}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="transition-height duration-100 ease-in-out overflow-hidden pb-1 px-1">
                <div className="pt-4 gap-4 flex items flex-col">{children}</div>
            </div>
        </div>
    );
}
