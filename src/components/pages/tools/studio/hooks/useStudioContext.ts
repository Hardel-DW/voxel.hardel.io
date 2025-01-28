import { createContext, useContext } from "react";
import type { AnyGridObject, Position } from "../types";

type StudioContextType = {
    gridObjects: AnyGridObject[];
    createBlueprint: () => void;
    updateGridObject: (id: string, updates: Partial<AnyGridObject>) => void;
    removeGridObject: (id: string) => void;

    startLinking: (sourceId: string, sourceFieldId: string, startX: number, startY: number) => void;
    finishLinking: (targetId: string, targetFieldId: string) => void;
    isLinking: boolean;
    updateTemporaryLink: (endPosition: Position) => void;
    cancelLinking: () => void;
    updateFieldValue: (objectId: string, fieldId: string, value: any) => void;
};

export const StudioContext = createContext<StudioContextType | undefined>(undefined);

export function useStudioContext() {
    const context = useContext(StudioContext);
    if (context === undefined) {
        throw new Error("useStudioContext must be used within a StudioProvider");
    }
    return context;
}
