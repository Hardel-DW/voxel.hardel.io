export const generatePath = (startX: number, startY: number, endX: number, endY: number) => {
    const controlPointOffset = Math.abs(endX - startX) * 0.5;

    const controlPoint1X = startX + controlPointOffset;
    const controlPoint1Y = startY;
    const controlPoint2X = endX - controlPointOffset;

    return `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${endY}, ${endX} ${endY}`;
};
