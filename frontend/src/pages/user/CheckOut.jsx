import { useDispatch, useSelector } from "react-redux";
import { selectItems, setItems } from "../../redux/feature/cartSlice";
import { useEffect } from "react";
import CartServices from "../../services/cartServices";
import orderServices from "../../services/orderServices";
import { selectCity, selectName, selectPhone, selectPincode, selectStreet, setCity, setName, setPhone, setPincode, setStreet } from "../../redux/feature/orderSlice";
import { toast } from "react-toastify";
import { PaymentElement } from "@stripe/react-stripe-js";
import {  useNavigate } from "react-router-dom";

function CheckOut(){

 const items=useSelector(selectItems)
 const name=useSelector(selectName);
 const phone=useSelector(selectPhone);
 const street=useSelector(selectStreet);
 const city=useSelector(selectCity);
 const pincode=useSelector(selectPincode)
    const dispatch=useDispatch()
    const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));
const userId=user?.id
console.log('userid from the checkout page:',userId)
    const fetchCart = async () => {
      try {
        const response = await CartServices.getCart();
        dispatch(setItems(response.data.items||[])); 
        console.log('fetch cart  checkout response items:', response.data.items);
      } catch (err) {
        console.log('fetch cart error response:', err);
      }
    }
     useEffect(() => { 
    fetchCart();
  }, []);

const formattedItems = items.map((i) => ({
  productId: i.productId._id,
  name: i.productId.name,
  price: i.productId.price,
  quantity: i.quantity,
  image: i.productId.image
}));
  const totalAmount=items.map((i)=>(i.productId?.price * i?.quantity)).reduce((acc,curr)=>curr+acc,0)

  const handleOrder=async(e)=>{
    e.preventDefault();
try{           
                      
  const response=await orderServices.addOrder({items:formattedItems,
   
        name,
        phone,
        street,
        city,
        pincode,
         totalAmount,})

console.log('order response is:',response.data)
dispatch(setName(''));
dispatch(setPhone(''));
dispatch(setStreet(''));
dispatch(setCity(''));
dispatch(setPincode(''));

    const paymentIntent = await orderServices.createPayment({
      amount: totalAmount, userId, items:formattedItems
    });

    const clientSecret = paymentIntent.data.clientSecret;

    // Redirect to Stripe Payment Page
    navigate("/payment",{ state: { clientSecret } });

}catch(error){
console.log('order error response is:',error)
}       
 }      
return( 
    <> 
     
        <div className=" mt-24 text-center md:ml-8 text-gray-900 font-bold text-xl text-md mb-3"> Delivery Address</div>
      <div className=" flex  flex-col justify-center items-center">
    <form className="  p-6 md:ml-28 md:w-[40%] w-full"  onSubmit={handleOrder}>
    <div className="w-full ">
        <div >Name:</div>
        <input onChange={(e)=>dispatch(setName(e.target.value))} value={name} type='text'  required className="border-2  w-full  mb-2 p-1"/>   
    </div>                                  
                
      <div className="w-full">
<div> Phone:</div>
         <input   onChange={(e)=>dispatch(setPhone(e.target.value))} value={phone}   required  type='number' className="border-2  w-full  mb-2 p-1"/>
      </div>
      
       <div className="w-full ">
        <div> Street:</div>
      <textarea onChange={(e)=>dispatch(setStreet(e.target.value))} value={street} type='text'   required  className="border-2  w-full   mb-2 p-1"/>
       </div>
  
    <div className="w-full ">
       <div>city:</div>
      <input  onChange={(e)=>dispatch(setCity(e.target.value))} value={city} type='text'   required   className="border-2  w-full   mb-2 p-1"/>
    </div>
   
     <div className="w-full ">
      <div>pincode:</div> 
      <input onChange={(e)=>dispatch(setPincode(e.target.value))} value={pincode} type='text'   required  className="border-2  w-full    mb-2 p-1"/>
     </div>
    
<div className="text-md font-semibold mb-2"> Order summary:</div>
       {items.map((item)=>
       <div className="border border-gray-400 rounded shadow-md mb-2 p-2" key={item._id}>
        <img  className='w-16 h-16'src={item?.productId?.image}/>
<div className="  text-red-500 text-base ">{item?.productId?.name}</div>
<div className=" text-red-500 text-base ">Quantity:{item?.quantity}</div>
<div className="  text-red-500 text-base ">Price:{item?.productId?.price}</div>
       </div> )}

       <div className="text-black">
  <hr className="border-t mb-4 border-gray-400 "/>
  </div>
  <div className="text-xl font-semibold mb-2 ">Amount:₹ {totalAmount.toLocaleString('en-IN')} </div>
     <button  type='submit' className="px-4 py-1  font-semibold rounded bg-yellow-400 transition transform active:scale-90">Pay Now</button>
     </form>
</div>
  
      
    </>
     
)      
}   

export default CheckOut