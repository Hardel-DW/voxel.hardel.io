import { useEffect, useRef, useState } from "react";

interface SelectProps {
    id: string;
    options: string[];
    defaultOption?: string;
    value?: string;
    onChange?: (selectedOption: string) => void;
}

export function Select({ id, options, defaultOption, onChange, value }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | undefined>(defaultOption);
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (value !== undefined) {
            setSelectedOption(value);
        }
    }, [value]);

    return (
        <div className="relative w-full cursor-pointer select-none" id={`${id}-container`} ref={contentRef}>
            <div
                className="w-full mt-4 border px-4 py-2 inline-flex items-center justify-between text-sm font-normal border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-200 whitespace-nowrap transition-colors rounded-[0.5rem]"
                onClick={toggleDropdown}
                onKeyDown={toggleDropdown}
            >
                <span>{selectedOption || "Select an option"}</span>
                <img
                    src="/icons/chevron-down.svg"
                    alt="Open"
                    className={`h-4 w-4 ml-2 invert transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
                />
            </div>

            {isOpen && (
                <div
                    id={`${id}-content`}
                    className="space-y-2 p-2 mt-2 absolute w-full z-10 border border-zinc-700 hover:border-zinc-600 backdrop-blur-2xl bg-black/50 rounded-[0.5rem] shadow-lg"
                >
                    {options.map((option) => (
                        <div
                            key={option}
                            className="block rounded-xs px-4 py-2 text-zinc-200 hover:bg-white/5"
                            onClick={() => handleSelect(option)}
                            onKeyDown={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
