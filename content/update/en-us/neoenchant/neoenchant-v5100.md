---
draft: false
publishDate: "2025-03-18"
version: "5.10.0"
title: "The Mount Update"
type: "Feature"
description: "Update 5.10, adding 6 new enchantments including several for mounts and balance changes."
imageSrc: "https://uy64vwmxhf.ufs.sh/f/llTsukoqRt5QTmKu936JsdbAYGw6NoMQU1XkaVSh39xi5K8B"
---

# Overview
Hello everyone, I'm really excited to present NeoEnchant version 5.10.0. This update adds 6 new enchantments, including several specially designed for mounts and pets, as well as balance changes for existing enchantments.

NeoEnchant 5.10.0 also includes full compatibility with Minecraft 1.21.5 and Yggdrasil with new items for Asgard.

# New Enchantments

::enchant.changelog{name="Midas Touch"}

::enchant.newenchant{icon="/images/features/item/axe.webp", max_level=1, anvil_cost=2, rarity=1}
> Transform blocks into gold with a simple touch! This legendary enchantment allows your stick to convert ordinary blocks into gold ore (or occasionally gold blocks). Perfect for treasure hunters and gold lovers!

### Obtaining
This enchantment is designated as an Asgard reward, and can only be obtained in that structure.

### Particularity
It can be found on a book that has durability.

### Effects
Allows you to transform ordinary blocks into gold ore or sometimes into complete gold blocks.
::enchant.changelog.end

::enchant.changelog{name="Magnet"}
Never bend over to pick up items again! This chestplate enchantment automatically attracts nearby items directly to you. A must for efficient mining and combat.

::enchant.newenchant{icon="/images/features/item/chestplate.webp", max_level=3, anvil_cost=2, rarity=4}

### Effects
Automatically attracts nearby items to you within a 10-block radius.

### Limitations
Only attracts items you mined or items from monsters you attacked. Doesn't attract items thrown by a player or items older than 1 second.

### Technical note
Due to technical limitations, it may attract rewards from blocks/monsters destroyed by other nearby players.
::enchant.changelog.end

::enchant.changelog{name="Ethereal Jump"}
Transform your mount into a legendary jumper! Significantly increases jump height and reduces fall damage. Even the highest obstacles are no longer a problem for your mount.

::enchant.newenchant{icon="/images/features/item/horse_armor.webp", max_level=7, anvil_cost=2, rarity=5}

### Effects
Increases your mount's jump height and reduces fall damage.

### Equivalence
It's the equivalent of the Leaping enchantment, but specially designed for mounts.

### Obtaining
Due to technical limitations, this enchantment cannot appear in the enchanting table.
::enchant.changelog.end

::enchant.changelog{name="Velocity"}
Speed lovers will rejoice! This enchantment increases your mount's movement speed up to 175% at maximum level. Travel the landscape at unprecedented speed.

::enchant.newenchant{icon="/images/features/item/horse_armor.webp", max_level=5, anvil_cost=2, rarity=5}

### Effects
Increases your mount's movement speed up to 175% at maximum level.

### Equivalence
It's the equivalent of the Agility enchantment, but specially designed for mounts.

### Obtaining
Due to technical limitations, this enchantment cannot appear in the enchanting table.
::enchant.changelog.end

::enchant.changelog{name="Steel Fang"}
Improve your companion wolf's bite! This specialized enchantment increases your dog's attack damage, making them formidable fighters. Perfect for going on adventures with your faithful canine.

::enchant.newenchant{icon="/images/features/item/wolf_armor.webp", max_level=5, anvil_cost=2, rarity=5}

### Effects
Increases your dog's attack damage, making them more effective in combat.

### Equivalence
It's the equivalent of the Sharpness enchantment, but specially designed for dogs.

### Obtaining
Due to technical limitations, this enchantment cannot appear in the enchanting table.
::enchant.changelog.end

