import instance from "./instance"

const ProductServices={

    createProduct:async(userData)=>{
 return await instance.post('/product',userData)},
    
     uploadSingleFile: async (formData) => {
  return await instance.post("/file/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
},
    getProducts:async()=>{
        return await instance.get('/product')
    },
    getProductById:async(id)=>{
       return  await instance.get(`/product/${id}`)
    },
    updateProduct:async(id,userData)=>{
        return await instance.put(`/product/${id}`,userData)
    },
    deleteProduct:async(id)=>{
   return await instance.delete(`/product/${id}`)
    }


}

export default ProductServices