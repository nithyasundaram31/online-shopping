import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectPassword, setEmail, setPassword,} from "../redux/feature/registerSlice";
import authServices from "../services/authServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login(){
const[show,setShow]=useState(false)
const email=useSelector(selectEmail);
const password=useSelector(selectPassword);
const dispatch=useDispatch()
const navigate=useNavigate();

const handleSubmit=async(e)=>{
e.preventDefault()
try{
const response=await authServices.login({email,password})
console.log('login response is:',response.data)
localStorage.setItem('token',response.data.token)
  localStorage.setItem('user', JSON.stringify(response.data.user));
  const user=JSON.parse(localStorage.getItem('user',response.data.user));
  console.log("current logged in user:",user)
toast.success('Login successful');

if(user?.role=='user'){
navigate('/user/products')
}else{
navigate('/admin/dashboard')
}

}catch(error){
toast.error('Login failed')
console.log("login failed is:",error)
}
}
const handleShow=(e)=>{
    e.preventDefault()
    setShow(!show)
}   
        
    return(
        <>
        <div className="p-4">
              <div className="p-6 w-full md:w-[30%] mx-auto rounded border mt-24">
           
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
        <input type='text'  value={email} className=' border p-2 rounded' placeholder="Email" 
        onChange={(e)=>dispatch(setEmail(e.target.value))}/>
        <div className="relative">
            <input  value={password} onChange={(e)=>dispatch(setPassword(e.target.value))} type={show?'text':'password'}  className='w-full  border p-2 rounded'  placeholder="password" />
            <button onClick={handleShow} className="absolute right-3 top-2">{show?<FaEye/>:< FaRegEyeSlash/>}</button>
        </div>
              
              <button type='submit' className="bg-blue-500 p-2 rounded">Login</button>
  <p className="text-sm">Don't you have an account? <Link to='/register' className="text-blue-500">Register here</Link></p>
                </form>
        
           
           
    

        </div>
        </div>
      
        </>
    )


}


export default Login;