---
draft: false
publishDate: "2024-10-14"
version: "5.7.0"
title: "Mise à Jour Performance"
type: "Feature"
description: "Une nouvelle mise à jour pour NeoEnchant+ est maintenant disponible, elle introduit de nouveaux enchantements, avec quelque refonte, et une nette amélioration des performances."
imageSrc: "/images/background/blog/hero-ne.webp"
---

# Aperçu
**NeoEnchant 5.7.0** introduit 7 nouveaux enchantements, Voici les nouveaux : Vague Tellurique, Gel Éternel, et plus encore. Ainsi que de quelques ajustements aux enchantements existants et pour finir des **améliorations de performances** en éliminant le code en arrière plan, et le rajout de la langue **Française**.

## Comment obtenir les traductions
- Tu dois mettre le pack **NeoEnchant** dans ton dossier de packs de ressources.
- Alternativement, tu peux utiliser le resource pack **Voxel Translation**, qui inclut des traductions pour tout le contenu **Voxel** (NeoEnchant, Yggdrasil, et les futurs packs).

## Améliorations de performances
Dans la version précédente, certains enchantements nécessitaient que des commandes soient répétées 20 fois par seconde, notamment pour la détection.
Ces commandes ont été complètement supprimées, les performances sont au maximum possible.

# Nouveaux enchantements

::enchant.changelog{name="Malédiction de la Rupture"}
Un nouvel enchantement a été implémenté pour ajouter plus de variété et d'équilibre au jeu. Cela contrebalance avec certains objets dans les structures qui étaient trop puissants.

::enchant.newenchant{icon="/images/features/item/durability.webp", max_level=5, anvil_cost=1, rarity=3}

### Effet passif
L'objet perd (1 x niveau) de durabilité à chaque utilisation avec (15% x niveau) de chance
::enchant.changelog.end

::enchant.changelog{name="Gel Éternel"}
Je suis impatient que les joueurs prennent cet enchantement en main. Ce n'est pas le plus puissant, mais c'est visuellement magnifique et peut probablement faire des choses assez incroyables.

::enchant.newenchant{icon="/images/features/item/bow.webp", max_level=2, anvil_cost=6, rarity=2}

### À l'impact
Transforme le sol en glace et joue une animation de pics de glace

### Contre une cible
Ralentit les cibles et joue une animation de pics de glace lors de l'impact

![Image](/images/background/blog/eternal_frost.jpg)
::enchant.changelog.end

::enchant.changelog{name="Rebond (Expérimental)"}
Pour celui-ci, l'idée générale était de créer un enchantement qui rebondit sur les entités proches, infligeant ces effets à l'impact, comme Flèche Explosive, Flèche de Tempête. Mais ça ne fonctionne pas encore très bien, et c'est toujours en développement, donc vous pouvez l'essayer maintenant, mais il contient quelques bugs.

::enchant.newenchant{icon="/images/features/item/bow.webp", max_level=3, anvil_cost=2, rarity=4}

### Rebond
Les flèches rebondissent vers les cibles proches après avoir touché une entité

### Nombre de rebonds
Augmente les rebonds possibles : 3 + (1 par niveau)
::enchant.changelog.end

::enchant.changelog{name="Larmes d'Asflors - (Exclusif à Yggdrasil)"}
La Larme d'Asflors est un enchantement exclusif lié à l'arme légendaire dans le nouveau contenu d'Yggdrasil. Ses effets sont relativement simples, convertissant votre expérience en dégâts d'attaque, fort pour une arme de fin de partie.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=3, anvil_cost=2, rarity=4}

### Contre une cible
Convertit l'expérience du joueur en dégâts
::enchant.changelog.end

::enchant.changelog{name="Vague Tellurique"}
Celui dont je suis le plus fier, et celui qui ajoutera tant d'intérêt à la masse. Celui-ci crée une onde sismique qui envoie les cibles dans les airs. Je vais regarder de près pour voir si cet enchantement n'est pas trop fort. J'espère qu'il ne brisera pas l'équilibre du jeu.

::enchant.newenchant{icon="/images/features/item/mace.webp", max_level=1, anvil_cost=6, rarity=2}

### Contre un bloc
En s'accroupissant, vous créez une onde sismique qui propulse les cibles dans les airs. Donne au lanceur un effets de ralentissement. L'onde peut être utilisé que si vous n'avez pas d'effet de ralentissement.

### Contre une cible
Propulse les cibles proches dans les airs après une chute de 5 blocs
::enchant.changelog.end

