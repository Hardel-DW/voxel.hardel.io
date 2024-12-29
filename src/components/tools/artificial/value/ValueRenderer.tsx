import { BooleanRenderer } from "@/components/tools/artificial/value/BooleanRenderer";
import { ChangeValue } from "@/components/tools/artificial/value/ChangeValue";

export type ValueRendererProps = {
    type: "string" | "number" | "boolean" | "array" | "tags" | "effects" | "deleted";
    old: unknown;
    new: unknown;
    isTriggered: boolean;
};

export function ValueRenderer(props: ValueRendererProps) {
    if (props.type === "number" && typeof props.old === "number" && typeof props.new === "number") {
        return <ChangeValue old={props.old} new={props.new} isTriggered={props.isTriggered} />;
    }

    if (props.type === "boolean" && typeof props.old === "boolean" && typeof props.new === "boolean") {
        return <BooleanRenderer old={props.old} new={props.new} isTriggered={props.isTriggered} />;
    }

    return null;
}
