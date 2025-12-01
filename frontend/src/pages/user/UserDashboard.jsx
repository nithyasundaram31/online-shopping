
import { Outlet } from "react-router-dom"
import NavBar from "../../components/NavBar"
import SideBar from "../../components/SideBar"

function UserDashboard(){

return(
    <>
   <NavBar/>
   <div className="flex">
  <SideBar/>
  <div className="flex-1 ">
<Outlet/>
  </div>
   </div>
    </> 
)
}

export default UserDashboard

