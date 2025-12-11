---
draft: false
publishDate: "2025-03-18"
version: "5.10.0"
title: "La Mise à Jour des Montures"
type: "Feature"
description: "La mise à jour 5.10, ajoutant 6 nouveaux enchantements dont plusieurs pour les montures et de l'équilibrage."
imageSrc: "https://uy64vwmxhf.ufs.sh/f/llTsukoqRt5QTmKu936JsdbAYGw6NoMQU1XkaVSh39xi5K8B"
---

# Aperçu
Bonjour à tous, Je suis vraiment ravi de vous présenter la version 5.10.0 de NeoEnchant. Cette mise à jour ajoute 6 nouveaux enchantements, dont plusieurs spécialement conçus pour les montures et animaux de compagnie, ainsi que de l'équilibrage pour les enchantements existants.

NeoEnchant 5.10.0 intègre également la compatibilité complète avec Minecraft 1.21.5 et Yggdrasil avec de nouveaux objets pour Asgard.

# Nouveaux Enchantements

::enchant.changelog{name="Toucher de Midas"}

::enchant.newenchant{icon="/images/features/item/axe.webp", max_level=1, anvil_cost=2, rarity=1}
> Transformez les blocs en or d'un simple toucher ! Cet enchantement légendaire permet à votre bâton de convertir des blocs ordinaires en minerai d'or (ou occasionnellement en blocs d'or). Parfait pour les chasseurs de trésors et les amateurs d'or !

### Obtention
Cet enchantement est désigné comme une récompense d'Asgard, et ne peut être obtenu que dans cette structure.

### Particularité
Il peut être trouvé sur un livre qui possède de la durabilité.

### Effets
Permet de transformer des blocs ordinaires en minerai d'or ou parfois en blocs d'or complets.
::enchant.changelog.end

::enchant.changelog{name="Magnet"}
Ne vous penchez plus jamais pour ramasser des objets ! Cet enchantement de plastron attire automatiquement les objets à proximité directement vers vous. Un must pour le minage et le combat efficaces.

::enchant.newenchant{icon="/images/features/item/chestplate.webp", max_level=3, anvil_cost=2, rarity=4}

### Effets
Attire automatiquement les objets à proximité vers vous dans un rayon de 10 blocs.

### Limitations
Attire uniquement les objets que vous avez minés ou les objets des monstres que vous avez attaqués. N'attire pas les objets lancés par un joueur ou les objets plus anciens que 1 seconde.

### Note technique
En raison de limitations techniques, il peut attirer les récompenses de blocs/monstres détruits par d'autres joueurs à proximité.
::enchant.changelog.end

::enchant.changelog{name="Saut Éthéré"}
Transformez votre monture en sauteur légendaire ! Augmente considérablement la hauteur de saut et réduit les dégâts de chute. Même les obstacles les plus hauts ne sont plus un problème pour votre monture.

::enchant.newenchant{icon="/images/features/item/horse_armor.webp", max_level=7, anvil_cost=2, rarity=5}

### Effets
Augmente la hauteur de saut de votre monture et réduit les dégâts de chute.

### Équivalence
C'est l'équivalent de l'enchantement Leaping, mais spécialement conçu pour les montures.

### Obtention
En raison de limitations techniques, cet enchantement ne peut pas apparaître dans la table d'enchantement.
::enchant.changelog.end

::enchant.changelog{name="Vélocité"}
Les amateurs de vitesse vont se réjouir ! Cet enchantement augmente la vitesse de déplacement de votre monture jusqu'à 175% au niveau maximum. Parcourez le paysage à une vitesse sans précédent.

::enchant.newenchant{icon="/images/features/item/horse_armor.webp", max_level=5, anvil_cost=2, rarity=5}

### Effets
Augmente la vitesse de déplacement de votre monture jusqu'à 175% au niveau maximum.

### Équivalence
C'est l'équivalent de l'enchantement Agility, mais spécialement conçu pour les montures.

### Obtention
En raison de limitations techniques, cet enchantement ne peut pas apparaître dans la table d'enchantement.
::enchant.changelog.end

::enchant.changelog{name="Croc d'Acier"}
Améliorez la morsure de votre compagnon loup ! Cet enchantement spécialisé augmente les dégâts d'attaque de votre chien, en faisant des combattants redoutables. Parfait pour partir à l'aventure avec votre fidèle canidé.

::enchant.newenchant{icon="/images/features/item/wolf_armor.webp", max_level=5, anvil_cost=2, rarity=5}

### Effets
Augmente les dégâts d'attaque de votre chien, le rendant plus efficace au combat.

### Équivalence
C'est l'équivalent de l'enchantement Sharpness, mais spécialement conçu pour les chiens.

### Obtention
En raison de limitations techniques, cet enchantement ne peut pas apparaître dans la table d'enchantement.
::enchant.changelog.end

::enchant.changelog{name="Égide du Cavalier"}
Protection pour les guerriers montés ! Réduit les dégâts subis pendant que vous chevauchez, rendant le combat monté beaucoup plus sûr. Le complément défensif parfait à vos capacités offensives.

::enchant.newenchant{icon="/images/features/item/horse_armor.webp", max_level=4, anvil_cost=2, rarity=5}

### Effets
Réduit les dégâts subis pendant que vous chevauchez votre monture.

### Équivalence
C'est l'équivalent de l'enchantement Protection, mais spécialement conçu pour les cavaliers.

### Obtention
En raison de limitations techniques, cet enchantement ne peut pas apparaître dans la table d'enchantement.
::enchant.changelog.end

---

# Modifications et Équilibrage

::enchant.changelog{name="Fureur"}
Suite à une analyse des statistiques recueillies avec le configurateur d'enchantements, cet enchantement a été rééquilibré.

### Équilibrage
Le niveau maximum a été réduit pour un meilleur équilibre de ::enchant.balancing{currentValue=4, newValue=3, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end
::enchant.changelog{name="Flèche Brise-Vent"}
Afin d'améliorer l'équilibre général du jeu, cet enchantement a été ajusté selon les statistiques médianes observées.

### Équilibrage
Le niveau maximum a été réduit pour un meilleur équilibre de ::enchant.balancing{currentValue=3, newValue=2, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Bras de Bâtisseur"}
Les statistiques ont montré que cet enchantement était trop puissant à des niveaux élevés.

### Équilibrage
Le niveau maximum a été réduit pour éviter des constructions trop rapides ::enchant.balancing{currentValue=5, newValue=3, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Tir d'Écho"}
Cet enchantement a été ajusté pour offrir une expérience plus équilibrée en combat à distance.

### Équilibrage
Le niveau maximum a été réduit pour un meilleur équilibre ::enchant.balancing{currentValue=3, newValue=2, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Gel Éternel"}
En raison de sa puissance, cet enchantement a été limité à un seul niveau.

### Équilibrage
Le niveau maximum a été réduit pour éviter un effet trop dominant ::enchant.balancing{currentValue=2, newValue=1, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Flèche Explosive"}
Les joueurs ont trouvé cet enchantement sous-utilisé, donc nous avons augmenté sa puissance maximum.

### Équilibrage
Le niveau maximum a été augmenté pour en faire une option plus viable ::enchant.balancing{currentValue=3, newValue=4, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Protection Cinétique"}
Suite aux retours des joueurs, cet enchantement a été renforcé pour offrir une meilleure protection lors des vols en Elytra.

### Équilibrage
Le niveau maximum a été augmenté pour une meilleure protection contre les collisions ::enchant.balancing{currentValue=4, newValue=5, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Rabougri"}
Cet enchantement a été renforcé pour le rendre plus attractif aux joueurs.

### Équilibrage
Le niveau maximum a été augmenté pour en faire une option plus intéressante ::enchant.balancing{currentValue=4, newValue=5, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Saut Bondissant"}
Pour correspondre aux améliorations apportées aux enchantements de mouvement, celui-ci a également été renforcé.

### Équilibrage
Le niveau maximum a été augmenté pour offrir plus d'options de mobilité verticale ::enchant.balancing{currentValue=2, newValue=3, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Coup Critique"}
Ce puissant enchantement d'attaque a été légèrement atténué pour équilibrer les combats.

### Équilibrage
Le niveau maximum a été réduit pour un équilibre PvP amélioré ::enchant.balancing{currentValue=5, newValue=4, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Aspect du Poison"}
Cet enchantement créait des situations de combat trop dominantes aux niveaux supérieurs.

### Équilibrage
Le niveau maximum a été réduit pour réduire les effets de statut trop puissants ::enchant.balancing{currentValue=4, newValue=3, icon="/icons/tools/max_level.svg"}
::enchant.changelog.end

::enchant.changelog{name="Larmes d'Asflors"}
Cet enchantement unique a été ajusté pour s'aligner sur les autres nerfs d'enchantements d'épée.

### Équilibrage
Le niveau maximum a été réduit à 3 pour maintenir l'équilibre entre les enchantements d'épée.
::enchant.changelog.end

---

# Autres Modifications
- Les traductions ont été mises à jour pour inclure les nouveaux enchantements.
- Compatibilité complète avec Minecraft 1.21.5.
- Yggdrasil a reçu une mise à jour spéciale assurant une compatibilité totale avec NeoEnchant 5.10.0.
- De nouveaux objets ont été ajoutés pour Asgard.
- Plusieurs datapacks ont été migrés pour la version 1.21.5.

### Contribution
- Rejoignez le [Discord](https://discord.gg/TAmVFvkHep) pour suivre les mises à jour et contribuer à la traduction ou à l'amélioration du datapack.
- Vous pouvez également contribuer à la traduction en faisant un ticket sur Github.

# Compatibilité et Support
- Support complet de Minecraft 1.21.5
- Compatibilité avec Yggdrasil
- Support des dernières versions de BeyondEnchant

Merci pour votre soutien continu ! Vos retours nous aident à améliorer NeoEnchant à chaque version. Rejoignez notre serveur pour tester ces nouveaux enchantements passionnants et partager vos impressions !

À bientôt pour plus d'aventures magiques !
