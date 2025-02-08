import type { TranslateTextType } from "@voxelio/breeze/core";
import { translate } from "@/components/useTranslate";

export default function ToolListItem({ content }: { content: TranslateTextType | string }) {
    return <li className="text-zinc-400">{translate(content)}</li>;
}
