---
draft: false
publishDate: "2025-12-12"
version: "0.1.0"
title: "Whisper of Ether"
type: "Major"
description: "Whisper of Ether is a brand new mod introducing the runic system, allowing equipment customization through runes with unique stats like Multi Jump, Omnivampirism and Critical Strikes."
imageSrc: "/images/background/blog/hero-woe.webp"
modrinth: "https://modrinth.com/mod/whisper-of-ether"
curseforge: "https://www.curseforge.com/minecraft/mc-mods/whisper-of-ether"
---

# Overview

Hello everyone! I'm thrilled to introduce **Whisper of Ether**, my brand new mod for Minecraft 1.21.10 on Fabric! This is not a data pack but a full-fledged mod, representing two weeks of intensive work.

This first alpha version introduces the **Runic System**, a completely new way to enhance your equipment through runes. Every item, interface, and texture has been crafted by me for this project.

**This version is currently available for Patreon members for beta testing.**

> ⚠️ This is an alpha release! Your feedback is extremely valuable. Please don't hesitate to report any bugs or share your suggestions.

---

# The Runic System

The core of Whisper of Ether revolves around **runes** — mystical items that can modify your equipment's statistics. This system is inspired by games like Dofus, where enhancing one stat may reduce another.

## Rune Tiers

Runes come in **5 different tiers**, each with increasing power and success rates:

| Tier | Rune Name | Description |
| ---- | --------- | ----------- |
| 1 | Rune | Basic rune, standard success rate |
| 2 | Reinforced Rune | Slightly improved success rate |
| 3 | Echo Rune | Moderate success rate improvement |
| 4 | Nether Rune | High success rate |
| 5 | Dragon Rune | Maximum success rate, legendary tier |

Higher tier runes significantly increase the probability of **Critical Success** when forging.

::gallery{grid=5}
![Rune](/images/patchnote/woe/010/rune.webp)  

![Reinforced Rune](/images/patchnote/woe/010/reinforced_rune.webp)  

![Echo Rune](/images/patchnote/woe/010/echo_rune.webp)  

![Nether Rune](/images/patchnote/woe/010/nether_rune.webp)  

![Dragon Rune](/images/patchnote/woe/010/dragon_rune.webp)
::gallery.end

> Note: Rune textures shown are not final and may change before release.

---

# Creative Tab & Item Access

A dedicated **Creative Tab** is available to easily access all runic content:
- All **5 tiers of blank runes** (Rune, Reinforced, Echo, Nether, Dragon)
- All **Dragon Runes** (tier 5) for each attribute

In the **Search Tab**, like enchanted books, all runes are available with every tier and every attribute combination for easy access.

::gallery{grid=2}
![Runic Creative Tab](/images/patchnote/woe/010/runic_creative_tab.webp)

![Search Tab](/images/patchnote/woe/010/search_tab.webp)
::gallery.end

---

# The Runic Table

::gallery{grid=2}
![Runic Table Block](/images/patchnote/woe/010/runic_table.webp)  

![Runic Table Empty](/images/patchnote/woe/010/runic_table_screen_empty.webp)
::gallery.end

The **Runic Table** is the central block for applying runes to your equipment. I designed a beautiful custom interface for this block!

## How It Works

1. **Place your equipment** in the center-right slot
2. **Place a rune** in the center-left slot
3. The rune is **consumed** and modifies your equipment's statistics

![Runic Table Interface](/images/patchnote/woe/010/runic_table_screen.webp)

### Forge Outcomes

When you apply a rune, one of three outcomes occurs:

| Outcome | Effect |
| ------- | ------ |
| **Critical Success** ✨ | The targeted statistics are significantly enhanced |
| **Success** ✓ | Statistics improve, but some others may be reduced |
| **Critical Fail** ✗ | Statistics don't improve, and some are reduced |

### Forge Points System

Each piece of equipment has **300 Forge Points**. Every rune has a weight that consumes these points:

- When points reach **0**, you can no longer modify the equipment
- The closer the points get to **0**, the **higher the failure rate** becomes
- Higher tier runes increase the chances of success

### Quick Forging

**Shift + Right-Click** on the table to consume all runes of the same type at once!

---

# The Runic Forge

![Runic Forge](/images/patchnote/woe/010/runic_forge.webp)

The **Runic Forge** allows you to craft runes using specific recipes. There are **6 crafting recipes** available:

- 5 recipes for the main rune tiers
- 1 special recipe to craft the **Echo Shard** required for tier 3 runes (Warden-themed)

![Echo Shard Craft](/images/patchnote/woe/010/echo_shard.webp)

## Automation Support

The Runic Forge can be **automated**! Simply place a chest on any of the 5 faces of the block:

