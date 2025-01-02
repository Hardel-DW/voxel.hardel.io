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
        if (!params.sessionId) {
            return new Response("Session ID is required", { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(params.sessionId);

        if (session.payment_status !== "paid") {
            return new Response("Payment not completed", { status: 403 });
        }

        // Récupérer l'ID du produit depuis la session
        const lineItems = await stripe.checkout.sessions.listLineItems(params.sessionId);
        const priceId = lineItems.data[0]?.price?.id;

        if (!priceId) {
            return new Response("Price ID not found", { status: 404 });
        }

        // Rechercher le produit dans la base de données
        const [productData] = await db.select().from(product).where(eq(product.priceId, priceId)).limit(1);

        if (!productData) {
            return new Response("Product not found", { status: 404 });
        }

        const fileUrl = `https://utfs.io/f/${productData.productId}`;

        return new Response(null, {
            status: 302,
            headers: {
                Location: fileUrl,
                "Content-Disposition": `attachment; filename="${productData.filename}"`,
                "Content-Type": "application/zip"
            }
        });
    } catch (error) {
        console.error("Error retrieving session:", error);
        return new Response("Invalid session", { status: 400 });
    }
};
