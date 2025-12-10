import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

 function PaymentSuccess() {
const navigate=useNavigate()
  useEffect(() => {
    // Navigate after 2 seconds
    const timer = setTimeout(() => {
      navigate("/user/products");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  navigate('/user/products')
  return (
    <div className="p-4 ">
      <div className=" w-full md:w-[40%]  mx-auto mt-16 h-64 p-4 bg-white  shadow-lg  ">
         <div className=" p-2 flex mt-16 flex-col justify-center items-center">
          <div>
            <h1 className="text-5xl rounded  mb-4 text-center ">✅</h1>
               <h1 className="text-center font-semibold " >🎉 Payment Successful!</h1>
      <p className="text-center font-semibold" >Your order was placed successfully.</p> 
          </div>
        

         </div>
       
      </div>
     
    </div>
  );
}

export default PaymentSuccess