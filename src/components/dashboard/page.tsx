import React, { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
// import { it } from 'node:test'

function Dashboard() {
  const [cowDetails, setCowDetails] = React.useState<any>([]);

  useEffect(() => {
    const fetchCowDetails = async () => {
      const response = await fetch("http://localhost:8080/api/cow");
      // console.log(response.json())
      const responseData = await response.json();
      setCowDetails(responseData.data);
    };

    fetchCowDetails();
  }, []);

  
    console.log(cowDetails);
  

  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <SidebarTrigger className="ml-1">Trigger Button</SidebarTrigger>
      </div>
      <main>
        {/* {cowDetails.map( ( item : any)=>{
            return (
                <div>
                    <h1>total length is {cowDetails.length}</h1>
                </div>
            )

           })} */}

       
        <div>
          <h1>Building.......</h1>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default Dashboard;
