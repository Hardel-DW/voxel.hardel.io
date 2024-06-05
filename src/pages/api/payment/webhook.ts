import crypto from "node:crypto";
import { db } from "@/database/db.ts";
import { purchase } from "@/database/schema.ts";
import type { APIRoute } from "astro";

const secret = import.meta.env.LEMON_SQUEEZY_SIGNKEY;

export const POST: APIRoute = async ({ request }) => {
    console.log("test");
    try {
        console.log("test");
        console.log("hello world !");
        const clonedReq = request.clone();
        const eventType = request.headers.get("X-Event-Name");
        const body = await request.json();
        const requestBody = await clonedReq.text();
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(requestBody).digest("hex"), "utf8");
        const signature = Buffer.from(request.headers.get("X-Signature") || "", "utf8");

        if (digest.length !== signature.length) {
            throw new Error("Invalid signature length.");
        }

        if (!crypto.timingSafeEqual(digest, signature)) {
            throw new Error("Invalid signature.");
        }

        if (eventType === "order_created") {
            const isSuccessful = body.data.attributes.status === "paid";
            if (isSuccessful) {
                db.insert(purchase).values({
                    id: body.meta.webhook_id,
                    userId: body.meta.custom_data.user_id,
                    productId: body.data.attributes.first_order_item.product_id
                });
            }
        }

        return Response.json({ message: "Webhook received" });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error", error: err }, { status: 500 });
    }
};
