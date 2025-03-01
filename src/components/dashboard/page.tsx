import React, { useEffect, useState } from "react";
import { Button } from "../ui/button"; 
import {  useNavigate } from "react-router-dom"; 
function Dashboard() {
  const [cowDetails, setCowDetails] = useState<any>([]);
  const [totalBehaviors, setTotalBehaviors] = useState<any>({});
  const [totalCattle, setTotalCattle] = useState<number>(0);
  // const [userName , setUserName] = useState<string>('')
  
  const navigate  = useNavigate()


  useEffect(() => {

    
    const fetchCowDetails = async () => {
      const response = await fetch("http://localhost:8080/api/cows/activity", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userEmail")}`,
        },
      });

      const responseData = await response.json();
      const { returnData, totalBehaviors, length } = responseData.data;

      setCowDetails(returnData); 
      setTotalBehaviors(totalBehaviors);
      setTotalCattle(length); 
    
    };

    fetchCowDetails();
  }, []);

  const generateSummary = (activityMap: any) => {
    const behaviorNames = Object.keys(activityMap);
    const totalCount = behaviorNames.reduce(
      (total, behavior) => total + activityMap[behavior],
      0
    );

    let summary = `The cow has been performing various activities. Total activities tracked: ${totalCount}. `;
    if (activityMap.Standing && activityMap.Standing > 200) {
      summary += "Prolonged standing might indicate a lack of rest. Please observe the cow for potential stress factors.";
    } else {
      summary += "The cow seems to be alternating between different activities, which is normal.";
    }
    return summary;
  };

  const handleGoToActivity = () => {
    navigate("/activity");
  };

  const handleGoToCattleProfile = (cowId: number) => {
    navigate(`/cattle/${cowId}`);
  };

  const userName = localStorage.getItem('userEmail') || ''
  const name = ( userName.split('@')[0] || '').toUpperCase()
  // name.toUpperCase()

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome! {name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
       
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Number of Cattle</h3>
          <p className="text-4xl font-bold text-gray-800 mt-4">{totalCattle}</p>
        </div>

        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Overall Behavior Summary</h3>
       {
        Object.entries(totalBehaviors).map( ([behavior , count ] : any) => (

          <div key={behavior} className="flex justify-between text-gray-700">
          <span>{behavior}</span>
          <span className="font-bold">{count}</span>
        </div>
        )     )
       }
          {/* <p className="text-gray-700">
            Total Activities Tracked: {totalBehaviors.totalActivities}
          </p>
          <p className="text-gray-700">
            Most Frequent Activity: {totalBehaviors.mostFrequentActivity}
          </p>
          <p className="text-gray-700">
            Average Standing Time: {totalBehaviors.averageStandingTime} minutes
          </p> */}
        </div>
      </div>
     
        {/* Button to navigate to Activity Page */}
      <div className="text-center text-white">
        <Button
          onClick={handleGoToActivity}
          // variant="secondary"
          className="w-full sm:w-auto mt-6 bg-black text-white"
        >
          View Activity History
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cow Details */}
        {cowDetails.length > 0 ? (
          cowDetails.map((cow: any) => (
            <div key={cow.cow_id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h5 className="text-lg font-semibold text-gray-800">Cow ID: {cow.cow_id}</h5>

              {/* Display Activity Map */}
              {/* <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${(cow.activityMap.Standing / 250) * 100}%`,
                  }}
                ></div>
              </div> */}

              <p className="text-gray-700 text-sm">{generateSummary(cow.activityMap)}</p>

              <Button
                onClick={() => handleGoToCattleProfile(cow.cow_id)}
                // variant="primary"
                className="mt-4 w-full"
              >
                View Profile
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No cow data available.</p>
        )}
      </div>

     
    </div>
  );
}

export default Dashboard;



