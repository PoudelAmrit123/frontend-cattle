
import { useLogin } from "@/context/login.context"
import { useEffect } from "react"
import {  useNavigate } from "react-router-dom"

function LogoutPage() {

    const {logout}  = useLogin()
    const naviagte   = useNavigate()


     useEffect ( ()=>{
        
    const logoutFcn  = ()=>{
        logout()
       naviagte('/')
   } 

   logoutFcn()


     } , [])
   

    
     

  return (
    <>
    <div>Loggin Out.....</div>
    </>
  )
}

export default LogoutPage