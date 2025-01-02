import type { APIRoute } from "astro";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/database/db";
import { product } from "@/database/schema";

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia"
});

export const GET: APIRoute = async ({ params }) => {
    try {
        if (!params.sessionId || !params.productId) {
            return new Response("Session ID and Product ID are required", { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(params.sessionId);

        if (session.payment_status !== "paid") {
            return new Response("Payment not completed", { status: 403 });
        }

        const [productData] = await db.select().from(product).where(eq(product.productId, params.productId)).limit(1);

        if (!productData) {
            return new Response("Product not found", { status: 404 });
        }

        const lineItems = await stripe.checkout.sessions.listLineItems(params.sessionId);
        const hasValidProduct = lineItems.data.some((item) => item.price?.product === productData.productId);

        if (!hasValidProduct) {
            return new Response("Unauthorized access to this product", { status: 403 });
        }

        const fileUrl = `https://utfs.io/f/${productData.uploadId}`;

        return new Response(null, {
            status: 302,
            headers: {
                Location: fileUrl,
                "Content-Disposition": `attachment; filename="${productData.filename}"`,
                "Content-Type": "application/zip"
            }
        });
    } catch (error) {
        console.error("Error processing download request:", error);
        return new Response("An error occurred", { status: 500 });
    }
};
