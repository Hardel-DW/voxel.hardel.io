import { useTranslate } from "@/components/TranslateContext.tsx";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";

export default function TranslateText(props: {
    content: TranslateTextType | undefined;
}) {
    const { translate } = useTranslate();

    if (typeof props.content === "string") {
        return translate[props.content] || props.content;
    }

    if (typeof props.content === "object" && props.content !== null) {
        if ("type" in props.content && props.content.type === "translate" && typeof props.content.value === "string") {
            return translate[props.content.value] || props.content.value;
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
