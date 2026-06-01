import express from "express";
import {
  getPaymentMethods,
  initiatePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initiate", initiatePayment);
router.get("/methods", getPaymentMethods);


export default router;