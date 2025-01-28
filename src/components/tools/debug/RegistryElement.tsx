import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import type { CompileDatapackResult } from "@/lib/minecraft/core/engine/Compiler";
import { getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler";
import { cn } from "@/lib/utils";

interface RegistryElementProps {
    element: CompileDatapackResult<keyof Analysers>;
    selectedElement: CompileDatapackResult<keyof Analysers> | undefined;
    onElementSelect: (element: CompileDatapackResult<keyof Analysers>) => void;
}

export function RegistryElement({ element, selectedElement, onElementSelect }: RegistryElementProps) {
    const identifier = getIdentifierFromCompiler(element);
    const isSelected = selectedElement && getIdentifierFromCompiler(selectedElement).equals(identifier);

    return (
        <div
            key={identifier.filePath()}
            onClick={() => onElementSelect(element)}
            onKeyDown={() => onElementSelect(element)}
            className={cn(
                "border-zinc-800 relative cursor-pointer border-t border-b rounded-lg p-2 bg-zinc-900/10 hover:bg-zinc-800/50 transition-colors",
                {
                    "border-red-950": element.type === "deleted",
                    "border-green-950": element.type === "new"
                }
            )}>
            <p className="absolute top-2 right-2 px-2 rounded-2xl bg-zinc-700/50 text-[0.65rem] text-zinc-500">
                {identifier.renderNamespace()}
            </p>
            <div
                className={cn("text-white", {
                    "text-rose-500": isSelected
                })}>
                {identifier.renderResource()}
            </div>
            <small className="text-xs text-gray-400">{identifier.toString()}</small>
        </div>
    );
}
