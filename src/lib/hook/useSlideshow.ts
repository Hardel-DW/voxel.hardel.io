import { useEffect, useState } from "react";

interface UseSlideshowOptions {
    count: number;
    interval?: number;
    transitionDuration?: number;
}

export function useSlideshow({ count, interval = 5000, transitionDuration = 200 }: UseSlideshowOptions) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((i) => (i + 1) % count);
                setIsTransitioning(false);
            }, transitionDuration);
        }, interval);

        return () => clearTimeout(timer);
    }, [count, interval, transitionDuration]);

    const goTo = (index: number) => {
        if (index === currentIndex || isTransitioning || index < 0 || index >= count) return;

        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, transitionDuration);
    };

    return { currentIndex, isTransitioning, goTo };
}
