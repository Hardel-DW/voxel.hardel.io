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
import { getTranslations } from "@/lib/i18n";
import { useEffect, useState } from "react";

interface Props {
    url: URL;
    lang: string;
}

export default function NavBarItem(props: Props) {
    const [translate, setTranslate] = useState<any>();

    useEffect(() => {
        getTranslations(props.url).then((res) => {
            setTranslate(res.translate);
        });
    }, [props.url]);

    if (!translate) {
        return <div className="w-96 h-6 animate-pulse bg-zinc-900/50 rounded-3xl" />;
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        href={`/${props.lang}/blog`}
                        className="px-4 py-2 rounded-3xl cursor-pointer text-[16px] tracking-wide transition text-zinc-400 hover:text-white inline-flex h-10 w-max items-center justify-center bg-transparent hover:bg-zinc-900 focus:bg-zinc-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                        {translate["navbar.item.blog"]}
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>{translate["navbar.item.data_pack"]}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-6 space-y-6 md:w-[400px] lg:w-[500px]">
                            <HeroItem
                                image={"/images/background/modrinth.webp"}
                                href={"https://modrinth.com/user/Hardel-DW"}
                                title={translate["navbar.data_pack.modrinth.title"]}
                            >
                                {translate["navbar.data_pack.modrinth.description"]}
                            </HeroItem>
                            <HeroItem
                                href={`/${props.lang}/datapacks/neoenchant`}
                                image={"/images/background/datapacks/neoenchant.webp"}
                                title={translate["navbar.data_pack.neoenchant.title"]}
                            >
                                {translate["navbar.data_pack.neoenchant.description"]}
                            </HeroItem>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>{translate["navbar.item.resources"]}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-6 md:w-[400px] lg:w-[500px]">
                            <HeroItem
                                href={`/${props.lang}/tools/enchant`}
                                image={"/images/background/tools/enchant-configurator.webp"}
                                title={translate["navbar.resources.tool.enchant.title"]}
                            >
                                {translate["navbar.resources.tool.enchant.description"]}
                            </HeroItem>
                            <ul className="grid gap-3 mt-3 lg:grid-cols-[.75fr_1fr]">
                                <ListItem href={`/${props.lang}/soon`} title={translate["navbar.resources.code.title"]}>
                                    {translate["navbar.resources.code.description"]}
                                </ListItem>
                                <ListItem href={`/${props.lang}/soon`} title={translate["navbar.resources.textures.title"]}>
                                    {translate["navbar.resources.textures.description"]}
                                </ListItem>
                                <ListItem href={`/${props.lang}/soon`} title={translate["navbar.resources.model.title"]}>
                                    {translate["navbar.resources.model.description"]}
                                </ListItem>
                                <ListItem href={`/${props.lang}/soon`} title={translate["navbar.resources.sound.title"]}>
                                    {translate["navbar.resources.sound.description"]}
                                </ListItem>
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink
                        href={`/${props.lang}/contact`}
                        className="px-4 py-2 rounded-3xl cursor-pointer text-[16px] tracking-wide transition text-zinc-400 hover:text-white inline-flex h-10 w-max items-center justify-center bg-transparent hover:bg-zinc-900 focus:bg-zinc-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                        {translate["navbar.item.contact"]}
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
