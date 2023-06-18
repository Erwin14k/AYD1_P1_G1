import { Outlet, Navigate } from "react-router-dom";
import Cookie from 'cookie-universal'
const cookies = Cookie()
const crr_user = cookies.get("crr_user")

export const ProtectedRouteLogin = ({redirectTo,condition}) => {
   console.log("Cookie",crr_user,"Condition",condition)
   if(crr_user === condition){
      return <Outlet/>
   }else{
      if(crr_user.type === 0){
         redirectTo = "/Module-Admin"
      }else if(crr_user.type === 1){
         redirectTo = "/Module-Cliente"
      }else if(crr_user.type === 2){
         redirectTo = "/Module-Repartidor"
      }else if(crr_user.type === 3){
         redirectTo = "/Module-Empresa"
      }
      console.error("ERR Login Redirecting to",redirectTo)
      return <Navigate to={redirectTo}/>
   }
}

   