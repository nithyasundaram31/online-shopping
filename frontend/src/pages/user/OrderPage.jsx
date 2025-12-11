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
     console.log("user's all order error  is :",error);       
        }                    
        }
      handleOrders()
    },[])
    return(
        <>
        <div className="p-2  mx-auto mt-16 w-[70%] h-screen ">
            <h1 className="text-center ml-12 text-xl  text-red-600 ">Orders</h1>
            <div className="flex  md:ml-24 justify-center items-center">
           <table className="border mt-6  ">
                <thead className="bg-gray-100" >
                     <th className="border p-2  text-center  border-r ">SI No</th>
                    <th className="border p-2  text-center  border-r ">order id</th>
                    <th className="border p-2  text-center  border-r ">Date</th>
                    <th className="border p-2  text-center border-r ">Payment</th>
                    <th className="border p-2  text-center border-r ">Status</th>
                     <th className="border p-2  text-center border-r ">Amount</th>
                </thead>
                  {orders.map((order,index)=>
             <tbody key={order._id} >
                <tr>
                    <td className="border p-3  text-center border-r ">{index+1}</td>
                    <td className="border p-3  text-center border-r ">{order.orderId}</td>
                    <td className="border p-3  text-center border-r ">  {new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="border p-3  text-center  border-r ">{order.paymentMethod}</td>
                    <td className="border p-3  text-center text-green-500 border-r">{order.orderStatus}</td>
                    <td className="border p-3  text-center border-r ">{order.totalAmount}</td>
                </tr>
                 
             </tbody>
            )}
            </table>
            </div>
            </div>
        </>
    )
}   

export default OrderPage