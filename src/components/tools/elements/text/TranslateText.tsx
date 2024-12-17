import { useTranslate } from "@/components/TranslateContext.tsx";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";

export default function TranslateText(props: {
    content: TranslateTextType | undefined;
    replace?: string[];
}) {
    const { translate } = useTranslate();

    if (typeof props.content === "string") {
        return translate[props.content] || props.content;
    }

    if (typeof props.content === "object" && props.content !== null) {
        if ("type" in props.content && props.content.type === "translate" && typeof props.content.value === "string") {
            let text = translate[props.content.value] || props.content.value;

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

export function getKey(content: TranslateTextType | undefined): string {
    if (!content) {
        return "";
    }

    if (typeof content === "string") {
        return content;
    }

    if (typeof content === "object") {
        if ("type" in content && content.type === "translate") {
            return content.value;
        }
    }

    return content.toString();
}
