const express = require("express");
const router = express.Router();

const { InsertOrder, GetCarts, GetOrder, GetOrders, UpdateOrder } = require("../controllers/Orders");

// Insert order into Orders Collection
router.post("/insertIntoOrders", InsertOrder);

// Get all Cart data from Orders Collection for a particular user by email
router.get("/getFromOrders/:email", GetCarts);

// Get particular order by id for TrackOrderPage
router.get("/readFromOrdersById/:id", GetOrder);

// Get all orders for Admin Page
router.get("/readFromOrdersAdmin", GetOrders);

// Update order
router.put("/updateOrders", UpdateOrder);

module.exports = router;
