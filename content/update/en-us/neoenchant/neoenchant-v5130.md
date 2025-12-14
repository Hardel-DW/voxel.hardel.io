---
draft: false
publishDate: "2025-12-12"
version: "5.13.0"
title: "Mount of Mayhem"
type: "Feature"
description: "The 5.13 update, adding Propulsion enchantment for elytra and achieving 100% enchantment obtainability through various methods."
imageSrc: "/images/background/blog/hero-ne.webp"
modrinth: "https://modrinth.com/datapack/neoenchant"
curseforge: "https://www.curseforge.com/minecraft/mc-mods/neoenchant"
---

# Overview
Hello everyone, I'm really excited to present version 5.13.0 of NeoEnchant. This update introduces a new enchantment for elytra and significantly improves enchantment accessibility with a major distribution overhaul.

NeoEnchant 5.13.0 achieves a major milestone: 100% of enchantments are now obtainable without additional content (except the three Yggdrasil-exclusive enchantments).

**This update is exclusive to Minecraft 1.21.11.**

# New Enchantments

:::enchant.changelog{name="Propulsion"}
Transform your elytra flights into supersonic adventures! This enchantment gives you a directional speed boost mid-air when you press the jump button. Perfect for reaching distant locations faster while maintaining control.

::enchant.newenchant{icon="/images/features/item/elytra.webp", max_level=3, anvil_cost=1, rarity=1}

### Activation
Press and hold the jump button while flying to activate the boost. The enchantment only activates when flying below 35 blocks per second, preventing abuse at high speeds.

### Cost
Each boost consumes exhaustion based on level. Higher levels provide stronger boosts but drain more hunger. That consumes 1 hunger (Demi-hunger) per level.

| Level | Boost Strength | Exhaustion |
| ----- | -------------- | ---------- |
| I | x1.0 | 1 |
| II | x2.0 | 2 |
| III | x3.0 | 3 |

### Technical Details
- Requires player to be in flight mode (gliding with elytra)
- Only triggers when jump input is pressed
- Speed cap of 35 blocks per second prevents activation at high velocities

### Obtaining
Available through random loot chests across the world, in Asgard's ominous vaults and trial spawners (Yggdrasil addon), and in End City chests (Vanilla Structure addon).
:::

---

# Enchantment Distribution Overhaul

A major change in this update is the complete rework of how NeoEnchant enchantments can be obtained. **100% of NeoEnchant enchantments are now obtainable** through various vanilla methods (with the exception of the three Yggdrasil-linked enchantments: Tears of Asflors, Runic Despair, and Midas Touch).

### Enchanting Table
The following enchantments can now be found at enchanting tables:
- Death Touch
- Dimensional Hit
- Storm Arrow
- Breezing Arrow
- Step Assist
- Kinetic Protection

### Villager Trading
These enchantments are now available through villager trades:
- Step Assist
- Spawner Touch
- Bedrock Breaker

### Chests and Treasure
Found in various treasure chests throughout the world:
- Pull
- Last Hope
- Dimensional Hit
- Teluric Wave
- Voidless

### Random Loot
Available through general loot tables:
- Propulsion
- Armored
- Lava Walker

---

# Addons Updates

:::enchant.changelog{name="NeoEnchant - Yggdrasil Structure"}
The Yggdrasil addon has been updated to support Minecraft 1.21.11 exclusively.

### New Content
**Propulsion** enchantment can now be found in Asgard's ominous vaults and ominous trial spawners.
:::

:::enchant.changelog{name="NeoEnchant - Addons - Vanilla Structure"}
The Vanilla Structure addon has been updated to support Minecraft 1.21.11 exclusively. This addon has been available for the past 6 months, enhancing vanilla structures with NeoEnchant loot.

### New Content
**Propulsion** enchantment can now be found in End City chests.
:::

:::enchant.changelog{name="NeoEnchant - Addons - Enchanting Table"}
**NEW ADDON:** This brand new addon allows 100% of NeoEnchant enchantments to appear in enchanting tables. This may be unbalanced, use at your own risk!

### Features
- All NeoEnchant enchantments can appear in enchanting tables
- Provides maximum accessibility for all enchantments
- Optional addon for players who prefer easier access

### Warning
This addon significantly changes game balance by making all enchantments easily obtainable. Install only if you want a more casual experience.
:::

---

# Other Changes
- A new advancement has been added for obtaining the Propulsion enchantment.
- Translations have been updated to include the new enchantment.
- Full compatibility with Minecraft 1.21.11.
- Yggdrasil addon updated for version 1.21.11.
- Vanilla Structure addon updated for version 1.21.11.
- New Enchanting Table addon released.

### Contribution
- Join the [Discord](https://discord.gg/TAmVFvkHep) to follow updates and contribute to translation or datapack improvement.
- You can also contribute to translation by creating a ticket on Github.

# Compatibility and Support
- **Exclusive support for Minecraft 1.21.11**
- Compatibility with Yggdrasil (updated addon)
- Support for latest versions of BeyondEnchant
- New Enchanting Table addon available
- Vanilla Structure addon updated

Thank you for your continued support! This update marks a significant milestone in making NeoEnchant more accessible while maintaining balance. Join our server to test the new Propulsion enchantment and explore the improved distribution system!

See you soon for more magical adventures!
