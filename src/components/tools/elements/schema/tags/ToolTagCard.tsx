import { createIdentifierFromString, identifierToNamespace, identifierToResourceName } from "@/lib/minecraft/core/Identifier";

interface ToolTagCardProps {
    value: string;
    registry: string;
}

export function ToolTagCard({ value, registry }: ToolTagCardProps) {
    const identifier = createIdentifierFromString(value, registry);

    return (
        <div className="bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-white">{identifierToResourceName(identifier.resource)}</span>
                </div>
                <span className="text-xs text-zinc-400 px-2 py-1 rounded-full bg-zinc-800">
                    {identifierToNamespace(identifier.namespace)}
                </span>
            </div>
        </div>
    );
}
