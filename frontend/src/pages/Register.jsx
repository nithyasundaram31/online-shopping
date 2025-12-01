import { useState } from "react";
// import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaEye,  FaRegEyeSlash} from "react-icons/fa";
import { selectEmail, selectName, selectPassword, setEmail, setName, setPassword } from "../redux/feature/registerSlice";
import authServices from "../services/authServices";
import { useNavigate, Link } from "react-router-dom";

function Register(){
const[show,setShow]=useState(false);
const name=useSelector(selectName);
const email=useSelector(selectEmail);
const password=useSelector(selectPassword)
 const dispatch = useDispatch();
 const navigate=useNavigate()
    const handleForm=async(e)=>{
e.preventDefault();

try{
      console.log({ name, email, password });
    const response=await authServices.register({name,email,password})
console.log("register success",response.data)
dispatch(setName(''));
dispatch(setEmail(''))
dispatch(setPassword(''))
navigate('/login')
}catch(error){
console.log("register fail",error)

}
    }
//password toggle
    const handleShow=(e)=>{
        e.preventDefault()
        setShow(!show)
    }
  


    return(
        <>
        <div className="p-6 flex justify-center mt-20 items-center">
            <div className="w-full md:w-[30%] p-6   border">
            <form onSubmit={handleForm}>
         <div className=" flex gap-3 flex-col justify-center items-center">
            <input   type='text' value={name} className="border w-full p-2 " placeholder="Name"
            onChange={(e)=>dispatch(setName(e.target.value))}/>

       <input type='text'  value={email} className="border w-full p-2" placeholder="Email"
       onChange={(e)=>dispatch(setEmail(e.target.value))}
       />
        
        <div className=" relative  w-full">
              <input  type={show?"text":"password"}  value={password} className="border w-full p-2"
         placeholder="Password"   onChange={(e)=>dispatch(setPassword(e.target.value))} />
         <button onClick={handleShow} className="absolute right-4 top-2" >{show?<FaEye/>:< FaRegEyeSlash/>}</button>
        </div>
           
       
        
         <button type='submit' className="border w-full py-2 bg-blue-500 rounded">Register</button>
         <div className="text-sm">Already have an account? <Link to='/' className="text-sm text-blue-600" >Login here</Link></div>
            </div>
            </form>
          
          
         </div>
        </div>
        
        </>
    )


}


export default Register