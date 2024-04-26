import { cn } from "@/lib/utils";
import React from "react";

export type Elements = {
    href: string;
    selected: boolean;
    checked: boolean;
    title: string;
    information: string;
};

interface Props {
    title: string;
    selected?: boolean;
    completed?: number;
    quest?: number;
    index: number;
    elements: Elements[];
}

export default function NavigationTree({ title, elements, completed, selected, quest, index }: Props) {
    const [open, setOpen] = React.useState(selected);
    const progress = ((completed || 0) / elements.length) * 100;

    return (
        <div
            style={{ animationDuration: `${(index + 5) * 50}ms` }}
            className={cn("select-none relative group/card transition-opacity hover:opacity-100 move-left", {
                "opacity-100": selected,
                "opacity-50": !selected
            })}
        >
            {selected && (
                <div className="absolute inset-0 -z-10 hue-rotate-45 brightness-20">
                    <img src="/images/shine.avif" alt="Shine" />
                </div>
            )}

            {/* Card */}
            <div
                onClick={() => setOpen(!open)}
                className="flex flex-col justify-between rounded-t-xl w-full p-4 h-36 relative cursor-pointer border-b-0 border border-zinc-800 transition-all group-hover/card:border-zinc-600 bg-content"
            >
                <div className="rounded-2xl font-semibold size-full">
                    {title}
                    <div className="text-xs font-normal mt-1 text-zinc-400">{quest || 0} Quêtes restantes</div>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex justify-between text-xs mb-1 text-zinc-300">
                        <span>Progression</span>
                        <span>
                            {completed || 0} / {elements.length}
                        </span>
                    </div>
                    <div className="relative h-1.5 bg-zinc-600 rounded-b-xl">
                        <div className="absolute inset-0 bg-blue-200 rounded-b-xl" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div
                className="overflow-hidden border-t-0 border border-zinc-800 group-hover/card:border-zinc-600 rounded-b-xl bg-content transition-all"
                style={{ maxHeight: open ? 500 : 0 }}
            >
                <ul className="py-4 gap-y-4 px-6 flex flex-col">
                    {elements.map((element) => (
                        <li className="relative group flex items-center w-full transition rounded-xl" key={element.title}>
                            <a
                                href={element.href ? element.href : "#"}
                                className={cn("text-[14px] font-extralight truncate flex items-center justify-between w-full gap-x-4", {
                                    "observed text-blue-200 font-semibold": element.selected,
                                    "text-zinc-300 group-hover:text-white": !element.selected && !element.checked,
                                    "": element.checked
                                })}
                            >
                                <span className="truncate">{element.title}</span>
                                <img src="/icons/lock.svg" alt="lock" className="w-4 h-4 shrink-0 invert opacity-30" />
                            </a>

                            <div
                                className={cn("hidden group-hover:block absolute -left-4 w-1.5 h-1.5 border border-white rotate-45", {
                                    block: element.selected
                                })}
                            />

                            <div
                                className={cn("absolute -left-4 w-3 h-3", {
                                    hidden: !element.checked,
                                    block: element.checked
                                })}
                            >
                                <img src="/icons/check.svg" alt="Checked" className="size-full invert" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
