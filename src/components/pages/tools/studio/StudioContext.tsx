import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { AnyGridObject, BlueprintObject, LinkObject, Position, TemporaryLinkObject } from "./types";

type StudioContextType = {
    gridObjects: AnyGridObject[];
    addGridObject: (object: AnyGridObject) => void;
    updateGridObject: (id: string, updates: Partial<AnyGridObject>) => void;
    removeGridObject: (id: string) => void;

    startLinking: (sourceId: string, sourceFieldId: string, startX: number, startY: number) => void;
    finishLinking: (targetId: string, targetFieldId: string) => void;
    isLinking: boolean;
    updateTemporaryLink: (endPosition: Position) => void;
    cancelLinking: () => void;
    isValidLinkTarget: (sourceId: string, sourceFieldId: string, targetId: string, targetFieldId: string) => boolean;
    updateFieldValue: (objectId: string, fieldId: string, value: any) => void;
};

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const defaultBlueprints: BlueprintObject[] = [
    {
        type: "blueprint",
        id: "blueprint-1",
        position: { x: 600, y: 300 },
        title: "Blueprint 1",
        fields: [
            { id: "output", name: "Output", value: "", type: "output" },
            { id: "foo", name: "Foo", value: 0, type: "number" },
            { id: "bar", name: "Bar", value: 0, type: "number" }
        ],
        ref: React.createRef<HTMLDivElement>()
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
        ],
        ref: React.createRef<HTMLDivElement>()
    }
];

