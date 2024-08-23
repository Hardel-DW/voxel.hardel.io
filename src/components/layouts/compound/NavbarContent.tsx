import {
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation.tsx";
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
                    <a href={`/${props.lang}`}>
                        <NavigationMenuTrigger>{translate["navbar.item.home"]}</NavigationMenuTrigger>
                    </a>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-2xl bg-gradient-to-b to-zinc-950/50 from-zinc-700/50 p-6 no-underline outline-none focus:shadow-md"
                                        href={`/${props.lang}`}
                                    >
                                        <img src="/favicon.svg" alt="Voxel" className="w-12 h-12" />
                                        <div className="mb-2 mt-4 text-lg font-bold">{translate["generic.website"]}</div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            {translate["navbar.home.description"]}
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="https://hardel.io" title="Labs de Hardel">
                                {translate["navbar.home.labs"]}
                            </ListItem>
                            <ListItem href="https://hardel.io" title="Chengelog">
                                {translate["navbar.home.changelog"]}
                            </ListItem>
                            <ListItem href="/privacy" title="Legal">
                                {translate["navbar.home.policy"]}
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/*
                <NavigationMenuItem>
                    <a href="/soon">
                        <NavigationMenuTrigger>{translate["navbar.item.guides"]}</NavigationMenuTrigger>
                    </a>
                    <NavigationMenuContent>
                        <div className="p-6 md:w-[400px] lg:w-[500px]">
                            <a
                                href="/soon"
                                className="h-40 group/picture relative cursor-pointer flex flex-col justify-end select-none gap-1 p-3"
                            >
                                <div className="text-xl font-medium text-white leading-none relative z-10">
                                    {translate["navbar.guides.title"]}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-zinc-400">{translate["navbar.guides.description"]}</p>

                                <span
                                    className="absolute bg-cover rounded-2xl bg-center bg-no-repeat inset-0 size-full z-0 opacity-100 group-hover/picture:opacity-70 transition-opacity duration-200"
                                    style={{
                                        backgroundImage: "url('/images/background/bees.webp')",
                                        maskImage: "linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1))"
                                    }}
                                />
                            </a>
                            <ul className="grid gap-3 mt-3 lg:grid-cols-[.75fr_1fr]">
                                <ListItem href="/soon" title={translate["navbar.guides.java.title"]}>
                                    {translate["navbar.guides.java.description"]}
                                </ListItem>
                                <ListItem href="/soon" title={translate["navbar.guides.minecraft.title"]}>
                                    {translate["navbar.guides.minecraft.description"]}
                                </ListItem>
                                <ListItem href="/soon" title={translate["navbar.guides.fabric.title"]}>
                                    {translate["navbar.guides.fabric.description"]}
                                </ListItem>
                                <ListItem href="/soon" title={translate["navbar.guides.forge.title"]}>
                                    {translate["navbar.guides.forge.description"]}
                                </ListItem>
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
*/}

                <NavigationMenuItem>
                    <NavigationMenuTrigger>{translate["navbar.item.data_pack"]}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-6 md:w-[400px] lg:w-[500px]">
                            <a
                                href={`/${props.lang}/datapacks/neoenchant`}
                                className="h-40 group/picture relative cursor-pointer flex flex-col justify-end select-none gap-1 p-3"
                            >
                                <div className="text-xl font-medium text-white leading-none relative z-10">
                                    {translate["navbar.data_pack.neoenchant.title"]}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                                    {translate["navbar.data_pack.neoenchant.description"]}
                                </p>

                                <span
                                    className="absolute bg-cover rounded-2xl bg-center bg-no-repeat inset-0 size-full z-0 opacity-100 group-hover/picture:opacity-70 transition-opacity duration-200"
                                    style={{
                                        backgroundImage: "url('/images/background/datapacks/neoenchant.webp')",
                                        maskImage: "linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1))"
                                    }}
                                />
                            </a>
                            <ul className="mt-3">
                                <ListItem href={"https://modrinth.com/user/Hardel-DW"} title={translate["navbar.data_pack.modrinth.title"]}>
                                    {translate["navbar.data_pack.modrinth.description"]}
                                </ListItem>
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>{translate["navbar.item.resources"]}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-6 md:w-[400px] lg:w-[500px]">
                            <a
                                href={`/${props.lang}/tools/enchant`}
                                className="h-40 group/picture relative cursor-pointer flex flex-col justify-end select-none gap-1 p-3"
                            >
                                <div className="text-xl font-medium text-white leading-none relative z-10">
                                    {translate["navbar.resources.tool.enchant.title"]}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                                    {translate["navbar.resources.tool.enchant.description"]}
                                </p>

                                <span
                                    className="absolute bg-cover rounded-2xl bg-center bg-no-repeat inset-0 size-full z-0 opacity-100 group-hover/picture:opacity-70 transition-opacity duration-200"
                                    style={{
                                        backgroundImage: "url('/images/background/tools/enchant-configurator.webp')",
                                        maskImage: "linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1))"
                                    }}
                                />
                            </a>
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
