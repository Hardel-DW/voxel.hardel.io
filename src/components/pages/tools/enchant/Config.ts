import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import { Identifier, type IdentifierOneToMany } from "@/lib/minecraft/core/Identifier.ts";
import { compileTags, isPresentInTag } from "@/lib/minecraft/core/Tag.ts";
import { type RegistryElement, getRegistry } from "@/lib/minecraft/mcschema.ts";
import { parseZip, readDatapackFile } from "@/lib/minecraft/mczip.ts";
import type { SlotRegistryType } from "@/lib/minecraft/registry/SlotRegistry.ts";
import type { EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type { Enchantment } from "@/lib/minecraft/schema/enchantment/Enchantment.ts";
import type { ToolConfiguration } from "@/lib/minecraft/voxel";

export type EnchantmentProps = {
    description: TextComponent;
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
    tags: Identifier[];
    softDelete: boolean;
};

/**
 * Take an existing Minecraft JSON Data Driven Enchantment and parse it into Voxel Format.
 * @param enchantment
 * @param tags
 */
export const parseEnchantmentToProps = (
    enchantment: RegistryElement<Enchantment>,
    tags: Identifier[]
): RegistryElement<EnchantmentProps> => {
    const data = enchantment.data;
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

    return {
        identifier: enchantment.identifier,
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
            softDelete: false
        }
    };
};

export const parseDatapack = async (context: ConfiguratorContextType<EnchantmentProps>, file: FileList): Promise<boolean> => {
    const files = await parseZip(file[0]);
    const enchantments = getRegistry<Enchantment>(files, "enchantment");
    const enchantmentTags = getRegistry<TagType>(files, "tags/enchantment");

    const enchantmentCompiled: RegistryElement<EnchantmentProps>[] = enchantments.map((enchant) => {
        const tags = enchantmentTags.filter((tag) => isPresentInTag(tag, enchant.identifier.toString())).map((tag) => tag.identifier);
        return parseEnchantmentToProps(enchant, tags);
    });
    if (enchantmentCompiled.length === 0) return false;

    context.setFiles(files);
    context.setElements(enchantmentCompiled);
    context.setCurrentElement(Identifier.sortRegistry(enchantmentCompiled)[0]);

    return true;
};

/**
 * Transform the Voxel Format into a Minecraft JSON Data Driven Enchantment.
 * @param props
 * @param baseEnchant
 */
export const compileEnchantmentDataDriven = (
    props: RegistryElement<EnchantmentProps>,
    baseEnchant: Enchantment
): RegistryElement<Enchantment> => {
    const enchantment = structuredClone(baseEnchant);
    const enchant = props.data;

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

    return {
        data: enchantment,
        identifier: props.identifier
    };
};

/**
 * Assemble the Datapack from the Configurator Context.
 * @param context
 */
export const assembleDatapack = <T extends EnchantmentProps>(
    context: ConfiguratorContextType<T>
): RegistryElement<TagType | Enchantment>[] => {
    const compiledEnchant = context.elements
        .map((enchantment) => {
            const originalEnchantment = readDatapackFile<Enchantment>(context.files, enchantment.identifier);
            if (!originalEnchantment) return null;
            return compileEnchantmentDataDriven(enchantment, originalEnchantment);
        })
        .filter((enchantment) => enchantment !== null);

    const identifiers: IdentifierOneToMany[] = context.elements.map((enchantment) => {
        if (enchantment.data.softDelete) return { primary: enchantment.identifier, related: [] };

        return {
            primary: enchantment.identifier,
            related: enchantment.data.tags
        };
    });

    const compiledTags = compileTags(identifiers)
        .map((tag) => {
            const original = readDatapackFile<TagType>(context.files, tag.identifier);
            const valueToAdd = original ? original.values.map(Identifier.getValue).filter((resource) => resource.startsWith("#")) : [];

            tag.data.values = [...tag.data.values, ...valueToAdd];
            return tag;
        })
        .filter((tag) => tag !== null);

    return [...compiledEnchant, ...compiledTags];
};

