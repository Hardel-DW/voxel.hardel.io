import type { EffectEnabled, LockedSlotFrom } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
import type { ToolConfiguration } from "@/components/ui/tools";
import type { VillagerStateEnum } from "@/components/ui/tools/ToolVillager.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type { Enchantment } from "@/lib/minecraft/schema/enchantment/Enchantment.ts";

export type EnchantmentProps = {
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
    enchantingTable: boolean;
    mobEquipment: boolean;
    lootInChests: boolean;
    yggdrasilDropCommon: boolean;
    yggdrasilDropUnique: boolean;
    yggdrasilDropRare: boolean;
    yggdrasilMobEquipment: boolean;
    tradeable: boolean;
    tradeableEquipment: boolean;
    priceDoubled: boolean;
    curse: boolean;
    nonTreasure: boolean;
    treasure: boolean;
    smeltsLoot: boolean;
    preventBeeSpawning: boolean;
    preventPotShattering: boolean;
    preventsIceMelting: boolean;
    preventInfestedBlockSpawning: boolean;
    desert: VillagerStateEnum;
    jungle: VillagerStateEnum;
    swamp: VillagerStateEnum;
    snowy: VillagerStateEnum;
    taiga: VillagerStateEnum;
    plains: VillagerStateEnum;
    savanna: VillagerStateEnum;
    mainhand: boolean;
    offhand: boolean;
    head: boolean;
    chest: boolean;
    legs: boolean;
    feet: boolean;
    lockedFields?: LockedSlotFrom[];
};

const villagerTagToType = (common: boolean, special: boolean) => {
    if (common && special) return "common_special";
    if (common) return "common";
    if (special) return "special";
    return "none";
};

