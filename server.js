const express = require("express");
const stripe = require("stripe")("sk_test_51RFTmGQWRzuTGuQxM2yijCeElY55XRatEYunZ13ilrPD2FHvo6CK4eTFyKqpikRW7x290cti5eP994rMMpC4bP2L00GLdSDJaS"); // your secret key
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ New Checkout Session Endpoint
app.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Investment Payment',
            },
            unit_amount: amount, // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://secure-investment-20e2a4.netlify.app/', // update to your app's URL
      cancel_url: 'http://localhost:5173/payment',   // update if needed
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
