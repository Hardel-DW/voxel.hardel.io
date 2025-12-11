import { createFileRoute } from "@tanstack/react-router";
import CompoundLayout from "@/components/layout/CompoundLayout";
import { DashedPattern } from "@/components/ui/DashedPattern";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/contact")({
    component: ContactPage,
    head: ({ params }) => {
        const translate = t(params.lang);
        return {
            meta: [{ title: translate("contact.seo.title") }, { name: "description", content: translate("contact.seo.description") }]
        };
    }
});

function ContactPage() {
    const { lang } = Route.useParams();
    const translate = t(lang);

    const contacts = [
        {
            name: translate("contact.discord.name"),
            icon: "/icons/company/discord.svg",
            link: "https://discord.gg/TAmVFvkHep",
            description: translate("contact.discord.description"),
            button: translate("generic.join_us")
        },
        {
            name: translate("contact.twitter.name"),
            icon: "/icons/company/twitter.svg",
            link: "https://twitter.com/VoxelioStudio",
            description: translate("contact.twitter.description"),
            button: "@Voxel"
        },
        {
            name: translate("contact.github.name"),
            icon: "/icons/company/github.svg",
            link: "https://github.com/Hardel-DW",
            description: translate("contact.github.description"),
            button: "@Hardel-DW"
        },
        {
            name: translate("contact.mail.name"),
            icon: "/icons/mail.svg",
            link: "mailto:teams.voxel@gmail.com",
            description: translate("contact.mail.description"),
            button: translate("generic.contact_us")
        },
        {
            name: translate("contact.discord_mp.name"),
            icon: "/icons/company/discord.svg",
            link: "https://discord.com/users/hardel",
            description: translate("contact.discord_mp.description"),
            button: translate("generic.private_message")
        }
    ];

    return (
        <CompoundLayout>
            <div className="relative">
                <img
                    className="hidden xl:block absolute left-0 rotate-90 opacity-10 h-full mask-[radial-gradient(100%_100%_at_bottom_left,white,transparent_90%)]"
                    src="/icons/circle.svg"
                    alt="box"
                />
                <img
                    className="hidden xl:block absolute right-0 top-20 -rotate-90 opacity-20 h-full mask-[radial-gradient(100%_100%_at_bottom_left,white,transparent_90%)]"
                    src="/icons/circle.svg"
                    alt="box"
                />

                <section className="mt-32 mb-20 w-11/12 xl:w-3/4 mx-auto grid grid-cols-6 gap-10 relative">
                    <div className="col-span-6 h-72 md:h-96 relative flex items-center justify-center border border-zinc-800 rounded-xl">
                        <DashedPattern />
                        <div>
                            <h1 className="text-4xl md:text-7xl -tracking-wide text-center font-semibold mb-2">
                                {translate("generic.contact_us")}
                            </h1>
                            <div className="w-1/2 h-2 bg-white mx-auto rounded-xl" />
                        </div>
                    </div>

                    {contacts.map((item) => (
                        <div
                            key={item.name}
                            className="col-span-6 sm:col-span-3 xl:col-span-2 relative border overflow-hidden border-zinc-800 rounded-xl">
                            <DashedPattern />

                            <div className="p-8 h-full flex flex-col justify-between">
                                <div>
                                    <img src={item.icon} alt={item.name} className="w-12 h-12 invert opacity-90" />
                                    <h2 className="text-2xl font-semibold mt-4">{item.name}</h2>
                                    <p className="mt-2 text-zinc-400">{item.description}</p>
                                </div>

                                <a
                                    href={item.link}
                                    className="mt-8 w-full md:w-fit inline-flex items-center justify-center rounded-md px-4 py-2 bg-white text-black hover:bg-zinc-200 transition-colors">
                                    {item.button}
                                </a>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </CompoundLayout>
    );
}
