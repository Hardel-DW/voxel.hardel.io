---
draft: false
publishDate: "2025-01-19"
version: "5.9.0"
title: "Compatibilité Helheim"
type: "Feature"
description: "La mise a jour de 5.9, ajoutant 6 nouveaux enchantements dont un très attendu et de l'équilibrage."
imageSrc: "/images/background/blog/hero-ne.webp"
modrinth: "https://modrinth.com/datapack/neoenchant"
curseforge: "https://www.curseforge.com/minecraft/mc-mods/neoenchant"
---

# Aperçu
Bonjour à tous, Je suis vraiment content de vous présenter la version 5.9.0 de NeoEnchant. Elle ajoute 6 nouveaux enchantements, de l'équilibrage ainsi que des améliorations diverses.

NeoEnchant 5.9.0, intégres aussi la compatibilité avec Yggdrasil V4.0.0 avec sa nouvelle dimension Helheim.

# Nouveaux Enchantements

:::enchant.changelog{name="Harvest"}
Je sais que c'est un enchantment trés attendu, et le voici enfin disponible, il permet de planter des graines en zone. Incroyable non ?

::enchant.newenchant{icon="/images/features/item/hoe.webp", max_level=3, anvil_cost=2, rarity=7}

### Utilisation
Une fois que vous avez l'enchantement sur votre houe, vous devez la placer dans votre main secondaire, planter ensuite des graines avec votre main principale.

### Effets
Lorsque vous plantez des graines, des graines additionnels seront plantés autour du bloc planté, les graines sont biensur consommés de votre inventaire.

### Taille de la zone
C'est le niveau de l'enchantement multipliés par 2 et ajouter 1, voici le tableau par niveau.

| Niveau | Taille de la zone |
| ------ | ------- |
| 1 | 3x3 |
| 2 | 5x5 |
| 3 | 7x7 |
:::

:::enchant.changelog{name="Critical Hit"}
Un nouvel enchantment destinés au joueurs contre joueurs, vous avez une probabilité de faire des dégats bruts. Cela veut dire qui ingore une partie de la protection de l'armure.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=5, anvil_cost=2, rarity=4}

### Effets à l'impact
Vous avez 4% de chance par niveau d'infliger qui ingore 25% de la protection de l'armure de la cible.

| Niveau | Chance |
| ------ | ------- |
| 1 | 4% |
| 2 | 8% |
| 3 | 12% |
| 4 | 16% |
| 5 | 20% |
:::

:::enchant.changelog{name="Coup Dimensional"}
Cette enchantment augmenete vos dégats lorsque vous n'etes pas dans le monde normal, cela fonctionne dans le Nether, l'End et les dimensions personnalisées.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=5, anvil_cost=2, rarity=4}

### Dégâts Additionnels
Augmente vos dégats de 2 (+1 Par niveau) sur tous vos dégats, quand vous n'etes pas dans le monde normal.

| Niveau | Dégâts |
| ------ | ------- |
| 1 | 2 |
| 2 | 3 |
| 3 | 4 |
| 4 | 5 |
| 5 | 6 |
:::

:::enchant.changelog{name="Le Desepoir Runique"}
Lié aux packs de Yggdrasil, il s'obtient sur le trésor de Asflors et permet d'augmenter drastiquement les dégats dans la dimension Runique, cela devrait facilités le Labyrinthe

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=5, anvil_cost=2, rarity=4}

### Dégâts Additionnels
Augmente tout vos dégats lorsque vous êtes dans la dimension Runique, de 125% + 25% par niveau.

| Niveau | Dégâts |
| ------ | ------- |
| 1 | 125% |
| 2 | 150% |
| 3 | 175% |
| 4 | 200% |
| 5 | 225% |
:::

:::enchant.changelog{name="Toucher Mortel"}
Cette enchantment est a destination des monstres, il peut toute fois êtres obtenu dans Helheim de maniére extrémement rare.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=1, anvil_cost=1, rarity=1}

