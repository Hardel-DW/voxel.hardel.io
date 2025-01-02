import type { APIRoute } from "astro";
import Stripe from "stripe";
import { Resend } from "resend";
import VoxelReceiptEmail, { type EmailProductData } from "emails/marketplace/receipt";

if (!import.meta.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

if (!import.meta.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not defined in environment variables");
}

if (!import.meta.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not defined in environment variables");
}

if (!import.meta.env.PUBLIC_SITE_URL) {
    throw new Error("PUBLIC_SITE_URL is not defined in environment variables");
}

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia"
});

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const endpointSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;

export const POST: APIRoute = async ({ request }) => {
    const sig = request.headers.get("stripe-signature");
    const payload = await request.text();

    try {
        if (!sig) throw new Error("No signature found in request headers");
        const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

        switch (event.type) {
            case "checkout.session.completed": {
                console.log("checkout.session.completed");
                const session = event.data.object as Stripe.Checkout.Session;
                if (session.customer_details?.email) {
                    const products = await stripe.products.list({
                        ids: session.line_items?.data.map((item) => item.price?.product as string) || []
                    });

                    console.log("products", products);

                    const data: EmailProductData[] = products.data.map((product) => ({
                        name: product.name,
                        image: product.images[0],
                        description: product.description || "",
                        downloadUrl: `${import.meta.env.PUBLIC_SITE_URL}/api/download/${session.id}`,
                        date: new Date(product.created * 1000).toISOString().split("T")[0],
                        price: Number(product.default_price) || 0,
                        quantity: session.line_items?.data.find((item) => item.price?.product === product.id)?.quantity || 1
                    }));

                    console.log("data", data);

                    await sendEmail(session.customer_details.email, data);
                }
                break;
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            status: 200
        });
    } catch (err) {
        console.error("Webhook Error:", err);
        return new Response(
            JSON.stringify({
                error: err instanceof Error ? err.message : "Unknown error"
            }),
            { status: 400 }
        );
    }
};

async function sendEmail(email: string, data: EmailProductData[]) {
    try {
        await resend.emails.send({
            from: "Voxel <no-reply@voxel.hardel.io>",
            to: email,
            subject: "Votre achat sur Voxel",
            react: VoxelReceiptEmail({ items: data })
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
