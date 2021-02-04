const express = require("express");
const app = express();
const morgan = require("morgan");

const stripeRouter = require("./routes/stripe.route");
const port = 5000;

app.use(express.json());
app.use(morgan("dev"));

app.use("/stripe-webhook", stripeRouter);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App is listening at port ${port}`);
});
