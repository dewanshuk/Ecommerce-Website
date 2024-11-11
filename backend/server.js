import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import uploadRoute from "./routes/uploadRoute";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const options = {
  credentials: true,
  origin: [
    process.env.REACT_APP_FE_URL,
    "http://localhost:3000",
    "https://ecomm-cloth.onrender.com",
  ],
};

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connected successfulyy"))
  .catch((error) => console.log(error, "Connection Error"));

const app = express();
const stripe = require("stripe")(process.env.REACT_APP_SERVER_STRIPE_TEST_KEY);
app.use(express.static("public"));
app.use(cors(options));
app.use(bodyParser.json());
app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
// Serve FE
app.use(express.static(path.join(__dirname, "/../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

app.listen(config.PORT, () => {
  console.log("Server started is running");
});
