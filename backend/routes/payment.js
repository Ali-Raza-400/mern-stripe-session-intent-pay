const express = require("express");
const { stripeKey } = require("../utils/config");
const router = express.Router();
const stripe = require("stripe")(stripeKey);

const buyGig = async (req, res) => {
  const { products } = req.body; // Get product details from frontend or Postman
  const origin = req.get("origin");

  // Create line items array dynamically with images
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name, // dynamic product name
        images: [product.image], // dynamic image URL
      },
      unit_amount: product.price * 100, // price in cents
    },
    quantity: product.quantity, // dynamic quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin || "http://localhost:3000"}/pages/orders`,
    cancel_url: `${origin || "http://localhost:3000"}/payment/cancel`,
  });

  res.json({ url: session.url });
};

router.post("/checkout", buyGig);

module.exports = router;
