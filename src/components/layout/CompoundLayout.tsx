import type { PropsWithChildren } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ShiningStars from "../ui/ShiningStars";

export default function CompoundLayout({ children }: PropsWithChildren) {
    return (
        <div className="antialiased contents">
            <Navbar />
            <div className="absolute rounded-full w-3/4 h-1/2 bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 blur-[10rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="fixed inset-0 -z-10">
                <ShiningStars />
            </div>

            {children}
            <Footer />
        </div>
    );
}
