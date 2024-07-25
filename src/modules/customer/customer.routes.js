import { Router } from "express";
import { getCustomers ,signup,signIn } from "./customer.controller.js";
const router = Router();

router.get('/',getCustomers);
router.post('/',signup);
router.post('/signin',signIn)





export default router;
