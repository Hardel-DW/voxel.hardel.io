export const setupCanvas = (canvas: HTMLCanvasElement) => {
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
        window.removeEventListener("resize", resizeCanvas);
    };
};
