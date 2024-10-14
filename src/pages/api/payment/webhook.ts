import crypto from "node:crypto";
import { db } from "@/database/db.ts";
import { purchase } from "@/database/schema.ts";
import type { APIRoute } from "astro";

const secret = import.meta.env.LEMON_SQUEEZY_SIGNKEY;

export const POST: APIRoute = async ({ request }) => {
    try {
        const clonedReq = request.clone();
        const body = await request.json();
        const requestBody = await clonedReq.text();
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(requestBody).digest("hex"), "utf8");
        const signature = Buffer.from(request.headers.get("X-Signature") || "", "utf8");

        if (digest.length !== signature.length) {
            console.error("Digest and signature lengths do not match");
        }

        const digestUint8 = new Uint8Array(digest);
        const signatureUint8 = new Uint8Array(signature);

        if (!crypto.timingSafeEqual(digestUint8, signatureUint8)) {
            console.error("Digest and signature do not match exactly");
        }

        const eventType = request.headers.get("X-Event-Name");
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

        return Response.json({ message: "Webhook received" });
    } catch (err) {
        console.error(err);
        return Response.json({ message: "Server error", error: err }, { status: 500 });
    }
};
