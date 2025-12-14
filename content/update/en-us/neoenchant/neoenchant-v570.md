---
draft: false
publishDate: "2024-10-14"
version: "5.7.0"
title: "Performance Update"
type: "Feature"
description: "A new update for NeoEnchant+ is now available, it introduces new enchantments, with some reworks, and a significant improvement in performance."
imageSrc: "/images/background/blog/hero-ne.webp"
modrinth: "https://modrinth.com/datapack/neoenchant"
curseforge: "https://www.curseforge.com/minecraft/mc-mods/neoenchant"
---

# Overview
**NeoEnchant 5.7.0** introduces 7 new enchantments, Here are the new ones: Telluric Wave, Eternal Frost, and more. As well as some adjustments to existing enchantments and finally **performance improvements** by eliminating background code, and the addition of the **French** language.

## How to get translations
- You must put the **NeoEnchant** pack in your resource pack folder.
- Alternatively, you can use the **Voxel Translation** resource pack, which includes translations for all **Voxel** content (NeoEnchant, Yggdrasil, and future packs).

## Performance improvements
In the previous version, some enchantments required commands to be repeated 20 times per second, particularly for detection.
These commands have been completely removed, performance is at the maximum possible.

# New enchantments

:::enchant.changelog{name="Curse of Breaking"}
A new enchantment has been implemented to add more variety and balance to the game. This counterbalances certain items in structures that were too powerful.

::enchant.newenchant{icon="/images/features/item/durability.webp", max_level=5, anvil_cost=1, rarity=3}

### Passive effect
The item loses (1 x level) durability on each use with (15% x level) chance
:::

:::enchant.changelog{name="Eternal Frost"}
I'm excited for players to get their hands on this enchantment. It's not the most powerful, but it's visually gorgeous and can probably do some pretty incredible things.

::enchant.newenchant{icon="/images/features/item/bow.webp", max_level=2, anvil_cost=6, rarity=2}

### On impact
Transforms the ground into ice and plays an ice spike animation

### Against a target
Slows targets and plays an ice spike animation on impact

![Image](/images/background/blog/eternal_frost.jpg)
:::

:::enchant.changelog{name="Rebound (Experimental)"}
For this one, the general idea was to create an enchantment that bounces to nearby entities, inflicting its effects on impact, like Explosive Arrow, Storm Arrow. But it doesn't work very well yet, and is still in development, so you can try it now, but it contains some bugs.

::enchant.newenchant{icon="/images/features/item/bow.webp", max_level=3, anvil_cost=2, rarity=4}

### Rebound
Arrows bounce to nearby targets after hitting an entity

### Number of bounces
Increases possible bounces: 3 + (1 per level)
:::

:::enchant.changelog{name="Tears of Asflors - (Exclusive to Yggdrasil)"}
The Tear of Asflors is an exclusive enchantment linked to the legendary weapon in the new Yggdrasil content. Its effects are relatively simple, converting your experience into attack damage, powerful for an end-game weapon.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=3, anvil_cost=2, rarity=4}

### Against a target
Converts the player's experience into damage
:::

:::enchant.changelog{name="Telluric Wave"}
The one I'm most proud of, and the one that will add so much interest to the mace. This one creates a seismic wave that sends targets into the air. I'll be watching closely to see if this enchantment isn't too strong. I hope it won't break the game's balance.

::enchant.newenchant{icon="/images/features/item/mace.webp", max_level=1, anvil_cost=6, rarity=2}

### Against a block
While sneaking, you create a seismic wave that propels targets into the air. Gives the caster a slowness effect. The wave can only be used if you don't have slowness effect.

### Against a target
Propels nearby targets into the air after a 5-block fall
:::

:::enchant.changelog{name="Gungnir's Breath"}
This enchantment is essentially the same as Eternal Frost, but for the trident. I'm waiting for player feedback to see if the enchantment fits better on the bow or trident

::enchant.newenchant{icon="/images/features/item/trident.webp", max_level=1, anvil_cost=6, rarity=2}

### On impact
Transforms the ground into ice and plays an ice spike animation

### Against a target
Slows targets and plays an ice spike animation on impact
:::

:::enchant.changelog{name="Last Hope - (Exclusive to Yggdrasil)"}
This enchantment is a last resort for players about to die. It's a guaranteed fatal blow, but it consumes the item used and can only be obtained in Asflors villages on a mythic weapon.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=1, anvil_cost=6, rarity=0}

### Against a target
Consumes the item to inflict infinite damage to the target

![Image](/images/background/blog/tears_of_aslfors.jpg)
:::

:::enchant.changelog{name="Sky Walk"}
Sky Walk has existed for a long time, but it has been TOTALLY redesigned from scratch, the old one has been removed. It wasn't very practical, this one is easier to control.

::enchant.newenchant{icon="/images/features/item/boots.webp", max_level=3, anvil_cost=2, rarity=2}

### Passive effect
The number of blocks needed to take fall damage is increased by 1 + (1 * level)

### Active effect
Creates a repulsion effect under the feet while sneaking with the following speed values, to put it simply, the higher the level, the faster you fly upward.

| Level | Speed |
| ------ | ------- |
| 1 | 0.185 |
| 2 | 0.215 |
| 3 | 0.265 |
| 4+ | 0.185 + (0.03 per level) |
:::

# Modified enchantments

:::enchant.changelog{name="Bedrock Breaker"}
Bedrock Breaker is loved by many, it loses its experimental stage and receives a balance as it was too expensive.

### Stable
The enchantment is now stable, and can be found.

### Durability
Reduced from ~200~ -> 150

### Particle effect
Changed the particle effect to make it more beautiful and more visible.

### Sound
A sound has been added

### After the patch
Bedrock Breaker will be removed from existing tools and will need to be obtained again
:::

:::enchant.changelog{name="Dwarfed"}
Players tended to use it as a beneficial effect to be harder to hit in combat, but it remains a curse. For this reason, additional negative effects have been added.

* **Added attributes:**
    * Step assist attribute (+0.5 per level)
    * Attack speed reduction attribute (-0.15 per level)
    * Movement speed reduction attribute (-0.125 per level)

### Extension
Effect now extendable beyond level 4 with commands or the configurator.

### Technical
The "scale" attribute identifier has been changed to "minecraft:enchantment.dwarfed.scale"
:::

:::enchant.changelog{name="Oversize"}
These changes are made to be consistent with Dwarfed.

* **Added attributes:**
    * Damage reduction -2 and -1 additional per level
    * Attack reach reduction -0.15 per level
    * Movement speed reduction -0.125 per level

### Extension
Effect now extendable beyond level 4 with commands

### Technical
The "scale" attribute identifier has been changed to "minecraft:enchantment.oversize.scale"
:::

:::enchant.changelog{name="Auto-Feeding"}
This enchantment was too strong, and was also too easy to obtain, and the food system was completely useless.

### Saturation effect
Now applies every 3 minutes instead of 30 seconds
:::
# Technical changes
- Coming soon
