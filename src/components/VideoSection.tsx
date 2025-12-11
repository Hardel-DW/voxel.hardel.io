interface VideoSectionProps {
    url: string;
    title: string;
    description: string;
    section: string;
}

export default function VideoSection({ url, title, description, section }: VideoSectionProps) {
    return (
        <section className="w-3/4 mx-auto my-40">
            <div className="flex gap-8 px-8">
                <p className="text-zinc-100 text-2xl uppercase font-semibold shrink-0 tracking-wider">{section}</p>

                <div className="flex items-center w-full">
                    <img src="/icons/star.svg" alt="star" className="size-6 invert" />
                    <div className="w-full h-px bg-linear-to-r from-white to-transparent" />
                </div>
            </div>

            <div className="grid items-center grid-cols-12 p-8 gap-8 border-t border-l border-zinc-900 rounded-3xl mt-16 bg-linear-to-br from-black to-transparent">
                <div className="col-span-7 size-full">
                    <div className="relative">
                        <div className="absolute -z-10 size-full inset-0 bg-linear-to-r from-pink-900 to-blue-900 opacity-50 rounded-full blur-[10rem]" />
                        <div className="before:beam-blue-500 before:absolute before:top-0 before:w-full before:h-px before:z-10 after:beam-red-500 after:absolute after:bottom-0 after:w-full after:h-px after:z-10" />
                        <iframe
                            className="w-full aspect-video rounded-3xl"
                            src={url}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </div>
                <div className="col-span-5 flex flex-col gap-8 px-16">
                    <h2 className="text-5xl text-white font-extralight">{title}</h2>
                    <p className="text-zinc-400">{description}</p>
                </div>
            </div>
        </section>
    );
}
