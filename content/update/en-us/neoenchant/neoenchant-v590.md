---
draft: false
publishDate: "2025-01-19"
version: "5.9.0"
title: "Helheim Compatibility"
type: "Feature"
description: "The 5.9 update, adding 6 new enchantments including a highly anticipated one and balance changes."
imageSrc: "/images/background/blog/hero-ne.webp"
modrinth: "https://modrinth.com/datapack/neoenchant"
curseforge: "https://www.curseforge.com/minecraft/mc-mods/neoenchant"
---

# Overview
Hello everyone, I'm really excited to present version 5.9.0 of NeoEnchant. It adds 6 new enchantments, balance changes, and various improvements.

NeoEnchant 5.9.0 also includes compatibility with Yggdrasil V4.0.0 with its new Helheim dimension.

# New Enchantments

::enchant.changelog{name="Harvest"}
I know this is a highly anticipated enchantment, and here it is finally available, it allows you to plant seeds in an area. Incredible, right?

::enchant.newenchant{icon="/images/features/item/hoe.webp", max_level=3, anvil_cost=2, rarity=7}

### Usage
Once you have the enchantment on your hoe, you must place it in your off-hand, then plant seeds with your main hand.

### Effects
When you plant seeds, additional seeds will be planted around the planted block, seeds are of course consumed from your inventory.

### Area size
It's the enchantment level multiplied by 2 and add 1, here's the table by level.

| Level | Area Size |
| ------ | ------- |
| 1 | 3x3 |
| 2 | 5x5 |
| 3 | 7x7 |
::enchant.changelog.end

::enchant.changelog{name="Critical Hit"}
A new enchantment intended for player versus player, you have a probability of dealing raw damage. This means it ignores part of the armor's protection.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=5, anvil_cost=2, rarity=4}

### Impact effects
You have 4% chance per level to inflict damage that ignores 25% of the target's armor protection.

| Level | Chance |
| ------ | ------- |
| 1 | 4% |
| 2 | 8% |
| 3 | 12% |
| 4 | 16% |
| 5 | 20% |
::enchant.changelog.end

::enchant.changelog{name="Dimensional Strike"}
This enchantment increases your damage when you're not in the normal world, it works in the Nether, the End and custom dimensions.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=5, anvil_cost=2, rarity=4}

### Additional Damage
Increases your damage by 2 (+1 Per level) on all your damage, when you're not in the normal world.

| Level | Damage |
| ------ | ------- |
| 1 | 2 |
| 2 | 3 |
| 3 | 4 |
| 4 | 5 |
| 5 | 6 |
::enchant.changelog.end

::enchant.changelog{name="Runic Despair"}
Linked to the Yggdrasil packs, it's obtained from the Asflors treasure and allows you to drastically increase damage in the Runic dimension, this should make the Labyrinth easier

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=5, anvil_cost=2, rarity=4}

### Additional Damage
Increases all your damage when you're in the Runic dimension, by 125% + 25% per level.

| Level | Damage |
| ------ | ------- |
| 1 | 125% |
| 2 | 150% |
| 3 | 175% |
| 4 | 200% |
| 5 | 225% |
::enchant.changelog.end

::enchant.changelog{name="Deadly Touch"}
This enchantment is intended for monsters, however it can be obtained in Helheim extremely rarely.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=1, anvil_cost=1, rarity=1}

### Effects
Gives the "Darkness" effect to the target when you deal damage to it.
::enchant.changelog.end

::enchant.changelog{name="Kinetic Protection"}
Reduces collision damage with Elytra when you hit a wall

::enchant.newenchant{icon="/images/features/item/elytra.webp", max_level=4, anvil_cost=1, rarity=1}

### Protection
Reduces collision damage with Elytra when you hit a wall, by 6 damage per level.

| Level | Damage |
| ------ | ------- |
| 1 | 6 |
| 2 | 12 |
| 3 | 18 |
| 4 | 24 |
::enchant.changelog.end

# Changes and Balance

::enchant.changelog{name="Life+"}
This enchantment is too played, and it's way too powerful, these values have been greatly reduced.

### Balance
Heart gain per level has been reduced from 4 to 2, the enchantment now only gives one extra heart per level.

| Level | Gain |
| ------ | ------- |
| 1 | 2 (1 Heart) |
| 2 | 4 (2 Hearts) |
| 3 | 6 (3 Hearts) |
| 4 | 8 (4 Hearts) |
| 5 | 10 (5 Hearts) |
::enchant.changelog.end

::enchant.changelog{name="XpBoost"}
This enchantment can now be applied to tools, crazy! right?

### Experience increase
Experience gained is increased when you mine blocks that give experience like iron, diamond, etc, the gain for melee.

| Level | Experience Gain |
| ------ | ------- |
| 1 | x1.5 |
| 2 | x2.25 |
| 3 | x3 |
::enchant.changelog.end

::enchant.changelog{name="Bright Vision"}
Improvements have been made to make the enchantment smoother and more pleasant to use.

### Delay
The effect is now applied immediately, without any latency.

### Particles
Potion effect particles have been removed for a better visual experience.
::enchant.changelog.end

::enchant.changelog{name="Oversize"}
Negative effects are removed, their imposing size is already a handicap when you wear this enchantment.

### Damage penalty
The effect is removed

### Movement speed penalty
The effect is removed
::enchant.changelog.end

::enchant.changelog{name="Mining+"}
The effect sometimes had some problems in multiplayer, when several players used it simultaneously and the enchantment has been globally optimized in performance.

### Performance and Bug Fixes
The enchantment is now well synchronized no matter the number of players,
::enchant.changelog.end

::enchant.changelog{name="Auto-Smelt"}
It was highly requested, now the enchantment gives experience only when the effect doesn't trigger, diamond and emerald ores now give their experience, but transformed ores don't give experience like iron, gold.

### Experience
The enchantment now gives experience only when the effect doesn't trigger
::enchant.changelog.end

# Other Changes
- Translations have been updated to include new enchantments.
- Yggdrasil V4.0.0 is now supported.
- 5 New advancements have been added to the progression menu.

### Contribution
- Join the [Discord](https://discord.gg/TAmVFvkHep) to follow updates and contribute to translation or datapack improvement.
- You can also contribute to translation by creating a ticket on Github.

# Compatibility and Support
- Full support for Minecraft 1.21 - 1.21.4
- Compatibility with Yggdrasil 4.0.0
- Support for latest versions of BeyondEnchant