::enchant.changelog{name="Souffle de Gungnir"}
Cette enchantment est sensiblement le même que Gel Éternel, mais pour le trident. J'attend les retours des joueurs pour voir si l'enchantement convient mieux à l'arc ou au trident

::enchant.newenchant{icon="/images/features/item/trident.webp", max_level=1, anvil_cost=6, rarity=2}

### À l'impact
Transforme le sol en glace et joue une animation de pics de glace

### Contre une cible
Ralentit les cibles et joue une animation de pics de glace lors de l'impact
::enchant.changelog.end

::enchant.changelog{name="Dernier Espoir - (Exclusif à Yggdrasil)"}
Cet enchantement est un dernier recours pour les joueurs sur le point de mourir. C'est un coup fatal garanti, mais il consomme l'objet utilisé et ne peut être obtenu que dans les villages d'Asflors sur une arme mythique.

::enchant.newenchant{icon="/images/features/item/sword.webp", max_level=1, anvil_cost=6, rarity=0}

### Contre une cible
Consomme l'objet pour infliger des dégâts infinis à la cible

![Image](/images/background/blog/tears_of_aslfors.jpg)
::enchant.changelog.end

::enchant.changelog{name="Marche Céleste"}
Marche Céleste existe depuis longtemps, mais il a été TOTALEMENT repensé depuis zéro, l'ancien a été supprimé. Il n'était pas trés pratique, celui là se contrôle plus facilement.

::enchant.newenchant{icon="/images/features/item/boots.webp", max_level=3, anvil_cost=2, rarity=2}

### Effet passif
Le nombre de blocs nécessaires pour subir des dégâts de chute est augmenté de 1 + (1 * niveau)

### Effet actif
Crée un effet de répulsion sous les pieds en s'accroupissant avec les valeurs de vitesse suivantes, pour la faire simple, plus le niveau est élevé, plus vous vous envoler vite.

| Niveau | Vitesse |
| ------ | ------- |
| 1 | 0,185 |
| 2 | 0,215 |
| 3 | 0,265 |
| 4+ | 0,185 + (0,03 par niveau) |
::enchant.changelog.end

# Enchantements modifiés

::enchant.changelog{name="Briseur de Bedrock"}
Briseur de Bedrock est aimé par beaucoup, il perd son stade expérimental et reçoit un équilibrage car il était trop cher.

### Stable
L'enchantement est maintenant stable, est peut être trouvé.

### Durabilité
Réduites de ~200~ -> 150

### Effet de particules
Changement de l'effet de particules pour qu'il soit plus beau et plus visible.

### Son
Un son a était ajouté

### Après le patch
Briseur de Bedrock sera retiré des outils existants et devra être ré-obtenu
::enchant.changelog.end

::enchant.changelog{name="Rapetissé"}
Les joueurs avaient tendance à l'utiliser comme un effet bénéfique pour être plus difficile à toucher au combat, mais il reste une malédiction. Pour cette raison, des effets négatifs supplémentaires ont été ajoutés.

* **Attributs ajoutés :**
    * Attribut d'assistance de marche (+0,5 par niveau)
    * Attribut de réduction de vitesse d'attaque (-0,15 par niveau)
    * Attribut de réduction de vitesse de mouvement (-0,125 par niveau)

### Extension
Effet maintenant extensible au-delà du niveau 4 avec des commandes ou le configurateur.

### Technique
L'identifiant de l'attribut "scale" a été changé en "minecraft:enchantment.dwarfed.scale"
::enchant.changelog.end

::enchant.changelog{name="Surdimensionné"}
Ces changements sont effectués pour être cohérents avec Rapetissé.

* **Attributs ajoutés :**
    * Réduction des dégâts -2 et -1 supplémentaire par niveau
    * Réduction de la portée d'attaque -0,15 par niveau
    * Réduction de la vitesse de mouvement -0,125 par niveau

### Extension
Effet maintenant extensible au-delà du niveau 4 avec des commandes

### Technique
L'identifiant de l'attribut "scale" a été changé en "minecraft:enchantment.oversize.scale"
::enchant.changelog.end

::enchant.changelog{name="Auto-Alimentation"}
Cet enchantement était trop fort, et était aussi trop facile à obtenir, et le système de nourriture était totalement inutile.

### Effet de saturation
S'applique maintenant toutes les 3 minutes au lieu de 30 secondes
::enchant.changelog.end
# Changements techniques
- Bientôt
