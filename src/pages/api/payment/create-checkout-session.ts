import type { APIRoute } from "astro";
import Stripe from "stripe";

export const prerender = false;

if (!import.meta.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia"
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { priceId, lang } = data;

        if (!priceId || typeof priceId !== "string") {
            return new Response(JSON.stringify({ error: "Price ID is required" }), { status: 400 });
        }

        if (!lang || typeof lang !== "string") {
            return new Response(JSON.stringify({ error: "Lang is required" }), { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url: `${import.meta.env.PUBLIC_SITE_URL}/${lang}/transaction/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${import.meta.env.PUBLIC_SITE_URL}/${lang}/transaction/cancel`
        });

        return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Stripe error:", error);
        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "Error creating checkout session"
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};
