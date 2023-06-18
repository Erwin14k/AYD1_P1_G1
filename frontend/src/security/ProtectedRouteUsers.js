import { Outlet, Navigate } from "react-router-dom";
import Cookie from 'cookie-universal'
const cookies = Cookie()
const crr_user = cookies.get("crr_user")

export const ProtectedRouteUsers = ({redirectTo,condition,condition2}) => {
   console.log("Cookie",crr_user,"Condition",condition)
   if(crr_user.type === condition || crr_user.type === condition2){
      return <Outlet/>
   }else{
      console.error("ERR User Redirecting to",redirectTo)
      return <Navigate to={redirectTo}/>
   }
}

   