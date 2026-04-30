import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import orderRoute from "./routes/order.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// all routes
app.use("/api", orderRoute);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected succesfully");
  } catch (err) {
    console.log("failed to connect with db", err);
  }
};
