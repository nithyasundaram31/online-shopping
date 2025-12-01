import { Outlet } from "react-router-dom"
import NavBar from "../../components/NavBar"
import SideBar from "../../components/SideBar"

function AdminDashboard(){

    return( 
<>
<NavBar/>
<div className="flex "> 
<SideBar/>
{/* if we give flex-1 it will take the all remaining (leftover) space in the flex container. */}
 <div className="flex-1 p-6 mt-8 ">  
  <Outlet />              
      </div>
</div>

 
</>
       
    )
}

export default AdminDashboard