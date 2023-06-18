import { Outlet, Navigate } from "react-router-dom";
import Cookie from 'cookie-universal'
const cookies = Cookie()
const crr_user = cookies.get("crr_user")

export const ProtectedRouteLogin = ({redirectTo,condition}) => {
   console.log("Cookie",crr_user,"Condition",condition)
   if(crr_user === condition){
      return <Outlet/>
   }else{
      console.error("ERR Login Redirecting to",redirectTo)
      return <Navigate to={redirectTo}/>
   }
}

   