import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./index.css";
// import App from "./App.tsx";
import Dashboard from "./components/dashboard/page.tsx";
import CattleProfile from "./components/cattle-profile/page.tsx";
import CattleDetails from "./components/cattle-details/page.tsx";
import ActivityPage from "./components/activity/page.tsx"
import Layout from "./components/layout.tsx";
import ReportPage from "./components/report-page/page.tsx";
import LoginPage from "./components/login/page.tsx";
import { useLogin } from "./context/login.context.tsx";
import { LoginProvider } from "./context/login.context.tsx";
import SignupPage from "./components/signup/page.tsx";
import LogoutPage from "./components/logout/page.tsx";



const App = ()=>{
  const {isLoggedIn}  = useLogin()
  console.log('from main page' , isLoggedIn)
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage  />,
    },
    {
      path :'/signup' ,
      element : isLoggedIn  ? <Navigate to='/dashboard' replace/> : <SignupPage/>,
    },
    {
      path :'/logout',
      element : isLoggedIn ? <LogoutPage/> : <Navigate to='/' replace/>

    },
    {
      path : "/dashboard" ,
      element : isLoggedIn ? <Layout/> : <Navigate to="/" replace/> ,
      children : [
        { index : true , element : <Dashboard/>}
      ]
    },
  
    {
      path : "/cattle" ,
      element : isLoggedIn ? <Layout/> : <Navigate to="/" replace/> ,
      children : [
        { index : true , element : <CattleProfile/>}
      ]
    },
    {
      path : "/cattle/:id" ,
      element : isLoggedIn ? <Layout/> : <Navigate to="/" replace/> ,
      children : [
        { index : true , element : <CattleDetails/>}
      ]
    },
    {
      path : "/activity" ,
      element : isLoggedIn ? <Layout/> : <Navigate to="/" replace/> ,
      children : [
        { index : true , element : <ActivityPage/>}
      ]
    },
    {
      path : "/report" ,
      element : isLoggedIn ? <Layout/> : <Navigate to="/" replace/> ,
      children : [
        { index : true , element : <ReportPage/>}
      ]
    },
  
  
    // {
    
    //   path: "*",
    //   element: <Layout/>,
    //   children : [
    //     { index: true, element: <Navigate to="/dashboard" replace /> },
    //     { path : "dashboard" , element : <Dashboard/>    },
    //     {path : "cattle" , element : <CattleProfile/>},
    //     {path : "cattle/:id" , element : <CattleDetails/>},
    //     {path : "activity" , element : <ActivityPage/>},
    //     {path : "report" , element : <ReportPage/>},
        
    // ],
    // },
  
    
  
  ]);


  return  <RouterProvider router={router} />

}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <LoginProvider>

    <App/>
    </LoginProvider>
  </StrictMode>
);
