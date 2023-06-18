import { Outlet, Navigate } from "react-router-dom";
import Cookie from 'cookie-universal'
const cookies = Cookie()
const crr_user = cookies.get("crr_user")

export const ProtectedRoute = ({redirectTo,condition}) => {
   console.log("Cookie",crr_user,"Condition",condition)
   if(crr_user === condition){
      return <Outlet/>
   }else{
      return <Navigate to={redirectTo}/>
   }
}

   