// import axios from "axios";

// export const getPaymentMethods = async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://sandbox.juspay.in/merchants/${process.env.JUSPAY_MERCHANT_ID}/paymentmethods`,
//       {
//         headers: {
//           "x-merchantid": process.env.JUSPAY_MERCHANT_ID,
//           "x-routing-id": "customer_001",
//         },
//       }
//     );

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log(error.response?.data);

//     res.status(500).json({
//       message: "Failed to fetch payment methods",
//     });
//   }
// };

// when the Credential avaliable will remove the below dummy method

export const getPaymentMethods = async (req, res) => {
  try {
    // mock response for now
    const paymentMethods = {
      payment_methods: [
        {
          payment_method_type: "UPI",
          payment_method: "UPI",
          description: "UPI",
        },
        {
          payment_method_type: "CARD",
          payment_method: "VISA",
          description: "Visa",
        },
        {
          payment_method_type: "CARD",
          payment_method: "MASTER",
          description: "Master Card",
        },
      ],
    };

    res.status(200).json(paymentMethods);
  } catch (error) {
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