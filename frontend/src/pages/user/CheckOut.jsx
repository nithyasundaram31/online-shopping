import { useDispatch, useSelector } from "react-redux";
import { selectItems, setItems } from "../../redux/feature/cartSlice";
import { useEffect } from "react";
import CartServices from "../../services/cartServices";
import orderServices from "../../services/orderServices";
import { selectCity, selectName, selectPhone, selectPincode, selectStreet, setCity, setName, setPhone, setPincode, setStreet } from "../../redux/feature/orderSlice";
import { toast } from "react-toastify";

function CheckOut(){

 const items=useSelector(selectItems)
 const name=useSelector(selectName);
 const phone=useSelector(selectPhone);
 const street=useSelector(selectStreet);
 const city=useSelector(selectCity);
 const pincode=useSelector(selectPincode)
    const dispatch=useDispatch()

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
}catch(error){
console.log('order error response is:',error)
}       
 }      
return( 
    <> 
      <div className="mt-16 mb-6  text-center text-green-500 text-md">checkout page</div>
        <div className=" text-center  text-md mb-3"> Delivery Address:</div>
        <div className="p-4    mx-auto  md:w-[40%] w-full"> 
      <div className=" flex  flex-col justify-center items-center">
    
    <div className="w-full ">
        <div >Name:</div>
        <input onChange={(e)=>dispatch(setName(e.target.value))} value={name} type='text' className="border-2  w-full  mb-2 p-1"/>   
    </div>                                  
                
      <div className="w-full">
<div> Phone:</div>
         <input   onChange={(e)=>dispatch(setPhone(e.target.value))} value={phone} type='number' className="border-2  w-full  mb-2 p-1"/>
      </div>
      
       <div className="w-full ">
        <div> Street:</div>
      <input  onChange={(e)=>dispatch(setStreet(e.target.value))} value={street} type='text' className="border-2  w-full   mb-2 p-1"/>
       </div>
  
    <div className="w-full ">
       <div>city:</div>
      <input  onChange={(e)=>dispatch(setCity(e.target.value))} value={city} type='text' className="border-2  w-full   mb-2 p-1"/>
    </div>
   
     <div className="w-full ">
      <div>pincode:</div> 
      <input onChange={(e)=>dispatch(setPincode(e.target.value))} value={pincode} type='text' className="border-2  w-full    mb-2 p-1"/>
     </div>
      </div>
<div className="text-md font-semibold"> Order summary:</div>
       {items.map((item)=>
       <div className="bg-gray-200 mb-2 p-2" key={item._id}>
        <img  className='w-16 h-16'src={item?.productId?.image}/>
<div className="  text-red-500 text-base ">{item?.productId?.name}</div>
<div className=" text-red-500 text-base ">Quantity:{item?.quantity}</div>
<div className="  text-red-500 text-base ">Price:{item?.productId?.price}</div>
       </div> )}

       <div className="text-black">
  <hr className="border-t mb-2 border-gray-400 "/>
  </div>
  <div className="text-xl font-semibold ">Amount:₹ {totalAmount.toLocaleString('en-IN')} </div>
     <button  onClick={handleOrder} className="px-4 py-1 bg-yellow-400 transition transform active:scale-90">Pay Now</button>
       </div>
    </>
     
)      
}   

export default CheckOut