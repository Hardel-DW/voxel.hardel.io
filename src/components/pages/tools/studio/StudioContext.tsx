import type React from "react";
import { createContext, useCallback, useContext, useState, useMemo } from "react";
import type { AnyGridObject, Blueprint, Link, Position, TemporaryLink } from "./types";

type StudioContextType = {
    gridObjects: AnyGridObject[];
    addGridObject: (object: AnyGridObject) => void;
    updateGridObject: (id: string, updates: Partial<AnyGridObject>) => void;
    removeGridObject: (id: string) => void;

    position: Position;
    setPosition: React.Dispatch<React.SetStateAction<Position>>;

    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;

    cursorPosition: Position;
    setCursorPosition: React.Dispatch<React.SetStateAction<Position>>;

    draggingObjectId: string | null;
    setDraggingObjectId: React.Dispatch<React.SetStateAction<string | null>>;

    objectOffset: Position;
    setObjectOffset: React.Dispatch<React.SetStateAction<Position>>;

    startLinking: (sourceId: string, sourceFieldId: string, startX: number, startY: number) => void;
    finishLinking: (targetId: string, targetFieldId: string) => void;
    isLinking: boolean;
    updateTemporaryLink: (endPosition: Position) => void;
    cancelLinking: () => void;
    isValidLinkTarget: (targetId: string, targetFieldId: string) => boolean;
};

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const defaultBlueprints: Blueprint[] = [
    {
        type: "blueprint",
        id: "blueprint-1",
        position: { x: 600, y: 300 },
        title: "Blueprint 1",
        fields: [
            { id: "output", name: "Output", value: "", type: "output" },
            { id: "foo", name: "Foo", value: 0, type: "number" },
            { id: "bar", name: "Bar", value: 0, type: "number" }
        ]
    },
    {
        type: "blueprint",
        id: "blueprint-2",
        position: { x: 1000, y: 450 },
        title: "Blueprint 2",
        fields: [
            { id: "input", name: "Input", value: "", type: "input" },
            { id: "foo", name: "Foo", value: 0, type: "number" },
            { id: "bar", name: "Bar", value: 0, type: "number" }
        ]
    }
];

