import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ImageItem {
    rows: number;
    cols: number;
    path: string;
}

interface GallerySectionProps {
    title?: string;
    images: ImageItem[];
}

export default function GallerySection({ title, images }: GallerySectionProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const showNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
            setIsTransitioning(false);
        }, 200);
    };

    const showPrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            setIsTransitioning(false);
        }, 200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeLightbox();
        }
    };

    return (
        <section className="w-3/4 mx-auto my-40">
            <div className="flex gap-8 px-8">
                <p className="text-zinc-100 text-2xl uppercase font-semibold shrink-0 tracking-wider">{title}</p>

                <div className="flex items-center w-full">
                    <img src="/icons/star.svg" alt="star" className="size-6 invert" />
                    <div className="w-full h-px bg-linear-to-r from-white to-transparent" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[20rem] gap-4 pt-16">
                {images.map((image, index) => (
                    <button
                        type="button"
                        key={image.path}
                        className={cn(
                            "relative overflow-hidden rounded-3xl transition-transform hover:scale-[1.02] cursor-pointer gallery-item",
                            image.cols === 2 ? "md:col-span-2" : "md:col-span-1",
                            image.rows === 2 ? "md:row-span-2" : "md:row-span-1"
                        )}
                        onClick={() => openLightbox(index)}
                        onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                        tabIndex={0}>
                        <img
                            src={image.path}
                            alt="Gallery"
                            width="768"
                            height="560"
                            loading="eager"
                            className="absolute inset-0 w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
                    onKeyDown={handleKeyDown}
                    role="dialog"
                    aria-modal="true">
                    <button type="button" className="absolute inset-0 bg-black/80" onClick={handleOverlayClick} />
                    <div className="relative w-full h-full flex items-center justify-center p-8 select-none">
                        <button
                            type="button"
                            onClick={closeLightbox}
                            className="absolute top-8 right-8 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-8 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <button type="button" onClick={showPrev} className="absolute left-8 z-30 p-4 rounded-2xl cursor-pointer">
                            <img src="/icons/chevron-left.svg" alt="Previous" className="size-24 invert" />
                        </button>

                        <button type="button" onClick={showNext} className="absolute right-8 z-30 p-4 rounded-2xl cursor-pointer">
                            <img src="/icons/chevron-right.svg" alt="Next" className="size-24 invert" />
                        </button>

                        <img
                            src={images[currentIndex].path}
                            alt="Gallery"
                            className={cn(
                                "w-[95vw] aspect-auto rounded-2xl object-contain shadow-2xl z-20 transition-all duration-300",
                                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                            )}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
