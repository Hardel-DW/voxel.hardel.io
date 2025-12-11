export const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    isFilled: boolean
) => {
    ctx.save();
    ctx.translate(x, y);

    const vertices = [
        { x: 0, y: -size / 2, z: 0 },
        { x: -size / 2, y: size / 2, z: 0 },
        { x: size / 2, y: size / 2, z: 0 }
    ];

    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const cosZ = Math.cos(rotationZ);
    const sinZ = Math.sin(rotationZ);

    const rotateX = (v: { x: number; y: number; z: number }) => ({
        x: v.x,
        y: v.y * cosX - v.z * sinX,
        z: v.y * sinX + v.z * cosX
    });

    const rotateY = (v: { x: number; y: number; z: number }) => ({
        x: v.x * cosY + v.z * sinY,
        y: v.y,
        z: -v.x * sinY + v.z * cosY
    });

    const rotateZ = (v: { x: number; y: number; z: number }) => ({
        x: v.x * cosZ - v.y * sinZ,
        y: v.x * sinZ + v.y * cosZ,
        z: v.z
    });

    const rotate = (v: { x: number; y: number; z: number }) => rotateZ(rotateY(rotateX(v)));

    const rotatedVertices = vertices.map(rotate);

    ctx.beginPath();
    ctx.moveTo(rotatedVertices[0].x, rotatedVertices[0].y);
    for (const vertex of rotatedVertices) {
        ctx.lineTo(vertex.x, vertex.y);
    }
    ctx.closePath();

    if (isFilled) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.restore();
};
