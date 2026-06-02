import axios from "axios";
import Order from "../models/Order.js";

const JUSPAY_BASE_URL = "https://sandbox.juspay.in";
const JUSPAY_API_KEY = process.env.JUSPAY_API_KEY;

export const getPaymentMethods = async (req, res) => {
  try {
    const response = await axios.get(
      `https://sandbox.juspay.in/merchants/${process.env.JUSPAY_MERCHANT_ID}/paymentmethods`,
      {
        headers: {
          "x-merchantid": process.env.JUSPAY_MERCHANT_ID,
          "x-routing-id": "customer_001",
        },
      },
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response?.data);

    res.status(500).json({
      message: "Failed to fetch payment methods",
    });
  }
};

export const initiatePayment = async (req, res) => {
  try {
    const { paymentMethod, amount } = req.body;

    res.status(200).json({
      success: true,
      paymentMethod,
      amount,
      message: "Payment initiated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment initiation failed",
    });
  }
};
export const createOrderSession = async (req, res) => {
  try {
    const { amount, customerId, customerEmail, customerMobile } = req.body;

    // Generate a unique transaction id for OrderzUp
    const orderId = `ORD_${Date.now()}`;

    const payload = {
      order_id: orderId,
      amount: amount, // e.g., 250.00
      currency: "INR",
      customer_id: customerId || "cust_001",
      customer_email: customerEmail,
      customer_phone: customerMobile,
      return_url: "https://orderzup.com", // Where user returns after 3D secure
      action: "paymentPage", // Creates a processing session wrapper
    };

    const response = await axios.post(`https://juspay.in`, payload, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.JUSPAY_API_KEY + ":").toString("base64")}`,
        "x-merchantid": process.env.JUSPAY_MERCHANT_ID,
        "Content-Type": "application/json",
      },
    });

    // This returns an sdk_payload or client_auth_token needed by your frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Juspay Order Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to initiate transaction session" });
  }
};
