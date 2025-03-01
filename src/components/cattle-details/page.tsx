import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

function CattleDetails() {
  const { id } = useParams(); 
  const [cowDetails, setCowDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState("30"); 
  const [detailedActivity, setDetailedActivity] = useState([]);
  const [showDetails, setShowDetails] = useState(false); 
  useEffect(() => {
    const fetchCattleDetails = async () => {
      try {

        const uri = selectedDuration === "allTime" ? `http://localhost:8080/api/cow/activity/${id}` : `http://localhost:8080/api/cow/activity/${id}/timestamp?dur=${selectedDuration}`
        console.log('the uri is ' , uri)  // Debugging purpose only.
        const response = await fetch(uri , {
          headers :  {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('userEmail')}`  
            },
          
        });
        const data = await response.json();
        console.log('the data to stored in detailedActivity State is  ' , data.data.dataWithInTimeStamp)
        setCowDetails(data.data);
        setDetailedActivity(data.data.dataWithInTimeStamp)
      } catch (error) {
        console.error("Error fetching cattle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCattleDetails();
  }, [id , selectedDuration]);

  // const fetchDataWithTimestamp = async (duration : any) => {
  //   console.log('fetching data with timestamp')
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/cow/activity/${id}/timestamp?dur=${duration}`);
  //     const data = await response.json();
  //     setDetailedActivity(data?.dataWithInTimeStamp || []);
  //   } catch (error) {
  //     console.error("Error fetching timestamped data:", error);
  //   }
  // };

  console.log('the data in more details is  ' , detailedActivity)


  return (
    <div className="p-6 max-w-4xl mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Cow Activity Details : {id}</h1>
          <p className="text-gray-700 text-lg">{cowDetails?.summary}</p>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Activity Breakdown</h2>
            <ul className="space-y-2">
              {Object.entries(cowDetails?.activityMap).map(([activity, count] : any) => (
                <li key={activity} className="flex justify-between border-b pb-2 text-gray-600">
                  <span>{activity}</span>
                  <span className="font-semibold">{count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Select Time Range */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">Select Time Range:</label>
            <select
              className="border border-gray-300 rounded-lg p-2 mt-1 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={selectedDuration}
              onChange={(e) => {
                setSelectedDuration(e.target.value);
                // fetchDataWithTimestamp(e.target.value);
              }}
            >
              <option value={30}>Last 30 min</option>
              <option value={60}>Last 1 hour</option>
              <option value={1440}>Last 24 hours</option>
              <option value={10080}>Last 7 days</option>
              <option value={43200}>Last 30 days</option>
              <option value={"allTime"}>All Time </option>
            </select>
          </div>

          {/* Show More Details Button */}
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide Details" : "More Details"}
            </button>
          </div>

          {/* Detailed Logs */}
          {showDetails && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg max-h-64 overflow-y-auto">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Detailed Activity Logs</h2>
              <ul className="space-y-2">
                {detailedActivity.length > 0 ? (
                  detailedActivity.map((entry : any) => (
                    <li key={entry._id} className="text-gray-600 border-b pb-2">
                      <span className="font-semibold">{new Date(entry.timestamp).toLocaleString()}</span> - {entry.behavior}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No detailed data available for the selected range.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CattleDetails;
