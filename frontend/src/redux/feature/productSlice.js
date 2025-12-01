import { createSlice } from "@reduxjs/toolkit"

export const ProductSlice=createSlice({

    name:'Product',
    initialState:{
        name:"",
        category:'',
        price:'',
        description:'',
        image:''
    },
    reducers:{
    setName:(state,action)=>{
  state.name=action.payload
    },

    setCategory:(state,action)=>{
  state.category=action.payload
    },
    setPrice:(state,action)=>{
        state.price=action.payload
    },
    setDescription:(state,action)=>{
        state.description=action.payload
    },
    setImage:(state,action)=>{
        state.image=action.payload
    }
    }
})
export const {setName,setCategory,setPrice,setDescription,setImage} = ProductSlice.actions
export const selectName=(state)=>state.product.name
export const selectCategory=(state)=>state.product.category
export const selectPrice=(state)=>state.product.price
export const selectDescription=(state)=>state.product.description
export const selectImage=(state)=>state.product.image
export default ProductSlice.reducer