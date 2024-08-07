import type { LockedTags } from "@/components/ui/tools/index.ts";
import type React from "react";

interface Props {
    title: string;
    description: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    forced?: string;
}

export type ToolSwitchType = {
    type: "Switch";
    forced?: string;
    lock?: LockedTags[];
    name: string;
    title: string;
    description: string;
};

export default function ToolSwitch({ title, description, checked, onChange, name, forced }: Props) {
    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 p-6 rounded-xl">
            <label className="flex items-center justify-between w-full">
                <div className="flex flex-col w-3/4">
                    <span className="text-white line-clamp-1">{title}</span>
                    <span className="text-xs text-zinc-400 font-light line-clamp-2">{description}</span>
                </div>
                <div className="flex gap-4">
                    {forced && <span className="text-xs text-zinc-400 font-light w-max">{forced}</span>}
                    <input type="checkbox" name={name} id={name} disabled={!!forced} checked={checked || !!forced} onChange={onChange} />
                </div>
            </label>
        </div>
    );
}
