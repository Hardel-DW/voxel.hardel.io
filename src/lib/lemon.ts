export const createCheckout = async (userId: string, productId: string) => {
    if (!userId || !productId) {
        throw new Error("Invalid user or product ID");
    }

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
            Authorization: `Bearer ${import.meta.env.LEMON_SQUEEZY_API_KEY}`
        },
        body: JSON.stringify({
            data: {
                type: "checkouts",
                attributes: {
                    checkout_data: {
                        custom: {
                            user_id: userId.toString()
                        }
                    }
                },
                relationships: {
                    store: {
                        data: {
                            type: "stores",
                            id: import.meta.env.LEMON_SQUEEZY_STORE_ID.toString()
                        }
                    },
                    variant: {
                        data: {
                            type: "variants",
                            id: productId.toString()
                        }
                    }
                }
            }
        })
    });

    const json = await response.json();
    return json.data.attributes.url;
};
