---
draft: true
title: "Tournant majeur de Voxel"
snippet: "Voxel est en train de changer en profondeur, cet article raconte tous les changements qui ont été faits, et l'avenir de Voxel."
imageSrc: "/images/background/blog/yggdrasil_loot_bg.png"
imageAlt: "Documentation Interactive"
author: "hardel"
publishDate: "2025-05-06"
category: "Voxel"
---

# Voxel, un tournant majeur

Bonjour,  

Je suis Hardel et je suis le créateur de Voxel, j'ai été énormément pris ces dernières semaines et mois avec Voxel mon absence cachait une refonte majeure de Voxel, et je souhaite vous en parler.

## Division des projets

Anciennement Voxel était un seul et unique projet écrit en Astro, mais les produits devenant de plus en plus nombreux, et la base d'utilisateurs devenant de plus en plus grande, ainsi que des projets à la complexité croissante, il était temps de tout remettre à plat.

C'est pour cela que Voxel a été divisé en plusieurs projets, commençant par les projets qui seront en open source :
- **Site - Voxel**, Le site où vous êtes, qui regroupe les guides, les tutoriels, les articles et les nouveautés.
- **Site - Voxel Labs**, Le site qui regroupe les outils de création de contenu, comme le configurateur, convertisseur et autres outils.
- **NPM - Breeze**, une dépendance NPM qui permet le bon fonctionnement des outils de création de Voxel Labs.
- **Schema** un projet interne pour la gestion des données liées aux configurateurs (Les Schémas et les clés de traduction).

Ensuite les projets privés :
- **L'API de Voxel**, qui est privée.
- **Admin - Dashboard** qui est la partie admin de Voxel.
- **Projet - Voxel Resources** un projet interne qui permet la gestion des images, des assets graphiques, pour le bon fonctionnement des outils de Voxel Labs.
- **Et autres... Confidentiels**

## Voxel
Voxel est le projet principal, il regroupe les guides, les tutoriels, les articles et les nouveautés.
C'est en quelque sorte le hub central de Voxel, qui permet de naviguer entre les différents projets, de consulter les dernières informations.

## Voxel Labs
Voxel Labs est un nouveau site qui regroupe les outils précédemment sur Voxel, mais aussi de nouveaux outils qui arriveront, pourquoi ?
1. Principalement pour le langage de programmation utilisé et un environnement de développement plus adapté, (NextJS), auparavant Astro + React, qui commençait à devenir trop compliqué pour implémenter des fonctionnalités de plus en plus complexes.
2. Mais aussi pour alléger la charge de Voxel, et pour avoir un site plus léger et plus rapide.

## Breeze
Breeze a déjà été annoncé il y a quelques mois, c'est un noyau, un moteur pour la création d'outils de datapacks/mods, lors de cette migration de Voxel à Voxel Labs, cela a permis bien plus que prévu :
- Une séparation totale, Voxel Labs fournit les composants visuels, tandis que Breeze s'occupe de la logique, ce qui permet bien plus de flexibilité.
- Ce point permet dans le futur de pouvoir créer des outils multiplateformes.
- Surtout tous les morceaux de code qui étaient très liés à Voxel ont été retirés, ce qui permet à vous de pouvoir plus facilement créer vos propres outils.

Il est maintenant possible pour moi de modifier le configurateur sans que vous n'ayez à rafraîchir la page pour voir les changements.

## Projet - Schema
Ce projet est un projet qui permet la création de fichiers JSON qui sont utilisés dans le configurateur, basiquement ces fichiers sont chargés et ce sont eux qui génèrent l'interface graphique du configurateur, les actions etc...
- Cela permet de charger dynamiquement les onglets et les interfaces sans tout télécharger.
- Permet de gérer le versioning de Minecraft, et d'avoir un schéma pour chaque version du jeu.

## Autres projets internes
Beaucoup de contenu qui était précédemment dans Voxel, non accessible au public, a été déplacé et réécrit, comme des éléments administrateurs, des analyses de données, de la Recherche et développement, des éléments techniques qui ne doivent pas être accessibles au public.



# Voxel Studio - Schema
Voxel Studio qui était anciennement le configurateur d'enchantement, a été entièrement réécrit et reçoit un redesign complet, avec des changements majeurs :
1. Le plus important, il n'est plus limité aux enchantements mais supporte différents concepts, il peut maintenant gérer les Recettes, les récompenses et les structures.
2. Il a reçu une refonte visuelle complète, permettant pour l'avenir plus de flexibilité et plus de possibilités pour intégrer davantage de concepts.
3. Le configurateur est maintenant dynamique, avant l'intégralité du configurateur était chargée ce qui était très lourd pour le navigateur et aussi pour les utilisateurs qui avaient une faible connexion.
   - Maintenant les clés de traductions sont chargées au fur et à mesure que vous cliquez sur les différents onglets.
   - Les différents menus se chargent aussi au fur et à mesure que vous cliquez dessus, grâce à un système de "Schemas"
4. Une refonte technique assez conséquente.

Plus de détails sur cet article : [Voxel Studio - Schema](/fr-fr/blog/voxel-studio-schema)

Merci pour votre patience, et à bientôt sur Voxel.
