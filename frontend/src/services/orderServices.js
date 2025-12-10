import instance from "./instance"

const orderServices={

  addOrder:async(userData)=>{
 return await instance.post('/order',userData)

    },
    createPayment:async(userData)=>{

      return await instance.post('/payment/create-payment',userData)
    },

    getAllOrder:async()=>{
      return await instance.get('/order')
    }


}

export default orderServices