export function StudioProvider({ children }: { children: React.ReactNode }) {
    const [gridObjects, setGridObjects] = useState<AnyGridObject[]>(defaultBlueprints);

    const addGridObject = useCallback((object: AnyGridObject) => {
        if (object.type === "blueprint") {
            object.ref = React.createRef<HTMLDivElement>();
        }
        setGridObjects((prev) => [...prev, object]);
    }, []);

    const updateGridObject = useCallback((id: string, updates: Partial<AnyGridObject>) => {
        setGridObjects((prev) =>
            prev.map((obj) => {
                if (obj.id === id) {
                    const { type, ...safeUpdates } = updates;
                    if (obj.type === "blueprint" && "position" in safeUpdates && safeUpdates.position) {
                        return {
                            ...obj,
                            ...safeUpdates,
                            position: {
                                x: safeUpdates.position.x,
                                y: safeUpdates.position.y
                            }
                        };
                    }
                    return { ...obj, ...safeUpdates };
                }
                return obj;
            })
        );
    }, []);

    const removeGridObject = useCallback((id: string) => {
        setGridObjects((prev) => prev.filter((obj) => obj.id !== id));
    }, []);

    const isValidLinkTarget = useCallback(
        (sourceId: string, sourceFieldId: string, targetId: string, targetFieldId: string) => {
            const sourceBlueprint = gridObjects.find((obj) => obj.id === sourceId && obj.type === "blueprint") as
                | BlueprintObject
                | undefined;
            const targetBlueprint = gridObjects.find((obj) => obj.id === targetId && obj.type === "blueprint") as
                | BlueprintObject
                | undefined;

            if (!sourceBlueprint || !targetBlueprint) return false;

            const sourceField = sourceBlueprint.fields.find((f) => f.id === sourceFieldId);
            const targetField = targetBlueprint.fields.find((f) => f.id === targetFieldId);

            if (!sourceField || !targetField) return false;

            // Permettre la connexion entre un output et un input, dans n'importe quel ordre
            return (
                (sourceField.type === "output" && targetField.type === "input") ||
                (sourceField.type === "input" && targetField.type === "output")
            );
        },
        [gridObjects]
    );

    const startLinking = useCallback((sourceId: string, sourceFieldId: string, startX: number, startY: number) => {
        setGridObjects((prev) => {
            // Supprimer tout lien temporaire existant
            const filteredObjects = prev.filter((obj) => obj.type !== "tmp_link");

            const updatedObjects = filteredObjects.map((obj) => {
                if (obj.id === sourceId && obj.type === "blueprint") {
                    return { ...obj, linkingFieldId: sourceFieldId };
                }
                return obj;
            });

            const newTemporaryLink: TemporaryLinkObject = {
                id: "temp-link",
                type: "tmp_link",
                position: { x: startX, y: startY },
                endPosition: { x: startX, y: startY },
                sourceId,
                sourceFieldId
            };
            return [...updatedObjects, newTemporaryLink];
        });
    }, []);

    const updateTemporaryLink = useCallback((endPosition: Position) => {
        setGridObjects((prev) =>
            prev.map((obj) =>
                obj.type === "tmp_link"
                    ? {
                          ...obj,
                          endPosition: {
                              x: endPosition.x,
                              y: endPosition.y
                          }
                      }
                    : obj
            )
        );
    }, []);

    const cancelLinking = useCallback(() => {
        setGridObjects((prev) =>
            prev
                .filter((obj) => obj.type !== "tmp_link")
                .map((obj) => {
                    if (obj.type === "blueprint") {
                        return { ...obj, linkingFieldId: undefined };
                    }
                    return obj;
                })
        );
    }, []);

    const finishLinking = useCallback(
        (targetId: string, targetFieldId: string) => {
            setGridObjects((prev) => {
                const tempLink = prev.find((obj) => obj.type === "tmp_link") as TemporaryLinkObject | undefined;
                if (!tempLink) return prev;

                const sourceBlueprint = prev.find((obj) => obj.id === tempLink.sourceId && obj.type === "blueprint") as
                    | BlueprintObject
                    | undefined;
                const targetBlueprint = prev.find((obj) => obj.id === targetId && obj.type === "blueprint") as BlueprintObject | undefined;

                if (sourceBlueprint && targetBlueprint) {
                    const sourceField = sourceBlueprint.fields.find((f) => f.id === tempLink.sourceFieldId);
                    const targetField = targetBlueprint.fields.find((f) => f.id === targetFieldId);

                    if (sourceField && targetField) {
                        if (isValidLinkTarget(tempLink.sourceId, tempLink.sourceFieldId, targetId, targetFieldId)) {
                            const newLink: LinkObject = {
                                type: "link",
                                id: `link-${Date.now()}`,
                                position: tempLink.position,
                                sourceId: sourceField.type === "output" ? tempLink.sourceId : targetId,
                                targetId: sourceField.type === "output" ? targetId : tempLink.sourceId,
                                sourceFieldId: sourceField.type === "output" ? tempLink.sourceFieldId : targetFieldId,
                                targetFieldId: sourceField.type === "output" ? targetFieldId : tempLink.sourceFieldId,
                                endPosition: tempLink.endPosition
                            };

                            return prev
                                .filter((obj) => obj.id !== "temp-link" && (obj.type !== "blueprint" || obj.id !== sourceBlueprint.id))
                                .concat([{ ...sourceBlueprint, linkingFieldId: undefined }, newLink]);
                        }
                    }
                }

                return prev.filter((obj) => obj.id !== "temp-link");
            });
        },
        [isValidLinkTarget]
    );

    const isLinking = useMemo(() => gridObjects.some((obj) => obj.type === "tmp_link"), [gridObjects]);

    const updateFieldValue = useCallback((objectId: string, fieldId: string, value: any) => {
        setGridObjects((prev) =>
            prev.map((obj) => {
                if (obj.id === objectId && obj.type === "blueprint") {
                    return {
                        ...obj,
                        fields: obj.fields.map((field) => (field.id === fieldId ? { ...field, value } : field))
                    };
                }
                return obj;
            })
        );
    }, []);

    return (
        <StudioContext.Provider
            value={{
                gridObjects,
                addGridObject,
                updateGridObject,
                removeGridObject,
                startLinking,
                finishLinking,
                isLinking,
                updateTemporaryLink,
                cancelLinking,
                isValidLinkTarget,
                updateFieldValue
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
