---
draft: false
publishDate: "2025-12-12"
version: "0.1.0"
title: "Whisper of Ether"
type: "Major"
description: "Whisper of Ether est un tout nouveau mod introduisant le système runique, permettant la personnalisation de l'équipement grâce aux runes avec des statistiques uniques comme le Multi Saut, l'Omnivampirisme et les Coups Critiques."
imageSrc: "/images/background/blog/hero-woe.webp"
modrinth: "https://modrinth.com/mod/whisper-of-ether"
curseforge: "https://www.curseforge.com/minecraft/mc-mods/whisper-of-ether"
---

# Aperçu

Bonjour à tous ! Je suis ravi de vous présenter **Whisper of Ether**, mon tout nouveau mod pour Minecraft 1.21.10 sur Fabric ! Ce n'est pas un data pack mais un véritable mod, représentant deux semaines de travail intensif.

Cette première version alpha introduit le **Système Runique**, une toute nouvelle façon d'améliorer votre équipement grâce aux runes. Chaque item, interface et texture a été créé par moi pour ce projet.

**Cette version est actuellement disponible pour les membres Patreon en bêta test.**

> ⚠️ Ceci est une version alpha ! Vos retours sont extrêmement précieux. N'hésitez pas à signaler les bugs ou partager vos suggestions.

---

# Le Système Runique

Le cœur de Whisper of Ether repose sur les **runes** — des objets mystiques capables de modifier les statistiques de votre équipement. Ce système est inspiré de jeux comme Dofus, où améliorer une stat peut en réduire une autre.

## Niveaux de Runes

Les runes existent en **5 niveaux différents**, avec une puissance et un taux de réussite croissants :

| Niveau | Nom de la Rune | Description |
| ------ | -------------- | ----------- |
| 1 | Rune | Rune basique, taux de réussite standard |
| 2 | Rune Renforcée | Taux de réussite légèrement amélioré |
| 3 | Rune Écho | Amélioration modérée du taux de réussite |
| 4 | Rune du Nether | Taux de réussite élevé |
| 5 | Rune du Dragon | Taux de réussite maximal, niveau légendaire |

Les runes de niveau supérieur augmentent significativement la probabilité de **Succès Critique** lors du forgeage.

::gallery{grid=5}
![Rune](/images/patchnote/woe/010/rune.webp)  

![Rune Renforcée](/images/patchnote/woe/010/reinforced_rune.webp)  

![Rune Écho](/images/patchnote/woe/010/echo_rune.webp)  

![Rune du Nether](/images/patchnote/woe/010/nether_rune.webp)  

![Rune du Dragon](/images/patchnote/woe/010/dragon_rune.webp)
::gallery.end

> Note : Les textures des runes présentées ne sont pas définitives et peuvent changer avant la sortie.

---

# Onglet Créatif & Accès aux Items

Un **Onglet Créatif** dédié est disponible pour accéder facilement à tout le contenu runique :
- Les **5 niveaux de runes vierges** (Rune, Renforcée, Écho, Nether, Dragon)
- Toutes les **Runes du Dragon** (niveau 5) pour chaque attribut

Dans l'**Onglet de Recherche**, comme pour les livres enchantés, toutes les runes sont disponibles avec tous les niveaux et toutes les combinaisons d'attributs pour un accès facile.

::gallery{grid=2}
![Onglet Créatif Runique](/images/patchnote/woe/010/runic_creative_tab.webp)

![Onglet de Recherche](/images/patchnote/woe/010/search_tab.webp)
::gallery.end

---

# La Table Runique

::gallery{grid=2}
![Bloc Table Runique](/images/patchnote/woe/010/runic_table.webp)  

![Table Runique Vide](/images/patchnote/woe/010/runic_table_screen_empty.webp)
::gallery.end

La **Table Runique** est le bloc central pour appliquer les runes à votre équipement. J'ai conçu une magnifique interface personnalisée pour ce bloc !

## Comment ça Fonctionne

