import { createFileRoute } from "@tanstack/react-router";
import BlogCard from "@/components/BlogCard";
import CompoundLayout from "@/components/layout/CompoundLayout";
import Box from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import { DashedPattern } from "@/components/ui/DashedPattern";
import Fog from "@/components/ui/Fog";
import SlideIndicator from "@/components/ui/SlideIndicator";
import VortexSetup from "@/components/ui/vortex/VortexSetup";
import { blog } from "@/lib/content/BlogCollection";
import { useSlideshow } from "@/lib/hook/useSlideshow";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$lang/")({
    component: HomePage
});

function HomePage() {
    const { lang } = Route.useParams();
    const translate = t(lang);
    const studioUrl = import.meta.env.VITE_VOXEL_STUDIO_URL as string;

    const slides = [
        {
            title: translate("datapacks.neoenchant.personalize.title"),
            description: translate("datapacks.neoenchant.personalize.description"),
            image: "/images/background/tools/configurator.webp",
            button: {
                main: { href: studioUrl, text: translate("generic.start") },
                secondary: { to: "/$lang/blog/enchant-configurator", params: { lang }, text: translate("generic.learn_more") }
            }
        },
        {
            title: translate("home.resource.title"),
            description: translate("home.resource.description"),
            image: "/images/background/marketplace.webp",
            button: {
                main: { to: "/$lang/resources/asset", params: { lang }, text: translate("generic.take_a_look") },
                secondary: { to: "/$lang/resources/asset", params: { lang }, text: translate("generic.learn_more") }
            }
        },
        {
            title: translate("home.datapack.title"),
            description: translate("home.datapack.description"),
            image: "/images/background/datapack.webp",
            button: {
                main: { to: "/$lang", params: { lang }, text: translate("generic.take_a_look") },
                secondary: { to: "/$lang", params: { lang }, text: translate("generic.learn_more") }
            }
        },
        {
            title: translate("home.wiki.title"),
            description: translate("home.wiki.description"),
            image: "/images/tools/yggdrasil_loot.webp",
            button: {
                main: { to: "/$lang", params: { lang }, text: translate("generic.take_a_look") },
                secondary: { to: "/$lang", params: { lang }, text: translate("generic.learn_more") }
            }
        }
    ];

    const { currentIndex, isTransitioning, goTo } = useSlideshow({ count: slides.length });
    const slide = slides[currentIndex];

    return (
        <CompoundLayout>
            <div>
                <div className="absolute rounded-full w-3/4 h-1/2 bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 blur-[10rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                <div className="absolute inset-0 h-full overflow-hidden p-8 opacity-50">
                    <VortexSetup />
                </div>

                <section className="h-dvh" data-direction="horizontal">
                    <div className="absolute w-full inset-0 shadow-2xl bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 rounded-full blur-[10rem]" />

                    <div
                        className={cn(
                            "h-full w-3/4 mx-auto flex xl:grid grid-cols-2 items-center gap-8 transition-all duration-500",
                            isTransitioning ? "opacity-50" : "opacity-100"
                        )}>
                        <div className="h-full w-[95%] md:w-full mx-auto relative">
                            <div className="xl:invisible visible absolute flex justify-center items-center size-full -z-10">
                                <div className="absolute inset-0 top-1/2 -translate-y-1/2 shadow-2xl bg-linear-to-r from-pink-900 to-blue-900 opacity-50 rounded-full blur-[5rem]" />
                            </div>

                            <div className="size-full flex flex-col justify-center">
                                <small className="text-pink-700 font-bold tracking-wide text-[16px]">{translate("generic.section")}</small>
                                <h1 className="text-white text-4xl md:text-6xl font-bold mt-4 text-balance">{slide.title}</h1>
                                <p className="text-gray-300 mt-4">{slide.description}</p>

                                <div className="mt-8 flex gap-4">
                                    <Button
                                        href={slide.button.main.href}
                                        to={slide.button.main.to}
                                        params={slide.button.main.params}
                                        size="xl"
                                        variant="default">
                                        {slide.button.main.text}
                                    </Button>
                                    <Button to={slide.button.secondary.to} params={slide.button.secondary.params} size="xl" variant="ghost">
                                        {slide.button.secondary.text}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full hidden xl:flex justify-center items-center">
                            <img className="absolute opacity-10 select-none" src="/icons/circle.svg" alt="box" />
                            <img
                                loading="eager"
                                width="1200"
                                height="900"
                                src={slide.image}
                                alt={slide.title}
                                className="aspect-auto select-none"
                            />
                        </div>
                    </div>

                    {/* Slide indicators */}
                    <SlideIndicator
                        count={slides.length}
                        currentIndex={currentIndex}
                        onSelect={goTo}
                        className="absolute left-1/2 -translate-x-1/2 bottom-20"
                    />
                </section>

                {/* Features */}
                <section className="mb-20 md:mb-40 md:mt-20 pb-52 w-3/4 mx-auto xl:grid grid-cols-2 gap-40 relative">
                    <div className="absolute w-10/12 h-full -translate-x-1/2 left-1/2 bottom-0 top-1/2 -translate-y-1/2">
                        <Fog />
                    </div>

                    <div className="hidden xl:flex justify-center items-center relative w-full">
                        <img
                            loading="eager"
                            width="442"
                            height="544"
                            src="/images/features/skin/avatar.webp"
                            alt="avatar"
                            className="w-1/2 aspect-auto animate-levitate scale-x-[-1] select-none"
                        />
                        <img className="absolute opacity-10 select-none" src="/icons/circle.svg" alt="box" />
                    </div>

                    <div className="w-[95%] xl:w-full mx-auto">
                        <small className="text-pink-700 font-bold tracking-wide text-[16px]">{translate("generic.section")}</small>
                        <h1 className="text-white text-4xl md:text-5xl font-bold mt-4">{translate("home.feature.title")}</h1>
                        <p className="text-zinc-400 text-sm md:text-base mt-6">{translate("home.feature.description")}</p>

                        <div className="grid grid-cols-3 gap-4 mt-8">
                            <div className="relative flex items-center justify-center bg-zinc-900 border border-zinc-700 px-3 py-4 rounded-xl shadow-xl shadow-zinc-950 overflow-hidden">
                                <h2 className="text-white text-sm md:text-base font-bold text-center">
                                    {translate("home.feature.keyword")}
                                </h2>
                            </div>
                            <div className="relative flex items-center justify-center bg-zinc-900 border border-zinc-700 px-3 py-4 rounded-xl shadow-xl shadow-zinc-950 overflow-hidden">
                                <h2 className="text-white text-sm md:text-base font-bold text-center">
                                    {translate("home.feature.keyword_2")}
                                </h2>
                            </div>
                            <div className="relative flex items-center justify-center bg-zinc-900 border border-zinc-700 px-3 py-4 rounded-xl shadow-xl shadow-zinc-950 overflow-hidden">
                                <h2 className="text-white text-sm md:text-base font-bold text-center">
                                    {translate("home.feature.keyword_3")}
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product */}
                <section className="my-32 md:my-52 px-8 w-full md:w-3/4 xl:w-1/2 mx-auto grid md:grid-cols-2 gap-8">
                    <Box loading="eager" image="/images/features/dev.webp">
                        <h2 className="text-white text-xl md:text-2xl font-bold line-clamp-1 pt-8">
                            {translate("home.product.tools.title")}
                        </h2>
                        <p className="text-zinc-400 text-sm md:text-base mt-2 line-clamp-3">
                            {translate("home.product.tools.description")}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            <Button className="w-full xl:w-fit" href={`${studioUrl}/${lang}/studio`} size="sm" variant="default">
                                {translate("generic.start")}
                            </Button>
                            <Button className="w-full xl:w-fit" href={`/${lang}/blog/enchant-configurator`} size="sm" variant="transparent">
                                {translate("generic.learn_more")}
                            </Button>
                        </div>
                    </Box>
                    <Box loading="lazy" image="/images/features/bundle.webp">
                        <h2 className="text-white text-xl md:text-2xl font-bold text-left line-clamp-1 pt-8">
                            {translate("home.product.resource.title")}
                        </h2>
                        <p className="text-zinc-400 text-sm md:text-base mt-2 line-clamp-3">
                            {translate("home.product.resource.description")}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            <Button className="w-full xl:w-fit" to="/$lang/resources/asset" params={{ lang }} size="sm" variant="default">
                                {translate("generic.take_a_look")}
                            </Button>
                            <Button
                                className="w-full xl:w-fit"
                                to="/$lang/resources/asset"
                                params={{ lang }}
                                size="sm"
                                variant="transparent">
                                {translate("generic.learn_more")}
                            </Button>
                        </div>
                    </Box>
                    <Box loading="lazy" image="/images/features/structure/tree.webp">
                        <h2 className="text-white text-xl md:text-2xl font-bold text-left line-clamp-1 pt-8">
                            {translate("home.product.datapack.title")}
                        </h2>
                        <p className="text-zinc-400 text-sm md:text-base mt-2 line-clamp-3">
                            {translate("home.product.datapack.description")}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-6">
                            <Button className="w-full xl:w-fit" href={`/${lang}/packs/neoenchant`} size="sm" variant="default">
                                NeoEnchant+
                            </Button>
                            <Button className="w-full xl:w-fit" href={`/${lang}/packs/yggdrasil`} size="sm" variant="transparent">
                                Yggdrasil
                            </Button>
                        </div>
                    </Box>
                </section>

                {/* Blog */}
                <section className="mt-20 pb-40 w-full flex flex-col items-center gap-10 relative rounded-t-3xl overflow-hidden">
                    <DashedPattern />
                    <div className="w-3/4 pt-40">
                        <h1 className="text-white text-2xl md:text-4xl font-semibold tracking-tighter mt-4 text-balance">
                            {translate("blog.actuality")}
                        </h1>
                        <div className="h-1 w-full bg-zinc-700 rounded-full mt-2" />
                    </div>
                    <ul className="w-3/4 grid grid-cols-3 gap-10 lg:gap-16">
                        {blog
                            .byLang(lang)
                            .slice(0, 3)
                            .map((post, index) => {
                                const slugParts = post.slug.split("/");
                                const postSlug = slugParts[slugParts.length - 1];

                                return (
                                    <BlogCard
                                        key={post.slug}
                                        href={`/${lang}/blog/${postSlug}`}
                                        src={post.data.imageSrc}
                                        alt={post.data.imageAlt}
                                        date={post.data.publishDate}
                                        lang={lang}
                                        category={post.data.category}
                                        title={post.data.title}
                                        index={index}
                                    />
                                );
                            })}
                    </ul>
                </section>
            </div>
        </CompoundLayout>
    );
}
