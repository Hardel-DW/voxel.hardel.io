import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import translate from "@/lib/minecraft/i18n/translate";

export default function ToolListItem({ content }: { content: TranslateTextType | string }) {
    return <li className="text-zinc-400">{translate(content)}</li>;
}
