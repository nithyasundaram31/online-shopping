import { configureStore, createReducer } from "@reduxjs/toolkit";
import registerReducer from '../feature/registerSlice';
import productReducer from '../feature/productSlice';
import cartReducer from '../feature/cartSlice';
import orderReducer from '../feature/orderSlice';
const store=configureStore({

    reducer:{
        register:registerReducer,
        product:productReducer,
        cart:cartReducer,
        order:orderReducer
    }
})


export default store