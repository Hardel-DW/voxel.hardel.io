import {
    type EnchantmentProps,
    compileEnchantmentDataDriven,
    compileEnchantmentTags,
    parseEnchantmentToProps
} from "@/components/pages/tools/enchant/Config.ts";
import type { LockedTags } from "@/components/ui/tools";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import type { Enchantment } from "@/lib/minecraft/schema/enchantment/Enchantment";
import { type FC, type ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type EnchantmentTag = {
    enchant: Identifier;
    tags: Identifier[];
};

export type LockedSlotFrom = {
    field: string;
    reason: string;
    id: string;
};

interface EnchantmentsContextType {
    files: Record<string, Uint8Array>;
    setFiles: (files: Record<string, Uint8Array>) => void;

    // Store the list of enchantments in DataDriven format
    enchantments: RegistryElement<Enchantment>[];
    setEnchantments: (enchantments: RegistryElement<Enchantment>[]) => void;

    // Store the list of tags
    enchantmentTags: EnchantmentTag[];
    setEnchantmentTags: (enchantmentTags: EnchantmentTag[]) => void;

    // Store the current enchantment id
    currentEnchantmentId?: Identifier;
    setCurrentEnchantmentId: (id: Identifier) => void;

    // Store the current enchantment data
    currentEnchantmentData?: EnchantmentProps;
    setCurrentEnchantmentData: (id: Identifier, data: Enchantment) => void;

    // Store toggle section
    toggleSection?: Record<string, string>;
    setToggleSection: (id: string, name: string) => void;

    // Handle the change of data
    handleChangeData: (key: string, value: string | number | boolean) => void;
    handleAddLockedField: (id: string, fields: LockedTags[]) => void;
    handleRemoveLockedField: (id: string) => void;
}

const EnchantmentsContext = createContext<EnchantmentsContextType | undefined>(undefined);

export const EnchantmentsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [files, setFiles] = useState<Record<string, Uint8Array>>({});
    const [enchantments, setEnchantments] = useState<RegistryElement<Enchantment>[]>([]);
    const [enchantmentTags, setEnchantmentTags] = useState<EnchantmentTag[]>([]);
    const [currentEnchantmentId, setCurrentEnchantmentId] = useState<Identifier>();
    const [currentEnchantmentData, setInternalCurrentEnchantment] = useState<EnchantmentProps>();
    const [toggleSection, setToggleSectionState] = useState<Record<string, string>>({ supported: "supportedItems" });

    const enchantmentsRef = useRef(enchantments);
    const enchantmentTagsRef = useRef(enchantmentTags);

    const setCurrentEnchantmentData = (id: Identifier, data: Enchantment) => {
        const tagsIdentifier = enchantmentTags.find((tag) => tag.enchant.equals(id));
        const parsedData = parseEnchantmentToProps(data, tagsIdentifier?.tags ?? []);
        setInternalCurrentEnchantment(parsedData);
        setCurrentEnchantmentId(id);
    };

    const handleChangeData = (key: string, value: string | number | boolean) => {
        setInternalCurrentEnchantment((prevValues) => {
            if (!prevValues) return prevValues;

            return {
                ...prevValues,
                [key]: value
            };
        });
    };

    const handleAddLockedField = (id: string, fields: LockedTags[]) => {
        const newLockedFields = fields.map((field) => ({
            field: field.field,
            reason: field.reason,
            id
        }));

        setInternalCurrentEnchantment((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                lockedFields: [...(prev.lockedFields ?? []), ...newLockedFields]
            };
        });
    };

    const handleRemoveLockedField = (id: string) => {
        setInternalCurrentEnchantment((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                lockedFields: (prev.lockedFields ?? []).filter((field) => field.id !== id)
            };
        });
    };

    const setToggleSection = (id: string, name: string) => {
        setToggleSectionState((prevState) => ({
            ...prevState,
            [id]: name
        }));
    };

    const updateEnchantments = useCallback(
        (compiledEnchant: Enchantment) => {
            if (!currentEnchantmentId) return;

            setEnchantments((prev) => {
                return prev.map((enchant) => {
                    if (enchant.identifier.equals(currentEnchantmentId)) {
                        return {
                            ...enchant,
                            data: compiledEnchant
                        };
                    }
                    return enchant;
                });
            });
        },
        [currentEnchantmentId]
    );

    const updateEnchantmentTags = useCallback(
        (compiledTags: Identifier[]) => {
            if (!currentEnchantmentId) return;

            setEnchantmentTags((prev) => {
                return prev.map((tag) => {
                    if (tag.enchant.equals(currentEnchantmentId)) {
                        return {
                            ...tag,
                            tags: compiledTags
                        };
                    }
                    return tag;
                });
            });
        },
        [currentEnchantmentId]
    );

    useEffect(() => {
        enchantmentsRef.current = enchantments;
        enchantmentTagsRef.current = enchantmentTags;
    }, [enchantments, enchantmentTags]);

    useEffect(() => {
        if (!currentEnchantmentData || !currentEnchantmentId) return;
        const currentEnchantment = enchantmentsRef.current.find((enchant) => enchant.identifier.equals(currentEnchantmentId));
        const currentTags = enchantmentTagsRef.current.find((tag) => tag.enchant.equals(currentEnchantmentId));
        if (!currentEnchantment || !currentTags) return;

        const compiledEnchant = compileEnchantmentDataDriven(currentEnchantmentData, currentEnchantment?.data);
        const compiledTags = compileEnchantmentTags(currentEnchantmentData);
        updateEnchantments(compiledEnchant);
        updateEnchantmentTags(compiledTags);
    }, [currentEnchantmentData, currentEnchantmentId, updateEnchantments, updateEnchantmentTags]);

    return (
        <EnchantmentsContext.Provider
            value={{
                files,
                setFiles,
                enchantments,
                setEnchantments,
                enchantmentTags,
                setEnchantmentTags,
                currentEnchantmentId,
                setCurrentEnchantmentId,
                currentEnchantmentData,
                setCurrentEnchantmentData,
                toggleSection,
                setToggleSection,
                handleChangeData,
                handleAddLockedField,
                handleRemoveLockedField
            }}
        >
            {children}
        </EnchantmentsContext.Provider>
    );
};

export const useEnchantments = (): EnchantmentsContextType => {
    const context = useContext(EnchantmentsContext);
    if (!context) {
        throw new Error("useEnchantments must be used within an EnchantmentsProvider");
    }
    return context;
};
