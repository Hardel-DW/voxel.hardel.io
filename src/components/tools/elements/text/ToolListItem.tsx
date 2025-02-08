import { translate } from "@/lib/hook/useTranslate";
import type { TranslateTextType } from "@voxelio/breeze/core";

export default function ToolListItem({ content }: { content: TranslateTextType | string }) {
    return <li className="text-zinc-400">{translate(content)}</li>;
}
