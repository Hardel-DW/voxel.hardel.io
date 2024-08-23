import type React from "react";

export default function ToolConditionalEffect<T>({
    effect,
    children
}: {
    effect: ConditionalEffect<T>;
    children: React.ReactNode;
}) {
    return (
        <div>
            {"effect" in effect && effect.effect ? (
                <div className="pt-4">{children}</div>
            ) : (
                <div className="text-red-500">No information available for this effect.</div>
            )}
        </div>
    );
}