export const parseEnchantmentToProps = (enchantment: Enchantment, tags: Identifier[]): EnchantmentProps => {
    const tagsString = tags.map((tag) => tag.toString());
    const maxLevel = enchantment.max_level;
    const weight = enchantment.weight;
    const anvilCost = enchantment.anvil_cost;
    const minCostBase = enchantment.min_cost.base;
    const minCostPerLevelAboveFirst = enchantment.min_cost.per_level_above_first;
    const maxCostBase = enchantment.max_cost.base;
    const maxCostPerLevelAboveFirst = enchantment.max_cost.per_level_above_first;
    const exclusiveSet = enchantment.exclusive_set;
    const supportedItems = enchantment.supported_items;
    const primaryItems = enchantment.primary_items;
    const effects = enchantment.effects;

    const enchantingTable = tagsString.includes("minecraft:in_enchanting_table");
    const mobEquipment = tagsString.includes("minecraft:on_mob_spawn_equipment");
    const lootInChests = tagsString.includes("minecraft:on_random_loot");
    const tradeable = tagsString.includes("minecraft:tradeable");
    const tradeableEquipment = tagsString.includes("minecraft:on_traded_equipment");
    const priceDoubled = tagsString.includes("minecraft:double_trade_price");
    const curse = tagsString.includes("minecraft:curse");
    const nonTreasure = tagsString.includes("minecraft:non_treasure");
    const treasure = tagsString.includes("minecraft:treasure");
    const smeltsLoot = tagsString.includes("minecraft:smelts_loot");
    const preventBeeSpawning = tagsString.includes("minecraft:prevents_bee_spawns_when_mining");
    const preventPotShattering = tagsString.includes("minecraft:prevents_decorated_pot_shattering");
    const preventsIceMelting = tagsString.includes("minecraft:prevents_ice_melting");
    const preventInfestedBlockSpawning = tagsString.includes("minecraft:prevents_infested_spawns");
    const lockedFields: LockedSlotFrom[] = [];

    if (treasure) {
        lockedFields.push({
            field: "priceDoubled",
            reason: "tools.enchantments.section.technical.components.nonTreasure.reason",
            id: "treasure"
        });
    }

    if (nonTreasure) {
        lockedFields.push({
            field: "enchantingTable",
            reason: "tools.enchantments.section.technical.components.treasure.reason",
            id: "nonTreasure"
        });
        lockedFields.push({
            field: "mobEquipment",
            reason: "tools.enchantments.section.technical.components.treasure.reason",
            id: "nonTreasure"
        });
        lockedFields.push({
            field: "lootInChests",
            reason: "tools.enchantments.section.technical.components.treasure.reason",
            id: "nonTreasure"
        });
        lockedFields.push({
            field: "tradeableEquipment",
            reason: "tools.enchantments.section.technical.components.treasure.reason",
            id: "nonTreasure"
        });
        lockedFields.push({
            field: "tradeable",
            reason: "tools.enchantments.section.technical.components.treasure.reason",
            id: "nonTreasure"
        });
    }

    const slots = enchantment.slots;
    let mainhand = false;
    let offhand = false;
    let head = false;
    let chest = false;
    let legs = false;
    let feet = false;

    if (slots.includes("any")) {
        mainhand = true;
        offhand = true;
        head = true;
        chest = true;
        legs = true;
        feet = true;
    } else {
        if (slots.includes("armor")) {
            head = true;
            chest = true;
            legs = true;
            feet = true;
        } else {
            if (slots.includes("head")) head = true;
            if (slots.includes("chest")) chest = true;
            if (slots.includes("legs")) legs = true;
            if (slots.includes("feet")) feet = true;
        }

        if (slots.includes("hand")) {
            mainhand = true;
            offhand = true;
        } else {
            if (slots.includes("mainhand")) mainhand = true;
            if (slots.includes("offhand")) offhand = true;
        }
    }

    const desert = villagerTagToType(
        tagsString.includes("minecraft:trades/desert_common"),
        tagsString.includes("minecraft:trades/desert_special")
    );
    const jungle = villagerTagToType(
        tagsString.includes("minecraft:trades/jungle_common"),
        tagsString.includes("minecraft:trades/jungle_special")
    );
    const swamp = villagerTagToType(
        tagsString.includes("minecraft:trades/swamp_common"),
        tagsString.includes("minecraft:trades/swamp_special")
    );
    const snowy = villagerTagToType(
        tagsString.includes("minecraft:trades/snowy_common"),
        tagsString.includes("minecraft:trades/snowy_special")
    );
    const taiga = villagerTagToType(
        tagsString.includes("minecraft:trades/taiga_common"),
        tagsString.includes("minecraft:trades/taiga_special")
    );
    const plains = villagerTagToType(
        tagsString.includes("minecraft:trades/plains_common"),
        tagsString.includes("minecraft:trades/plains_special")
    );
    const savanna = villagerTagToType(
        tagsString.includes("minecraft:trades/savanna_common"),
        tagsString.includes("minecraft:trades/savanna_special")
    );

    const yggdrasilDropCommon = tagsString.includes("yggdrasil:structure/common");
    const yggdrasilDropRare = tagsString.includes("yggdrasil:structure/rare");
    const yggdrasilDropUnique = tagsString.includes("yggdrasil:structure/unique");

    const yggdrasilMobEquipment =
        tagsString.includes("yggdrasil:equipment/item/boots") ||
        tagsString.includes("yggdrasil:equipment/item/leggings") ||
        tagsString.includes("yggdrasil:equipment/item/chestplate") ||
        tagsString.includes("yggdrasil:equipment/item/helmet") ||
        tagsString.includes("yggdrasil:equipment/item/bow") ||
        tagsString.includes("yggdrasil:equipment/item/sword");

    return {
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
        enchantingTable,
        mobEquipment,
        lootInChests,
        yggdrasilDropCommon,
        yggdrasilDropRare,
        yggdrasilDropUnique,
        yggdrasilMobEquipment,
        tradeable,
        tradeableEquipment,
        priceDoubled,
        curse,
        nonTreasure,
        treasure,
        smeltsLoot,
        preventBeeSpawning,
        preventPotShattering,
        preventsIceMelting,
        preventInfestedBlockSpawning,
        desert,
        jungle,
        swamp,
        snowy,
        taiga,
        plains,
        savanna,
        mainhand,
        offhand,
        head,
        chest,
        legs,
        feet,
        lockedFields
    };
};

