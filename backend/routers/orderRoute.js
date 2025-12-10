const express=require('express')
const { addOrder, getAllOrders } = require("../controllers/orderController");
const authenticate = require('../middlewares/auth');


const orderRoute=express.Router();

orderRoute.post('/',authenticate('user'), addOrder);
orderRoute.get('/',authenticate('user'), getAllOrders)

module.exports =orderRoute;