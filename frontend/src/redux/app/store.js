import { configureStore, createReducer } from "@reduxjs/toolkit";
import registerReducer from '../feature/registerSlice';
import productReducer from '../feature/productSlice';
import cartReducer from '../feature/cartSlice';
const store=configureStore({

    reducer:{
        register:registerReducer,
        product:productReducer,
        cart:cartReducer,
    }
})


export default store