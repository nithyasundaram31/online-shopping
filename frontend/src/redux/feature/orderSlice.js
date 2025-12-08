import { createSlice } from "@reduxjs/toolkit";

export const orderSlice=createSlice({

    name:'order',
    initialState:{
         name:"",
          phone:'',
        street:'',
        city:'',
        pincode:''
    },
   reducers:{
setName:(state,action)=>{
state.name=action.payload
},
setPhone:(state,action)=>{
state.phone=action.payload
},
setStreet:(state,action)=>{
state.street=action.payload
},
setCity:(state,action)=>{
state.city=action.payload
},
setPincode:(state,action)=>{
state.pincode=action.payload
}
   }
})

export const{setName,setPhone,setStreet,setCity,setPincode}=orderSlice.actions
export const selectName=(state)=>state.order.name
export const selectPhone=(state)=>state.order.phone
export const selectStreet=(state)=>state.order.street
export const selectCity=(state)=>state.order.city
export const selectPincode=(state)=>state.order.pincode
export default orderSlice.reducer