// routes/cartRoutes.js

const express = require("express");
const { addToCart, getCart, removeFromCart, increaseQuantity, decreaseQuantity } = require("../controllers/cartController");
const authenticate = require("../middlewares/auth");


const cartRoute = express.Router();

cartRoute.post("/add",authenticate('user') , addToCart);
cartRoute.get("/", authenticate('user'), getCart);
cartRoute.delete("/:productId", authenticate('user'), removeFromCart);
cartRoute.put("/increase/:productId", authenticate('user'), increaseQuantity);
cartRoute.put("/decrease/:productId", authenticate('user'), decreaseQuantity);
module.exports =cartRoute;
