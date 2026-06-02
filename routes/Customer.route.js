import {Router} from "express" ;
import {createJuspayCustomer,getJuspayCustomer} from "../controllers/CustomerController.js";

const router = Router();

router.post("/createCustomre",createJuspayCustomer);
router.get("/:customer_id",getJuspayCustomer);

export default router;