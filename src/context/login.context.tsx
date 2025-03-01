import  {createContext  , ReactNode, useContext, useEffect} from 'react'
import { useState } from 'react'



const LoginContext = createContext<any>(null)

export const LoginProvider = ({ children }: { children: ReactNode })=>{

    const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false)
    const [userEmail,  setUserEmail]  =  useState<any>('')

    useEffect ( ()=>{
      const savedLoginState = localStorage.getItem('isLoggedIn')
      if (savedLoginState === 'true') {
        setIsLoggedIn(true);
      }

    } , [])


    const login  = (email : any)=>{
        setUserEmail(email)
        setIsLoggedIn(true)
        localStorage.setItem('userEmail' , email)
        localStorage.setItem('isLoggedIn' , 'true')
    }

    const logout = ()=>{
        setIsLoggedIn(false)
        localStorage.setItem('userEmail' , '')
        localStorage.setItem('isLoggedIn' , 'false')
    }

    return (
        <LoginContext.Provider value={{ isLoggedIn   , login , logout , userEmail }}>
            {children}
        </LoginContext.Provider>
    )
    

}

export const useLogin =  ()=>{
     const context = useContext(LoginContext)
     if(!context){
        throw new Error('useLogin must be used within a LoginProvider')
     }
     return context
}