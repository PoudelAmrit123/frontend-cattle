// import "./App.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <SidebarTrigger className="ml-1">Trigger Button</SidebarTrigger>
      </div>
      <main>
        <h1>Cattle Monitoring system</h1>
        <Outlet/>
      </main>
    </SidebarProvider>
    // </Router>
  );
}

export default Layout;
