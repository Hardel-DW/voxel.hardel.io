import {
    HeroItem,
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/shadcn/navigation.tsx";
import type { TranslationRecord } from "@/lib/i18n";

interface Props {
    translate: TranslationRecord;
    lang: string;
}

export default function NavBarItem({ translate, lang }: Props) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        href={`/${lang}/blog`}
                        className="px-4 py-2 rounded-3xl cursor-pointer text-[16px] tracking-wide transition text-zinc-400 hover:text-white inline-flex h-10 w-max items-center justify-center bg-transparent hover:bg-zinc-900 focus:bg-zinc-700 focus:text-white focus:outline-hidden disabled:pointer-events-none disabled:opacity-50">
                        {translate["navbar.item.blog"]}
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>{translate["navbar.item.data_pack"]}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-6 space-y-6 md:w-[400px] lg:w-[500px]">
                            <HeroItem
                                image={"/images/background/blog/runic_fracture.jpg"}
                                href={"https://modrinth.com/user/Hardel-DW"}
                                title={translate["navbar.datapack.modrinth.title"]}>
                                {translate["navbar.datapack.modrinth.description"]}
                            </HeroItem>
                            <ul className="grid gap-3 mt-3 ">
                                <ListItem
                                    image={"/images/features/title/ne.png"}
                                    href={`/${lang}/datapacks/neoenchant`}
                                    title={translate["navbar.datapack.neoenchant.title"]}>
                                    {translate["navbar.datapack.neoenchant.description"]}
                                </ListItem>
                                <ListItem
                                    image={"/images/features/title/yg.webp"}
                                    href={`/${lang}/datapacks/yggdrasil`}
                                    title={translate["navbar.datapack.yggdrasil.title"]}>
                                    {translate["navbar.datapack.yggdrasil.description"]}
                                </ListItem>
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>{translate["navbar.item.resources"]}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-6 md:w-[400px] lg:w-[500px]">
                            <HeroItem
                                href={`/${lang}/tools/enchant`}
                                image={"/images/background/tools/enchant-configurator.webp"}
                                title={translate["navbar.resources.tool.enchant.title"]}>
                                {translate["navbar.resources.tool.enchant.description"]}
                            </HeroItem>
                            <ul className="grid gap-3 mt-3 lg:grid-cols-[.75fr_1fr]">
                                <ListItem href={`/${lang}/tools/harmonization`} title={translate["navbar.resources.harmonization.title"]}>
                                    {translate["navbar.resources.harmonization.description"]}
                                </ListItem>
                                <ListItem href={`/${lang}/resources/asset`} title={translate["navbar.resources.asset.title"]}>
                                    {translate["navbar.resources.asset.description"]}
                                </ListItem>
                                <ListItem href={`/${lang}/soon`} title={translate["navbar.resources.sound.title"]}>
                                    {translate["navbar.resources.sound.description"]}
                                </ListItem>
                                <ListItem href={`/${lang}/tools/migration`} title={translate["navbar.resources.migration.title"]}>
                                    {translate["navbar.resources.migration.description"]}
                                </ListItem>
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        href={`/${lang}/contact`}
                        className="px-4 py-2 rounded-3xl cursor-pointer text-[16px] tracking-wide transition text-zinc-400 hover:text-white inline-flex h-10 w-max items-center justify-center bg-transparent hover:bg-zinc-900 focus:bg-zinc-700 focus:text-white focus:outline-hidden disabled:pointer-events-none disabled:opacity-50">
                        {translate["navbar.item.contact"]}
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
