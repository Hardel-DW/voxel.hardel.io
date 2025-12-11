import { Link } from "@tanstack/react-router";

interface BlogCardProps {
    href: string;
    src: string;
    alt: string;
    date: Date;
    lang: string;
    category: string;
    title: string;
    index: number;
}

export default function BlogCard({ href, src, alt, date, lang, category, title, index }: BlogCardProps) {
    return (
        <li className="relative group">
            <div className="absolute -z-10 size-full inset-0 bg-linear-to-r from-pink-900 to-blue-900 opacity-30 rounded-full blur-[5rem]" />

            <Link to={href}>
                <div className="relative">
                    <div className="relative overflow-hidden rounded-md aspect-video">
                        <div className="before:beam-blue-500 before:absolute before:top-0 before:w-full before:h-px before:z-10 after:beam-red-500 after:absolute after:bottom-0 after:w-full after:h-px after:z-10" />
                        <img
                            src={src}
                            alt={alt}
                            width={800}
                            height={600}
                            loading={index <= 2 ? "eager" : "lazy"}
                            decoding={index <= 2 ? "sync" : "async"}
                            className="absolute inset-0 w-full h-full rounded-md object-cover group-hover:scale-125 transition duration-500"
                        />
                    </div>

                    <div className="mt-4">
                        <span className="text-blue-400 uppercase tracking-wider text-xs font-medium">{category}</span>

                        <h2 className="text-xl font-semibold leading-snug tracking-tight mt-1">{title}</h2>

                        <div className="flex gap-2 mt-3 text-sm">
                            <time className="text-gray-400" dateTime={date.toISOString()}>
                                {Intl.DateTimeFormat(lang, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                }).format(date)}
                            </time>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}
