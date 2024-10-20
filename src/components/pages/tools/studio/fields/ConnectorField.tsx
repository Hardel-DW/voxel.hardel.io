import type React from "react";
import type { BaseBlueprintField } from "./Field";

export interface ConnectorFieldType extends BaseBlueprintField {
    type: "input" | "output";
    value: string;
}

interface ConnectorFieldProps {
    field: ConnectorFieldType;
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
}

export default function ConnectorField({ field, handleConnectorMouseDown, handleConnectorMouseUp }: ConnectorFieldProps) {
    const isInput = field.type === "input";
    const connectorClass = `w-3 h-3 rounded-full cursor-pointer ${isInput ? "mr-2 bg-blue-400" : "ml-2 bg-red-400"}`;
    
    return (
        <div className={`flex items-center ${isInput ? "justify-start" : "justify-end"}`}>
            {isInput && (
                <div
                    className={connectorClass}
                    onMouseDown={(e) => handleConnectorMouseDown(e, field.id)}
                    onMouseUp={() => handleConnectorMouseUp(field.id)}
                />
            )}
            <span>{field.name}</span>
            {!isInput && (
                <div
                    className={connectorClass}
                    onMouseDown={(e) => handleConnectorMouseDown(e, field.id)}
                    onMouseUp={() => handleConnectorMouseUp(field.id)}
                />
            )}
        </div>
    ); 
}
