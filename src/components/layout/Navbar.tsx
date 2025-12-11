import { Link, useParams } from "@tanstack/react-router";
import { t } from "@/lib/i18n";
import HeroCard from "./navbar/HeroCard";
import Internalization from "./navbar/internalization";
import ListItem from "./navbar/ListItem";
import MobileMenuButton from "./navbar/MobileMenuButton";
import MobileNavigationContainer from "./navbar/MobileNavigationContainer";
import NavbarScrollFade from "./navbar/NavbarScrollFade";
import Navigation from "./navbar/Navigation";
import NavigationDropdown from "./navbar/NavigationDropdown";
import NavigationList from "./navbar/NavigationList";

const studioUrl = import.meta.env.VITE_VOXEL_STUDIO_URL;

function SocialLinks({ lang }: { lang: string }) {
    const translate = t(lang);
    const socials = [
        { name: "x", href: "https://x.com/VoxelioStudio", label: translate("navbar.social.x.label") },
        { name: "bluesky", href: "https://bsky.app/profile/voxelstudio.bsky.social", label: translate("navbar.social.bluesky.label") },
        { name: "discord", href: "https://discord.gg/TAmVFvkHep", label: translate("navbar.social.discord.label") }
    ];

    return (
        <div className="flex items-center gap-2">
            {socials.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <img
                        src={`/icons/company/${social.name}.svg`}
                        alt="Social Icon"
                        className="w-6 h-6 invert mx-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-150 ease-linear"
                    />
                </a>
            ))}
        </div>
    );
}

export default function Navbar() {
    const { lang } = useParams({ from: "/$lang" });
    const translate = t(lang);

    const links = {
        blog: "/$lang/blog",
        packs: "/$lang/packs/neoenchant",
        resources: "/$lang/resources/asset",
        contact: "/$lang/contact"
    };

    return (
        <header id="header" className="mt-8 fixed left-0 right-0 z-50 group">
            <NavbarScrollFade>
                <div className="flex items-center gap-4 pl-2">
                    <Link to="/$lang" params={{ lang }} className="flex items-center gap-x-4">
                        <img src="/icons/logo.svg" alt="Voxel Logo" className="w-6 h-6 brightness-90 mx-2" />
                        <span className="text-lg text-white font-bold">VOXEL</span>
                    </Link>

                    <div className="hidden md:block">
                        <Navigation>
                            <NavigationList>
                                <li>
                                    <Link
                                        to="/$lang/blog"
                                        params={{ lang }}
                                        search={{ page: 1 }}
                                        className="px-4 py-2 rounded-3xl cursor-pointer text-[16px] tracking-wide transition text-zinc-400 hover:text-white inline-flex h-10 w-max items-center justify-center bg-transparent hover:bg-zinc-900 focus:bg-zinc-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                        {translate("navbar.item.blog")}
                                    </Link>
                                </li>

                                <NavigationDropdown label={translate("navbar.item.data_pack")}>
                                    <div className="p-6 space-y-6 md:w-[400px] lg:w-[500px]">
                                        <HeroCard
                                            title={translate("navbar.datapack.modrinth.title")}
                                            description={translate("navbar.datapack.modrinth.description")}
                                            image="/images/background/modrinth.webp"
                                            to="/$lang/modrinth"
                                            params={{ lang }}
                                        />
                                        <ul className="grid gap-3 mt-3">
                                            <ListItem
                                                to="/$lang/packs/neoenchant"
                                                params={{ lang }}
                                                title={translate("navbar.datapack.neoenchant.title")}
                                                image="/images/features/title/ne.png">
                                                {translate("navbar.datapack.neoenchant.description")}
                                            </ListItem>
                                            <ListItem
                                                to="/$lang/packs/yggdrasil"
                                                params={{ lang }}
                                                title={translate("navbar.datapack.yggdrasil.title")}
                                                image="/images/features/title/yg.webp">
                                                {translate("navbar.datapack.yggdrasil.description")}
                                            </ListItem>
                                        </ul>
                                    </div>
                                </NavigationDropdown>

                                <NavigationDropdown label={translate("navbar.item.resources")}>
                                    <div className="p-6 md:w-[400px] lg:w-[500px]">
                                        <HeroCard
                                            to="/$lang/studio"
                                            params={{ lang }}
                                            title={translate("navbar.resources.tool.enchant.title")}
                                            description={translate("navbar.resources.tool.enchant.description")}
                                            image="/images/background/tools/configurator.webp"
                                        />
                                        <ul className="grid gap-3 mt-3 lg:grid-cols-[.75fr_1fr]">
                                            <ListItem href={`${studioUrl}/${lang}/harmonization`} title={translate("navbar.resources.harmonization.title")}>
                                                {translate("navbar.resources.harmonization.description")}
                                            </ListItem>
                                            <ListItem to="/$lang/resources/asset" params={{ lang }} title={translate("navbar.resources.asset.title")}>
                                                {translate("navbar.resources.asset.description")}
                                            </ListItem>
                                            <ListItem href={`${studioUrl}/${lang}/converter`} title={translate("navbar.resources.converter.title")}>
                                                {translate("navbar.resources.converter.description")}
                                            </ListItem>
                                            <ListItem href={`${studioUrl}/${lang}/migration`} title={translate("navbar.resources.migration.title")}>
                                                {translate("navbar.resources.migration.description")}
                                            </ListItem>
                                        </ul>
                                    </div>
                                </NavigationDropdown>

                                <li>
                                    <Link
                                        to="/$lang/contact"
                                        params={{ lang }}
                                        className="px-4 py-2 rounded-3xl cursor-pointer text-[16px] tracking-wide transition text-zinc-400 hover:text-white inline-flex h-10 w-max items-center justify-center bg-transparent hover:bg-zinc-900 focus:bg-zinc-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                                        {translate("navbar.item.contact")}
                                    </Link>
                                </li>
                            </NavigationList>
                        </Navigation>
                    </div>
                </div>

                <div>
                    <div className="hidden lg:flex items-center gap-2 px-4">
                        <Internalization />
                        <SocialLinks lang={lang} />
                    </div>

                    <div className="lg:hidden inline-block">
                        <MobileMenuButton />
                    </div>
                </div>
            </NavbarScrollFade>
            <MobileNavigationContainer>
                <div className="size-full flex flex-col gap-y-2">
                    <div className="py-2">
                        {Object.entries(links).map(([key, value]) => (
                            <Link
                                key={key}
                                to={value}
                                params={{ lang }}
                                className="rounded-3xl px-4 py-3 leading-none flex justify-between transition-colors text-zinc-400 hover:bg-zinc-700/10 hover:text-white">
                                <span>{translate(`navbar.item.${key}`)}</span>
                                <img src="/icons/chevron-right.svg" alt="" className="w-4 h-4 invert" />
                            </Link>
                        ))}
                    </div>
                    <div className="mb-4 flex justify-center gap-x-4 sm:gap-x-8 pt-2 border-t border-zinc-700/50">
                        <SocialLinks lang={lang} />
                    </div>
                    <div className="flex justify-center pb-2">
                        <Internalization />
                    </div>
                </div>
            </MobileNavigationContainer>
        </header>
    );
}
