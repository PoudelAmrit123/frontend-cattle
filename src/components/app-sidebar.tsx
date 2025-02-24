import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
  import { Activity, FileChartColumnIncreasingIcon, LayoutDashboard, User } from "lucide-react";
  import { Link } from "react-router";

  
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Activity Monitoring",
      url: "/activity",
      icon: Activity,
    },
    {
      title: "Cattle Profiles",
      url: "/cattle",
      icon: User,
    },
   
  ];
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader>
          <SidebarContent className="flex items-center p-4">
            <Link to="/dashboard">
              <img
                alt="Logo"
                src="https://example.com/logo.png"
                className="h-10 w-10" />
            </Link>
            <span className="ml-4 text-xl font-bold">Cattle Monitoring System</span>
          </SidebarContent>
        </SidebarHeader>
  
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Applications</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
  
          <SidebarGroup>
            <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                
                 
              
                <SidebarMenuItem>
               
                  <SidebarMenuButton asChild>
                    <Link to="/report" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                      <FileChartColumnIncreasingIcon className="w-5 h-5" />
                      <span>Report</span>
                    </Link>
                  </SidebarMenuButton>
                  
                </SidebarMenuItem>
               
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
  
        <SidebarFooter className="p-4">
          {/* Add footer content here */}
        </SidebarFooter>
      </Sidebar>
    );
  }
  