import { useEffect, useState } from "react";
import cartServices from "../../services/cartServices";
import CartServices from "../../services/cartServices";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, setItems } from "../../redux/feature/cartSlice";

function Carts() {
  // const [items, setItems] = useState([]);
// const[quantity,setQuantity]=useState('')
 const items=useSelector(selectItems)
    const dispatch=useDispatch()

    const fetchCart = async () => {
      try {
        const response = await cartServices.getCart();
        dispatch(setItems(response.data.items||[])); 
        console.log('fetch cart response items:', response.data.items);
      } catch (err) {
        console.log('fetch cart error response:', err);
      }
    }
     useEffect(() => { 
    fetchCart();
  }, []);

  const handleRemove=async(id)=>{
try{
const response=await CartServices.removeFromCart(id)
console.log('remove response is:',response.data)
//  dispatch(response.data.cart?.items)
  dispatch(setItems(response.data.cart.items));

 fetchCart();
}catch(err){
  console.log('remove error response is:',err)
}
  }
  
  const handleIncrease=async(id)=>{
  try{
      const response=await cartServices.increaseQuantity(id);
      console.log('increase quantity response is:',response.data?.cart?.items) 
      fetchCart();
  }catch(error){
console.log('increase quantity error is:',error)
  }
  }

  const handleDecrease=async(id)=>{
    try{
    const  response= await cartServices.decreaseQuantity(id);
     console.log('The cart decrease response is: ', response.data?.cart?.items);
      fetchCart();
    }catch(err){
       console.log('The cart decrease err is: ', err)
    }
     
      
     
  }
  return (
    <>
      <div className="text-center p-4 mt-12 -mb-2">Carts</div>
      <div className=" p-2  flex flex-col md:flex-row  mx-auto">
        <div className="w-full md:w-[70%] md:ml-44 md:pl-4"> 
             {items.map((item,index) => (
          <div className=' bg-green-300 p-4 m-2' key={index}>
           <div className="flex flex-col ">
             <div>Name: {item.productId.name}</div>
            <div>Price: ₹{item.productId.price}</div>
            <div>Description: {item.productId.description}</div>
            
            <div>Quantity: {item.quantity}</div>
            <div className="flex gap-2">
              <button onClick={()=>handleIncrease(item.productId._id)} className="bg-yellow-400 px-2 transform transition active:scale-90">➕</button>
              <div>{item.quantity}</div>
               <button  onClick={()=>handleDecrease(item.productId._id)}className="bg-yellow-400 px-2 transform transition active:scale-90">➖</button>
               <button  onClick={()=>handleRemove(item.productId._id)} className="px-4 py-1 rounded bg-blue-700 transform transition active:scale-90 ">Remove</button>
            </div>
            
           </div>
             
           </div> 
         
         
        ))}
        </div>
       
         <div className=" overflow-y-scroll w-full md:w-[20%] shadow bg-gray-100  mt-2 h-64 ">
            <div className="font-semibold  mt-4 text-center">SubTotal</div>
               <div className="p-2 font-bold text-red-600 text-center">₹ {items.map((item)=>item.productId?.price * item.quantity).reduce((acc,curr)=>curr+acc,0).toLocaleString("en-IN")}</div>
           
            {items.map((item)=>
                <div className="p-2 flex flex-col items-center justify-center" key={item._id}>
                  <img  className='h-20 w-20 'src={item.productId.image}/>
                    <div> {item.productId.name}:${item.productId?.price}</div>
                    <div> quantity:${item.quantity}</div>
           
                    </div>)}
                    <div className="text-black">
                         <hr className="border-t border-gray-400 my-4" />

                    </div>
                   
                   
          </div>
      </div>
    </>
  );
}

export default Carts;
