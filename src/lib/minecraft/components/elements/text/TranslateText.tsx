import { useTranslate } from "@/components/TranslateContext.tsx";

export type TranslateTextType =
    | {
          type: "translate";
          value: string;
      }
    | string;

export default function TranslateText(props: {
    content: TranslateTextType | undefined;
}) {
    const { translate } = useTranslate();

    if (typeof props.content === "string") {
        return translate[props.content] || props.content;
    }

    if (typeof props.content === "object" && props.content !== null) {
        if ("type" in props.content && props.content.type === "translate") {
            return translate[props.content.value] || props.content.value;
        }
    }

    if (!props.content) {
        return null;
    }

    return props.content.toString();
}
