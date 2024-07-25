import { Router } from "express";
import * as orders from './order.controller.js';

const router = Router();
router.post('/create-order',orders.createOrder);
router.get('/avgOfOrder',orders.avgOfOrder);
router.get('/customer-no-orders',orders.customerWithNoOrders);
router.get('/customer-WithMostItems',orders.customerWithMostItems);
router.get('/top-customers',orders.top10Customers);
router.get('/customer-fiveOrders',orders.customerWithFiveOrders);
router.get('/percentage-customers',orders.percentageOfCustomers);
router.get('/customer-earliestOrder',orders.customerWithEarliestOrder);







export default router;