
const Order = require("../models/order");

exports.addOrder = async (req, res) => {
  try {
    const { items, name, phone, street, city, pincode, totalAmount } = req.body;
  

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items found in order" });
    }
  //  user: req.user.userId,
  console.log("order user id is:", req.user.userId);
     // Generate readable order ID
    const orderId = "ORD-" + Date.now();
    const newOrder = new Order({
      user: req.user.userId,
      orderId,
      items,
      totalAmount,
      address: {
        name,
        phone,
        street,
        city,
        pincode
      },
      
        paymentMethod: "UPI",
      paymentStatus: "pending",
      orderStatus: "placed"
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder
    });

  } catch (error) {
     console.log("ORDER CREATE ERROR:", error); 
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders=async(req,res)=>{
  try{
    const order=await Order.find();
return res.status(200).json(order)
  }catch(error){
  res.status(500).json({ message: "Server Error", error: error.message });


  }



}

