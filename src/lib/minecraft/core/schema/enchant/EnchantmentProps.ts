import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Compiler } from "@/lib/minecraft/core/engine/Compiler.ts";
import type { Parser, ParserParams } from "@/lib/minecraft/core/engine/Parser.ts";
import type { SlotRegistryType } from "@/lib/minecraft/core/engine/managers/SlotManager.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { FieldProperties } from "@/lib/minecraft/core/schema/primitive/properties";
import type { EffectComponentsRecord, Enchantment, TextComponentType } from "@voxel/definitions";
import { I18n } from "@/lib/minecraft/i18n/i18n";

export const enchantmentProperties = (lang: string): FieldProperties => {
    const i18n = new I18n(lang);
    const t = i18n.translate.bind(i18n);
    const fields: FieldProperties = {
        description: {
            name: t("enchantment.field.description.name"),
            type: "string"
        },
        exclusiveSet: {
            name: t("enchantment.field.exclusiveSet.name"),
            type: "string"
        },
        supportedItems: {
            name: t("enchantment.field.supportedItems.name"),
            type: "tags"
        },
        primaryItems: {
            name: t("enchantment.field.primaryItems.name"),
            type: "tags"
        },
        maxLevel: {
            name: t("enchantment.field.maxLevel.name"),
            type: "number",
            icon: "/icons/tools/level.svg"
        },
        weight: {
            name: t("enchantment.field.weight.name"),
            type: "number",
            icon: "/icons/tools/weight.svg"
        },
        anvilCost: {
            name: t("enchantment.field.anvilCost.name"),
            type: "number",
            icon: "/icons/tools/anvil.svg"
        },
        minCostBase: {
            name: t("enchantment.field.minCostBase.name"),
            type: "number"
        },
        minCostPerLevelAboveFirst: {
            name: t("enchantment.field.minCostPerLevelAboveFirst.name"),
            type: "number"
        },
        maxCostBase: {
            name: t("enchantment.field.maxCostBase.name"),
            type: "number"
        },
        maxCostPerLevelAboveFirst: {
            name: t("enchantment.field.maxCostPerLevelAboveFirst.name"),
            type: "number"
        },
        effects: {
            name: t("enchantment.field.effects.name"),
            type: "effects"
        },
        slots: {
            name: t("enchantment.field.slots.name"),
            type: "array"
        },
        tags: {
            name: t("enchantment.field.tags.name"),
            type: "array"
        },
        assignedTags: {
            name: t("enchantment.field.assignedTags.name"),
            type: "tags"
        },
        softDelete: {
            name: t("enchantment.field.softDelete.name"),
            type: "deleted"
        },
        disabledEffects: {
            name: t("enchantment.field.disabledEffects.name"),
            type: "effects"
        }
    };

    return fields;
};

export interface EnchantmentProps extends VoxelElement {
    description: TextComponentType;
    exclusiveSet: SingleOrMultiple<string> | undefined;
    supportedItems: SingleOrMultiple<string>;
    primaryItems: SingleOrMultiple<string> | undefined;
    maxLevel: number;
    weight: number;
    anvilCost: number;
    minCostBase: number;
    minCostPerLevelAboveFirst: number;
    maxCostBase: number;
    maxCostPerLevelAboveFirst: number;
    effects: EffectComponentsRecord | undefined;
    slots: SlotRegistryType[];
    tags: string[];
    assignedTags: string[];
    softDelete: boolean;
    disabledEffects: string[];
}

/**
 * Take only one Enchantments with their tags, to transform it to Voxel format
 * @param enchantment
 * @param tags
 */
export const DataDrivenToVoxelFormat: Parser<EnchantmentProps, Enchantment> = ({
    element,
    tags = [],
    configurator
}: ParserParams<Enchantment>): RegistryElement<EnchantmentProps> => {
    const data = structuredClone(element.data);
    const description = data.description;
    const maxLevel = data.max_level;
    const weight = data.weight;
    const anvilCost = data.anvil_cost;
    const minCostBase = data.min_cost.base;
    const minCostPerLevelAboveFirst = data.min_cost.per_level_above_first;
    const maxCostBase = data.max_cost.base;
    const maxCostPerLevelAboveFirst = data.max_cost.per_level_above_first;
    const exclusiveSet = data.exclusive_set;
    const supportedItems = data.supported_items;
    const primaryItems = data.primary_items;
    const effects = data.effects;
    const slots = data.slots;
    const assignedTags = [];

    if (typeof exclusiveSet === "string") {
        assignedTags.push(exclusiveSet);
    }

    const tagsToCheck = tags.filter((tag) => !(typeof data.exclusive_set === "string" && tag === data.exclusive_set));
    const softDelete = (!data.effects || Object.entries(data.effects).length === 0) && tagsToCheck.length === 0;

    return {
        identifier: element.identifier,
        data: {
            description,
            exclusiveSet,
            supportedItems,
            primaryItems,
            maxLevel,
            weight,
            anvilCost,
            minCostBase,
            minCostPerLevelAboveFirst,
            maxCostBase,
            maxCostPerLevelAboveFirst,
            effects,
            tags,
            slots,
            assignedTags,
            softDelete,
            disabledEffects: [],
            override: configurator
        }
    };
};

/**
 * Transform only one enchantment from Voxel Format into a Minecraft JSON Data Driven Enchantment.
 * @param element
 * @param original
 */
export const VoxelToDataDriven: Compiler<EnchantmentProps, Enchantment> = (
    element: RegistryElement<EnchantmentProps>,
    original: Enchantment
): RegistryElement<Enchantment> => {
    const enchantment = structuredClone(original);
    const enchant = structuredClone(element.data);

    enchantment.max_level = enchant.maxLevel;
    enchantment.weight = enchant.weight;
    enchantment.anvil_cost = enchant.anvilCost;
    enchantment.min_cost.base = enchant.minCostBase;
    enchantment.min_cost.per_level_above_first = enchant.minCostPerLevelAboveFirst;
    enchantment.max_cost.base = enchant.maxCostBase;
    enchantment.max_cost.per_level_above_first = enchant.maxCostPerLevelAboveFirst;
    enchantment.supported_items = enchant.supportedItems;
    enchantment.slots = enchant.slots;
    enchantment.effects = enchant.effects;

    if (enchant.exclusiveSet) {
        enchantment.exclusive_set = enchant.exclusiveSet;
    }

    if (enchant.primaryItems) {
        enchantment.primary_items = enchant.primaryItems;
    }

    if (!enchant.supportedItems && enchant.primaryItems) {
        enchantment.supported_items = enchant.primaryItems;
    }

    if (enchant.softDelete) {
        enchantment.effects = undefined;
    }

    if (enchant.disabledEffects.length > 0 && enchantment.effects) {
        for (const effect of enchant.disabledEffects) {
            delete enchantment.effects[effect as keyof typeof enchantment.effects];
        }
    }

    return {
        data: enchantment,
        identifier: element.identifier
    };
};
