import type React from "react";

export default function InputField({ field, handleConnectorMouseDown, handleConnectorMouseUp }: {
    field: {
        id: string;
        name: string;
    };
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
}) {
    return (
        <div className="flex items-center justify-start">
            <div
                className="w-3 h-3 rounded-full mr-2 cursor-pointer bg-blue-400"
                onMouseDown={(e) => handleConnectorMouseDown(e, field.id)}
                onMouseUp={() => handleConnectorMouseUp(field.id)}
            />
            <span>{field.name}</span>
        </div>
    );
}