export const compileEnchantmentDataDriven = (
    props: EnchantmentProps,
    baseEnchant: Enchantment,
    removedEffect: EffectEnabled,
    original: Enchantment
): Enchantment => {
    const enchantment = structuredClone(baseEnchant);
    enchantment.max_level = props.maxLevel;
    enchantment.weight = props.weight;
    enchantment.anvil_cost = props.anvilCost;
    enchantment.min_cost.base = props.minCostBase;
    enchantment.min_cost.per_level_above_first = props.minCostPerLevelAboveFirst;
    enchantment.max_cost.base = props.maxCostBase;
    enchantment.max_cost.per_level_above_first = props.maxCostPerLevelAboveFirst;
    enchantment.supported_items = props.supportedItems;

    if (props.effects) {
        const effects = { ...original.effects, ...props.effects };

        for (const effectType in effects) {
            const removedEffectType = removedEffect.effects.find((effect) => effect.type === effectType);

            if (removedEffectType && !removedEffectType.enabled) {
                delete effects[effectType as keyof EffectComponentsRecord];
            }
        }

        enchantment.effects = effects;
    }

    if (props.exclusiveSet) {
        enchantment.exclusive_set = props.exclusiveSet;
    }

    if (props.primaryItems) {
        if (props.primaryItems === "none") {
            enchantment.primary_items = undefined;
        } else {
            enchantment.primary_items = props.primaryItems;
        }
    }

    enchantment.slots = [];
    if (props.mainhand && props.offhand && props.head && props.chest && props.legs && props.feet) {
        enchantment.slots.push("any");
    } else {
        if (props.head && props.chest && props.legs && props.feet) {
            enchantment.slots.push("armor");
        } else {
            if (props.head) enchantment.slots.push("head");
            if (props.chest) enchantment.slots.push("chest");
            if (props.legs) enchantment.slots.push("legs");
            if (props.feet) enchantment.slots.push("feet");
        }

        if (props.mainhand && props.offhand) {
            enchantment.slots.push("hand");
        } else {
            if (props.mainhand) enchantment.slots.push("mainhand");
            if (props.offhand) enchantment.slots.push("offhand");
        }
    }

    return enchantment;
};

export const compileEnchantmentTags = (props: EnchantmentProps): Identifier[] => {
    const tags: Identifier[] = [];

    if (props.enchantingTable) tags.push(new Identifier("minecraft", "tags/enchantment", "in_enchanting_table"));
    if (props.mobEquipment) tags.push(new Identifier("minecraft", "tags/enchantment", "on_mob_spawn_equipment"));
    if (props.lootInChests) tags.push(new Identifier("minecraft", "tags/enchantment", "on_random_loot"));
    if (props.yggdrasilDropCommon) tags.push(new Identifier("yggdrasil", "tags/enchantment", "structure/common"));
    if (props.yggdrasilDropRare) tags.push(new Identifier("yggdrasil", "tags/enchantment", "structure/rare"));
    if (props.yggdrasilDropUnique) tags.push(new Identifier("yggdrasil", "tags/enchantment", "structure/unique"));
    if (props.tradeable) tags.push(new Identifier("minecraft", "tags/enchantment", "tradeable"));
    if (props.tradeableEquipment) tags.push(new Identifier("minecraft", "tags/enchantment", "on_traded_equipment"));
    if (props.priceDoubled) tags.push(new Identifier("minecraft", "tags/enchantment", "double_trade_price"));
    if (props.curse) tags.push(new Identifier("minecraft", "tags/enchantment", "curse"));
    if (props.nonTreasure) tags.push(new Identifier("minecraft", "tags/enchantment", "non_treasure"));
    if (props.treasure) tags.push(new Identifier("minecraft", "tags/enchantment", "treasure"));
    if (props.smeltsLoot) tags.push(new Identifier("minecraft", "tags/enchantment", "smelts_loot"));
    if (props.preventBeeSpawning) tags.push(new Identifier("minecraft", "tags/enchantment", "prevents_bee_spawns_when_mining"));
    if (props.preventPotShattering) tags.push(new Identifier("minecraft", "tags/enchantment", "prevents_decorated_pot_shattering"));
    if (props.preventsIceMelting) tags.push(new Identifier("minecraft", "tags/enchantment", "prevents_ice_melting"));
    if (props.preventInfestedBlockSpawning) tags.push(new Identifier("minecraft", "tags/enchantment", "prevents_infested_spawns"));

    if (props.yggdrasilMobEquipment) {
        if (props.mainhand || props.offhand) {
            if (
                props.supportedItems.includes("#minecraft:enchantable/bow") ||
                props.supportedItems.includes("#minecraft:enchantable/crossbow") ||
                props.supportedItems.includes("#voxel:enchantable/range")
            ) {
                tags.push(new Identifier("yggdrasil", "tags/enchantment", "equipment/item/bow"));
            } else {
                tags.push(new Identifier("yggdrasil", "tags/enchantment", "equipment/item/sword"));
            }
        }
        if (props.head) tags.push(new Identifier("yggdrasil", "tags/enchantment", "equipment/item/helmet"));
        if (props.chest) tags.push(new Identifier("yggdrasil", "tags/enchantment", "equipment/item/chestplate"));
        if (props.legs) tags.push(new Identifier("yggdrasil", "tags/enchantment", "equipment/item/leggings"));
        if (props.feet) tags.push(new Identifier("yggdrasil", "tags/enchantment", "equipment/item/boots"));
    }

    return tags;
};

