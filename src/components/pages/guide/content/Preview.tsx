import { cn } from "@/lib/utils.ts";
import { useState } from "react";

interface Props {
    images: Array<string>;
}

export default function Preview(props: Props) {
    const [selected, setSelected] = useState(0);

    const next = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            setSelected((selected - 1 + props.images.length) % props.images.length);
        } else if (e.key === "ArrowRight") {
            setSelected((selected + 1) % props.images.length);
        }
    };

    return (
        <div>
            <img src={props.images[selected]} alt="Preview" className="w-full rounded-md" />
            <div className="grid grid-cols-4 mt-4 gap-4">
                {props.images.map((image, index) => (
                    <img
                        key={image}
                        src={image}
                        onClick={() => setSelected(index)}
                        onKeyDown={next}
                        alt="Basic Concept"
                        className={cn(
                            "w-full rounded-md transition cursor-pointer hover:opacity-70 border-0 border-pink-500",
                            index === selected && "border-2"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
