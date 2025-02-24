import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Dashboard from "./components/dashboard/page.tsx";
import CattleProfile from "./components/cattle-profile/page.tsx";
import CattleDetails from "./components/cattle-details/page.tsx";
import ActivityPage from "./components/activity/page.tsx"
import Layout from "./components/layout.tsx";
import ReportPage from "./components/report-page/page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children : [
      { index : true , element : <App/>    },
      { path : "dashboard" , element : <Dashboard/>    },
      {path : "cattle" , element : <CattleProfile/>},
      {path : "cattle/:id" , element : <CattleDetails/>},
      {path : "activity" , element : <ActivityPage/>},
      {path : "report" , element : <ReportPage/>},
      
  ],
  },

]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
