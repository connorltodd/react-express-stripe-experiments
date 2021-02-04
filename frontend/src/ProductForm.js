import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51I6HEqA5Jiwwo3yOlA1U4oaHSVxEgJpnZkoYPKhH2LKpWwFTJTnFMJiE3v2L4Et29rcdsUULbFHOeasf4Sp09bKC00MnRbRNl6"
);
const ProductDisplay = ({ handleClick }) => (
  <section>
    <div className="product">
      <img src="https://i.imgur.com/EHyR2nP.png" alt="Premium Plan" />
      <div className="description">
        <h3>Premium Plan</h3>
        <h5>€89.00</h5>
      </div>
    </div>
    <button
      type="button"
      id="checkout-button"
      role="link"
      onClick={handleClick}
    >
      Checkout
    </button>
  </section>
);
const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);
export default function ProductForm() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await fetch("/stripe-webhook/create-checkout-session", {
      method: "POST",
    });
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}
