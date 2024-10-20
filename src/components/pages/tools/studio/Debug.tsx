import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import { cleanForJSON } from "@/components/pages/tools/studio/utils.ts";
import CodeBlock from "@/components/ui/codeblock/CodeBlock.tsx";

export default function Debug() {
    const { gridObjects } = useStudioContext();

    const cleanedGridObjects = cleanForJSON(gridObjects);

    return (
        <div className="fixed top-0 right-0 p-4 w-1/4 h-full z-50">
            <CodeBlock className="bg-zinc-950" language="json">
                {JSON.stringify(cleanedGridObjects, null, 2)}
            </CodeBlock>
        </div>
    );
}