1. **Placez votre équipement** dans l'emplacement centre-droit
2. **Placez une rune** dans l'emplacement centre-gauche
3. La rune est **consommée** et modifie les statistiques de votre équipement

![Interface de la Table Runique](/images/patchnote/woe/010/runic_table_screen.webp)

### Résultats du Forgeage

Lorsque vous appliquez une rune, l'un des trois résultats se produit :

| Résultat | Effet |
| -------- | ----- |
| **Succès Critique** ✨ | Les statistiques ciblées sont considérablement améliorées |
| **Succès** ✓ | Les statistiques s'améliorent, mais certaines autres peuvent être réduites |
| **Échec Critique** ✗ | Les statistiques ne s'améliorent pas, et certaines sont réduites |

### Système de Points de Forge

Chaque pièce d'équipement possède **300 Points de Forge**. Chaque rune a un poids qui consomme ces points :

- Quand les points atteignent **0**, vous ne pouvez plus modifier l'équipement
- Plus les points se rapprochent de **0**, plus le **taux d'échec augmente**
- Les runes de niveau supérieur augmentent les chances de succès

### Forgeage Rapide

**Maj + Clic-Droit** sur la table pour consommer toutes les runes du même type en une fois !

---

# La Forge Runique

![Forge Runique](/images/patchnote/woe/010/runic_forge.webp)

La **Forge Runique** vous permet de fabriquer des runes en utilisant des recettes spécifiques. Il y a **6 recettes de fabrication** disponibles :

- 5 recettes pour les niveaux principaux de runes
- 1 recette spéciale pour fabriquer l'**Éclat d'Écho** requis pour les runes de niveau 3 (thème du Warden)

