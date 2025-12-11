---
draft: false
title: "Voxel's roadmap - 2025"
snippet: "Voxel's goals for 2024 and 2025. The roadmap of future projects"
imageSrc: "/images/background/blog/roadmap-2025.webp"
imageAlt: "Voxel Roadmap"
author: "hardel"
publishDate: "2024-11-02"
category: "Voxel"
---

# Voxel's roadmap - 2025
I am very excited to present you Voxel's roadmap for 2025.

## Update announcements - Next week

First, a small announcement: content updates for Yggdrasil 2.0.0 and NeoEnchant
5.7.0 will be available in the coming week, including eight new enchantments,
reworks, balancing and performance improvements.

As well as two new structures: "The Asflors Village" and "The Runic Fracture",
as well as a variant of **Alfheim**: "The Dark Alfheim". This update includes a
deep story, balancing and unique items.

![Runic Fracture](/images/background/blog/runic_fracture.jpg)

## The enchantment configurator will also receive an update.

- Support for new structures with a redesign of the Yggdrasil section for more
  customization and simplicity.
- New tabs to manage "non-combinable" enchantments.
- A new "Settings" button to manage datapack information.
- Redesign of texts in certain sections and their explanations.

![exclusive](/images/background/blog/roadmap/exclusive.webp)



# Retrospective - 2024

Voxel was initially created to provide resources in programming, Java, modding,
shaders, resource packs and datapacks, while deepening the understanding of how
Minecraft works.

Voxel has changed course and evolved to become a platform providing a Minecraft
content customization experience, notably through its datapack configurator.

This configurator was initially intended to modify the enchantments of any
Minecraft data pack, it has undergone several evolutions throughout the year.

- After massive use, I decided to proceed with an internal rewrite. The goal was
  to transform the project into an engine allowing to create several types of
  configurators for any type of Minecraft content.

- Shortly after, a second rewrite step was undertaken. The goal this time was to
  be able to load the configurator from a simple data file. This functionality
  is not yet exploited, but it will have a significant impact in the future,
  allowing to use multiple contents at the same time.

- A few months later, the configurator was extended to support Minecraft mods,
  whether Forge, NeoForge, Quilt or Fabric, an important step.

- And for the end of this year, the configurator has recently received huge
  internal evolutions, notably the export of part of the code in JavaScript
  dependencies, but that is much too technical to talk about here. I will make
  an article specifically about the internal workings of the configurator.



# Voxel Studio - New project

Voxel Studio is under development and will address various needs. Thanks to a
**Visual Programming** interface, it allows you to create and manipulate
datapacks without any line of code. Inspired by powerful tools such as
**Unity**, **Unreal Engine** and **Blender**, Voxel Studio offers simple,
intuitive and visual control of your creations.

- For users: These tools will be integrated into the configurator to manage
complex elements, like enchantment effects (balancing, adding new effects, etc.)

- For developers, this will allow you to manage your datapacks, facilitating
faster, more efficient and better organized work.

![Studio](/images/background/blog/roadmap/studio.webp)



# Voxelia - Artificial Intelligence

Voxelia is a project intended for the configurator and studio. It will
integrate artificial intelligence features. From a simple text prompt, you will
be able to modify balancing and create content. It will offer you suggestions,
all while staying in the configurator and studio environment.

Concrete example of my vision for Voxelia:

- "Hey, I want to modify the Alfheim structure and add torches in common
chests."
- "I would like to create an enchantment that allows walking on lava, which
will be found in the enchantment table and in the Nether."
- "I would like to edit all recipes related to this content (...)."

Moreover, thanks to the previously mentioned "content validation", this
theoretically cannot propose things that don't exist and ensure your content
will load correctly on Minecraft without possibility of errors. In case of
errors, the AI will understand the errors sent and apply solutions
automatically in the background.



# World Generation Configurator
This will be the central point of 2025. I wish to extend the configurator to
more content.

I plan to develop everything related to world generation, including **biomes**,
**structures**, **dimensions** and **trial generators**. Concretely:

- You will be able to disable biomes, structures and dimensions of a pack with
  ease.
- Adjust combat difficulty and monsters.
- Modify rewards for balancing.
- (Under consideration) Manage content that generates in a biome, tree density,
  which ores appear and at what layer, etc.

## Future Content Configurator

I remain reactive to snapshots. If Minecraft undertakes to add **custom items**
or **custom potion effects** for 1.21.4..., or 1.22, this content will become
my priority and will be supported in the configurator as soon as possible.

## Other Datapack Features

What about other datapack features, that is, the following elements:

- **Advancements**
- **Damage Types**
- **Armor Trim**
- **Wolf Variants**
- **Jukebox Sounds**
- **Banner Patterns**
- **Instruments**
- **Recipes**
- **Predicates**
- **Item Modifiers**
- **Loot Tables**

These elements are simpler to integrate and will be supported in parallel in the
configurator, without being priority. Some, like **predicates** and **Item
Modifiers**, will not be directly configurable to preserve intuitive and
simplified use. These technical features will work in the background, without
requiring intervention on your part.

## Custom Configurator

And one last info: thanks to the configurator overhaul, and as it can now load
from a data file, datapacks/mods will be able to include a configurator
directly in their datapacks/mods. This will allow creating custom configurators
specific to their content.

Here are some examples:

- **Mystical Agriculture**: configurator to manage, modify, add or remove
  plants.
- **Productive Bees**: configurator to manage, modify, add or remove bees.



# Other projects
Here, I will present you the other projects I have in mind for Voxel, two of
them are already under development, but are technical projects.

### Data Pack Converter

This project was not initially planned, but thanks to recent evolutions and new
dependencies under development, this functionality will be simple and quick to
implement. The goal is to allow the conversion of datapacks from one Minecraft
version to another without loss of functionality. Misode already offers this
service on his site, and I wish to develop it as well and integrate it into my
internal tools. This functionality will be used for the configurator as well as
for future projects like Voxel Studio, facilitating the transition between
different Minecraft versions.

### Content Validation

Content validation is an intelligent system that analyzes your datapacks and
mods in the background to automatically detect potential errors. Errors are
automatically corrected in the background.

### The Voxel Application - Desktop Application

This is just an idea, but this project is close to my heart. It will allow
obtaining "Voxel Studio", "Voxelia" and the configurator in a desktop
application, intended for players, but also developers.

This version will be able to directly find the location of your datapacks/mods,
a significant time saving.

For developers, the interest is to be able to continue using your favorite code
editor and have Voxel in parallel to manage your datapacks/mods like with
Unity. You can modify your scripts and see changes in real time in the
application.



# Voxel Funding

Voxel is a recent project, and I don't hide from you that the means of living
from it are non-existent, but despite everything, I love what I do and what we
have been able to bring to the Minecraft ecosystem.

I wish to integrate a way to live from this project, but I haven't yet found
the ideal way. What is planned is to continue exclusivities on Patreon, but
also to include Google ads, but not in an intrusive way. I wish to have a
balance like Modrinth has done.

# Conclusion

So, that's Voxel for 2024 and 2025. I am very happy to present all this to you
and I can't wait to show you all these features. If you have any questions or
suggestions, don't hesitate to share them with me. Thank you for your reading
and see you soon on Voxel.
