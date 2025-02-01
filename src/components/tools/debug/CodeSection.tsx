import CodeBlock from "@/components/ui/codeblock/CodeBlock";
import EmptyCodeBlock from "@/components/ui/codeblock/EmptyCodeBlock";
import { useTranslate } from "@/components/useTranslate";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import { type CompileDatapackResult, getIdentifierFromCompiler } from "@/lib/minecraft/core/engine/Compiler";
import { Identifier } from "@/lib/minecraft/core/Identifier";
import { useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";

interface CodeSectionProps {
    code: CompileDatapackResult<keyof Analysers> | undefined;
    onClose: () => void;
}

export function CodeSection({ code, onClose }: CodeSectionProps) {
    const { t } = useTranslate();
    const storeValues = useConfiguratorStore.getState();
    const { name, version } = storeValues;

    if (!code) return null;
    const identifier = getIdentifierFromCompiler(code);

    return (
        <div className="overflow-hidden h-full pt-12 relative">
            <div className="absolute top-0 left-0 px-2">
                <p className="text-zinc-400">{name}</p>
                <p className="text-xs text-zinc-500">Pack Version - {version}</p>
            </div>
            <button
                className="absolute top-1 right-0 rounded-xl text-zinc-500 hover:text-zinc-200 transition-colors bg-zinc-950/10 px-2 py-1 border-zinc-950"
                onClick={onClose}
                onKeyDown={onClose}
                type="button">
                {t("tools.debug.quit")}
            </button>
            {code.type !== "deleted" ? (
                <CodeBlock language="json" title={new Identifier(identifier).toFileName()}>
                    {JSON.stringify(code.element.data, null, 4)}
                </CodeBlock>
            ) : (
                <EmptyCodeBlock title={new Identifier(identifier).toFileName()}>This files is deleted.</EmptyCodeBlock>
            )}
        </div>
    );
}
