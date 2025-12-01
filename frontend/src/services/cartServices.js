 // your axios baseURL setup file

import instance from "./instance";

const CartServices = {
  addToCart: async (productId, quantity = 1) => {
    return await instance.post("/cart/add", { productId, quantity });
  },

  getCart: async () => {
    return await instance.get("/cart");
  },

  removeFromCart: async (productId) => {
    return await instance.delete(`/cart/${productId}`);
  },
  increaseQuantity:async(productId)=>{
return await instance.put(`/cart/increase/${productId}`)
  },
  decreaseQuantity:async(productId)=>{
return await instance.put(`/cart/decrease/${productId}`)
  }
};

export default CartServices;
