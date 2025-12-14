---
draft: false
publishDate: "2025-12-12"
version: "5.13.0"
title: "Le Chaos des Montures"
type: "Feature"
description: "La mise à jour 5.13, ajoutant l'enchantement Propulsion pour les élytres et permettant d'obtenir 100% des enchantements par diverses méthodes."
imageSrc: "/images/background/blog/hero-ne.webp"
modrinth: "https://modrinth.com/datapack/neoenchant"
curseforge: "https://www.curseforge.com/minecraft/mc-mods/neoenchant"
---

# Aperçu
Bonjour à tous, je suis vraiment ravi de vous présenter la version 5.13.0 de NeoEnchant. Cette mise à jour introduit un nouvel enchantement pour les élytres et améliore significativement l'accessibilité des enchantements avec une refonte majeure de la distribution.

NeoEnchant 5.13.0 atteint une étape majeure : 100% des enchantements sont désormais obtenables sans contenu additionnel (à l'exception des trois enchantements exclusifs à Yggdrasil).

**Cette mise à jour est exclusive à Minecraft 1.21.11.**

# Nouveaux Enchantements

:::enchant.changelog{name="Propulsion"}
Transformez vos vols en élytre en aventures supersoniques ! Cet enchantement vous donne un boost de vitesse directionnel en plein vol lorsque vous appuyez sur le bouton de saut. Parfait pour atteindre des destinations éloignées plus rapidement tout en gardant le contrôle.

::enchant.newenchant{icon="/images/features/item/elytra.webp", max_level=3, anvil_cost=1, rarity=1}

### Activation
Maintenez le bouton de saut pendant le vol pour activer le boost. L'enchantement ne s'active que lorsque vous volez en dessous de 35 blocs par seconde, empêchant les abus à haute vitesse.

### Coût
Chaque boost consomme de l'épuisement en fonction du niveau. Les niveaux supérieurs fournissent des boosts plus puissants mais drainent plus de faim. Cela consomme 1 point de faim (demi-pilon) par niveau.

| Niveau | Force du Boost | Épuisement |
| ------ | -------------- | ---------- |
| I | x1.0 | 1 |
| II | x2.0 | 2 |
| III | x3.0 | 3 |

### Détails Techniques
- Nécessite que le joueur soit en mode vol (planeur avec élytre)
- Ne se déclenche que lorsque l'entrée de saut est pressée
- Limite de vitesse de 35 blocs par seconde empêche l'activation à haute vélocité

### Obtention
Disponible dans les coffres au trésor aléatoires à travers le monde, dans les coffres sinistres et les générateurs d'essai d'Asgard (addon Yggdrasil), et dans les coffres de l'End City (addon Vanilla Structure).
:::

---

# Refonte de la Distribution des Enchantements

Un changement majeur de cette mise à jour est la refonte complète de la façon dont les enchantements NeoEnchant peuvent être obtenus. **100% des enchantements NeoEnchant sont désormais obtenables** par diverses méthodes vanilla (à l'exception des trois enchantements liés à Yggdrasil : Larmes d'Asflors, Désespoir Runique et Toucher de Midas).

### Table d'Enchantement
Les enchantements suivants peuvent désormais être trouvés dans les tables d'enchantement :
- Toucher de Mort
- Frappe Dimensionnelle
- Flèche de Tempête
- Flèche Brise-Vent
- Assistance au Pas
- Protection Cinétique

### Commerce de Villageois
Ces enchantements sont désormais disponibles via les échanges avec les villageois :
- Assistance au Pas
- Toucher de Générateur
- Briseur de Bedrock

### Coffres et Trésors
Trouvables dans divers coffres au trésor à travers le monde :
- Attraction
- Dernier Espoir
- Frappe Dimensionnelle
- Vague Tellurique
- Sans-Vide

### Butin Aléatoire
Disponibles via les tables de butin général :
- Propulsion
- Blindé
- Marcheur de Lave

---

# Mises à Jour des Addons

:::enchant.changelog{name="NeoEnchant - Addons - Yggdrasil"}
L'addon Yggdrasil a été mis à jour pour supporter exclusivement Minecraft 1.21.11.

### Nouveau Contenu
L'enchantement **Propulsion** peut désormais être trouvé dans les coffres sinistres et les générateurs d'essai sinistres d'Asgard.
:::

:::enchant.changelog{name="NeoEnchant - Addons - Vanilla Structure"}
L'addon Vanilla Structure a été mis à jour pour supporter exclusivement Minecraft 1.21.11. Cet addon est disponible depuis 6 mois, enrichissant les structures vanilla avec du butin NeoEnchant.

### Nouveau Contenu
L'enchantement **Propulsion** peut désormais être trouvé dans les coffres de l'End City.
:::

:::enchant.changelog{name="NeoEnchant - Addons - Table d'Enchantement"}
**NOUVEL ADDON :** Ce tout nouvel addon permet à 100% des enchantements NeoEnchant d'apparaître dans les tables d'enchantement. Cela peut être déséquilibré, utilisez-le à vos risques et périls !

### Fonctionnalités
- Tous les enchantements NeoEnchant (sauf ceux exclusifs à Yggdrasil) peuvent apparaître dans les tables d'enchantement
- Offre une accessibilité maximale pour tous les enchantements
- Addon optionnel pour les joueurs qui préfèrent un accès plus facile

### Avertissement
Cet addon modifie significativement l'équilibre du jeu en rendant tous les enchantements facilement obtenables. N'installez que si vous voulez une expérience plus décontractée.
:::

---

# Autres Modifications
- Un nouvel advancement a été ajouté pour l'obtention de l'enchantement Propulsion.
- Les traductions ont été mises à jour pour inclure le nouvel enchantement.
- Compatibilité complète avec Minecraft 1.21.11.
- L'addon Yggdrasil a été mis à jour pour la version 1.21.11.
- L'addon Vanilla Structure a été mis à jour pour la version 1.21.11.
- Nouvel addon Table d'Enchantement publié.

### Contribution
- Rejoignez le [Discord](https://discord.gg/TAmVFvkHep) pour suivre les mises à jour et contribuer à la traduction ou à l'amélioration du datapack.
- Vous pouvez également contribuer à la traduction en créant un ticket sur Github.

# Compatibilité et Support
- **Support exclusif pour Minecraft 1.21.11**
- Compatibilité avec Yggdrasil (addon mis à jour)
- Support des dernières versions de BeyondEnchant
- Nouvel addon Table d'Enchantement disponible
- Addon Vanilla Structure mis à jour

Merci pour votre soutien continu ! Cette mise à jour marque une étape importante en rendant NeoEnchant plus accessible tout en maintenant l'équilibre. Rejoignez notre serveur pour tester le nouvel enchantement Propulsion et explorer le système de distribution amélioré !

À bientôt pour plus d'aventures magiques !
