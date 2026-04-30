import { Router } from "express";
import {
  getAllOrders,
  createOrder,
  deleteOrder,
  editOrder,
  getSingleOrder,
} from "../controllers/orderController.js";
const router = Router();


router.post("/", createOrder);

router.get("/", getAllOrders);

router.get("/:orderId", getSingleOrder);

router.put("/:orderId", editOrder);

router.delete("/:orderId", deleteOrder);

export default router;
