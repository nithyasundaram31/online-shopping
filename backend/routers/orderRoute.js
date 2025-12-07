const express=require('express')
const { addOrder } = require("../controllers/orderController");
const authenticate = require('../middlewares/auth');


const orderRoute=express.Router();

orderRoute.post('/',authenticate('user'), addOrder)

module.exports =orderRoute;