import express from "express";
import {
  getPaymentMethods,
  initiatePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/methods", getPaymentMethods);
router.post("/initiate", initiatePayment);

export default router;