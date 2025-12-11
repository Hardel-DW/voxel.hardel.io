import { createNoise3D } from "@/lib/noise";

const PARTICLE_COUNT = 50;
const RANGE_Y = 800;
const BASE_HUE = 270;
const BASE_SPEED = 0.0;
const RANGE_SPEED = 1.5;
const BASE_RADIUS = 1;
const RANGE_RADIUS = 2;
const BACKGROUND_COLOR = "transparent";
const PARTICLE_PROP_COUNT = 9;
const BASE_TTL = 50;
const RANGE_TTL = 150;
const RANGE_HUE = 100;
const NOISE_STEPS = 3;
const X_OFF = 0.00125;
const Y_OFF = 0.00125;
const Z_OFF = 0.0005;
const TAU = 2 * Math.PI;

export interface VortexState {
    tick: number;
    particleProps: Float32Array;
    center: [number, number];
    noise3D: ReturnType<typeof createNoise3D>;
}

const rand = (n: number): number => n * Math.random();
const randRange = (n: number): number => n - rand(2 * n);
const fadeInOut = (t: number, m: number): number => {
    const hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
};
const lerp = (n1: number, n2: number, speed: number): number => (1 - speed) * n1 + speed * n2;

export function createVortexState(width: number, height: number): VortexState {
    const state: VortexState = {
        tick: 0,
        particleProps: new Float32Array(PARTICLE_COUNT * PARTICLE_PROP_COUNT),
        center: [0.5 * width, 0.5 * height],
        noise3D: createNoise3D()
    };

    for (let i = 0; i < state.particleProps.length; i += PARTICLE_PROP_COUNT) {
        initParticle(i, state, width);
    }

    return state;
}

function initParticle(i: number, state: VortexState, width: number) {
    const x = rand(width);
    const y = state.center[1] + randRange(RANGE_Y);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = BASE_TTL + rand(RANGE_TTL);
    const speed = BASE_SPEED + rand(RANGE_SPEED);
    const radius = BASE_RADIUS + rand(RANGE_RADIUS);
    const hue = BASE_HUE + rand(RANGE_HUE);

    state.particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
}

function drawParticle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number
) {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

function checkBounds(x: number, y: number, width: number, height: number): boolean {
    return x > width || x < 0 || y > height || y < 0;
}

function updateParticle(i: number, state: VortexState, ctx: CanvasRenderingContext2D, width: number, height: number) {
    const props = state.particleProps;
    const i2 = 1 + i;
    const i3 = 2 + i;
    const i4 = 3 + i;
    const i5 = 4 + i;
    const i6 = 5 + i;
    const i7 = 6 + i;
    const i8 = 7 + i;
    const i9 = 8 + i;

    const x = props[i];
    const y = props[i2];
    const n = state.noise3D(x * X_OFF, y * Y_OFF, state.tick * Z_OFF) * NOISE_STEPS * TAU;
    const vx = lerp(props[i3], Math.cos(n), 0.5);
    const vy = lerp(props[i4], Math.sin(n), 0.5);
    const ttl = props[i6];
    const speed = props[i7];
    const x2 = x + vx * speed;
    const y2 = y + vy * speed;
    const radius = props[i8];
    const hue = props[i9];
    let life = props[i5];

    drawParticle(ctx, x, y, x2, y2, life, ttl, radius, hue);

    life++;

    props[i] = x2;
    props[i2] = y2;
    props[i3] = vx;
    props[i4] = vy;
    props[i5] = life;

    if (checkBounds(x, y, width, height) || life > ttl) {
        initParticle(i, state, width);
    }
}

function renderGlow(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.filter = "blur(4px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
}

function renderToScreen(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
}

export function animateVortex(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, state: VortexState) {
    state.tick++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < state.particleProps.length; i += PARTICLE_PROP_COUNT) {
        updateParticle(i, state, ctx, canvas.width, canvas.height);
    }

    renderGlow(canvas, ctx);
    renderToScreen(canvas, ctx);
}

export function updateVortexCenter(state: VortexState, width: number, height: number) {
    state.center[0] = 0.5 * width;
    state.center[1] = 0.5 * height;
}
