import {
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/shadcn/navigation";

export default function NavBarItem() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Accueil</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b to-zinc-950/50 from-zinc-700/50 p-6 no-underline outline-none focus:shadow-md"
                                        href="/public"
                                    >
                                        <img src="/favicon.svg" alt="Voxel" className="w-12 h-12" />
                                        <div className="mb-2 mt-4 text-lg font-bold">VOXEL</div>
                                        <p className="text-sm leading-tight text-muted-foreground">Developpe les mods de t'es rêves</p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="https://hardel.io" title="Labs de Hardel">
                                Le créateur de Voxel, des outils expérimentaux pour Minecraft
                            </ListItem>
                            <ListItem href="https://hardel.io" title="Chengelog">
                                Les dernières nouveautés et les mises à jour de Voxel
                            </ListItem>
                            <ListItem href="/policy" title="Legal">
                                Les mentions légales, la politique de confidentialité et les conditions d'utilisation
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-6 md:w-[400px] lg:w-[500px]">
                            <a
                                href="/course"
                                className="h-40 group relative cursor-pointer flex flex-col justify-end select-none gap-1 p-3"
                            >
                                <div className="text-xl font-medium text-white leading-none relative z-10">Minecraft Modding - 1.20</div>
                                <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                                    Apprend a faire des mods avec Java en version 1.20 sous Forge ou Fabric - Sans connaissance au préalable
                                    !
                                </p>

                                <span
                                    className="absolute bg-cover rounded-2xl bg-center bg-no-repeat inset-0 size-full z-0 opacity-100 group-hover:opacity-70 transition-opacity duration-200"
                                    style={{
                                        backgroundImage: "url('/images/background/bees.webp')",
                                        maskImage: "linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1))"
                                    }}
                                />
                            </a>
                            <hr />
                            <ul className="grid gap-3 mt-3 lg:grid-cols-[.75fr_1fr]">
                                <ListItem href="/docs" title="Java pour Minecraft">
                                    Apprendre les bases de Java pour Minecraft
                                </ListItem>
                                <ListItem href="/docs/installation" title="Migrations">
                                    Guide pour migrer ton mod vers une nouvelle version de Minecraft
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Fabric">
                                    Apprendre a faire des mods avec Fabric
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Forge">
                                    Apprendre a faire des mods avec Forge
                                </ListItem>
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Ressource</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <ListItem href="/docs/primitives/typography" title="Exemple de code">
                                Des codes sources a ta disposition, simple et comphréensible
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Texture">
                                Des textures libre de droit pour t'aider dans la création de contenu
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Model 3D">
                                Des models 3D pour t'aider dans la création de contenu
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Sons">
                                Des sons libre de droit pour t'aider dans la création de contenu
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        href="/contact"
                        className="px-4 py-2 rounded-3xl cursor-pointer text-[16px] tracking-wide transition text-zinc-400 hover:text-white inline-flex h-10 w-max items-center justify-center bg-transparent hover:bg-zinc-900 focus:bg-zinc-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                        Contact
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
