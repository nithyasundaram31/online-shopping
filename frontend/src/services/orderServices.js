import instance from "./instance"

const orderServices={

  addOrder:async(userData)=>{
 return await instance.post('/order',userData)

    }


}

export default orderServices