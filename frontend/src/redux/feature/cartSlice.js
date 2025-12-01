import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },        
  reducers: {
    setAddToCart: (state, action) => {
      state.items.push(action.payload);
    },
    setRemoveFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },

    setItems:(state,action)=>{
      state.items=action.payload
    }
  },
});

export const { setItems,setAddToCart, setRemoveFromCart } = cartSlice.actions;
export const selectItems=(state)=>state.cart.items
// export const selectItems=(state)=>state.cart.items
export default cartSlice.reducer;
