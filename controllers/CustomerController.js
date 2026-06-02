import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";

export const createJuspayCustomer = asyncHandler(async (req, res) => {
  // Destructure incoming data from Postman body
  const { email, mobile_number, first_name, last_name } = req.body;

  if (!mobile_number) {
    return res.status(400).json({ message: "mobile_number is required" });
  }

  // Create unique routing IDs matching requirements
  const cleanMobile = String(mobile_number).trim();
  const customerReferenceId = `CUST_${cleanMobile}`;

  // 1. MUST use URLSearchParams for application/x-www-form-urlencoded
  const formPayload = new URLSearchParams();
  formPayload.append("object_reference_id", customerReferenceId);
  formPayload.append("mobile_number", cleanMobile);
  formPayload.append("mobile_country_code", "91"); // Default to India, pass without '+'
  
  if (email) formPayload.append("email_address", email.trim());
  if (first_name) formPayload.append("first_name", first_name.trim());
  if (last_name) formPayload.append("last_name", last_name.trim());
  
  // Set to true because you are using Express Checkout SDK
  formPayload.append("options.get_client_auth_token", "true");

  try {
    const response = await axios.post(
      "https://sandbox.juspay.in/customers", 
      formPayload.toString(), // Send as a string string
      {
        headers: {
          "Authorization": `Basic ${Buffer.from(process.env.JUSPAY_API_KEY + ":").toString("base64")}`,
          "x-merchantid": process.env.JUSPAY_MERCHANT_ID,
          "x-routing-id": customerReferenceId, // Critical for session tracking
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    );

    // Return the response directly to Postman
    res.status(201).json({
      success: true,
      message: "Customer parsed and synced successfully",
      customer_id: response.data.id, // Juspay's internal customer id
      client_auth_token: response.data.client_auth_token || null, // Will contain token if true
      details: response.data
    });

  } catch (error) {
    console.error("Juspay 400 Bad Request Diagnostic:", error.response?.data || error.message);
    
    res.status(error.response?.status || 400).json({
      success: false,
      message: "Juspay Customer registration failed",
      error_details: error.response?.data || error.message
    });
  }
});

export const getJuspayCustomer = asyncHandler(async (req, res) => {
  // 1. Extract the customer_id from the URL path parameters
  const { customer_id } = req.params;

  if (!customer_id) {
    return res.status(400).json({ message: "customer_id path parameter is required" });
  }

  try {
    // 2. Fire GET request appending options.get_client_auth_token=true for SDK authentication
    const response = await axios.get(
      `https://sandbox.juspay.in/customers/${customer_id}?options.get_client_auth_token=true`,
      {
        headers: {
          "Authorization": `Basic ${Buffer.from(process.env.JUSPAY_API_KEY + ":").toString("base64")}`,
          "x-merchantid": process.env.JUSPAY_MERCHANT_ID,
          "x-routing-id": customer_id, // Recommended to pass customer_id for session alignment
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    );

    // 3. Return the payload. It will now contain a fresh 15-minute client_auth_token
    res.status(200).json({
      success: true,
      message: "Customer data fetched successfully",
      customer_id: response.data.id,
      client_auth_token: response.data.client_auth_token || null, // UI needs this token
      details: response.data
    });

  } catch (error) {
    console.error("Juspay Get Customer Error:", error.response?.data || error.message);
    
    res.status(error.response?.status || 500).json({
      success: false,
      message: "Failed to retrieve Juspay customer object",
      error_details: error.response?.data || error.message
    });
  }
});
