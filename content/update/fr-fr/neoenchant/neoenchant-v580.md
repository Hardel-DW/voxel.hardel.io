---
draft: false
publishDate: "2024-12-05"
version: "5.8.0"
title: "Support Multilingue"
type: "Feature"
description: "Une mise à jour majeure de NeoEnchant qui apporte des améliorations sur les performances, de l'équilibrage et le support de nouvelles langues !"
imageSrc: "/images/background/blog/hero-ne.webp"
modrinth: "https://modrinth.com/datapack/neoenchant"
curseforge: "https://www.curseforge.com/minecraft/mc-mods/neoenchant"
---

# Aperçu
La version 5.8.0 de NeoEnchant apporte des améliorations significatives aux performances, des rééquilibrages d'enchantements et l'ajout du support multilingue.

# Enchantements Remaniés

::enchant.changelog{name="Rebound (Stable)"}
Après une longue période de développement, Rebound sort enfin de sa phase expérimentale avec des améliorations majeures de stabilité et de gameplay.

::enchant.newenchant{icon="/images/features/item/bow.webp", max_level=3, anvil_cost=2, rarity=4}

### Rebonds
Les flèches rebondissent maintenant sur les murs, précédement elles ne rebondissaient entres les monstres.

### Effets
Les effets se déclenchent maintenant à chaque rebond
::enchant.changelog.end

::enchant.changelog{name="Poison Aspect"}
Correction d'un bug qui affectait l'enchantement Poison Aspect, l'effet de poison se déclenchait sur les non-joueurs.

### Effets à l'impact
Affecte désormais les joueurs avec l'effet de poison

### Équilibrage
Avant l'effet de poison et l'effet de wither se déclenchait sur les non-joueurs, maintenant seulement l'effet de poison sera actif sur les monstres. Et le poison sur les joueurs sera réduit.
::enchant.changelog.end

::enchant.changelog{name="Pull"}
Un bug empêchait l'enchantement Pull de fonctionner, il est désormais corrigé.

### Recharge
Donne maintenant des oeufs lorsque vous infligés des dégâts à un monstre
::enchant.changelog.end

::enchant.changelog{name="VeinMiner & MiningPlus"}
Amélioration du gameplay avec une activation plus précise

### Activation
Cette effet se déclenche maintenant plus en position accroupie
::enchant.changelog.end

::enchant.changelog{name="Fury"}
Amélioration de la puissance de l'enchantement

### Dégâts
Augmentation des dégâts infligés
::enchant.changelog.end

::enchant.changelog{name="Sky Walk"}
Ajustement pour un meilleur contrôle

### Mobilité
Réduction de la propulsion pour un meilleur contrôle
::enchant.changelog.end

::enchant.changelog{name="Storm Arrow"}
Rééquilibrage de la puissance maximale

### Niveau Maximum
Niveau maximum réduit de 2 à 1
::enchant.changelog.end

::enchant.changelog{name="Builder Arms"}
Amélioration de la portée de construction

### Portée
La portée a été augmentée de 1.5 à 2 blocs par niveau
::enchant.changelog.end

::enchant.changelog{name="Armored"}
Renforcement de la protection

### Protection
La protection a été renforcée pour une meilleure défense
::enchant.changelog.end

::enchant.changelog{name="Dwarfed & Oversize"}
Rééquilibrage des effets négatifs

### Équilibrage
Les effets négatifs ont été réduits, il était trop violent
::enchant.changelog.end

# Support Multilingue
Cette version apporte 5 nouvelles langues, générées par **Claude-3.5-Sonnet-2024-10-22** à partir des traductions française et anglaise de la version 2.0.0.
Ces traductions servent de base et peuvent être améliorées par la communauté via notre Discord.
La langue Japonaise quant a elle est faites par un membre de la communauté.

### Nouvelles Langues
- Allemand
- Espagnol
- Japonais
- Russe
- Chinois

### Contribution
- Rejoigne notre [Discord](https://discord.gg/TAmVFvkHep) pour suivre les mises à jour et contribuer à la traduction
- Tu peux également contribuer à la traduction en faisant un ticket sur Github.

# Compatibilité et Support
- Support complet de Minecraft 1.21 - 1.21.4
- Compatibilité avec Yggdrasil 3.0.0
- Support des dernières versions de BeyondEnchant
