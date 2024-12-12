import TranslateText from "./TranslateText";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";

export default function ToolListItem({ content }: { content: TranslateTextType | string }) {
    return (
        <li className="text-zinc-400">
            <TranslateText content={content} />
        </li>
    );
}
