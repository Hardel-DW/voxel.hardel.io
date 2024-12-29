import { useTranslate } from "@/components/useTranslate";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";

export default function TranslateText(props: {
    content: TranslateTextType | undefined;
    replace?: string[];
}) {
    const { t } = useTranslate();

    if (typeof props.content === "string") {
        return props.content;
    }

    if (typeof props.content === "object" && props.content !== null) {
        if ("type" in props.content && props.content.type === "translate" && typeof props.content.value === "string") {
            let text = t(props.content.value) || props.content.value;

            const replaceArray = props.replace || props.content.replace;
            if (replaceArray) {
                for (const replacement of replaceArray) {
                    text = text.replace("%s", replacement);
                }
            }

            return text;
        }
    }

    if (!props.content) {
        return null;
    }

    return props.content.toString();
}
