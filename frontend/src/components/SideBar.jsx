import { Link } from "react-router-dom"
import AdminDashboardPage from "../pages/admin/AdminDashboardPage"
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../redux/feature/cartSlice";

function SideBar({count}) {
const user=JSON.parse(localStorage.getItem('user'))
console.log('sidebar logged in user:',user)
const[show,setShow]=useState(false)

const items=useSelector(selectItems)
console.log('cart count is:',items)
// const dispatch=useDispatch()
const handleMenu=()=>{
    setShow(!show)
}

    return (
        <>
        {/* Navbar with mobile menu */}
        <div className=" relative z-50 ">
             <div className=" fixed  w-full bg-white p-3  shadow-md ">
                <div className="flex justify-between ">
                    <div className="flex">
                     <div className="ml-6 ">Admin</div>
                     <div>{count}</div>
 <button  onClick={handleMenu} className=" md:hidden absolute left-2 top-3 text-2xl =" ><HiMenu/></button>
 
                </div>
                <div className=" relative flex gap-2  items-center text-center">
                      <Link to='/user/carts'><img  className=' mix-blend-multiply w-8 h-8 border-black' src='/cartIcon.png'/></Link>
                <div className=" absolute left-5 -top-1 bg-green-600 px-1.5 text-white rounded-full text-sm">{items?.length !==0?items?.length:''}</div>
                <div className="mr-10">Hi, {user?.name.charAt(0).toUpperCase()+user?.name.slice(1).toLowerCase() }</div>
                
                </div>
              
                </div>
               
             </div>
         
        </div>
         
         { user?.role=='admin'?(
         <div className={`${show?'hidden': 'md:block'} fixed  z-[30] md:block  bg-white shadow  w-48 h-screen`}>
                    <div className=" p-4 mt-16 flex flex-col gap-3  text-sm font-bold">

                        <Link to='/admin/dashboard'>Dashboard</Link>
                        <Link to='/admin/add-products'>Add products</Link>
                        <Link to='/admin/manage-products'>manage products</Link>
                        <div>orders</div>
                        <Link to='/login'>Logout</Link>
                    </div>
              
                   
                </div>
       )
       :(
         <div className={`${show?'hidden':'md:block'} fixed md:block  bg-white shadow  w-48 h-screen`}>
                    <div className=" p-4 mt-16 flex flex-col gap-3  text-sm font-bold">

                        <Link to='/user/dashboard'>user Dashboard</Link>
                        <Link to='/user/products'> Products</Link>
                        <Link to='/user/carts'>Carts</Link>
                        <div>orders</div>
                       <Link to='/login'>Logout</Link>
                    </div>
              
                   
                </div>
       )}
      

               
          



        </>
    )

}

export default SideBar