// import ImageUpload from "./imageUpload"
import {ToastContainer} from 'react-toastify'
import { Navigate, Route, Routes } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/Login"
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import Products from './pages/admin/Products'
import UserDashboard from './pages/user/UserDashboard'
import UserDashboardPage from './pages/user/UserDashboardPage'
import ManageProducts from './pages/admin/ManageProducts'
import ProductPage from './pages/user/ProductPage'
import Carts from './pages/user/Carts'

import CheckOut from './pages/user/CheckOut'
import PaymentSuccess from './pages/user/PaymentSuccess'
import StripeCheckout from './pages/user/StripeCheckOut'
import OrderPage from './pages/user/OrderPage'

function App(){


return(
    <>
     
    <Routes>
<Route path='/' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>

<Route path='/admin' element={<AdminDashboard/>}>
<Route  path='dashboard' element={<AdminDashboardPage/>}/>
<Route  path='add-products' element={<Products/>}/>
<Route  path='add-products/:id' element={<Products/>}/>
<Route  path='manage-products' element={<ManageProducts/>}/>
{/* <Route path='/register' element={<Navigate to={'/Register'}/>}/> */}
    {/* <ImageUpload/> */}
</Route>

<Route path='/user' element={<UserDashboard/>}>
<Route path='dashboard' element={<UserDashboardPage/>}/>
<Route path='products' element={<ProductPage/>}/>
<Route path='carts' element={<Carts/>}/>
<Route path='cart/checkout' element={<CheckOut/>}/>
<Route path='orders' element={<OrderPage/>}/>
</Route>

<Route path="/payment" element={<StripeCheckout />} />
  <Route path="/payment-success" element={<PaymentSuccess />} />
    </Routes>
    <ToastContainer/>
    </>
)

}


export default App

