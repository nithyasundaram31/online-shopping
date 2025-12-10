import { useEffect, useState } from "react";
import cartServices from "../../services/cartServices";
import CartServices from "../../services/cartServices";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, setItems } from "../../redux/feature/cartSlice";
import { Link } from "react-router-dom";

function Carts() {
  // const [items, setItems] = useState([]);
// const[quantity,setQuantity]=useState('')
 const items=useSelector(selectItems);
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
      <div className="text-center  font-semibold  text-xl p-4 mt-12 -mb-2">Carts</div>
      <div className=" p-2  flex flex-col md:flex-row  mx-auto">
        <div className="w-full md:w-[70%] md:ml-44 md:pl-4"> 
             {items.map((item,index) => (
          <div className=' border border-gray-300 rounded p-4 m-2' key={index}>
           <div className="flex flex-col ">
             <img  className='w-16 h-16'src={item?.productId?.image}/>
             <div><sapn className='font-semibold '>Name: </sapn>{item.productId.name}</div>
            <div><sapn className='font-semibold '>Price: ₹</sapn>{item.productId.price}</div>
            <div><sapn className='font-semibold '>Description: </sapn>{item.productId.description}</div>
            
            <div className=" mt-2 flex  gap-2 ">
              <div className=" py-1 px-2 flex justify-center items-center text-center border-2 border-yellow-400 rounded-full  flex gap-2">
                 <button onClick={()=>handleIncrease(item.productId._id)} className=" transform transition active:scale-90 ">✛</button>
              <div className="ml-2">{item.quantity}</div>
               <button  onClick={()=>handleDecrease(item.productId._id)}className="transform transition text-center active:scale-90 w-6 h-6">━</button>
              
               <button  onClick={()=>handleRemove(item.productId._id)} ><img  className=" w-4 h-4 " src='/delete.png'/></button>
              </div>
             
            </div>
            
           </div>
             
           </div> 
         
         
        ))}
        </div>
       
         <div className=" overflow-y-scroll w-full md:w-[20%] shadow bg-gray-100  mt-2 h-1/2 ">
            <div className="font-semibold  text-xl mt-4 text-center">SubTotal</div>
               <div className="p-2 font-bold text-red-600 text-center">₹ {items.map((item)=>item.productId?.price * item.quantity).reduce((acc,curr)=>curr+acc,0).toLocaleString("en-IN")}</div>
           <div className="text-sm text-green-500  font-semibold text-center hover:text-green-600 "><Link  to='/user/cart/checkout' >[Proceed to checkout]</Link></div>
            {items.map((item)=>
                <div className="p-2 flex flex-col items-center justify-center" key={item._id}>
                  <img  className='h-20 w-20 'src={item.productId.image}/>
                    <div className="font-semibold"> {item.productId.name}:${item.productId?.price}</div>
                    <div className="font-semibold"> quantity:${item.quantity}</div>
           
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
