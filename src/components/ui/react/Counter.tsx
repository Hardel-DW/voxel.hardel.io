type Props = {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange?: (value: number) => void;
};

export default function Counter(props: Props) {
    const increment = () => {
        const newValue = Math.min(props.value + props.step, props.max);
        props.onChange?.(newValue);
    };

    const decrement = () => {
        const newValue = Math.max(props.value - props.step, props.min);
        props.onChange?.(newValue);
    };

    return (
        <div className="relative z-20 w-20 h-10 border-2 rounded-3xl border-solid border-white border-opacity-20 transition-[width] duration-500 ease-in-out hover:w-32 hover:border-opacity-100 group">
            <span
                onClick={increment}
                onKeyDown={increment}
                className="group-hover:opacity-100 group-hover:right-3 absolute z-20 top-1/2 right-4 block w-3 h-3 border-t-2 border-r-2 border-white transform -translate-y-1/2 rotate-45 cursor-pointer opacity-0 transition duration-500 ease-in-out hover:opacity-100"
            />
            <span
                onClick={decrement}
                onKeyDown={decrement}
                className="group-hover:opacity-100 group-hover:left-3 absolute z-20 top-1/2 left-4 block w-3 h-3 border-t-2 border-l-2 border-white transform -translate-y-1/2 -rotate-45 cursor-pointer opacity-0 transition duration-500 ease-in-out hover:opacity-100"
            />
            <div className="absolute z-10 inset-0 flex justify-center items-center select-none">
                <span className="font-bold text-xl text-white">{props.value}</span>
            </div>
        </div>
    );
}
