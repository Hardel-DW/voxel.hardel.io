---
draft: true
title: "Voxel Studio"
snippet: "Voxel Studio est un outil de configuration de pack et de mods pour Minecraft. Il a été entièrement réécrit et reçoit une refonte complète, avec des changements majeurs."
imageSrc: "/images/background/blog/voxel_studio_schema_bg.png"
imageAlt: "Documentation Interactive"
author: "hardel"
publishDate: "2025-05-06"
category: "Voxel"
---

# Voxel, un tournant majeur

Voxel Studio est sûrement le projet qui m'est le plus important. Il a été entièrement réécrit, avec un nouveau design, de nouvelles fonctionnalités et des changements majeurs. Je vous en parle dans cet article.

## Refonte
Par où commencer ?
Je pense que le plus simple est de vous montrer ! :3

<div class="grid grid-cols-2 gap-4">
    <img src="/images/background/blog/voxel_studio_schema_1.png" alt="Voxel Studio Schema" />
    <img src="/images/background/blog/voxel_studio_schema_2.png" alt="Voxel Studio Schema" />
</div>

Comme vous pouvez le voir, le design a été entièrement changé. La disposition reste globalement la même, mais les éléments, le fond et les couleurs ont été entièrement modifiés, pour un effet aurore et sombre.

### Menu Principal
Le principal changement est la suppression de la barre de navigation, ainsi que le menu principal, qui a maintenant une hauteur délimitée et fixe, ce qui permet de placer des éléments en bas de la page. Cette nouvelle disposition permet un affichage en plein écran.
Il y a aussi une refonte de l'onglet des enchantements non compatibles, affichant les éléments sous forme d'une grille avec le contenu de chaque groupe d'enchantements.

### Menu de Sélection
Le principal impact de cette refonte est l'apparition de cette nouvelle barre latérale, qui permet de sélectionner le type de contenu que vous voulez modifier.

## Nouvelles fonctionnalités
Le plus important, je suppose ?
Le support de trois nouveaux contenus : les *loot tables*, les *structures* et les *recettes*. On est toujours sur un configurateur simple d'utilisation. Donc, comme pour les enchantements, on reste sur des interfaces et des actions simples, accessibles à tous les joueurs et surtout clés en main. Chaque action est assurée de fonctionner ; le configurateur se débrouillera parfaitement pour que vos actions simples soient possibles.

### Recettes
Support des recettes : vous pouvez maintenant consulter les recettes du datapack/mod par type de recette (table de fabrication, four, feu de camp, tailleur de pierre, etc.) et en modifier les ingrédients et le résultat. Il est aussi possible de supprimer des recettes ou d'en créer.
- Pour chacune des catégories, une interface dédiée, simple et efficace, de type glisser-déposer.
- Il est possible de rechercher par ingrédient ou par résultat.

### Récompenses (Loot Tables)
Support des loot tables : comme les recettes, il est possible de les consulter par catégorie (Monstre, Bloc, Coffre, etc.) et d'en modifier les récompenses. Il est aussi possible de supprimer des récompenses.
- Cela va un peu plus loin : vous pouvez rechercher un objet particulier.
- Supprimer/Modifier un objet dans plusieurs, voire toutes les loot tables en un clic.
- Consulter la liste des objets d'une loot table en particulier, sans les probabilités ni la gestion des sous-groupes.
- Obtenir la probabilité d'un objet dans une loot table en particulier.
- Faire un tirage aléatoire d'une table de butin en particulier.

### Structures
Support des structures : elles sont plus simplistes que les deux autres contenus, mais elles sont tout de même pratiques.
- Désactiver une structure.
- Consulter les blocs d'une structure et avoir le détail sur les blocs.
- Rechercher un bloc dans la structure ou une donnée (utile pour les développeurs ou les builders) et le remplacer.
- Obtenir la liste des loot tables d'une structure, ainsi qu'une redirection vers le configurateur de loot tables.
- Gestion des conditions et des probabilités d'apparition.
- Consulter le visuel de la structure (pièce par pièce).

> Pas de visuel complet de la structure. C'est un défi technique qui demande beaucoup de temps et de ressources et qui n'est pas prioritaire car seulement visuel.

## Changements majeurs
Une nouvelle interface nommée "Overview" permet de consulter tout le contenu d'une catégorie, par exemple tous les enchantements, et d'effectuer des actions dessus.
- Désactiver un élément.
- Rechercher des éléments.
- Trier par filtres.
- Modification globale (Désactiver tous les éléments, ou retirer tous les enchantements de la table d'enchantement.)
- Modifications rapides.

## Conclusion
Je veux me concentrer davantage sur ce produit et peut-être trouver une source de financement pour le maintenir. Je souhaite, à terme, dans plusieurs mois ou années, avoir un outil de configuration ultime pour Minecraft, avec une interface moderne et simple d'utilisation, sans devoir ouvrir une seule fois un éditeur de code.
