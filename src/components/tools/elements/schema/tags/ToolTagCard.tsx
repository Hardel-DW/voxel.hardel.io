import { Identifier } from "@/lib/minecraft/core/Identifier";

interface ToolTagCardProps {
    value: string;
}

export function ToolTagCard({ value }: ToolTagCardProps) {
    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-white">{Identifier.fromString(value).renderResourceName()}</span>
                </div>
                <span className="text-xs text-zinc-400 px-2 py-1 rounded-full bg-zinc-800">
                    {Identifier.fromString(value).renderNamespace()}
                </span>
            </div>
        </div>
    );
}