export const formConfigurations: ToolConfiguration[] = [
    {
        id: "global",
        section: "tools.enchantments.section.global",
        description: "tools.enchantments.section.global.description",
        components: [
            {
                type: "Grid",
                children: [
                    {
                        type: "Counter",
                        title: "tools.enchantments.section.global.components.maxLevel.title",
                        description: "tools.enchantments.section.global.components.maxLevel.description",
                        image: "/icons/tools/level.svg",
                        value: 1,
                        min: 1,
                        max: 10,
                        step: 1,
                        action: {
                            type: "Dynamic",
                            field: "maxLevel"
                        },
                        condition: [
                            {
                                condition: "None",
                                field: "maxLevel"
                            }
                        ]
                    },
                    {
                        type: "Counter",
                        title: "tools.enchantments.section.global.components.weight.title",
                        description: "tools.enchantments.section.global.components.weight.description",
                        image: "/icons/tools/weight.svg",
                        value: 1,
                        min: 1,
                        max: 20,
                        step: 1,
                        action: {
                            type: "Dynamic",
                            field: "weight"
                        },
                        condition: [
                            {
                                condition: "None",
                                field: "weight"
                            }
                        ]
                    },
                    {
                        type: "Counter",
                        title: "tools.enchantments.section.global.components.anvilCost.title",
                        description: "tools.enchantments.section.global.components.anvilCost.description",
                        image: "/icons/tools/anvil.svg",
                        value: 1,
                        min: 1,
                        max: 20,
                        step: 1,
                        action: {
                            type: "Dynamic",
                            field: "anvilCost"
                        },
                        condition: [
                            {
                                condition: "None",
                                field: "anvilCost"
                            }
                        ]
                    }
                ]
            },
            {
                type: "Grid",
                children: [
                    {
                        type: "Range",
                        label: "tools.enchantments.section.global.components.minCostBase.label",
                        value: 0,
                        min: 0,
                        max: 100,
                        step: 1,
                        action: {
                            type: "Dynamic",
                            field: "minCostBase"
                        },
                        condition: [
                            {
                                condition: "None",
                                field: "minCostBase"
                            }
                        ]
                    },
                    {
                        type: "Range",
                        label: "tools.enchantments.section.global.components.minCostPerLevelAboveFirst.label",
                        value: 0,
                        min: 0,
                        max: 100,
                        step: 1,
                        action: {
                            type: "Dynamic",
                            field: "minCostPerLevelAboveFirst"
                        },
                        condition: [
                            {
                                condition: "None",
                                field: "minCostPerLevelAboveFirst"
                            }
                        ]
                    }
                ]
            },
            {
                type: "Grid",
                children: [
                    {
                        type: "Range",
                        label: "tools.enchantments.section.global.components.maxCostBase.label",
                        value: 0,
                        min: 0,
                        max: 100,
                        step: 1,
                        action: {
                            type: "Dynamic",
                            field: "maxCostBase"
                        },
                        condition: [
                            {
                                condition: "None",
                                field: "maxCostBase"
                            }
                        ]
                    },
                    {
                        type: "Range",
                        label: "tools.enchantments.section.global.components.maxCostPerLevelAboveFirst.label",
                        value: 0,
                        min: 0,
                        max: 100,
                        step: 1,
                        action: {
                            type: "Dynamic",
                            field: "maxCostPerLevelAboveFirst"
                        },
                        condition: [
                            {
                                condition: "None",
                                field: "maxCostPerLevelAboveFirst"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "exclusive",
        section: "tools.enchantments.section.exclusive",
        description: "tools.enchantments.section.exclusive.description",
        components: [
            {
                type: "Grid",
                children: [
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.exclusive.components.mainhand.title",
                        image: "/images/features/slots/mainhand.webp",
                        action: {
                            type: "Slot",
                            field: "slots",
                            value: "mainhand"
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["mainhand", "any", "hand"]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.exclusive.components.offhand.title",
                        image: "/images/features/slots/offhand.webp",
                        action: {
                            type: "Slot",
                            field: "slots",
                            value: "offhand"
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["offhand", "any", "hand"]
                            }
                        ]
                    }
                ]
            },
            {
                type: "Grid",
                children: [
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.exclusive.components.head.title",
                        image: "/images/features/slots/head.webp",
                        action: {
                            type: "Slot",
                            field: "slots",
                            value: "head"
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["head", "any", "armor"]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.exclusive.components.chest.title",
                        image: "/images/features/slots/chest.webp",
                        action: {
                            type: "Slot",
                            field: "slots",
                            value: "chest"
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["chest", "any", "armor"]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.exclusive.components.legs.title",
                        image: "/images/features/slots/legs.webp",
                        action: {
                            type: "Slot",
                            field: "slots",
                            value: "legs"
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["legs", "any", "armor"]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.exclusive.components.feet.title",
                        image: "/images/features/slots/feet.webp",
                        action: {
                            type: "Slot",
                            field: "slots",
                            value: "feet"
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "String",
                                field: "slots",
                                values: ["feet", "any", "armor"]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "supported",
        section: "tools.enchantments.section.supported",
        description: "tools.enchantments.section.supported.description",
        toggle: [
            {
                name: "supportedItems",
                title: "tools.enchantments.section.toggle.supported.title",
                description: "tools.enchantments.section.toggle.supported.description"
            },
            {
                name: "primaryItems",
                title: "tools.enchantments.section.toggle.primary.title",
                description: "tools.enchantments.section.toggle.primary.description"
            }
        ],
        components: [
            {
                type: "Grid",
                children: [
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.sword.title",
                        image: "/images/features/item/sword.webp",
                        action: {
                            type: "String",
                            value: "#minecraft:enchantable/sword",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            }
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/sword"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.trident.title",
                        image: "/images/features/item/trident.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/trident"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",

                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/trident"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.mace.title",
                        image: "/images/features/item/mace.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/mace"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",

                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/mace"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.bow.title",
                        image: "/images/features/item/bow.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/bow"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",

                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/bow"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.crossbow.title",
                        image: "/images/features/item/crossbow.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/crossbow"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",

                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/crossbow"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.range.title",
                        image: "/images/features/item/range.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#voxel:enchantable/range"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",

                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#voxel:enchantable/range"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.fishing.title",
                        image: "/images/features/item/fishing_rod.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/fishing"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",

                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/fishing"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.shield.title",
                        image: "/images/features/item/shield.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#voxel:enchantable/shield"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",

                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#voxel:enchantable/shield"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.weapon.title",
                        image: "/images/features/item/weapon.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/weapon"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/weapon"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.melee.title",
                        image: "/images/features/item/melee.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#voxel:enchantable/melee"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",

                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#voxel:enchantable/melee"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.head_armor.title",
                        image: "/images/features/item/helmet.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/head_armor"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/head_armor"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.chest_armor.title",
                        image: "/images/features/item/chestplate.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/chest_armor"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/chest_armor"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.leg_armor.title",
                        image: "/images/features/item/leggings.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/leg_armor"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/leg_armor"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.foot_armor.title",
                        image: "/images/features/item/boots.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/foot_armor"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/foot_armor"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.elytra.title",
                        image: "/images/features/item/elytra.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#voxel:enchantable/elytra"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#voxel:enchantable/elytra"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.armor.title",
                        image: "/images/features/item/armor.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/armor"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/armor"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.equippable.title",
                        image: "/images/features/item/equipable.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/equippable"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/equippable"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.axes.title",
                        image: "/images/features/item/axe.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#voxel:enchantable/axes"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#voxel:enchantable/axes"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.shovels.title",
                        image: "/images/features/item/shovel.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#voxel:enchantable/shovels"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#voxel:enchantable/shovels"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.hoes.title",
                        image: "/images/features/item/hoe.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#voxel:enchantable/hoes"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#voxel:enchantable/hoes"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.pickaxes.title",
                        image: "/images/features/item/pickaxe.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#voxel:enchantable/pickaxes"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#voxel:enchantable/pickaxes"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.durability.title",
                        image: "/images/features/item/durability.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/durability"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/durability"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.mining_loot.title",
                        image: "/images/features/item/mining.webp",
                        action: {
                            type: "String",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            },
                            value: "#minecraft:enchantable/mining_loot"
                        },
                        condition: [
                            {
                                condition: "Equals",
                                type: "String",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                },
                                value: "#minecraft:enchantable/mining_loot"
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.supported.components.none.title",
                        image: "/images/tools/cross.webp",
                        action: {
                            type: "Undefined",
                            field: {
                                type: "Toggle",
                                group: "supported"
                            }
                        },
                        hide: [
                            {
                                condition: "Equals",
                                type: "Toggle",
                                group: "supported",
                                value: "supportedItems"
                            }
                        ],
                        condition: [
                            {
                                condition: "Equals",
                                type: "Undefined",
                                field: {
                                    type: "Toggle",
                                    group: "supported"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "find",
        section: "tools.enchantments.section.find",
        description: "tools.enchantments.section.find.description",
        components: [
            {
                type: "Grid",
                children: [
                    {
                        type: "Slot",
                        image: "/images/features/block/enchanting_table.webp",
                        title: "tools.enchantments.section.find.components.enchantingTable.title",
                        description: "tools.enchantments.section.find.components.enchantingTable.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "in_enchanting_table")
                        },
                        lock: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "non_treasure")]
                            }
                        ],
                        condition: [
                            {
                                type: "Tags",
                                condition: "Contains",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "in_enchanting_table")]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        image: "/images/features/entity/zombie.webp",
                        title: "tools.enchantments.section.find.components.mobEquipment.title",
                        description: "tools.enchantments.section.find.components.mobEquipment.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "on_mob_spawn_equipment")
                        },
                        lock: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "non_treasure")]
                            }
                        ],
                        condition: [
                            {
                                type: "Tags",
                                condition: "Contains",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "on_mob_spawn_equipment")]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        image: "/images/features/block/chest.webp",
                        title: "tools.enchantments.section.find.components.lootInChests.title",
                        description: "tools.enchantments.section.find.components.lootInChests.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "on_random_loot")
                        },
                        lock: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "non_treasure")]
                            }
                        ],
                        condition: [
                            {
                                type: "Tags",
                                condition: "Contains",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "on_random_loot")]
                            }
                        ]
                    }
                ]
            },
            {
                type: "Grid",
                children: [
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.find.components.tradeable.title",
                        image: "/images/features/item/enchanted_book.webp",
                        description: "tools.enchantments.section.find.components.tradeable.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "on_traded_equipment")
                        },
                        lock: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "non_treasure")]
                            }
                        ],
                        condition: [
                            {
                                type: "Tags",
                                condition: "Contains",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "on_traded_equipment")]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.find.components.tradeableEquipment.title",
                        image: "/images/features/item/enchanted_item.webp",
                        description: "tools.enchantments.section.find.components.tradeableEquipment.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "tradeable")
                        },
                        lock: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "non_treasure")]
                            }
                        ],
                        condition: [
                            {
                                type: "Tags",
                                condition: "Contains",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "tradeable")]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        title: "tools.enchantments.section.find.components.priceDoubled.title",
                        image: "/images/features/title/doubled.webp",
                        description: "tools.enchantments.section.find.components.priceDoubled.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "double_trade_price")
                        },
                        lock: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "treasure")]
                            }
                        ],
                        condition: [
                            {
                                type: "Tags",
                                condition: "Contains",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "double_trade_price")]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "yggdrasil",
        section: "tools.enchantments.section.yggdrasil",
        description: "tools.enchantments.section.yggdrasil.description",
        components: [
            {
                type: "Grid",
                children: [
                    {
                        type: "Slot",
                        image: "/images/features/title/yg.webp",
                        title: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.title",
                        description: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.description",
                        action: {
                            type: "Multiple",
                            field: "tags",
                            values: [
                                new Identifier("yggdrasil", "tags/enchantment", "equipment/item/bow"),
                                new Identifier("yggdrasil", "tags/enchantment", "equipment/item/sword"),
                                new Identifier("yggdrasil", "tags/enchantment", "equipment/item/helmet"),
                                new Identifier("yggdrasil", "tags/enchantment", "equipment/item/chestplate"),
                                new Identifier("yggdrasil", "tags/enchantment", "equipment/item/leggings"),
                                new Identifier("yggdrasil", "tags/enchantment", "equipment/item/boots")
                            ]
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [
                                    new Identifier("yggdrasil", "tags/enchantment", "equipment/item/bow"),
                                    new Identifier("yggdrasil", "tags/enchantment", "equipment/item/sword"),
                                    new Identifier("yggdrasil", "tags/enchantment", "equipment/item/helmet"),
                                    new Identifier("yggdrasil", "tags/enchantment", "equipment/item/chestplate"),
                                    new Identifier("yggdrasil", "tags/enchantment", "equipment/item/leggings"),
                                    new Identifier("yggdrasil", "tags/enchantment", "equipment/item/boots")
                                ]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        image: "/images/tools/rarity/common.webp",
                        title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropCommon.title",
                        description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropCommon.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("yggdrasil", "tags/enchantment", "structure/common")
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("yggdrasil", "tags/enchantment", "structure/common")]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        image: "/images/tools/rarity/rare.webp",
                        title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropRare.title",
                        description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropRare.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("yggdrasil", "tags/enchantment", "structure/rare")
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("yggdrasil", "tags/enchantment", "structure/rare")]
                            }
                        ]
                    },
                    {
                        type: "Slot",
                        image: "/images/tools/rarity/unique.webp",
                        title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropUnique.title",
                        description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropUnique.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("yggdrasil", "tags/enchantment", "structure/unique")
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("yggdrasil", "tags/enchantment", "structure/unique")]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "technical",
        section: "tools.enchantments.section.technical",
        description: "tools.enchantments.section.technical.description",
        components: [
            {
                type: "Switch",
                title: "tools.enchantments.section.technical.components.curse.title",
                description: "tools.enchantments.section.technical.components.curse.description",
                action: {
                    type: "Tags",
                    field: "tags",
                    value: new Identifier("minecraft", "tags/enchantment", "curse")
                },
                condition: [
                    {
                        condition: "Contains",
                        type: "Tags",
                        field: "tags",
                        values: [new Identifier("minecraft", "tags/enchantment", "curse")]
                    }
                ]
            },
            {
                type: "Switch",
                title: "tools.enchantments.section.technical.components.nonTreasure.title",
                description: "tools.enchantments.section.technical.components.nonTreasure.description",
                action: {
                    type: "Tags",
                    field: "tags",
                    value: new Identifier("minecraft", "tags/enchantment", "non_treasure")
                },
                condition: [
                    {
                        condition: "Contains",
                        type: "Tags",
                        field: "tags",
                        values: [new Identifier("minecraft", "tags/enchantment", "non_treasure")]
                    }
                ]
            },
            {
                type: "Switch",
                title: "tools.enchantments.section.technical.components.treasure.title",
                description: "tools.enchantments.section.technical.components.treasure.description",
                action: {
                    type: "Tags",
                    field: "tags",
                    value: new Identifier("minecraft", "tags/enchantment", "treasure")
                },
                condition: [
                    {
                        condition: "Contains",
                        type: "Tags",
                        field: "tags",
                        values: [new Identifier("minecraft", "tags/enchantment", "treasure")]
                    }
                ]
            },
            {
                type: "Switch",
                title: "tools.enchantments.section.technical.components.smeltsLoot.title",
                description: "tools.enchantments.section.technical.components.smeltsLoot.description",
                action: {
                    type: "Tags",
                    field: "tags",
                    value: new Identifier("minecraft", "tags/enchantment", "smelts_loot")
                },
                condition: [
                    {
                        condition: "Contains",
                        type: "Tags",
                        field: "tags",
                        values: [new Identifier("minecraft", "tags/enchantment", "smelts_loot")]
                    }
                ]
            },
            {
                type: "Grid",
                children: [
                    {
                        type: "Switch",
                        title: "tools.enchantments.section.technical.components.preventBeeSpawning.title",
                        description: "tools.enchantments.section.technical.components.preventBeeSpawning.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "prevent_bee_spawning")
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "prevent_bee_spawning")]
                            }
                        ]
                    },
                    {
                        type: "Switch",
                        title: "tools.enchantments.section.technical.components.preventPotShattering.title",
                        description: "tools.enchantments.section.technical.components.preventPotShattering.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "prevent_pot_shattering")
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "prevent_pot_shattering")]
                            }
                        ]
                    },
                    {
                        type: "Switch",
                        title: "tools.enchantments.section.technical.components.preventsIceMelting.title",
                        description: "tools.enchantments.section.technical.components.preventsIceMelting.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "prevent_ice_melting")
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "prevent_ice_melting")]
                            }
                        ]
                    },
                    {
                        type: "Switch",
                        title: "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.title",
                        description: "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.description",
                        action: {
                            type: "Tags",
                            field: "tags",
                            value: new Identifier("minecraft", "tags/enchantment", "prevent_infested_block_spawning")
                        },
                        condition: [
                            {
                                condition: "Contains",
                                type: "Tags",
                                field: "tags",
                                values: [new Identifier("minecraft", "tags/enchantment", "prevent_infested_block_spawning")]
                            }
                        ]
                    }
                ]
            },
            {
                type: "Effect",
                action: { type: "RemoveEffect", field: "effects" },
                condition: [{ condition: "None", field: "effects" }]
            }
        ]
    }
];
