import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-toastify'

import { selectCategory,selectDescription,selectImage, selectName, selectPrice, setCategory, setDescription, setImage, setName, setPrice } from "../../redux/feature/productSlice"
import ProductServices from "../../services/productServices"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Products(){
const name=useSelector(selectName)
const price=useSelector(selectPrice)
const category=useSelector(selectCategory)
const image=useSelector(selectImage)
const description=useSelector(selectDescription)
const dispatch=useDispatch()
const {id}=useParams()
const navigate=useNavigate()
// const[imageFile,setImageFile]=useState(null)

useEffect(()=>{
     const  fetchProductById=async()=>{
if(id){
const response=await ProductServices.getProductById(id)
console.log('productById resposne id:',response.data)
dispatch(setName(response.data.name));
dispatch(setCategory(response.data.category))
dispatch(setPrice(response.data.price))
dispatch(setDescription(response.data.description))
dispatch(setImage(response.data.image))
console.log('fetchProductById resposne is:',response.data.image)
}

     }
     fetchProductById()
},[id])
 const handleForm=async(e)=>{
e.preventDefault();

try{
    
     let imageUrl=image  // this means when user  did't upload a new image(while editing) old image will remain .If they upload a new one, we’ll replace it later.  //block scop we declared here 

      if ( image && image instanceof File ) {
        const formData = new FormData(); //this is used to send files (images, videos, documents) to a server.
        formData.append("file", image); //"file" is the key name your backend expects to receive.
        const uploadResponse = await ProductServices.uploadSingleFile(formData); //You call an API request that sends this formData to your backend,and your backend will upload it to Cloudinary.
        console.log("upload response is:",uploadResponse)
     imageUrl = uploadResponse.data.url;
      }

      if(id){
          const response=await ProductServices.updateProduct(id,{ name,category, price,description, image: imageUrl })
     console.log('update resposne is:',response.data)
     toast.success('Product update successfully');
navigate('/admin/manage-products')

      }else{
            const response=await ProductServices.createProduct({ name,category, price,description, image: imageUrl });
     console.log('product response is:',response.data)
     toast.success('Product added');
      }
     
     dispatch(setName(''));
      dispatch(setCategory(''))
       dispatch(setPrice(''))
        dispatch(setDescription(''))
         dispatch(setImage(''))

}catch(error){
console.log('product error is:',error)
}
     }

    
    return(<>
    <div className=" relative  flex flex-col items-center justify-center">
         <div>products</div>
         <div className=" w-full md:w-[40%] border p-6 md:ml-24 mt-6 ">

    <form  onSubmit={handleForm} className="flex flex-col gap-4" >
        
  <input  className="border p-2 rounded" type='text' placeholder=" Product Name"
  value={name} onChange={(e)=>dispatch(setName(e.target.value))}/>
  <input value={category}  onChange={(e)=>dispatch(setCategory(e.target.value))} className="border p-2 rounded"type='text' placeholder='category'/>
    

  <input  value={price} onChange={(e)=>dispatch(setPrice(e.target.value))} className="border p-2 rounded" type='number' placeholder="Price" />
  <textarea  value={description} onChange={(e)=>dispatch(setDescription(e.target.value))} className="border p-2 rounded " type='text'  placeholder="description"/>
  <input  onChange={(e)=>dispatch(setImage(e.target.files[0]))}   alt="Product Preview" className="border p-2 rounded "  type='file'/>
  <button  type='submit' className="border p-2 rounded bg-blue-500 transition transform active:scale-90 ">{id?'update':'create'}</button>
    </form>
         </div>
   
    </div>
   
    </>)
}

export default Products