### Effets
Donne l'effet "Darkness" à la cible lorsque vous l'infligez des dégats.
:::

:::enchant.changelog{name="Protection Cinétique"}
Réduit les dégats de collision avec les Elytra lorsque vous touchez un mur

::enchant.newenchant{icon="/images/features/item/elytra.webp", max_level=4, anvil_cost=1, rarity=1}

### Protection
Réduit les dégats de collision avec les Elytra lorsque vous touchez un mur, de 6 de dégats par niveau.

| Niveau | Dégâts |
| ------ | ------- |
| 1 | 6 |
| 2 | 12 |
| 3 | 18 |
| 4 | 24 |
:::

# Modifications et Equilibrage

:::enchant.changelog{name="Life+"}
Cette enchantment est trop joués, et il est beaucoup trop puissant, ces valeurs ont était fortement réduites.

### Equilibrage
Le gain de coeur par niveau a était réduit de 4 à 2, l'enchantement ne donne plus qu'un coeur de plus par niveau.

| Niveau | Gain |
| ------ | ------- |
| 1 | 2 (1 Coeur) |
| 2 | 4 (2 Coeurs) |
| 3 | 6 (3 Coeurs) |
| 4 | 8 (4 Coeurs) |
| 5 | 10 (5 Coeurs) |
:::

:::enchant.changelog{name="XpBoost"}
Cette enchantment peut maintenant être appliqués sur les outils, c'est fou ! non ?

### Augmentation de l'expérience
L'expérience gagnée est augmentés lorsque vous minerais des blocs rapportant de l'expérience comme le fer, le diamant, etc, le gain pour la mélée.

| Niveau | Gain D'expérience |
| ------ | ------- |
| 1 | x1.5 |
| 2 | x2.25 |
| 3 | x3 |
:::

:::enchant.changelog{name="Bright Vision"}
Des améliorations ont été apportées pour rendre l'enchantement plus fluide et agréable à utiliser.

### Délai
L'effet est maintenant appliqué immédiatement, sans aucune latence.

### Particules
Les particules d'effet de potion ont été supprimées pour une meilleure expérience visuelle.
:::

:::enchant.changelog{name="Oversize"}
Les effets négatifs sont supprimés, sont imposantes tailles est déjà un handicap lorsque vous portez cette enchantment.

### Malus de dégats
L'effet est supprimé

### Malus de vitesse de déplacement
L'effet est supprimé
:::

:::enchant.changelog{name="Mining+"}
L'effet possédez parfois quelque probléme en multijoueur, lorsque plusieurs joueurs l'utiliser simultanément et l'enchantement a globalement était optimisés en performance.

### Performance et Bug Fixes
L'enchant est maintenant bien syncronisés peut importe le nombre de joueur,
:::

:::enchant.changelog{name="Auto-Smelt"}
C'était trés demander, maintenant l'enchantement donne de l'expérience uniquement quand l'effet ne se déclenche pas, les minerais de diamant, d'emeraude donne maintenant leurs expérience, mais les minerais transformés ne donnent pas d'expérience comme le fer, l'or.

### Expérience
L'enchantement donne maintenant de l'expérience uniquement quand l'effet ne se déclenche pas
:::

# Autres Modifications
- Les Traductions ont était mise a jours pour inclure les nouveaux enchantements.
- Yggdrasil V4.0.0 est maintenant supporté.
- 5 Nouveaux progrés ont était ajoutés dans le menu de progression.

### Contribution
- Rejoins le [Discord](https://discord.gg/TAmVFvkHep) pour suivre les mises à jour et contribuer à la traduction ou a l'amélioration du datapack.
- Tu peux également contribuer à la traduction en faisant un ticket sur Github.

# Compatibilité et Support
- Support complet de Minecraft 1.21 - 1.21.4
- Compatibilité avec Yggdrasil 4.0.0
- Support des dernières versions de BeyondEnchant
