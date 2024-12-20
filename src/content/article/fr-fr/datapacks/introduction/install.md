---
draft: false
author: "Hardel"
---

# Installation de l'environnement de développement avec IntelliJ IDEA

Bienvenue dans l'univers passionnant du modding Minecraft, où votre créativité peut s'exprimer sans limites grâce à
Forge pour la version 1.20. Ce guide est conçu pour vous accompagner dans les premiers pas de la mise en place de votre
environnement de développement avec IntelliJ IDEA, un choix incontournable pour un travail efficace et agréable.

## Avant de Plonger dans le Modding

**Ce dont vous aurez besoin:**

-   **Minecraft Java Edition**: La toile vierge sur laquelle vous allez peindre vos idées.
-   **IntelliJ IDEA**: Notre atelier d'artiste, où les idées prennent forme. Assurez-vous de l'avoir installé.
-   **JDK (Java Development Kit) version 8 ou ultérieure**: Les pinceaux de notre atelier. Si vous êtes nouveau dans le
    monde de Java, je vous recommande fortement de suivre une formation dédiée à Java pour solidifier vos bases.

## Télécharger et Installer Forge

Rendez-vous sur [https://files.minecraftforge.net/](https://files.minecraftforge.net/) et sélectionnez la version 1.20
de Minecraft. Vous y trouverez l'option "Installer MDK" (Mod Development Kit). Téléchargez ce fichier; il contient tout
le nécessaire pour démarrer votre aventure dans le modding. Le choix de la version 1.20 n'est pas anodin, elle
représente la dernière stabilité et innovation en termes de modding avec Forge.

## Mettre en Place l'Environnement de Développement avec IntelliJ IDEA

Après avoir extrait le contenu du MDK téléchargé, ouvrez IntelliJ IDEA et importez le dossier comme un nouveau projet.
IntelliJ IDEA est conçu pour faciliter la vie des développeurs, et son intégration avec Gradle rend le processus presque
magique.

-   Dans IntelliJ, sélectionnez `File > New > Project from Existing Sources...` et naviguez jusqu'au dossier que vous avez
    extrait.
-   IntelliJ détectera le projet Gradle. Suivez les instructions à l'écran, en vous assurant de choisir la version JDK
    appropriée pour votre projet. Cela va configurer l'environnement de développement et préparer le terrain pour vos
    futures créations.

## Préparation et Configuration Initiale du Projet

Avec IntelliJ ouvert et votre projet importé, il est temps de préparer l'environnement de développement spécifique à
Forge. Ouvrez un terminal intégré à IntelliJ et exécutez la commande `./gradlew genIntellijRuns`. Cette étape est
cruciale; elle génère les configurations nécessaires pour lancer et tester Minecraft directement depuis l'IDE, intégrant
automatiquement votre mod en cours de développement.

Une fois la commande exécutée, rafraîchissez votre projet dans IntelliJ pour que les changements prennent effet. Vous
verrez apparaître les tâches de build et de run spécifiques à Minecraft, vous permettant de lancer le jeu avec votre mod
en développement.

## Premier Lancement et Test

Maintenant que tout est en place, il est temps de voir le résultat de votre travail. Sélectionnez la configuration de
lancement 'Minecraft Client' dans IntelliJ et appuyez sur le bouton de lancement. Minecraft va démarrer avec Forge
installé, prêt à accueillir vos mods.

## Conclusion et Prochaines Étapes

Félicitations, vous avez franchi la première étape vers la création de mods Minecraft avec Forge pour la version 1.20.
Cet environnement est votre laboratoire, où vous pouvez expérimenter, apprendre et créer sans limites. N'hésitez pas à
explorer la documentation de Forge, à participer aux forums et à échanger avec la communauté pour enrichir vos
connaissances et compétences en modding.

Le modding est un voyage de découverte et de création. Chaque ligne de code vous rapproche de la réalisation de vos
idées. Bon modding!
