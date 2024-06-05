import crypto from "node:crypto";
import { db } from "@/database/db.ts";
import { purchase } from "@/database/schema.ts";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const clonedReq = request.clone();
        const eventType = request.headers.get("X-Event-Name");
        const body = await request.json();

        const secret = process.env.LEMON_SQUEEZY_SIGNKEY || import.meta.env.LEMON_SQUEEZY_SIGNKEY;
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(await clonedReq.text()).digest("hex"), "utf8");
        const signature = Buffer.from(request.headers.get("X-Signature") || "", "utf8");

        if (!crypto.timingSafeEqual(digest, signature)) {
            return new Response(
                JSON.stringify({
                    message: "Invalid signature"
                }),
                { status: 400 }
            );
        }

        if (eventType === "order_created") {
            const isSuccessful = body.data.attributes.status === "paid";
            if (isSuccessful) {
                await db.insert(purchase).values({
                    id: body.meta.webhook_id,
                    userId: body.meta.custom_data.user_id,
                    productId: body.data.attributes.first_order_item.product_id
                });
            }
        }

        return new Response(
            JSON.stringify({
                message: "Webhook received"
            }),
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({
                message: "Internal server error"
            }),
            { status: 500 }
        );
    }
};