::enchant.changelog{name="Rider's Aegis"}
Protection for mounted warriors! Reduces damage taken while riding, making mounted combat much safer. The perfect defensive complement to your offensive capabilities.

::enchant.newenchant{icon="/images/features/item/horse_armor.webp", max_level=4, anvil_cost=2, rarity=5}

### Effects
Reduces damage taken while riding your mount.

### Equivalence
It's the equivalent of the Protection enchantment, but specially designed for riders.

### Obtaining
Due to technical limitations, this enchantment cannot appear in the enchanting table.
::enchant.changelog.end

---

# Modifications and Balance Changes

::enchant.changelog{name="Fury"}
Following an analysis of statistics gathered with the enchantment configurator, this enchantment has been rebalanced.

### Balance
Maximum level has been reduced for better balance from ::enchant.balancing{currentValue=4, newValue=3, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end
::enchant.changelog{name="Wind-Break Arrow"}
To improve overall game balance, this enchantment has been adjusted according to observed median statistics.

### Balance
Maximum level has been reduced for better balance from ::enchant.balancing{currentValue=3, newValue=2, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Builder Arms"}
Statistics showed that this enchantment was too powerful at high levels.

### Balance
Maximum level has been reduced to avoid too fast construction ::enchant.balancing{currentValue=5, newValue=3, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Echo Shot"}
This enchantment has been adjusted to offer a more balanced ranged combat experience.

### Balance
Maximum level has been reduced for better balance ::enchant.balancing{currentValue=3, newValue=2, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Eternal Frost"}
Due to its power, this enchantment has been limited to a single level.

### Balance
Maximum level has been reduced to avoid too dominant effect ::enchant.balancing{currentValue=2, newValue=1, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Explosive Arrow"}
Players found this enchantment underused, so we increased its maximum power.

### Balance
Maximum level has been increased to make it a more viable option ::enchant.balancing{currentValue=3, newValue=4, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Kinetic Protection"}
Following player feedback, this enchantment has been strengthened to offer better protection during Elytra flights.

### Balance
Maximum level has been increased for better collision protection ::enchant.balancing{currentValue=4, newValue=5, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Dwarfed"}
This enchantment has been strengthened to make it more attractive to players.

### Balance
Maximum level has been increased to make it a more interesting option ::enchant.balancing{currentValue=4, newValue=5, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Leaping Jump"}
To match improvements made to movement enchantments, this one has also been strengthened.

### Balance
Maximum level has been increased to offer more vertical mobility options ::enchant.balancing{currentValue=2, newValue=3, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Critical Hit"}
This powerful attack enchantment has been slightly toned down to balance combat.

### Balance
Maximum level has been reduced for improved PvP balance ::enchant.balancing{currentValue=5, newValue=4, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Poison Aspect"}
This enchantment created too dominant combat situations at higher levels.

### Balance
Maximum level has been reduced to reduce too powerful status effects ::enchant.balancing{currentValue=4, newValue=3, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Tears of Asflors"}
This unique enchantment has been adjusted to align with other sword enchantment nerfs.

### Balance
Maximum level has been reduced to 3 to maintain balance between sword enchantments.
::enchant.changelog.end

---

# Other Changes
- Translations have been updated to include new enchantments.
- Full compatibility with Minecraft 1.21.5.
- Yggdrasil has received a special update ensuring complete compatibility with NeoEnchant 5.10.0.
- New items have been added for Asgard.
- Several datapacks have been migrated for version 1.21.5.

### Contribution
- Join the [Discord](https://discord.gg/TAmVFvkHep) to follow updates and contribute to the translation or improvement of the datapack.
- You can also contribute to translation by creating a ticket on Github.

# Compatibility and Support
- Full support for Minecraft 1.21.5
- Compatibility with Yggdrasil
- Support for the latest versions of BeyondEnchant

Thank you for your continued support! Your feedback helps us improve NeoEnchant with each version. Join our server to test these exciting new enchantments and share your impressions!

See you soon for more magical adventures!