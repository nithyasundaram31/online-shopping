import { useEffect, useState } from "react"
import ProductServices from "../../services/productServices"
import {useNavigate} from "react-router-dom"

 function ManageProducts(){
const[products,setProducts]=useState([])
const navigate=useNavigate()

    const fetchProducts=async()=>{
try{
const response=await ProductServices.getProducts()
console.log('all product response is:', response.data)
setProducts(response.data)
}catch(error){
console.log('error response is:',error)
}
    }
 useEffect(()=>{
    fetchProducts()
},[])

//update
const handleUpdate=(id)=>{
navigate(`/admin/add-products/${id}`)
// const response= await ProductServices.updateProduct(id,{})
}

const handleDelete=async(id)=>{
    try{
     const response=await ProductServices.deleteProduct(id)
    setProducts(products.filter((a)=>a._id!==id))
    console.log('the delete response is:',response.data)
     
    
    }catch(error){
    console.log('delete error is:',error)
    }
}

return(
    <>
    <div className="  w-full  md:w-[70%] mx-auto md:mr-16 ">
    <div className=" text-center">Manage Products</div>
     
    {products.map((product)=>
    
    <div className="" key={product._id}>
         <div className=" bg-gray-200 flex  mb-4 p-2 gap-4 ">
            <div className=" flex items-center justify-center  ">
               {product.image && (
  <img src={product.image} alt="product" className="w-32 h-32" />
)}
            </div>
            <div className="flex flex-col   justify-center">
        <div className="">Name:{product?.name}</div>
<div className="">Price:{product.price}$</div>
<div className="">Category:{product.category}</div>
<div className="">Description:{product.description}</div>
<div className="flex gap-2 mt-2">
    <button onClick={()=>handleDelete(product._id)} className="bg-red-500 py-1 px-2 rounded transform transition active:scale-90">Delete</button>
    <button  onClick={()=>handleUpdate(product._id)} className="bg-blue-500 py-1 px-2 rounded transform transition active:scale-90">Update</button>
</div>

            </div>

  </div>
    </div>)}
    </div>
  
   </>
)
 }

 export default ManageProducts