![Craft Éclat d'Écho](/images/patchnote/woe/010/echo_shard.webp)

## Support de l'Automatisation

La Forge Runique peut être **automatisée** ! Placez simplement un coffre sur l'une des 5 faces du bloc :

- **Entrée des items** par le dessus
- Connectez des coffres aux autres faces pour la sortie et l'organisation

Parfait pour les farms et le traitement automatique des runes !

---

# L'Infuseur Runique

![Infuseur Runique](/images/patchnote/woe/010/runic_infuser.webp)

L'**Infuseur Runique** transforme les runes de base (sans statistiques) en runes infusées de stats. Placez une rune vierge à l'intérieur pour recevoir une rune avec une statistique aléatoire !

---

# Statistiques Disponibles

::video{src="https://uy64vwmxhf.ufs.sh/f/llTsukoqRt5QDYiqxXxbQqlKev5mUzbAEcOTC4P3hiMHLdxk"}

Les runes peuvent modifier une large gamme de statistiques. Voici la liste complète :

## Attributs Vanilla

| Rune | Effet |
| ---- | ----- |
| Rune d'Armure | Augmente les points d'armure |
| Rune de Robustesse d'Armure | Augmente la robustesse de l'armure |
| Rune de Dégâts d'Attaque | Augmente les dégâts d'attaque |
| Rune de Recul d'Attaque | Augmente le recul infligé |
| Rune de Vitesse d'Attaque | Augmente la vitesse d'attaque |
| Rune de Vitesse de Casse | Augmente la vitesse de destruction des blocs |
| Rune de Portée d'Interaction de Bloc | Augmente la portée d'interaction avec les blocs |
| Rune de Temps de Combustion | Modifie la durée de combustion |
| Rune de Portée d'Interaction d'Entité | Augmente la portée d'interaction avec les entités |
| Rune de Multiplicateur de Dégâts de Chute | Réduit les dégâts de chute |
| Rune de Force de Saut | Augmente la hauteur de saut |
| Rune de Résistance au Recul | Augmente la résistance au recul |
| Rune de Vie Maximum | Augmente la vie maximale |
| Rune d'Efficacité de Minage | Augmente la vitesse de minage |
| Rune de Vitesse de Déplacement | Augmente la vitesse de déplacement |
| Rune de Zone de Ramassage | Augmente le rayon de ramassage des items |
| Rune de Distance de Chute Sûre | Augmente la distance de chute sans dégâts |
| Rune de Vitesse Accroupie | Augmente la vitesse en mode accroupi |
| Rune de Hauteur d'Enjambement | Augmente la hauteur d'enjambement |
| Rune de Ratio de Dégâts Balayants | Augmente les dégâts balayants |
| Rune d'Efficacité en Eau | Augmente le déplacement sous l'eau |

## Nouvelles Statistiques

Trois toutes nouvelles statistiques exclusives à Whisper of Ether :

### Multi Saut

| Rune | Effet |
| ---- | ----- |
| Rune de Multi Saut | Permet des sauts supplémentaires en plein air (jusqu'à 5 sauts !) |

Sautez à nouveau en plein vol ! Cumulez cette stat pour devenir un véritable acrobate.

---

### Système Critique

| Rune | Effet |
| ---- | ----- |
| Rune de Taux Critique | Augmente les chances de coup critique |
| Rune de Dégâts Critiques | Augmente le multiplicateur de dégâts critiques |

Un système critique divisé : le **Taux Critique** détermine vos chances d'infliger un coup critique, tandis que les **Dégâts Critiques** amplifient les dégâts infligés.

---

### Omnivampirisme

| Rune | Effet |
| ---- | ----- |
| Rune d'Omnivampirisme | Soigne au fil du temps lorsque vous infligez des dégâts |
| Rune de Taux d'Omnivampirisme | Augmente le taux de soins |

Lorsque vous frappez un ennemi, vous volez une partie de sa vie sous forme de **soins au fil du temps** (durée de 3 secondes). Fonctionne avec tous les types de dégâts !

---

# Mannequin d'Entraînement

::gallery{grid=2}
![Mannequin d'Entraînement](/images/patchnote/woe/010/target_dummy_entity.webp)  

![Craft Mannequin d'Entraînement](/images/patchnote/woe/010/target_dummy_craft.webp)
::gallery.end

Un outil utile créé pendant le développement, maintenant disponible pour vous ! Le **Mannequin d'Entraînement** affiche les dégâts exacts que vous infligez, parfait pour tester vos builds.

- **Craft peu coûteux** similaire au Porte-Armure
- Affiche les nombres de dégâts en temps réel
- Idéal pour tester les combinaisons de runes

---

# Système de Point de Passage

Un nouveau **système de point de passage** est maintenant disponible via commandes uniquement. Ce système sera étendu dans les futures mises à jour pour supporter les fonctionnalités d'exploration.

---

# Changements Temporaires

> **Note :** Les items personnalisés montrés dans les aperçus précédents ont été temporairement retirés pour assurer une implémentation correcte. Ils reviendront dans une future mise à jour !

---

# Prochainement

Whisper of Ether ne fait que commencer ! Les futures mises à jour incluront :

- **Enchantements Légendaires** — Des enchantements puissants avec des effets uniques
- **Système de Magie** — Une nouvelle façon d'interagir avec le monde
- **Contenu d'Exploration** — Nouvelles structures et récompenses
- **Compatibilité avec Yggdrasil** — Intégration avec les structures existantes

---

# Disponibilité

- **Plateforme :** Fabric (Minecraft 1.21.10)
- **Statut :** Alpha (Bêta test pour les membres Patreon)
- **Sortie Publique :** Peu après la période de test Patreon


### Retours

Ceci est une version alpha ! Partagez vos retours :
- Rejoignez le [Discord](https://discord.gg/TAmVFvkHep) pour signaler les bugs et partager vos suggestions
- Vos tests aident à améliorer Whisper of Ether !

---

Merci pour votre soutien continu ! Je suis incroyablement excité de partager ce nouveau projet avec vous. Ce mod représente une nouvelle direction pour mon contenu, et j'ai hâte d'avoir vos retours !

À bientôt pour de nouvelles aventures magiques ! ✨

[![Soutenez-moi sur Patreon](/images/patchnote/woe/010/patreon.png)](https://www.patreon.com/hardel)

-# Vous pouvez cliquer sur l'image pour me soutenir sur Patreon
