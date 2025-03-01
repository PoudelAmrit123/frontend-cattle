
import "./App.css";
import { Input } from "./components/ui/input";
import { useState } from "react";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";
// import cookies from 'js-cookies'

function App() {
  const [userName , setUserName]  =useState('')
  const [password , setPassword]   = useState('')

  // const handleTestBtnForCookies =  async()=>{

  //    const response =  await  fetch('http://localhost:8080/api/login' , {
  //       method : 'POST',
  //       headers : {
  //         'Content-Type': 'application/json'
  //       },
  //       body : JSON.stringify( {
  //         username : userName,
  //         password : password
  //       }),
  //       credentials : "include",
  //      })
  //    const data =    await response.json()
  //    console.log(data)
    
  // }
  return (
    
       <main>
         <h1>Cattle Monitoring system</h1>
          <Input
          value={userName}
          onChange={ (e)=> setUserName(e.target.value)}
         />
         <br />
         <Input
           type="password"
           value={password}
           onChange={ (e)=> setPassword(e.target.value)}
         />
         {/* <button onClick={handleTestBtnForCookies}></button> */}
       </main>
  );
}

export default App;