export const formConfigurations: ToolConfiguration[] = [
    {
        id: "global",
        section: "tools.enchantments.section.global",
        description: "tools.enchantments.section.global.description",
        components: [
            {
                type: "Grid",
                columns: 3,
                children: [
                    {
                        type: "Counter",
                        name: "maxLevel",
                        title: "tools.enchantments.section.global.components.maxLevel.title",
                        description: "tools.enchantments.section.global.components.maxLevel.description",
                        image: "/icons/tools/level.svg",
                        value: 1,
                        min: 1,
                        max: 10,
                        step: 1
                    },
                    {
                        type: "Counter",
                        name: "weight",
                        title: "tools.enchantments.section.global.components.weight.title",
                        description: "tools.enchantments.section.global.components.weight.description",
                        image: "/icons/tools/weight.svg",
                        value: 1,
                        min: 1,
                        max: 20,
                        step: 1
                    },
                    {
                        type: "Counter",
                        name: "anvilCost",
                        title: "tools.enchantments.section.global.components.anvilCost.title",
                        description: "tools.enchantments.section.global.components.anvilCost.description",
                        image: "/icons/tools/anvil.svg",
                        value: 1,
                        min: 1,
                        max: 20,
                        step: 1
                    }
                ]
            },
            {
                type: "Grid",
                columns: 2,
                children: [
                    {
                        type: "Range",
                        name: "minCostBase",
                        label: "tools.enchantments.section.global.components.minCostBase.label",
                        value: 0,
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    {
                        type: "Range",
                        name: "minCostPerLevelAboveFirst",
                        label: "tools.enchantments.section.global.components.minCostPerLevelAboveFirst.label",
                        value: 0,
                        min: 0,
                        max: 100,
                        step: 1
                    }
                ]
            },
            {
                type: "Grid",
                columns: 2,
                children: [
                    {
                        type: "Range",
                        name: "maxCostBase",
                        label: "tools.enchantments.section.global.components.maxCostBase.label",
                        value: 0,
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    {
                        type: "Range",
                        name: "maxCostPerLevelAboveFirst",
                        label: "tools.enchantments.section.global.components.maxCostPerLevelAboveFirst.label",
                        value: 0,
                        min: 0,
                        max: 100,
                        step: 1
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
                columns: 2,
                children: [
                    {
                        type: "Slot",
                        name: "mainhand",
                        title: "tools.enchantments.section.exclusive.components.mainhand.title",
                        image: "/images/features/slots/mainhand.webp"
                    },
                    {
                        type: "Slot",
                        name: "offhand",
                        title: "tools.enchantments.section.exclusive.components.offhand.title",
                        image: "/images/features/slots/offhand.webp"
                    }
                ]
            },
            {
                type: "Grid",
                columns: 4,
                children: [
                    {
                        type: "Slot",
                        name: "head",
                        title: "tools.enchantments.section.exclusive.components.head.title",
                        image: "/images/features/slots/head.webp"
                    },
                    {
                        type: "Slot",
                        name: "chest",
                        title: "tools.enchantments.section.exclusive.components.chest.title",
                        image: "/images/features/slots/chest.webp"
                    },
                    {
                        type: "Slot",
                        name: "legs",
                        title: "tools.enchantments.section.exclusive.components.legs.title",
                        image: "/images/features/slots/legs.webp"
                    },
                    {
                        type: "Slot",
                        name: "feet",
                        title: "tools.enchantments.section.exclusive.components.feet.title",
                        image: "/images/features/slots/feet.webp"
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
                columns: 5,
                children: [
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.sword.title",
                        image: "/images/features/item/sword.webp",
                        value: "#minecraft:enchantable/sword"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.trident.title",
                        image: "/images/features/item/trident.webp",
                        value: "#minecraft:enchantable/trident"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.mace.title",
                        image: "/images/features/item/mace.webp",
                        value: "#minecraft:enchantable/mace"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.bow.title",
                        image: "/images/features/item/bow.webp",
                        value: "#minecraft:enchantable/bow"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.crossbow.title",
                        image: "/images/features/item/crossbow.webp",
                        value: "#minecraft:enchantable/crossbow"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.range.title",
                        image: "/images/features/item/range.webp",
                        value: "#voxel:enchantable/range"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.fishing.title",
                        image: "/images/features/item/fishing_rod.webp",
                        value: "#minecraft:enchantable/fishing"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.shield.title",
                        image: "/images/features/item/shield.webp",
                        value: "#voxel:enchantable/shield"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.weapon.title",
                        image: "/images/features/item/weapon.webp",
                        value: "#minecraft:enchantable/weapon"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.melee.title",
                        image: "/images/features/item/melee.webp",
                        value: "#voxel:enchantable/melee"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.head_armor.title",
                        image: "/images/features/item/helmet.webp",
                        value: "#minecraft:enchantable/head_armor"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.chest_armor.title",
                        image: "/images/features/item/chestplate.webp",
                        value: "#minecraft:enchantable/chest_armor"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.leg_armor.title",
                        image: "/images/features/item/leggings.webp",
                        value: "#minecraft:enchantable/leg_armor"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.foot_armor.title",
                        image: "/images/features/item/boots.webp",
                        value: "#minecraft:enchantable/foot_armor"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.elytra.title",
                        image: "/images/features/item/elytra.webp",
                        value: "#voxel:enchantable/elytra"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.armor.title",
                        image: "/images/features/item/armor.webp",
                        value: "#minecraft:enchantable/armor"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.equippable.title",
                        image: "/images/features/item/equipable.webp",
                        value: "#minecraft:enchantable/equippable"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.axes.title",
                        image: "/images/features/item/axe.webp",
                        value: "#voxel:enchantable/axes"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.shovels.title",
                        image: "/images/features/item/shovel.webp",
                        value: "#voxel:enchantable/shovels"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.hoes.title",
                        image: "/images/features/item/hoe.webp",
                        value: "#voxel:enchantable/hoes"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.pickaxes.title",
                        image: "/images/features/item/pickaxe.webp",
                        value: "#voxel:enchantable/pickaxes"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.durability.title",
                        image: "/images/features/item/durability.webp",
                        value: "#minecraft:enchantable/durability"
                    },
                    {
                        type: "Selectable",
                        name: ["supportedItems", "primaryItems"],
                        title: "tools.enchantments.section.supported.components.mining_loot.title",
                        image: "/images/features/item/mining.webp",
                        value: "#minecraft:enchantable/mining_loot"
                    },
                    {
                        type: "Selectable",
                        name: ["primaryItems"],
                        title: "tools.enchantments.section.supported.components.none.title",
                        image: "/images/tools/cross.webp",
                        value: "none",
                        defaultChecked: true
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
                columns: 3,
                children: [
                    {
                        type: "Slot",
                        name: "enchantingTable",
                        image: "/images/features/block/enchanting_table.webp",
                        title: "tools.enchantments.section.find.components.enchantingTable.title",
                        description: "tools.enchantments.section.find.components.enchantingTable.description"
                    },
                    {
                        type: "Slot",
                        name: "mobEquipment",
                        image: "/images/features/entity/zombie.webp",
                        title: "tools.enchantments.section.find.components.mobEquipment.title",
                        description: "tools.enchantments.section.find.components.mobEquipment.description"
                    },
                    {
                        type: "Slot",
                        name: "lootInChests",
                        image: "/images/features/block/chest.webp",
                        title: "tools.enchantments.section.find.components.lootInChests.title",
                        description: "tools.enchantments.section.find.components.lootInChests.description"
                    }
                ]
            },
            {
                type: "Grid",
                columns: 3,
                children: [
                    {
                        type: "Slot",
                        name: "tradeable",
                        title: "tools.enchantments.section.find.components.tradeable.title",
                        image: "/images/features/item/enchanted_book.webp",
                        description: "tools.enchantments.section.find.components.tradeable.description"
                    },
                    {
                        type: "Slot",
                        name: "tradeableEquipment",
                        title: "tools.enchantments.section.find.components.tradeableEquipment.title",
                        image: "/images/features/item/enchanted_item.webp",
                        description: "tools.enchantments.section.find.components.tradeableEquipment.description"
                    },
                    {
                        type: "Slot",
                        name: "priceDoubled",
                        title: "tools.enchantments.section.find.components.priceDoubled.title",
                        image: "/images/features/title/doubled.webp",
                        description: "tools.enchantments.section.find.components.priceDoubled.description"
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
                columns: 4,
                children: [
                    {
                        type: "Slot",
                        name: "yggdrasilMobEquipment",
                        image: "/images/features/title/yg.webp",
                        title: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.title",
                        description: "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.description"
                    },
                    {
                        type: "Slot",
                        name: "yggdrasilDropCommon",
                        image: "/images/tools/rarity/common.webp",
                        title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropCommon.title",
                        description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropCommon.description"
                    },
                    {
                        type: "Slot",
                        name: "yggdrasilDropRare",
                        image: "/images/tools/rarity/rare.webp",
                        title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropRare.title",
                        description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropRare.description"
                    },
                    {
                        type: "Slot",
                        name: "yggdrasilDropUnique",
                        image: "/images/tools/rarity/unique.webp",
                        title: "tools.enchantments.section.yggdrasil.components.yggdrasilDropUnique.title",
                        description: "tools.enchantments.section.yggdrasil.components.yggdrasilDropUnique.description"
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
                name: "curse",
                title: "tools.enchantments.section.technical.components.curse.title",
                description: "tools.enchantments.section.technical.components.curse.description"
            },
            {
                type: "Switch",
                name: "nonTreasure",
                title: "tools.enchantments.section.technical.components.nonTreasure.title",
                lock: [
                    { field: "enchantingTable", reason: "tools.enchantments.section.technical.components.nonTreasure.reason" },
                    { field: "mobEquipment", reason: "tools.enchantments.section.technical.components.nonTreasure.reason" },
                    { field: "lootInChests", reason: "tools.enchantments.section.technical.components.nonTreasure.reason" },
                    { field: "tradeableEquipment", reason: "tools.enchantments.section.technical.components.nonTreasure.reason" },
                    { field: "tradeable", reason: "tools.tools.enchantments.section.technical.components.nonTreasure.reason" }
                ],
                description: "tools.enchantments.section.technical.components.nonTreasure.description"
            },
            {
                type: "Switch",
                name: "treasure",
                title: "tools.enchantments.section.technical.components.treasure.title",
                lock: [{ field: "priceDoubled", reason: "tools.enchantments.section.technical.components.treasure.reason" }],
                description: "tools.enchantments.section.technical.components.treasure.description"
            },
            {
                type: "Switch",
                name: "smeltsLoot",
                title: "tools.enchantments.section.technical.components.smeltsLoot.title",
                description: "tools.enchantments.section.technical.components.smeltsLoot.description"
            },
            {
                type: "Grid",
                columns: 2,
                children: [
                    {
                        type: "Switch",
                        name: "preventBeeSpawning",
                        title: "tools.enchantments.section.technical.components.preventBeeSpawning.title",
                        description: "tools.enchantments.section.technical.components.preventBeeSpawning.description"
                    },
                    {
                        type: "Switch",
                        name: "preventPotShattering",
                        title: "tools.enchantments.section.technical.components.preventPotShattering.title",
                        description: "tools.enchantments.section.technical.components.preventPotShattering.description"
                    },
                    {
                        type: "Switch",
                        name: "preventsIceMelting",
                        title: "tools.enchantments.section.technical.components.preventsIceMelting.title",
                        description: "tools.enchantments.section.technical.components.preventsIceMelting.description"
                    },
                    {
                        type: "Switch",
                        name: "preventInfestedBlockSpawning",
                        title: "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.title",
                        description: "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.description"
                    }
                ]
            },
            {
                type: "Effect",
                name: "effects"
            }
        ]
    }
];
