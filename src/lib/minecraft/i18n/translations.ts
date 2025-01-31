import type { TranslateTextType } from "../core/schema/primitive/text.ts";
import type { LanguageMap } from "./types.ts";

export function getKey(content: TranslateTextType | undefined): string {
    if (!content) {
        return "";
    }

    if (typeof content === "string") {
        return content;
    }

    if (typeof content === "object") {
        if ("type" in content && content.type === "translate") {
            return content.value;
        }
    }

    return content.toString();
}

export const translations: LanguageMap = {
    "en-us": {
        "generic.branding": "Voxel",
        "generic.website": "VOXEL",
        "generic.section": "- VOXEL",
        "generic.error": "Error",
        "generic.back": "Return to home",
        "generic.contact_us": "Contact us",
        "generic.start": "Try now",
        "generic.cancel": "Deny",
        "generic.accept": "Accept",
        "generic.settings": "Settings",
        "generic.learn_more": "Learn more",
        "generic.documentation": "Documentation",
        "generic.take_a_look": "Take a look",
        "generic.soon": "Soon",
        "generic.no_results": "No results",
        "generic.login": "Login",
        "generic.faq": "FAQ",
        "generic.modrinth": "Modrinth",
        "generic.join_us": "Join us",
        "generic.private_message": "Private message",
        "generic.translation.missing": "Translation missing",
        "generic.datapacks": "Datapacks",
        "generic.unsupported.video": "Your browser does not support the video tag.",
        "generic.more": "More Details",
        "generic.missing_key": "Missing translation key",
        "generic.save": "Save",
        "generic.hello": "Hello %s",
        "generic.welcome": "Welcome %s, good %s",
        "generic.count": "Count: %s",
        "generic.consecutive": "%s %s",
        "generic.borders": "%s text %s",
        "generic.special": "Test! Test? Test.",
        "generic.partial": "Partial translation",

        "tools.see_latest_updates": "See latest updates",
        "tools.sound.error": "An error occurred while playing the sound",
        "tools.sound.search": "Search for a sound",

        "tools.enchantments.import_vanilla": "Import Vanilla Enchantments",
        "tools.toast.soon": "This feature is under development, it will be available soon, stay tuned!",
        "tools.download": "Download the data pack",
        "tools.upload.start": "Click to upload",
        "tools.upload.drop": "or drag and drop",
        "tools.disabled_because_vanilla": "Content disabled, Minecraft does not allow modifying this content.",
        "tools.upload.description": "Drop your data packs in .zip here to start configuring them.",
        "tools.enchantments.home": "Enchantment Configurator",
        "tools.enchantments.home.description":
            "This tool is designed to modify the enchantments of an existing pack, such as NeoEnchant+ or any other pack, with a simple and user-friendly interface that requires no development knowledge.",
        "tools.enchantments.home.small": "NeoEnchant+ is available for download on ",
        "tools.debug.quit": "Leave debug mode",

        "tools.upload.success": "Success",
        "tools.upload.success.description": "The import has been successful.",

        "dialog.success.title": "Success",
        "dialog.success.description":
            "The datapack has been successfully modified. It should appear in your download folder under the name.",
        "dialog.success.additional_info_title": "Additional Information",
        "dialog.success.additional_info":
            "If you have disabled enchantments, they are still present in the datapack, but their functionalities are disabled and they can no longer be obtained.",
        "dialog.footer.donate": "Make a donation",
        "tooltip.safe_delete":
            'This is a "safe removal". It does not remove the enchantment, but it can no longer be obtained and has no effect.',
        "tools.supports.title": "Supports Voxel",
        "tools.supports.description":
            "These tools are free. I have tons of ideas for the Minecraft community but I lack funding to do advanced things. If you like what I do, become a Patreon and you will even get exclusive benefits.",
        "tools.supports.advantages": "Patron Advantages",
        "tools.supports.advantages.early_access": "Early access to Voxel updates",
        "tools.supports.advantages.submit_ideas": "Submit ideas",
        "tools.supports.advantages.discord_role": "Exclusive role and channel on Discord",
        "tools.supports.advantages.live_voxel": "Make Voxel live",
        "tools.supports.become": "Become a Patreon",
        "tools.enchantments.vanilla":
            "You are modifying native Minecraft content. If two datapacks modify the same content, one will take precedence. Some options are restricted by Minecraft's limitations.",
        "tools.enchantments.warning.no_file": "No file found",
        "tools.enchantments.warning.multiple_files": "Please only drop one file at a time",
        "tools.enchantments.warning.mods": "Mods are not allowed, please drop a data pack",
        "tools.enchantments.warning.invalid_file": "Invalid file, please drop a .zip file",
        "tools.enchantments.warning.no_enchantments": "No enchantments found",
        "tools.enchantments.warning.component": "An error occurred while loading the component",
        "tools.enchantments.sidebar.title": "Enchantments",

        "tools.enchantments.section.global": "Global Settings",
        "tools.enchantments.section.exclusive": "Non Combinable",
        "tools.enchantments.section.slots": "When Effect Activates",
        "tools.enchantments.section.supported": "Supported Items",
        "tools.enchantments.section.find": "Where to Find",
        "tools.enchantments.section.costs": "Enchantment Costs",
        "tools.enchantments.section.effects": "Effects",
        "tools.enchantments.section.addons": "Addons",

        "tools.enchantments.section.technical": "Technical Settings",
        "tools.enchantments.section.global.description": "General settings.",
        "tools.enchantments.section.exclusive.description": "Non-combinable enchantments.",
        "tools.enchantments.section.slots.description": "When the enchantment effect should be activated.",
        "tools.enchantments.section.supported.description": "Which items are compatible with this enchantment.",
        "tools.enchantments.section.find.description": "Where to find this enchantment.",
        "tools.enchantments.section.effects.description": "The effects of the enchantment.",
        "tools.enchantments.section.addons.description": "Config some addons for this enchantment.",
        "tools.enchantments.section.technical.description": "Technical settings for enchantments.",

        "tools.enchantments.section.global.components.maxLevel.title": "Maximum level",
        "tools.enchantments.section.global.components.maxLevel.description": "The maximum level of the enchantment.",
        "tools.enchantments.section.global.components.weight.title": "Weight",
        "tools.enchantments.section.global.components.weight.description": "The rarity of the enchantment in the enchantment table.",
        "tools.enchantments.section.global.components.anvilCost.title": "Anvil cost",
        "tools.enchantments.section.global.components.anvilCost.description": "The cost of combining two items with this enchantment.",
        "tools.enchantments.section.global.components.minCostBase.label": "Minimum base cost",
        "tools.enchantments.section.global.components.minCostPerLevelAboveFirst.label": "Minimum cost per level above the first",
        "tools.enchantments.section.global.components.maxCostBase.label": "Maximum base cost",
        "tools.enchantments.section.global.components.maxCostPerLevelAboveFirst.label": "Maximum cost per level above the first",
        "tools.enchantments.section.global.components.mode.title": "Mode",
        "tools.enchantments.section.global.components.mode.description":
            "Choose between Normal (default), Soft Delete (Deactivates effects and obtaining) or Only Creative (Obtained only in creative).",
        "tools.enchantments.section.global.components.selector.normal": "Normal",
        "tools.enchantments.section.global.components.selector.soft_delete": "Soft Delete",
        "tools.enchantments.section.global.components.selector.only_creative": "Only Creative",

        "tools.enchantments.section.global.explanation.title": "Detailed explanations of the different components",
        "tools.enchantments.section.global.explanation.list.1":
            "Sets the maximum level of the enchantment, the effect values automatically adapt to the levels.",
        "tools.enchantments.section.global.explanation.list.2":
            "The higher this value is, the more often the enchantment will appear in the enchanting table.",
        "tools.enchantments.section.global.explanation.list.3":
            "The cost to apply this enchantment to another item using an anvil. Divided by two if using a book, multiplied by the enchantment level.",

        "tools.enchantments.section.toggle.supported.title": "Supported",
        "tools.enchantments.section.toggle.supported.description":
            "Items on which this enchantment can be applied, including anvil, /enchant command, or in reward.",
        "tools.enchantments.section.toggle.primary.title": "Enchanting Table",
        "tools.enchantments.section.toggle.primary.description":
            "Items for which this enchantment appears in an enchanting table. If set to 'Default', equals the option chosen in 'Supported'.",
        "tools.enchantments.section.toggle.exclusive.group.title": "Predefined Group",
        "tools.enchantments.section.toggle.exclusive.group.description":
            "'Predefined Groups' are lists of enchantments that don't combine together. These are great if you're using other mods or datapacks since they can add their own enchantments to these lists too.",
        "tools.enchantments.section.toggle.exclusive.individual.title": "Arbitrary Choice",
        "tools.enchantments.section.toggle.exclusive.individual.description":
            "'Arbitrary Choice' lets you choose exactly which enchantments shouldn't combine together, one by one.",
        "tools.enchantments.section.exclusive.custom.fallback": "Does not contain any custom enchantment lists.",

        "tools.enchantments.section.slots.mainhand.title": "Main Hand",
        "tools.enchantments.section.slots.offhand.title": "Off Hand",
        "tools.enchantments.section.slots.head.title": "Head",
        "tools.enchantments.section.slots.chest.title": "Chest",
        "tools.enchantments.section.slots.legs.title": "Legs",
        "tools.enchantments.section.slots.feet.title": "Feet",
        "tools.enchantments.section.slots.explanation.title": "Here's how enchantment slots work and when their effects kick in:",
        "tools.enchantments.section.slots.explanation.list.1":
            "Take Fire Aspect for example - if you put it on your main hand or offhand weapon, it'll set enemies on fire when you hit them.",
        "tools.enchantments.section.slots.explanation.list.2":
            "And if you put Fire Aspect on any armor piece (head, chest, legs or feet) and you equip it, it'll light up enemies every time you attack.",

        "tools.enchantments.section.supported.components.sword.title": "Sword",
        "tools.enchantments.section.supported.components.trident.title": "Trident",
        "tools.enchantments.section.supported.components.mace.title": "Mace",
        "tools.enchantments.section.supported.components.bow.title": "Bow",
        "tools.enchantments.section.supported.components.crossbow.title": "Crossbow",
        "tools.enchantments.section.supported.components.range.title": "Range",
        "tools.enchantments.section.supported.components.fishing.title": "Fishing",
        "tools.enchantments.section.supported.components.shield.title": "Shield",
        "tools.enchantments.section.supported.components.weapon.title": "Weapon",
        "tools.enchantments.section.supported.components.melee.title": "Weapon + Trident",
        "tools.enchantments.section.supported.components.head_armor.title": "Helmet",
        "tools.enchantments.section.supported.components.chest_armor.title": "Chestplate",
        "tools.enchantments.section.supported.components.leg_armor.title": "Leggings",
        "tools.enchantments.section.supported.components.foot_armor.title": "Boots",
        "tools.enchantments.section.supported.components.elytra.title": "Elytra",
        "tools.enchantments.section.supported.components.armor.title": "Armor",
        "tools.enchantments.section.supported.components.equippable.title": "Equipable",
        "tools.enchantments.section.supported.components.axes.title": "Axes",
        "tools.enchantments.section.supported.components.shovels.title": "Shovels",
        "tools.enchantments.section.supported.components.hoes.title": "Hoes",
        "tools.enchantments.section.supported.components.pickaxes.title": "Pickaxes",
        "tools.enchantments.section.supported.components.durability.title": "Durability",
        "tools.enchantments.section.supported.components.mining_loot.title": "Mining loot",
        "tools.enchantments.section.supported.components.none.title": "Default",

        "tools.enchantments.section.find.components.enchantingTable.title": "Enchanting Table",
        "tools.enchantments.section.find.components.enchantingTable.description":
            "This enchantment can be obtained from the enchanting table.",
        "tools.enchantments.section.find.components.mobEquipment.title": "Mob Equipment",
        "tools.enchantments.section.find.components.mobEquipment.description": "This enchantment can be found on mob equipment.",
        "tools.enchantments.section.find.components.lootInChests.title": "Loot in Chests",
        "tools.enchantments.section.find.components.lootInChests.description":
            "This enchantment can be found on naturally generated equipment in chests or other rewards.",
        "tools.enchantments.section.find.components.tradeable.title": "Tradeable",
        "tools.enchantments.section.find.components.tradeable.description":
            "This enchantment can be sold by villagers as an enchanted book.",
        "tools.enchantments.section.find.components.tradeableEquipment.title": "Tradeable Equipment",
        "tools.enchantments.section.find.components.tradeableEquipment.description":
            "This enchantment can be sold by villagers on equipment.",
        "tools.enchantments.section.find.components.priceDoubled.title": "The price is doubled",
        "tools.enchantments.section.find.components.priceDoubled.description":
            "This enchantment is charged twice as much in villager trades.",

        "tools.enchantments.section.addons.yggdrasil.title": "Yggdrasil",
        "tools.enchantments.section.addons.yggdrasil.description": "Content exclusive to Yggdrasil.",

        "tools.enchantments.section.addons.yggdrasil.alfheim.title": "Alfheim",
        "tools.enchantments.section.addons.yggdrasil.asflors.title": "Asflors",
        "tools.enchantments.section.addons.yggdrasil.runic_fracture.title": "Runic Fracture",

        "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.title": "Mob Equipment",
        "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.description":
            "Yggdrasil mobs will spawn equipped with this enchantment.",
        "tools.enchantments.section.addons.yggdrasil.random_chest.title": "Random Chest",
        "tools.enchantments.section.addons.yggdrasil.random_chest.description":
            "This enchantment will be found in random chests throughout Alfheim",
        "tools.enchantments.section.addons.yggdrasil.vault.title": "Vault",
        "tools.enchantments.section.addons.yggdrasil.vault.description": "This enchantment will be found in vaults",
        "tools.enchantments.section.addons.yggdrasil.ominous_vault.title": "Ominous Vault",
        "tools.enchantments.section.addons.yggdrasil.ominous_vault.description": "This enchantment will be found in ominous vaults",
        "tools.enchantments.section.addons.yggdrasil.trial_spawner.title": "Trial Spawner Reward",
        "tools.enchantments.section.addons.yggdrasil.trial_spawner.description": "This enchantment will be found in trial spawner rewards",
        "tools.enchantments.section.addons.yggdrasil.ominous_trial_spawner.title": "Ominous Trial Spawner Reward",
        "tools.enchantments.section.addons.yggdrasil.ominous_trial_spawner.description":
            "This enchantment will be found in ominous trial spawner rewards",
        "tools.enchantments.section.addons.yggdrasil.common_chest.title": "Common Chests",
        "tools.enchantments.section.addons.yggdrasil.common_chest.description": "This enchantment will be found in village common chests",
        "tools.enchantments.section.addons.yggdrasil.structure_vault.title": "Vault",
        "tools.enchantments.section.addons.yggdrasil.structure_vault.description": "This enchantment will be found in the vault",
        "tools.enchantments.section.addons.yggdrasil.structure_ominous_vault.title": "Ominous Vault",
        "tools.enchantments.section.addons.yggdrasil.structure_ominous_vault.description":
            "This enchantment will be found in the ominous vault",
        "tools.enchantments.section.addons.yggdrasil.asflors_sword.title": "Asflor's Sword",
        "tools.enchantments.section.addons.yggdrasil.asflors_sword.description":
            "This enchantment will be found on Asflor's legendary sword",
        "tools.enchantments.section.addons.yggdrasil.boss_trial_spawner.title": "Trial Spawner Reward - Boss",
        "tools.enchantments.section.addons.yggdrasil.boss_trial_spawner.description":
            "This enchantment will be found as rewards after completing fights in the runic fracture",
        "tools.enchantments.section.addons.yggdrasil.monster_trial_spawner.title": "Trial Spawner Reward - Secondary",
        "tools.enchantments.section.addons.yggdrasil.monster_trial_spawner.description":
            "This enchantment will be found as rewards from secondary spawners, in the corner of the room",

        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.title": "Runic Labyrinth",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.dark_elven_bow.title": "Dark Elven Bow",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.dark_elven_bow.description":
            "This enchantment will be found on the legendary Dark Elven bow",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.twilight_bow.title": "Twilight of Yggdrasil Bow",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.twilight_bow.description":
            "This enchantment will be found on the legendary Twilight of Yggdrasil bow",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.library.title": "Runic Library",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.library.description":
            "This enchantment will be found in the library chest",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.random.title": "Random Chest",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.random.description":
            "This enchantment will be found in random chests throughout the labyrinth",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.shulker.title": "Runic Shulker Box",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.shulker.description":
            "This enchantment will be found in black and white shulker boxes",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.trial.title": "Runic Trial",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.trial.description":
            "This enchantment will be found in runic labyrinth trials",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.vault.title": "Runic Vault",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.vault.description":
            "This enchantment will be found in the labyrinth vault",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.ominous_trial.title": "Ominous Trial",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.ominous_trial.description":
            "This enchantment will be found in ominous labyrinth trials",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.ominous_vault.title": "Ominous Vault",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.ominous_vault.description":
            "This enchantment will be found in the ominous labyrinth vault",

        "tools.enchantments.section.addons.dnt.global.title": "Global",
        "tools.enchantments.section.addons.dnt.description":
            "Defines in which Dungeons and Taverns structures the enchantments can be found.",

        "tools.enchantments.section.addons.dnt.title": "Dungeons and Taverns",
        "tools.enchantments.section.addons.dnt.structures.title": "Structures",
        "tools.enchantments.section.addons.dnt.all.title": "All Structures",
        "tools.enchantments.section.addons.dnt.overworld.title": "Overworld Structures",
        "tools.enchantments.section.addons.dnt.underwater.title": "Underwater Structures",
        "tools.enchantments.section.addons.dnt.nether.title": "Nether Structures",
        "tools.enchantments.section.addons.dnt.nether_keep.title": "Nether Keep",
        "tools.enchantments.section.addons.dnt.creeping_crypt.title": "Creeping Crypt",
        "tools.enchantments.section.addons.dnt.end.title": "End Structures",
        "tools.enchantments.section.addons.dnt.illager.title": "Illager Structures",
        "tools.enchantments.section.addons.dnt.illager_outpost.title": "Illager Outpost",
        "tools.enchantments.section.addons.dnt.pale_residence.title": "Pale Residence",
        "tools.enchantments.section.addons.dnt.shrine.title": "Shrine",
        "tools.enchantments.section.addons.dnt.shrine_ominous.title": "Ominous Shrine",
        "tools.enchantments.section.addons.dnt.snowy.title": "Snowy",
        "tools.enchantments.section.addons.dnt.toxic_lair.title": "Toxic Lair",

        "tools.enchantments.section.addons.dnt.global.description": "The enchantment will be found in all structures",
        "tools.enchantments.section.addons.dnt.structures.description": "The enchantment will be found in specific structures",
        "tools.enchantments.section.addons.dnt.overworld.description": "The enchantment will be found in overworld structures",
        "tools.enchantments.section.addons.dnt.underwater.description": "The enchantment will be found in underwater structures",
        "tools.enchantments.section.addons.dnt.nether.description": "The enchantment will be found in nether structures",
        "tools.enchantments.section.addons.dnt.nether_keep.description":
            "The enchantment will be found specifically in nether keeps structure",
        "tools.enchantments.section.addons.dnt.end.description": "The enchantment will be found in end structures",
        "tools.enchantments.section.addons.dnt.creeping_crypt.description": "The enchantment will be found in infested crypts",
        "tools.enchantments.section.addons.dnt.illager.description": "The enchantment will be found in illager structures",
        "tools.enchantments.section.addons.dnt.illager_outpost.description": "The enchantment will be found in illager outposts",
        "tools.enchantments.section.addons.dnt.pale_residence.description": "The enchantment will be found in pale residences",
        "tools.enchantments.section.addons.dnt.shrine.description": "The enchantment will be found in shrines",
        "tools.enchantments.section.addons.dnt.shrine_ominous.description":
            "The enchantment will be found in ominous vault in shrines structure",
        "tools.enchantments.section.addons.dnt.snowy.description": "The enchantment will be found in snowy structures",
        "tools.enchantments.section.addons.dnt.toxic_lair.description": "The enchantment will be found in toxic lairs",

        "tools.enchantments.section.technical.components.curse.title": "Curse",
        "tools.enchantments.section.technical.components.curse.description":
            "This enchantment will have a red description and cannot be removed with a grindstone",
        "tools.enchantments.section.technical.components.nonTreasure.title": "Non-treasure",
        "tools.enchantments.section.technical.components.nonTreasure.description":
            "Used in loot tables like fishing junk, certain structures, etc.",
        "tools.enchantments.section.technical.components.treasure.title": "Treasure",
        "tools.enchantments.section.technical.components.treasure.description": "Used in loot tables like fishing rewards.",
        "tools.enchantments.section.technical.components.smeltsLoot.title": "Smelts loot",
        "tools.enchantments.section.technical.components.smeltsLoot.description": "Items dropped by mobs will be smelted.",
        "tools.enchantments.section.technical.components.preventBeeSpawning.title": "Prevent bees from spawning when breaking hive",
        "tools.enchantments.section.technical.components.preventBeeSpawning.description":
            "The hive will not spawn bees when broken, and bees will be included in the block data.",
        "tools.enchantments.section.technical.components.preventPotShattering.title": "Prevent decorated pots from shattering",
        "tools.enchantments.section.technical.components.preventPotShattering.description":
            "Decorated pots will not break when broken with a tool or projectile.",
        "tools.enchantments.section.technical.components.preventsIceMelting.title": "Prevents ice from melting",
        "tools.enchantments.section.technical.components.preventsIceMelting.description": "Ice will not turn into water when broken",
        "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.title": "Prevent silverfish from spawning",
        "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.description":
            "Infested blocks will not spawn silverfish.",

        "tools.enchantments.section.effects.components.title": "Enchantment effects",
        "tools.enchantments.section.effects.components.empty": "This enchantment has no effects.",
        "tools.enchantments.section.technical.components.reason": 'Enabled by "no treasure" in technical settings',
        "tools.effects.minecraft:ammo_use": "Amount of ammunition used when firing a bow or crossbow.",
        "tools.effects.minecraft:armor_effectiveness":
            "Effectiveness of the target's armor during an attack. 0 means completely ineffective; 1 means fully effective.",
        "tools.effects.minecraft:attributes": "Modifies player statistics when the weapon is equipped or held.",
        "tools.effects.minecraft:block_experience": "Performs a mathematical operation on the experience gained from breaking a block.",
        "tools.effects.minecraft:crossbow_charge_time": "Time required to fully charge the crossbow.",
        "tools.effects.minecraft:crossbow_charging_sounds": "Plays a sound when the crossbow is fully charged.",
        "tools.effects.minecraft:damage": "Amount of damage dealt by an attack.",
        "tools.effects.minecraft:damage_immunity": "Grants immunity to damage under certain conditions.",
        "tools.effects.minecraft:damage_protection": "Reduces the amount of damage received from attacks.",
        "tools.effects.minecraft:equipment_drops": "Chance of equipment dropping from a killed entity. Value ranges from 0 to 1.",
        "tools.effects.minecraft:fishing_luck_bonus": "Increases the player's luck when fishing.",
        "tools.effects.minecraft:fishing_time_reduction": "Reduces the time it takes to catch a fish.",
        "tools.effects.minecraft:hit_block": "Triggers an action when the player or a projectile hits a block.",
        "tools.effects.minecraft:item_damage": "Amount of durability lost when an item is damaged.",
        "tools.effects.minecraft:knockback": "Amount of knockback caused by an attack.",
        "tools.effects.minecraft:location_changed": "Triggers an action when the player changes location.",
        "tools.effects.minecraft:mob_experience": "Performs a mathematical operation on the experience gained from killing a mob.",
        "tools.effects.minecraft:post_attack": "Triggers an action after an attack.",
        "tools.effects.minecraft:prevent_armor_change": "Prevents the player from unequipping armor.",
        "tools.effects.minecraft:prevent_equipment_drop": "Prevents the item from dropping when the player dies.",
        "tools.effects.minecraft:projectile_count": "Increases the number of projectiles fired.",
        "tools.effects.minecraft:projectile_piercing": "Changes the number of entities a projectile can pierce.",
        "tools.effects.minecraft:projectile_spawned": "Triggers an action when a projectile is spawned.",
        "tools.effects.minecraft:projectile_spread": "Alters the spread distance between projectiles.",
        "tools.effects.minecraft:repair_with_xp": "Performs a mathematical operation on the weapon's durability when experience is gained.",
        "tools.effects.minecraft:smash_damage_per_fallen_block":
            "Performs a mathematical operation on damage based on the number of blocks fallen.",
        "tools.effects.minecraft:tick": "Triggers an action on every game tick.",
        "tools.effects.minecraft:trident_return_acceleration": "Changes the speed at which a trident returns to the player.",
        "tools.effects.minecraft:trident_sound": "Plays a sound when the trident is thrown.",
        "tools.effects.minecraft:trident_spin_attack_strength": "Modifies the strength of the trident's spin attack.",
        "tools.enchantments.warning.invalid_datapack": "Invalid datapack: pack.mcmeta not found",
        "tools.enchantments.warning.no_parser_config": "The specified version is not supported",
        "tools.enchantments.warning.no_analyser": "The specified version is not supported",
        "tools.enchantments.warning.no_elements": "No elements found.",

        "tools.enchantments.section.exclusive.set.armor.title": "Armor Set",
        "tools.enchantments.section.exclusive.set.armor.description": "Contains all exclusive enchantments for armor.",
        "tools.enchantments.section.exclusive.set.bow.title": "Bow Set",
        "tools.enchantments.section.exclusive.set.bow.description": "Contains all exclusive enchantments for bows.",
        "tools.enchantments.section.exclusive.set.crossbow.title": "Crossbow Set",
        "tools.enchantments.section.exclusive.set.crossbow.description": "Contains all exclusive enchantments for crossbows.",
        "tools.enchantments.section.exclusive.set.damage.title": "Damage Set",
        "tools.enchantments.section.exclusive.set.damage.description": "Contains all exclusive enchantments for damage.",
        "tools.enchantments.section.exclusive.set.mining.title": "Mining Set",
        "tools.enchantments.section.exclusive.set.mining.description": "Contains all exclusive enchantments for mining.",
        "tools.enchantments.section.exclusive.set.riptide.title": "Riptide Set",
        "tools.enchantments.section.exclusive.set.riptide.description": "Contains all exclusive enchantments for Riptide.",
        "tools.enchantments.section.exclusive.set.boots.title": "Boots Set",
        "tools.enchantments.section.exclusive.set.boots.description": "Contains all exclusive enchantments for boots.",

        "tools.enchantments.section.exclusive.vanilla.title": "Vanilla",
        "tools.enchantments.section.exclusive.custom.title": "Custom",

        "enchantment.field.description.name": "Description",
        "enchantment.field.exclusiveSet.name": "Exclusive Set",
        "enchantment.field.supportedItems.name": "Supported Items",
        "enchantment.field.primaryItems.name": "Primary Items",
        "enchantment.field.maxLevel.name": "Maximum Level",
        "enchantment.field.weight.name": "Weight",
        "enchantment.field.anvilCost.name": "Anvil Cost",
        "enchantment.field.minCostBase.name": "Base Minimum Cost",
        "enchantment.field.minCostPerLevelAboveFirst.name": "Minimum Cost per Level",
        "enchantment.field.maxCostBase.name": "Base Maximum Cost",
        "enchantment.field.maxCostPerLevelAboveFirst.name": "Maximum Cost per Level",
        "enchantment.field.effects.name": "Effects",
        "enchantment.field.slots.name": "Slots",
        "enchantment.field.tags.name": "Tags",
        "enchantment.field.assignedTags.name": "Assigned Tags",
        "enchantment.field.mode.name": "Mode",
        "enchantment.field.disabledEffects.name": "Disabled Effects",

        "enchantment.component.tag_viewer.title": "See tags",
        "enchantment.component.tag_viewer.description": "Display the tags of the enchantment",
        "enchantment.component.tag_viewer.loading": "Loading tags...",
        "enchantment.component.tag_viewer.error": "Error loading tags",

        "ai.confirmation.accept": "Accept",
        "ai.confirmation.refuse": "Refuse",
        "ai.confirmation.suggestedModification": "Suggested modification",
        "ai.confirmation.description": "Suggested modification for the property: ",
        "ai.island.placeholder": "Ask to the AI..."
    },
    "fr-fr": {
        "generic.branding": "Voxel",
        "generic.website": "VOXEL",
        "generic.section": "- VOXEL",
        "generic.error": "Erreur",
        "generic.back": "Revenir a l'accueil",
        "generic.contact_us": "Nous contacter",
        "generic.start": "Commencer",
        "generic.cancel": "Refuser",
        "generic.accept": "Accepter",
        "generic.settings": "Paramètres",
        "generic.documentation": "Documentation",
        "generic.learn_more": "En savoir plus",
        "generic.take_a_look": "Faire un tour",
        "generic.soon": "Bientôt",
        "generic.no_results": "Aucun résultat",
        "generic.login": "Connexion",
        "generic.faq": "Questions fréquentes",
        "generic.modrinth": "Modrinth",
        "generic.join_us": "Rejoignez-nous",
        "generic.private_message": "Message privé",
        "generic.translation.missing": "Traduction manquante",
        "generic.datapacks": "Datapacks",
        "generic.unsupported.video": "Votre navigateur ne prend pas en charge la vidéo.",
        "generic.more": "Voir plus",
        "generic.save": "Sauvegarder",
        "generic.hello": "Bonjour %s",
        "generic.welcome": "Bienvenue %s, bon %s",
        "generic.count": "Compte: %s",
        "generic.consecutive": "%s %s",
        "generic.borders": "%s texte %s",
        "generic.special": "Test! Test? Test.",
        "generic.partial": "Partial translation",
        "generic.missing_key": "Clé de traduction manquante",

        "tools.see_latest_updates": "Voir l'historique de mises à jour",
        "tools.enchantments.import_vanilla": "Importer les enchantements vanilla",
        "tools.toast.soon": "Cette fonctionnalité est en cours de développement, elle sera bientôt disponible, restez à l'écoute !",
        "tools.download": "Télécharger le data pack",
        "tools.upload.start": "Cliquer pour commencer",
        "tools.upload.drop": "Ou dépose ton fichier ici",
        "tools.upload.description": "Déposez vos data packs en .zip ici pour commencer à les configurer.",
        "tools.debug.quit": "Quitter le mode débogage",

        "tools.sound.search": "Rechercher un son",
        "tools.sound.error": "Une erreur est survenue lors de la lecture du son",

        "tools.upload.success": "Succès",
        "tools.upload.success.description": "L'importation a été effectuée avec succès.",

        "dialog.success.title": "Succès",
        "dialog.success.description":
            "Le datapack a été modifié avec succès. Il doit apparaître dans votre dossier de téléchargement sous le nom.",
        "dialog.success.additional_info_title": "Informations supplémentaires",
        "dialog.success.additional_info":
            "Si vous avez désactivé des enchantments, ils sont en réalité toujours présents dans le datapack, mais leurs fonctionnalités sont désactivées et ils ne peuvent plus être obtenus.",
        "dialog.footer.donate": "Faire une donation",
        "tooltip.safe_delete":
            "C'est une suppression \"sécurisée\". Cela ne supprime pas l'enchantement, mais il ne peut plus être obtenu et n'a aucun effet.",
        "tools.supports.title": "Supporte Voxel",
        "tools.supports.description":
            "Ces outils sont gratuit. J'ai des tonnes d'idées pour la communauté Minecraft mais je manque de financement pour faire des choses avancés. Si tu aimes ce que je fais, deviens Patreon t'auras même droit a des avantages exclusifs.",
        "tools.supports.advantages": "Avantages Patreon",
        "tools.supports.advantages.early_access": "Accès anticipé aux mises à jour de Voxel",
        "tools.supports.advantages.submit_ideas": "Soumettre des idées",
        "tools.supports.advantages.discord_role": "Rôle et salon exclusif sur Discord",
        "tools.supports.advantages.live_voxel": "Faire vivre Voxel",
        "tools.supports.become": "Deviens Patreon",
        "tools.disabled_because_vanilla": "Contenu désactivé, Minecraft ne permet pas de modifier ce contenu.",
        "tools.enchantments.warning.no_file": "Aucun fichier trouvé",
        "tools.enchantments.warning.multiple_files": "Merci, de ne déposer qu'un seul fichier à la fois",
        "tools.enchantments.warning.mods": "Les mods ne sont pas autorisés, veuillez déposer un data pack",
        "tools.enchantments.warning.invalid_file": "Fichier invalide, veuillez déposer un fichier .zip",
        "tools.enchantments.warning.no_enchantments": "Aucun enchantement trouvé",
        "tools.enchantments.warning.component": "Une erreur s'est produite lors de l'affichage des composants.",
        "tools.enchantments.vanilla":
            "Vous modifiez un contenu natif de Minecraft. Si deux datapacks modifient le même contenu, l'un prendra le dessus. Certaines options sont restreintes par les limites de Minecraft.",
        "tools.enchantments.home": "Configurateur d'enchantement",
        "tools.enchantments.home.description":
            "Cet outil est conçu pour modifier les enchantements d'un pack existant, tel que NeoEnchant+ ou tout autre pack, avec une interface simple et conviviale qui ne nécessite aucune connaissance en développement.",
        "tools.enchantments.home.small": "NeoEnchant+ est disponible en téléchargement sur ",
        "tools.enchantments.sidebar.title": "Enchantements",

        "tools.enchantments.section.global": "Paramètres globaux",
        "tools.enchantments.section.exclusive": "Non Combinable",
        "tools.enchantments.section.slots": "Activation de l'effet",
        "tools.enchantments.section.supported": "Objets supportés",
        "tools.enchantments.section.find": "Obtention",
        "tools.enchantments.section.costs": "Coûts",
        "tools.enchantments.section.effects": "Effets",
        "tools.enchantments.section.addons": "Addons",
        "tools.enchantments.section.technical": "Paramètres techniques",

        "tools.enchantments.section.global.explanation.title": "Explications détailées des différents composants",
        "tools.enchantments.section.global.explanation.list.1":
            "Permet de définir le niveau maximal de l'enchantement, les valeurs des effets s'adaptent automatiquement aux niveaux.",
        "tools.enchantments.section.global.explanation.list.2":
            "Plus cette valeur est élevée, plus l'enchantement apparaîtra souvent dans la table d'enchantement.",
        "tools.enchantments.section.global.explanation.list.3":
            "Le coût pour appliquer cet enchantement à un autre objet à l'aide d'une enclume. Divisé par deux si l'on utilise un livre, multiplié par le niveau de l'enchantement.",

        "tools.enchantments.section.global.description": "Les paramètres généraux.",
        "tools.enchantments.section.exclusive.description": "Enchantements non combinables",
        "tools.enchantments.section.slots.description": "Quand l'effet de l'enchantement doit être activé.",
        "tools.enchantments.section.supported.description": "Quels objets sont compatibles avec cet enchantement.",
        "tools.enchantments.section.find.description": "Où trouver cet enchantement.",
        "tools.enchantments.section.effects.description": "Les effets de l'enchantement.",
        "tools.enchantments.section.addons.description": "Configure des addons pour cet enchantement.",
        "tools.enchantments.section.technical.description": "Paramètres techniques pour les enchantements.",

        "tools.enchantments.section.toggle.supported.title": "Supporté",
        "tools.enchantments.section.toggle.supported.description":
            "Les objets sur lesquels cet enchantement peut être appliqué, inclus l'enclume, la commande /enchant, ou en récompense.",
        "tools.enchantments.section.toggle.primary.title": "Table d'enchantement",
        "tools.enchantments.section.toggle.primary.description":
            "Les objets pour lesquels cet enchantement apparaît dans une table d'enchantement. Si c'est mis à 'Défaut', c'est égal à l'option choisie dans 'Supporté'.",
        "tools.enchantments.section.toggle.exclusive.group.title": "Groupe Prédéfini",
        "tools.enchantments.section.toggle.exclusive.group.description":
            "Les 'Groupes Prédéfinis' sont des listes d'enchantements non combinables. Recommandés pour la compatibilité avec d'autres packs qui peuvent eux aussi ajouter des élements à ces listes.",
        "tools.enchantments.section.toggle.exclusive.individual.title": "Choix Arbitraire",
        "tools.enchantments.section.toggle.exclusive.individual.description":
            "Le 'Choix Arbitraires' permettent de choisir les enchantements non combinables au cas par cas.",
        "tools.enchantments.section.exclusive.custom.fallback": "Ne contient pas de listes d'enchantements customs.",

        "tools.enchantments.section.global.components.maxLevel.title": "Niveau maximum",
        "tools.enchantments.section.global.components.maxLevel.description": "Le niveau maximum de l'enchantement.",
        "tools.enchantments.section.global.components.weight.title": "Poids",
        "tools.enchantments.section.global.components.weight.description": "La rareté de l'enchantement, dans la table d'enchantement.",
        "tools.enchantments.section.global.components.anvilCost.title": "Coût de l'enclume",
        "tools.enchantments.section.global.components.anvilCost.description":
            "Le coût de combinaison de deux objets avec cet enchantement.",
        "tools.enchantments.section.global.components.minCostBase.label": "Coût minimum de base",
        "tools.enchantments.section.global.components.minCostPerLevelAboveFirst.label": "Coût minimum par niveau au-dessus du premier",
        "tools.enchantments.section.global.components.maxCostBase.label": "Coût maximum de base",
        "tools.enchantments.section.global.components.maxCostPerLevelAboveFirst.label": "Coût maximum par niveau au-dessus du premier",
        "tools.enchantments.section.global.components.mode.title": "Mode",
        "tools.enchantments.section.global.components.mode.description":
            "Choisir entre Normal (par défaut), Suppresion (Désactive les effets et l'obtention) ou Créatif (Obtention uniquement en créatif).",
        "tools.enchantments.section.global.components.selector.normal": "Normal",
        "tools.enchantments.section.global.components.selector.soft_delete": "Suppression",
        "tools.enchantments.section.global.components.selector.only_creative": "Créatif",

        "tools.enchantments.section.slots.mainhand.title": "Main Principale",
        "tools.enchantments.section.slots.offhand.title": "Main Secondaire",
        "tools.enchantments.section.slots.head.title": "Tête",
        "tools.enchantments.section.slots.chest.title": "Torse",
        "tools.enchantments.section.slots.legs.title": "Jambes",
        "tools.enchantments.section.slots.feet.title": "Pieds",
        "tools.enchantments.section.slots.explanation.title":
            "L'activation de l'effet de l'enchantement, détermine quand l'enchantement s'active, des exemples plus bas.",
        "tools.enchantments.section.slots.explanation.list.1":
            "Si 'Aura de Feu' est mis sur 'Main Principale/Secondaire', lors d'une attaque avec une arme équipée de l'enchantement 'Aura de Feu', l'enchantement s'active et brule le cible.",
        "tools.enchantments.section.slots.explanation.list.2":
            "Si 'Aura de Feu' est mis sur 'Caque/Torse/Jambes/Bottes', lorsque le joueur équipe une armure possédant l'enchantement 'Aura de Feu', l'enchantement s'activera a chaque attaque.",

        "tools.enchantments.section.supported.components.sword.title": "Épée",
        "tools.enchantments.section.supported.components.trident.title": "Trident",
        "tools.enchantments.section.supported.components.mace.title": "Masse",
        "tools.enchantments.section.supported.components.bow.title": "Arc",
        "tools.enchantments.section.supported.components.crossbow.title": "Arbalète",
        "tools.enchantments.section.supported.components.range.title": "Portée",
        "tools.enchantments.section.supported.components.fishing.title": "Pêche",
        "tools.enchantments.section.supported.components.shield.title": "Bouclier",
        "tools.enchantments.section.supported.components.weapon.title": "Arme",
        "tools.enchantments.section.supported.components.melee.title": "Arme + Trident",
        "tools.enchantments.section.supported.components.head_armor.title": "Casque",
        "tools.enchantments.section.supported.components.chest_armor.title": "Plastron",
        "tools.enchantments.section.supported.components.leg_armor.title": "Jambières",
        "tools.enchantments.section.supported.components.foot_armor.title": "Bottes",
        "tools.enchantments.section.supported.components.elytra.title": "Élytre",
        "tools.enchantments.section.supported.components.armor.title": "Armure",
        "tools.enchantments.section.supported.components.equippable.title": "Équipable",
        "tools.enchantments.section.supported.components.axes.title": "Haches",
        "tools.enchantments.section.supported.components.shovels.title": "Pelles",
        "tools.enchantments.section.supported.components.hoes.title": "Houes",
        "tools.enchantments.section.supported.components.pickaxes.title": "Pioches",
        "tools.enchantments.section.supported.components.durability.title": "Durabilité",
        "tools.enchantments.section.supported.components.mining_loot.title": "Loot de minage",
        "tools.enchantments.section.supported.components.none.title": "Défaut",

        "tools.enchantments.section.find.components.enchantingTable.title": "Table d'enchantement",
        "tools.enchantments.section.find.components.enchantingTable.description":
            "Cet enchantement peut être obtenus à partir de la table d'enchantement.",
        "tools.enchantments.section.find.components.mobEquipment.title": "Équipement de mob",
        "tools.enchantments.section.find.components.mobEquipment.description":
            "Cet enchantement peut être trouvé sur l'équipement des monstres.",
        "tools.enchantments.section.find.components.lootInChests.title": "Loot dans les coffres",
        "tools.enchantments.section.find.components.lootInChests.description":
            "Cet enchantement peut être trouvé sur l'équipement généré naturellement dans les coffres ou autre récompenses.",
        "tools.enchantments.section.find.components.tradeable.title": "Échangeable",
        "tools.enchantments.section.find.components.tradeable.description":
            "Cet enchantement peut être vendu par les villageois sous forme d'un livre enchanté.",
        "tools.enchantments.section.find.components.tradeableEquipment.title": "Équipement échangeable",
        "tools.enchantments.section.find.components.tradeableEquipment.description":
            "Cet enchantement peut être vendu par les villageois sur un équipement.",
        "tools.enchantments.section.find.components.priceDoubled.title": "Le prix est doublé",
        "tools.enchantments.section.find.components.priceDoubled.description":
            "Cet enchantement est facturé deux fois plus cher dans les échanges de villageois.",

        "tools.enchantments.section.addons.yggdrasil.title": "Yggdrasil",
        "tools.enchantments.section.addons.yggdrasil.description": "Contenu exclusif pour Yggdrasil.",
        "tools.enchantments.section.addons.yggdrasil.alfheim.title": "Alfheim",
        "tools.enchantments.section.addons.yggdrasil.asflors.title": "Asflors",
        "tools.enchantments.section.addons.yggdrasil.runic_fracture.title": "Runic Fracture",

        "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.title": "Équipement de monstre",
        "tools.enchantments.section.yggdrasil.components.yggdrasilMobEquipment.description":
            "Les monstres d'Yggdrasil apparaissent équipés avec cet enchantement.",
        "tools.enchantments.section.addons.yggdrasil.random_chest.title": "Coffre aléatoire",
        "tools.enchantments.section.addons.yggdrasil.random_chest.description":
            "Cet enchantement peut être trouvé dans les coffres aléatoires à travers Alfheim",
        "tools.enchantments.section.addons.yggdrasil.vault.title": "Coffre-fort",
        "tools.enchantments.section.addons.yggdrasil.vault.description": "Cet enchantement peut être trouvé dans les coffres-forts",
        "tools.enchantments.section.addons.yggdrasil.ominous_vault.title": "Coffre-fort sinistre",
        "tools.enchantments.section.addons.yggdrasil.ominous_vault.description":
            "L'enchantement sera trouvable dans les coffres-forts sinistres",
        "tools.enchantments.section.addons.yggdrasil.trial_spawner.title": "Récompense du générateur d'épreuves",
        "tools.enchantments.section.addons.yggdrasil.trial_spawner.description":
            "L'enchantement sera trouvable dans les récompenses du générateur d'épreuves",
        "tools.enchantments.section.addons.yggdrasil.ominous_trial_spawner.title": "Récompense du générateur d'épreuves sinistre",
        "tools.enchantments.section.addons.yggdrasil.ominous_trial_spawner.description":
            "Cet enchantement peut être trouvé dans les récompenses du générateur d'épreuves sinistre",
        "tools.enchantments.section.addons.yggdrasil.common_chest.title": "Coffres communs",
        "tools.enchantments.section.addons.yggdrasil.common_chest.description":
            "Cet enchantement peut être trouvé dans les coffres communs du village",
        "tools.enchantments.section.addons.yggdrasil.structure_vault.title": "Coffre-fort",
        "tools.enchantments.section.addons.yggdrasil.structure_vault.description": "Cet enchantement peut être trouvé dans le coffre-fort",
        "tools.enchantments.section.addons.yggdrasil.structure_ominous_vault.title": "Coffre-fort sinistre",
        "tools.enchantments.section.addons.yggdrasil.structure_ominous_vault.description":
            "Cet enchantement peut être trouvé dans le coffre-fort sinistre",
        "tools.enchantments.section.addons.yggdrasil.asflors_sword.title": "Épée d'Asflor",
        "tools.enchantments.section.addons.yggdrasil.asflors_sword.description":
            "Cet enchantement peut être trouvé sur l'épée légendaire d'Asflor",
        "tools.enchantments.section.addons.yggdrasil.boss_trial_spawner.title": "Récompense Trial Spawner - Boss",
        "tools.enchantments.section.addons.yggdrasil.boss_trial_spawner.description":
            "L'enchantement sera trouvable en récompenses après avoir terminé les combats dans la fracture runique",
        "tools.enchantments.section.addons.yggdrasil.monster_trial_spawner.title": "Récompense Trial Spawner - Secondaire",
        "tools.enchantments.section.addons.yggdrasil.monster_trial_spawner.description":
            "L'enchantement sera trouvable en récompenses des spawners secondaires, au coin de la salle",

        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.title": "Labyrinthe Runique",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.dark_elven_bow.title": "Arc des Elfes Noirs",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.dark_elven_bow.description":
            "Cet enchantement peut être trouvé sur l'arc légendaire des Elfes Noirs",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.twilight_bow.title": "Arc du Crépuscule d'Yggdrasil",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.twilight_bow.description":
            "Cet enchantement peut être trouvé sur l'arc légendaire du Crépuscule d'Yggdrasil",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.library.title": "Bibliothèque Runique",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.library.description":
            "Cet enchantement peut être trouvé dans le coffre de la bibliothèque",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.random.title": "Coffre Aléatoire",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.random.description":
            "Cet enchantement peut être trouvé dans les coffres aléatoires du labyrinthe",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.shulker.title": "Boîte de Shulker Runique",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.shulker.description":
            "Cet enchantement peut être trouvé dans la boîte de shulker blanches et noires",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.trial.title": "Épreuve Runique",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.trial.description":
            "Cet enchantement peut être trouvé dans les épreuves du labyrinthe runique",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.vault.title": "Chambre Forte Runique",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.vault.description":
            "Cet enchantement peut être trouvé dans le coffre-fort du labyrinthe",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.ominous_trial.title": "Épreuve Menaçante",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.ominous_trial.description":
            "Cet enchantement peut être trouvé dans les épreuves sinistres du labyrinthe",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.ominous_vault.title": "Chambre Forte Menaçante",
        "tools.enchantments.section.addons.yggdrasil.runic_labyrinth.ominous_vault.description":
            "Cet enchantement peut être trouvé dans le coffre-fort sinistre du labyrinthe",

        "tools.enchantments.section.addons.dnt.global.title": "Global",
        "tools.enchantments.section.addons.dnt.description":
            "Définie dans quelles structures de Dungeons and Taverns les enchantements peuvent être trouvés.",

        "tools.enchantments.section.addons.dnt.title": "Dungeons and Taverns",
        "tools.enchantments.section.addons.dnt.structures.title": "Structures",
        "tools.enchantments.section.addons.dnt.all.title": "Toutes les structures",
        "tools.enchantments.section.addons.dnt.overworld.title": "Structures de surface",
        "tools.enchantments.section.addons.dnt.underwater.title": "Structures sous-marines",
        "tools.enchantments.section.addons.dnt.nether.title": "Structures du Nether",
        "tools.enchantments.section.addons.dnt.nether_keep.title": "Donjon du Nether",
        "tools.enchantments.section.addons.dnt.creeping_crypt.title": "Crypts infestés",
        "tools.enchantments.section.addons.dnt.end.title": "End Structures",
        "tools.enchantments.section.addons.dnt.illager.title": "Illager Structures",
        "tools.enchantments.section.addons.dnt.illager_outpost.title": "Illager Outpost",
        "tools.enchantments.section.addons.dnt.pale_residence.title": "Pale Residence",
        "tools.enchantments.section.addons.dnt.shrine.title": "Shrine",
        "tools.enchantments.section.addons.dnt.shrine_ominous.title": "Ominous Shrine",
        "tools.enchantments.section.addons.dnt.snowy.title": "Snowy",
        "tools.enchantments.section.addons.dnt.toxic_lair.title": "Toxic Lair",

        "tools.enchantments.section.addons.dnt.global.description": "Configuration globale des structures pour Dungeons and Taverns",
        "tools.enchantments.section.addons.dnt.structures.description": "Configuration individuelle des structures",

        "tools.enchantments.section.addons.dnt.overworld.description": "L'enchantement sera trouvable dans les structures du monde normal",
        "tools.enchantments.section.addons.dnt.underwater.description": "L'enchantement sera trouvable dans les structures sous-marines",
        "tools.enchantments.section.addons.dnt.nether.description": "L'enchantement sera trouvable dans les structures du Nether",
        "tools.enchantments.section.addons.dnt.nether_keep.description":
            "L'enchantement sera trouvable dans la structure nommée Nether Keep uniquement",
        "tools.enchantments.section.addons.dnt.end.description": "L'enchantement sera trouvable dans les structures de l'End",
        "tools.enchantments.section.addons.dnt.creeping_crypt.description": "L'enchantement sera trouvable dans les cryptes infestées",
        "tools.enchantments.section.addons.dnt.illager.description": "L'enchantement sera trouvable dans les structures des Illagers",
        "tools.enchantments.section.addons.dnt.illager_outpost.description":
            "L'enchantement sera trouvable dans les avant-postes des Illagers",
        "tools.enchantments.section.addons.dnt.pale_residence.description": "L'enchantement sera trouvable dans les résidences pâles",
        "tools.enchantments.section.addons.dnt.shrine.description": "L'enchantement sera trouvable dans les sanctuaires",
        "tools.enchantments.section.addons.dnt.shrine_ominous.description":
            "L'enchantement sera trouvable dans coffre-fort sinistre des sanctuaires",
        "tools.enchantments.section.addons.dnt.snowy.description": "L'enchantement sera trouvable dans les structures enneigées",
        "tools.enchantments.section.addons.dnt.toxic_lair.description": "L'enchantement sera trouvable dans les repaires toxiques",

        "tools.enchantments.section.technical.components.curse.title": "Malédiction",
        "tools.enchantments.section.technical.components.curse.description":
            "Cet enchantement aura une description rouge, et ne pourra être désenchanté avec la meule",
        "tools.enchantments.section.technical.components.nonTreasure.title": "Non trésor",
        "tools.enchantments.section.technical.components.nonTreasure.description":
            "Utilisé dans des loot tables comme les déchets de la pêche, de certaines structures, etc.",
        "tools.enchantments.section.technical.components.treasure.title": "Trésor",
        "tools.enchantments.section.technical.components.treasure.description":
            "Utilisé dans des loot tables comme les récompenses de la pêche.",
        "tools.enchantments.section.technical.components.smeltsLoot.title": "Butin fondu",
        "tools.enchantments.section.technical.components.smeltsLoot.description": "Les objets laissés par les monstres seront cuits.",
        "tools.enchantments.section.technical.components.preventBeeSpawning.title":
            "Empêcher l'apparition des abeilles lorsque vous cassez la ruche",
        "tools.enchantments.section.technical.components.preventBeeSpawning.description":
            "La ruche n'invoquera pas les abeilles lorsque vous cassez la ruche, et les abeilles seront incluses dans les données du bloc.",
        "tools.enchantments.section.technical.components.preventPotShattering.title": "Empêcher les pots de décoration de se casser",
        "tools.enchantments.section.technical.components.preventPotShattering.description":
            "Les pots de décoration ne se casseront pas lorsqu'ils sont cassés avec un outil ou un projectile.",
        "tools.enchantments.section.technical.components.preventsIceMelting.title": "Empêcher la fonte de glace",
        "tools.enchantments.section.technical.components.preventsIceMelting.description":
            "La glace ne se transformera pas en eau lorsqu'elle est cassée",
        "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.title": "Empêcher l'apparition de poisson d'argent",
        "tools.enchantments.section.technical.components.preventInfestedBlockSpawning.description":
            "Les blocs infestés ne feront pas apparaître de poisson d'argent.",
        "tools.enchantments.section.technical.components.reason": 'Activé par "Non Trésor" dans les paramètres techniques',

        "tools.enchantments.section.effects.components.title": "Effets de l'enchantement",
        "tools.enchantments.section.effects.components.empty": "Cette enchantement n'a pas d'effet.",

        "tools.effects.minecraft:ammo_use": "Quantité de munitions/fléches utilisées lors du tir avec un arc ou une arbalète.",
        "tools.effects.minecraft:armor_effectiveness":
            "Réduit les dégats d'un pourcentage lors d'une attaque. La valeur est un chiffre entre 0 et 1, elle correspond à un pourcentage entre 0% et 100%.",
        "tools.effects.minecraft:attributes": "Modifie les statistiques du joueur lorsque l'arme est équipée ou tenue.",
        "tools.effects.minecraft:block_experience": "Effectue une opération mathématique sur l'expérience gagnée en cassant un bloc.",
        "tools.effects.minecraft:crossbow_charge_time": "Temps nécessaire pour charger complètement l'arbalète.",
        "tools.effects.minecraft:crossbow_charging_sounds": "Joue un son lorsque l'arbalète est entièrement chargée.",
        "tools.effects.minecraft:damage": "Effectue une opération mathématique sur le calcul des dégâts infligés par une attaque.",
        "tools.effects.minecraft:damage_immunity": "Confère une immunité aux dégâts sous certaines conditions.",
        "tools.effects.minecraft:damage_protection": "Réduit la quantité de dégâts reçus lors des attaques.",
        "tools.effects.minecraft:equipment_drops": "Probabilité de chute d'équipement d'une entité tuée. La valeur varie de 0 à 1.",
        "tools.effects.minecraft:fishing_luck_bonus": "Augmente la chance du joueur lors de la pêche.",
        "tools.effects.minecraft:fishing_time_reduction": "Réduit le temps nécessaire pour attraper un poisson.",
        "tools.effects.minecraft:hit_block": "Déclenche une action lorsque le joueur ou un projectile frappe un bloc.",
        "tools.effects.minecraft:item_damage": "Quantité de durabilité perdue lorsqu'un objet est endommagé.",
        "tools.effects.minecraft:knockback": "Quantité de recul provoquée par une attaque.",
        "tools.effects.minecraft:location_changed": "Déclenche une action lorsque le joueur change de localisation.",
        "tools.effects.minecraft:mob_experience": "Effectue une opération mathématique sur l'expérience gagnée en tuant une créature.",
        "tools.effects.minecraft:post_attack":
            "Déclenche une action après une attaque au corps à corps, ou lorsque vous toucher une entité avec un projectile.",
        "tools.effects.minecraft:prevent_armor_change": "Empêche le joueur de retirer une armure.",
        "tools.effects.minecraft:prevent_equipment_drop": "Empêche l'objet de tomber lorsque le joueur meurt.",
        "tools.effects.minecraft:projectile_count": "Augmente le nombre de projectiles tirés.",
        "tools.effects.minecraft:projectile_piercing": "Modifie le nombre d'entités qu'un projectile peut transpercer.",
        "tools.effects.minecraft:projectile_spawned": "Déclenche une action lorsqu'un projectile est créé.",
        "tools.effects.minecraft:projectile_spread": "Modifie la distance de dispersion entre les projectiles.",
        "tools.effects.minecraft:repair_with_xp":
            "Effectue une opération mathématique sur la durabilité de l'arme lorsque de l'expérience est gagnée.",
        "tools.effects.minecraft:smash_damage_per_fallen_block":
            "Effectue une opération mathématique sur les dégâts en fonction du nombre de blocs tombés.",
        "tools.effects.minecraft:tick": "Déclenche une action à chaque tick du jeu.",
        "tools.effects.minecraft:trident_return_acceleration": "Modifie la vitesse à laquelle un trident revient vers le joueur.",
        "tools.effects.minecraft:trident_sound": "Joue un son lorsque le trident est lancé.",
        "tools.effects.minecraft:trident_spin_attack_strength": "Modifie la force de l'attaque tournoyante du trident.",
        "tools.enchantments.warning.invalid_datapack": "Datapack ou Mods invalide - pack.mcmeta introuvable",
        "tools.enchantments.warning.no_parser_config": "La version spécifiée n'est pas supporté.",
        "tools.enchantments.warning.no_analyser": "La version spécifiée n'est pas supporté.",
        "tools.enchantments.warning.no_elements": "Aucun élément trouvé.",

        "tools.enchantments.section.exclusive.set.armor.title": "Set d'armure",
        "tools.enchantments.section.exclusive.set.armor.description": "Contiens tous les enchantements exclusifs pour l'armure.",
        "tools.enchantments.section.exclusive.set.bow.title": "Set d'arc",
        "tools.enchantments.section.exclusive.set.bow.description": "Contiens tous les enchantements exclusifs pour l'arc.",
        "tools.enchantments.section.exclusive.set.crossbow.title": "Set d'arbalète",
        "tools.enchantments.section.exclusive.set.crossbow.description": "Contiens tous les enchantements exclusifs pour l'arbalète.",
        "tools.enchantments.section.exclusive.set.damage.title": "Set de dégâts",
        "tools.enchantments.section.exclusive.set.damage.description": "Contiens tous les enchantements exclusifs pour les dégâts.",
        "tools.enchantments.section.exclusive.set.mining.title": "Set d'exploitation minière",
        "tools.enchantments.section.exclusive.set.mining.description":
            "Contiens tous les enchantements exclusifs pour l'exploitation minière.",
        "tools.enchantments.section.exclusive.set.riptide.title": "Set de Riptide",
        "tools.enchantments.section.exclusive.set.riptide.description": "Contiens tous les enchantements exclusifs pour le Riptide.",
        "tools.enchantments.section.exclusive.set.boots.title": "Set de bottes",
        "tools.enchantments.section.exclusive.set.boots.description": "Contiens tous les enchantements exclusifs pour les bottes.",

        "tools.enchantments.section.exclusive.vanilla.title": "Vanilla",
        "tools.enchantments.section.exclusive.custom.title": "Custom",

        "enchantment.field.description.name": "Description",
        "enchantment.field.exclusiveSet.name": "Set Exclusif",
        "enchantment.field.supportedItems.name": "Items Supportés",
        "enchantment.field.primaryItems.name": "Items Primaires",
        "enchantment.field.maxLevel.name": "Niveau Maximum",
        "enchantment.field.weight.name": "Poids",
        "enchantment.field.anvilCost.name": "Coût d'Enclume",
        "enchantment.field.minCostBase.name": "Coût Minimum de Base",
        "enchantment.field.minCostPerLevelAboveFirst.name": "Coût Minimum par Niveau",
        "enchantment.field.maxCostBase.name": "Coût Maximum de Base",
        "enchantment.field.maxCostPerLevelAboveFirst.name": "Coût Maximum par Niveau",
        "enchantment.field.effects.name": "Effets",
        "enchantment.field.slots.name": "Emplacements",
        "enchantment.field.tags.name": "Tags",
        "enchantment.field.assignedTags.name": "Tags Assignés",
        "enchantment.field.disabledEffects.name": "Effets Désactivés",
        "enchantment.field.mode.name": "Mode",

        "enchantment.component.tag_viewer.title": "Données Vanilla",
        "enchantment.component.tag_viewer.description": "Affiche les tags de l'enchantement",
        "enchantment.component.tag_viewer.loading": "Récupération des tags...",
        "enchantment.component.tag_viewer.error": "Erreur lors de la récupération des tags",

        "ai.confirmation.accept": "Accepter",
        "ai.confirmation.refuse": "Refuser",
        "ai.confirmation.suggestedModification": "Modification suggérée",
        "ai.confirmation.description": "Proposition de modification pour la propriété:",
        "ai.island.placeholder": "Demander à l'IA..."
    }
};
