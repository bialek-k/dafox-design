import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const CreateStripeSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { item } = req.body;

  const redirectURL = "https://dafoxdesign.com/";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          tax_behavior: "exclusive",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      },
    ],
    automatic_tax: {
      enabled: true,
    },
    payment_intent_data: {
      metadata: item.metadata,
    },
    mode: "payment",
    success_url: redirectURL + "status=success",
    cancel_url: redirectURL + "status=cancel",
    metadata: item.metadata,
  });

  res.json({ id: session.id });
};

export default CreateStripeSession;
