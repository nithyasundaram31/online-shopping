import { useEffect, useState } from "react"
import orderServices from "../../services/orderServices"

function OrderPage(){
    const [orders,setOrders]=useState([])
    useEffect(()=>{
        const handleOrders=async()=>{
      try{
const response= await orderServices.getAllOrder();
console.log("user's all order response is :",response.data)
setOrders(response.data)
        }catch(error){
     console.log("user's all order error  is :",error)       
        }
        }
      handleOrders()
    },[])
    return(
        <>
        <div className="p-4  mx-auto mt-16 w-[60%] h-screen ">
            <h1 className="text-center">Order pages</h1>
            {orders.map((order)=>
             <div key={order._id} className="flex  flex-col justify-center items-center">
<div>{order.address?.name}</div>
<div>{order.address?.phone}</div>
<div>{order.address?.city}</div>
             </div>
            )}
           
            </div>
        </>
    )
}   

export default OrderPage