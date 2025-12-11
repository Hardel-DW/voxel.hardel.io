import { Link, useParams } from "@tanstack/react-router";
import { t } from "@/lib/i18n";

const studioUrl = import.meta.env.VITE_VOXEL_STUDIO_URL;
export default function Footer() {
    const { lang } = useParams({ from: "/$lang" });
    const translate = t(lang);

    const footerContent = [
        {
            name: translate("footer.content.navigation"),
            links: {
                "/$lang": translate("footer.content.navigation.home"),
                "/$lang/packs/neoenchant": translate("footer.content.navigation.packs"),
                "/$lang/contact": translate("footer.content.navigation.contact")
            }
        },
        {
            name: translate("footer.content.other"),
            links: {
                "/$lang/blog": translate("footer.content.navigation.blog"),
                "/$lang/update/studio": translate("footer.content.other.studio_updates"),
                "/$lang/patchnote/neoenchant": translate("footer.content.other.patchnote.neoenchant"),
                "/$lang/patchnote/yggdrasil": translate("footer.content.other.patchnote.yggdrasil")
            }
        },
        {
            name: translate("footer.content.support"),
            links: {
                "/$lang/contact": translate("footer.content.support.help_center"),
                "/$lang/terms": translate("footer.content.support.term_of_service"),
                "/$lang/legal": translate("footer.content.support.legal"),
                "/$lang/privacy": translate("footer.content.support.privacy")
            }
        }
    ];

    const studioLinks = [
        {
            name: translate("footer.content.voxel_studio"),
            links: {
                "/studio": translate("footer.content.voxel_studio.studio"),
                "/harmonization": translate("footer.content.voxel_studio.harmonization"),
                "/converter": translate("footer.content.voxel_studio.converter"),
                "/migration": translate("footer.content.voxel_studio.migration")
            }
        }
    ];

    const socialLinks = [
        {
            name: "GitHub",
            path: "https://github.com/Hardel-DW",
            icon: "github.svg"
        },
        {
            name: "Twitter",
            path: "https://x.com/Hardel7401",
            icon: "x.svg"
        },
        {
            name: "Discord",
            path: "https://discord.gg/8z3tkQhay7",
            icon: "discord.svg"
        }
    ];

    return (
        <footer className="w-full px-4 pb-4 bg-linear-to-b from-transparent to-black/70">
            <div className="max-w-(--breakpoint-2xl) mx-auto border-t border-zinc-900 pt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-6 md:px-20">
                <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
                    <Link to="/$lang" params={{ lang }} className="text-lg flex items-center">
                        <img loading="lazy" src="/icons/logo.svg" alt="Voxel Logo" className="w-6 h-6 brightness-90 mr-2" />
                        <span className="text-lg text-white font-bold">VOXEL</span>
                    </Link>
                    <p className="mt-4 text-sm text-zinc-400 tracking-tight font-light max-w-xs">{translate("footer.description")}</p>
                    <div className="flex gap-3 mt-4 items-center">
                        {socialLinks.map((item) => (
                            <a
                                key={item.name}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-zinc-950 hover:bg-zinc-900 rounded-xs w-6 h-6 inline-flex items-center justify-center text-zinc-200"
                                aria-label={item.name}>
                                <img loading="lazy" src={`/icons/company/${item.icon}`} alt="" className="w-8 h-8 invert" />
                                <span className="sr-only">{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {footerContent.map((section) => (
                    <div key={section.name}>
                        <h3 className="font-medium text-sm text-zinc-200">{section.name}</h3>
                        <div className="flex flex-col mt-2">
                            {Object.entries(section.links).map(([to, title]) => (
                                <Link key={title} to={to} params={{ lang }} className="py-1 text-sm text-zinc-400 hover:text-zinc-200">
                                    {title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {studioLinks.map((section) => (
                    <div key={section.name}>
                        <h3 className="font-medium text-sm text-zinc-200">{section.name}</h3>
                        <div className="flex flex-col mt-2">
                            {Object.entries(section.links).map(([to, title]) => (
                                <a
                                    key={title}
                                    href={`${studioUrl}/${lang}${to}`}
                                    className="py-1 text-sm text-zinc-400 hover:text-zinc-200">
                                    {title}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center text-zinc-400 text-sm">
                <p className="text-sm mt-2 tracking-tight">
                    {translate("footer.copyright_left")} {new Date().getFullYear()} Voxel. {translate("footer.copyright_right")}.
                </p>
            </div>
        </footer>
    );
}
