import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const createCheckoutSession = async (item) => {
  const stripe = await stripePromise;
  const checkoutSession = await axios({
    method: "post",
    url: "/api/create-stripe-session",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      item,
    },
  });

  const result = await stripe.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });

  if (result.error) {
    alert(result.error.message);
  }
};

export default createCheckoutSession;