- **Input items** through the top
- Connect chests to other faces for output and organization

Perfect for farms and automatic rune processing!

---

# The Runic Infuser

![Runic Infuser](/images/patchnote/woe/010/runic_infuser.webp)

The **Runic Infuser** transforms base runes (without statistics) into stat-infused runes. Place a blank rune inside to receive a rune with a random statistic!

---

# Available Statistics

::video{src="https://uy64vwmxhf.ufs.sh/f/llTsukoqRt5QDYiqxXxbQqlKev5mUzbAEcOTC4P3hiMHLdxk"}

Runes can modify a wide range of statistics. Here's the complete list:

## Vanilla Attributes

| Rune | Effect |
| ---- | ------ |
| Rune of Armor | Increases armor points |
| Rune of Armor Toughness | Increases armor toughness |
| Rune of Attack Damage | Increases attack damage |
| Rune of Attack Knockback | Increases knockback dealt |
| Rune of Attack Speed | Increases attack speed |
| Rune of Block Break Speed | Increases block breaking speed |
| Rune of Block Interaction Range | Increases block interaction range |
| Rune of Burning Time | Modifies burning duration |
| Rune of Entity Interaction Range | Increases entity interaction range |
| Rune of Fall Damage Multiplier | Reduces fall damage |
| Rune of Jump Strength | Increases jump height |
| Rune of Knockback Resistance | Increases knockback resistance |
| Rune of Max Health | Increases maximum health |
| Rune of Mining Efficiency | Increases mining speed |
| Rune of Movement Speed | Increases movement speed |
| Rune of Pickup Area Size | Increases item pickup radius |
| Rune of Safe Fall Distance | Increases safe fall distance |
| Rune of Sneaking Speed | Increases sneaking speed |
| Rune of Step Height | Increases step height |
| Rune of Sweeping Damage Ratio | Increases sweeping damage |
| Rune of Water Movement Efficiency | Increases underwater movement |

## New Statistics

Three brand new statistics exclusive to Whisper of Ether:

### Multi Jump

| Rune | Effect |
| ---- | ------ |
| Rune of Multi Jump | Allows additional jumps mid-air (up to 5 jumps!) |

Jump again while in the air! Stack this stat to become a true acrobat.

---

### Critical System

| Rune | Effect |
| ---- | ------ |
| Rune of Critical Rate | Increases critical hit chance |
| Rune of Critical Damage | Increases critical hit damage multiplier |

A split critical system: **Critical Rate** determines your chance to land a critical hit, while **Critical Damage** amplifies the damage dealt.

---

### Omnivampirism

| Rune | Effect |
| ---- | ------ |
| Rune of Omnivampirism | Heals over time when dealing damage |
| Rune of Omnivampirism Rate | Increases the healing rate |

When you hit an enemy, you steal a portion of their health as **healing over time** (3 seconds duration). Works with all damage types!

---

# Training Dummy

::gallery{grid=2}
![Training Dummy](/images/patchnote/woe/010/target_dummy_entity.webp)  

![Training Dummy Craft](/images/patchnote/woe/010/target_dummy_craft.webp)
::gallery.end

A useful tool created during development, now available to you! The **Training Dummy** displays the exact damage you deal, perfect for testing your builds.

- **Cheap craft** similar to the Armor Stand
- Shows damage numbers in real-time
- Great for testing rune combinations

---

# Waypoint System

A new **waypoint system** is now available via commands only. This system will be expanded in future updates to support exploration features.

---

# Temporary Changes

> **Note:** Custom items shown in previous sneak peeks have been temporarily removed to ensure proper implementation. They'll return in a future update!

---

# Coming Soon

Whisper of Ether is just getting started! Future updates will include:

- **Legendary Enchantments** — Powerful enchantments with unique effects
- **Magic System** — A new way to interact with the world
- **Exploration Content** — New structures and rewards
- **Compatibility with Yggdrasil** — Integration with existing structures

---

# Availability

- **Platform:** Fabric (Minecraft 1.21.10)
- **Status:** Alpha (Beta testing for Patreon members)
- **Public Release:** Shortly after Patreon testing period


### Feedback

This is an alpha release! Please share your feedback:
- Join the [Discord](https://discord.gg/TAmVFvkHep) to report bugs and share suggestions
- Your testing helps make Whisper of Ether better!

---

Thank you for your continued support! I'm incredibly excited to share this new project with you. This mod represents a new direction for my content, and I can't wait to hear your thoughts!

See you soon for more magical adventures! ✨

[![Support on Patreon](/images/patchnote/woe/010/patreon.png)](https://www.patreon.com/hardel)

-# You can click on the image to support me on Patreon