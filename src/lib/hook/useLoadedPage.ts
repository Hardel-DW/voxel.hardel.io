import { useEffect, useState } from "react";

function useLoadedPage() {
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        const handlePageLoad = () => setIsPageLoaded(true);

        if (document.readyState === "complete") {
            setIsPageLoaded(true);
        } else {
            window.addEventListener("load", handlePageLoad);
            return () => window.removeEventListener("load", handlePageLoad);
        }
    }, []);

    return isPageLoaded;
}

export default useLoadedPage;