export function StudioProvider({ children }: { children: React.ReactNode }) {
    const [gridObjects, setGridObjects] = useState<AnyGridObject[]>(defaultBlueprints);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [cursorPosition, setCursorPosition] = useState<Position>({ x: 0, y: 0 });
    const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);
    const [objectOffset, setObjectOffset] = useState<Position>({ x: 0, y: 0 });
    
    const addGridObject = useCallback((object: AnyGridObject) => {
        setGridObjects((prev) => [...prev, object]);
    }, []);

    const updateGridObject = useCallback((id: string, updates: Partial<AnyGridObject>) => {
        setGridObjects((prev) => prev.map((obj) => {
            if (obj.id === id) {
                switch (obj.type) {
                    case "blueprint":
                        return { ...obj, ...updates } as Blueprint;
                    case "link":
                        return { ...obj, ...updates } as Link;
                    case "tmp_link":
                        return { ...obj, ...updates } as TemporaryLink;
                    default:
                        return obj;
                }
            }
            return obj;
        }));
    }, []);

    const removeGridObject = useCallback((id: string) => {
        setGridObjects((prev) => prev.filter((obj) => obj.id !== id));
    }, []);

    const isValidLinkTarget = useCallback((targetId: string, targetFieldId: string) => {
        const targetBlueprint = gridObjects.find(obj => obj.id === targetId && obj.type === "blueprint") as Blueprint | undefined;
        if (!targetBlueprint) return false;

        const targetField = targetBlueprint.fields.find(f => f.id === targetFieldId);
        return targetField?.type === "input";
    }, [gridObjects]);

    const startLinking = useCallback((sourceId: string, sourceFieldId: string, startX: number, startY: number) => {
        setGridObjects(prev => {
            // Supprimer tout lien temporaire existant
            const filteredObjects = prev.filter(obj => obj.type !== "tmp_link");
            
            const updatedObjects = filteredObjects.map(obj => {
                if (obj.id === sourceId && obj.type === "blueprint") {
                    return { ...obj, linkingFieldId: sourceFieldId };
                }
                return obj;
            });
            
            const newTemporaryLink: TemporaryLink = {
                id: "temp-link",
                type: "tmp_link",
                position: { x: (startX - position.x) / zoom, y: (startY - position.y) / zoom },
                endPosition: { x: (startX - position.x) / zoom, y: (startY - position.y) / zoom },
                sourceId,
                sourceFieldId
            };
            return [...updatedObjects, newTemporaryLink];
        });
    }, [position, zoom]);

    const updateTemporaryLink = useCallback((endPosition: Position) => {
        setGridObjects(prev => prev.map(obj => 
            obj.type === "tmp_link" ? { 
                ...obj, 
                endPosition: { 
                    x: (endPosition.x - position.x) / zoom, 
                    y: (endPosition.y - position.y) / zoom 
                } 
            } : obj
        ));
    }, [position, zoom]);

    const cancelLinking = useCallback(() => {
        setGridObjects(prev => prev.filter(obj => obj.type !== "tmp_link").map(obj => {
            if (obj.type === "blueprint") {
                return { ...obj, linkingFieldId: undefined };
            }
            return obj;
        }));
    }, []);

    const finishLinking = useCallback((targetId: string, targetFieldId: string) => {
        if (!isValidLinkTarget(targetId, targetFieldId)) {
            cancelLinking();
            return;
        }

        setGridObjects(prev => {
            const tempLink = prev.find(obj => obj.type === "tmp_link") as TemporaryLink | undefined;
            const sourceBlueprint = prev.find(obj => obj.id === tempLink?.sourceId && obj.type === "blueprint") as Blueprint | undefined;
            const targetBlueprint = prev.find(obj => obj.id === targetId && obj.type === "blueprint") as Blueprint | undefined;
            
            if (tempLink && sourceBlueprint && targetBlueprint) {
                const sourceField = sourceBlueprint.fields.find(f => f.id === tempLink.sourceFieldId);
                const targetField = targetBlueprint.fields.find(f => f.id === targetFieldId);
                
                // Vérifier que nous ne connectons pas deux outputs
                if (sourceField?.type === "output" && targetField?.type === "output") {
                    console.warn("Cannot connect two outputs");
                    return prev.filter(obj => obj.id !== "temp-link");
                }
                
                const newLink: Link = {
                    type: "link",
                    id: `link-${Date.now()}`,
                    position: tempLink.position,
                    sourceId: tempLink.sourceId,
                    targetId: targetId,
                    sourceFieldId: tempLink.sourceFieldId,
                    targetFieldId: targetFieldId,
                    endPosition: tempLink.endPosition
                };
                
                return prev
                    .filter(obj => obj.id !== "temp-link" && (obj.type !== "blueprint" || obj.id !== sourceBlueprint.id))
                    .concat([{ ...sourceBlueprint, linkingFieldId: undefined }, newLink]);
            }
            
            return prev;
        });
    }, [isValidLinkTarget, cancelLinking]);

    const isLinking = useMemo(() => gridObjects.some(obj => 
        (obj.type === "blueprint" && obj.linkingFieldId !== undefined) || obj.type === "tmp_link"
    ), [gridObjects]);

    return (
        <StudioContext.Provider
            value={{
                gridObjects,
                addGridObject,
                updateGridObject,
                removeGridObject,
                position,
                setPosition,
                zoom,
                setZoom,
                cursorPosition,
                setCursorPosition,
                draggingObjectId,
                setDraggingObjectId,
                objectOffset,
                setObjectOffset,
                startLinking,
                finishLinking,
                isLinking,
                updateTemporaryLink,
                cancelLinking,
                isValidLinkTarget
            }}
        >
            {children}
        </StudioContext.Provider>
    );
}

export function useStudioContext() {
    const context = useContext(StudioContext);
    if (context === undefined) {
        throw new Error("useStudioContext must be used within a StudioProvider");
    }
    return context;
}
