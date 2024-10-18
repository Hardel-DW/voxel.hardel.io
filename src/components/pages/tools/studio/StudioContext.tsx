import type { BlueprintFieldType } from "@/components/pages/tools/studio/fields/Field.tsx";
import type React from "react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

interface Link {
    sourceId: string;
    targetId: string;
    sourceFieldId: string;
    targetFieldId: string;
}

interface Blueprint {
    id: string;
    x: number;
    y: number;
    title: string;
    fields: BlueprintFieldType[];
}

interface VisualLink extends Link {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

type StudioContextType = {
    cursorPosition: { x: number; y: number };
    setCursorPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;

    position: { x: number; y: number };
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;

    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;

    blueprints: Blueprint[];
    setBlueprints: React.Dispatch<React.SetStateAction<Blueprint[]>>;

    links: Link[];
    setLinks: React.Dispatch<React.SetStateAction<Link[]>>;

    startLinking: (blueprintId: string, fieldId: string) => void;
    finishLinking: (targetBlueprintId: string, targetFieldId: string) => void;

    isLinking: boolean;
    updateFieldValue: (blueprintId: string, fieldId: string, newValue: string | number) => void;

    visualLinks: VisualLink[];
    setVisualLinks: React.Dispatch<React.SetStateAction<VisualLink[]>>;

    temporaryLink: { startX: number; startY: number; endX: number; endY: number } | null;
    setTemporaryLink: React.Dispatch<React.SetStateAction<{ startX: number; startY: number; endX: number; endY: number } | null>>;

    draggingBlueprintId: string | null;
    setDraggingBlueprintId: React.Dispatch<React.SetStateAction<string | null>>;

    blueprintOffset: { x: number; y: number };
    setBlueprintOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;

    updateLinkPositions: () => void;
    registerBlueprintRef: (id: string, ref: HTMLDivElement | null) => void;
};

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const defaultBlueprints: Blueprint[] = [
    {
        id: "blueprint-1",
        x: 600,
        y: 300,
        title: "Blueprint 1",
        fields: [
            { id: "output", name: "Output", value: "", type: "output" },
            { id: "foo", name: "Foo", value: 0, type: "number" },
            { id: "bar", name: "Bar", value: 0, type: "number" }
        ]
    },
    {
        id: "blueprint-2",
        x: 1000,
        y: 450,
        title: "Blueprint 2",
        fields: [
            { id: "input", name: "Input", value: "", type: "input" },
            { id: "foo", name: "Foo", value: 0, type: "number" },
            { id: "bar", name: "Bar", value: 0, type: "number" }
        ]
    }
]

export function StudioProvider({ children }: { children: React.ReactNode }) {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [blueprints, setBlueprints] = useState<Blueprint[]>(defaultBlueprints);
    const [links, setLinks] = useState<Link[]>([]);
    const [linkingSource, setLinkingSource] = useState<{ blueprintId: string; fieldId: string } | null>(null);
    const [visualLinks, setVisualLinks] = useState<VisualLink[]>([]);
    const [temporaryLink, setTemporaryLink] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);
    const blueprintRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [draggingBlueprintId, setDraggingBlueprintId] = useState<string | null>(null);
    const [blueprintOffset, setBlueprintOffset] = useState({ x: 0, y: 0 });

    const startLinking = (blueprintId: string, fieldId: string) => {
        setLinkingSource({ blueprintId, fieldId });
    };

    const finishLinking = (targetBlueprintId: string, targetFieldId: string) => {
        if (linkingSource) {
            const sourceBlueprint = blueprints.find((bp) => bp.id === linkingSource.blueprintId);
            const targetBlueprint = blueprints.find((bp) => bp.id === targetBlueprintId);
            const sourceField = sourceBlueprint?.fields.find((f) => f.id === linkingSource.fieldId);
            const targetField = targetBlueprint?.fields.find((f) => f.id === targetFieldId);

            if (sourceBlueprint && targetBlueprint && sourceField && targetField) {
                if (sourceField.type === "output" && targetField.type === "input") {
                    setLinks((prev) => [
                        ...prev,
                        {
                            sourceId: linkingSource.blueprintId,
                            targetId: targetBlueprintId,
                            sourceFieldId: linkingSource.fieldId,
                            targetFieldId: targetFieldId
                        }
                    ]);
                }
            }
            setLinkingSource(null);
        }
    };

    const updateFieldValue = (blueprintId: string, fieldId: string, newValue: string | number) => {
        setBlueprints((prev) =>
            prev.map((bp) =>
                bp.id === blueprintId
                    ? {
                          ...bp,
                          fields: bp.fields.map((f) => {
                              if (f.id === fieldId) {
                                  switch (f.type) {
                                      case "input":
                                      case "output":
                                          return { ...f, value: String(newValue) };
                                      case "number":
                                          return { ...f, value: Number(newValue) };
                                      default:
                                          return f;
                                  }
                              }
                              return f;
                          })
                      }
                    : bp
            )
        );
    };

    const registerBlueprintRef = useCallback((id: string, ref: HTMLDivElement | null) => {
        blueprintRefs.current[id] = ref;
    }, []);

    const updateLinkPositions = useCallback(() => {
        setVisualLinks(
            links.map((link) => {
                const sourceBlueprint = blueprints.find((bp) => bp.id === link.sourceId);
                const targetBlueprint = blueprints.find((bp) => bp.id === link.targetId);
                const sourceField = sourceBlueprint?.fields.find((f) => f.id === link.sourceFieldId);
                const targetField = targetBlueprint?.fields.find((f) => f.id === link.targetFieldId);

                if (sourceBlueprint && targetBlueprint && sourceField && targetField) {
                    const sourceRef = blueprintRefs.current[sourceBlueprint.id];
                    const targetRef = blueprintRefs.current[targetBlueprint.id];

                    const sourceWidth = sourceRef ? sourceRef.offsetWidth : 200; // Utilise 200 comme valeur par défaut si le ref n'est pas disponible
                    const sourceFieldIndex = sourceBlueprint.fields.indexOf(sourceField);
                    const targetFieldIndex = targetBlueprint.fields.indexOf(targetField);

                    return {
                        ...link,
                        startX: sourceBlueprint.x + sourceWidth,
                        startY: sourceBlueprint.y + 50 + sourceFieldIndex * 30,
                        endX: targetBlueprint.x,
                        endY: targetBlueprint.y + 50 + targetFieldIndex * 30
                    };
                }
                return { ...link, startX: 0, startY: 0, endX: 0, endY: 0 };
            })
        );
    }, [blueprints, links]);

    useEffect(() => {
        updateLinkPositions();
    }, [updateLinkPositions]);

    return (
        <StudioContext.Provider
            value={{
                cursorPosition,
                setCursorPosition,
                position,
                setPosition,
                zoom,
                setZoom,
                blueprints,
                setBlueprints,
                links,
                setLinks,
                startLinking,
                finishLinking,
                isLinking: !!linkingSource,
                updateFieldValue,
                visualLinks,
                setVisualLinks,
                updateLinkPositions,
                temporaryLink,
                setTemporaryLink,
                registerBlueprintRef,
                draggingBlueprintId,
                setDraggingBlueprintId,
                blueprintOffset,
                setBlueprintOffset
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
