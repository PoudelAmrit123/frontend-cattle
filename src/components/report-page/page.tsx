import { useEffect, useState } from "react";

export default function ReportPage() {
  const [timeDuration, setTimeDuration] = useState("30"); 
  const [cowId, setCowId] = useState("");
  const [details, setDetails] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [cattleList, setCattleList] = useState<any>([]); 


  const fetchLengthData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/cows/activity");
      const data = await response.json();
      console.log("The data received from the total length is", data);

      if (data.data) {
        const newCattleList = Array.from({ length: data.data.length }, (_, i) => ({
          id: (i + 1).toString(),
          name: `Cattle ${i + 1}`,
        }));

        setCattleList(newCattleList); // <-- Store it in the state
      }
    } catch (error) {
      console.error("Error fetching cattle data:", error);
    }
  };

  useEffect(() => {

    

    fetchLengthData();
  }, []);

  

  const handleDownloadReport = async () => {
    const uri =
      timeDuration === "all"
        ? "http://localhost:8080/api/report"
        : `http://localhost:8080/api/report?dur=${timeDuration}`;
    console.log(uri);

    const response = await fetch(uri);

    if (response.ok) {
      const blob = await response.blob();
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);

      link.href = url;
      link.download = "cow_report.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleDownloadReportById = async ()  => {

    const cowID =  cowId
    const detailsValue = details
    const duration = timestamp



    const uri = `http://localhost:8080/api/report/${cowID}/timestamp?dur=${duration}&details=${detailsValue}`
       const response  = await fetch(uri)
        if ( response.ok){


          const blob = await response.blob();

          const link = document.createElement("a");
          const url = window.URL.createObjectURL(blob)

          link.href = url ;
          link.download = `cow_${cowID}_report.pdf`;
          link.click();

          window.URL.revokeObjectURL(url);
        }
   

 

    
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Cow Activity Report</h1>

      {/* Download Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleDownloadReport}
          className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Download Report
        </button>
      </div>

      {/* All Cow Details Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">All Cow Details</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <label className="text-sm font-medium mb-2 sm:mb-0">Select Time </label>
          <select
            value={timeDuration}
            onChange={(e) => setTimeDuration(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-4 text-sm"
          >
            <option value="30">Last 30 minutes</option>
            <option value="60">Last 1 hour</option>
            <option value="120">Last 1 day</option>
            <option value="180">Last 30 days</option>
            <option value="all">All -Time</option>
          </select>
        </div>
      </div>

      {/* Cow Details by ID Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Cow Details by ID</h2>

        <div className="space-y-4">
          {/* Cow ID Dropdown */}
          <div>
            <label className="block text-sm whitespace-normal font-medium">Select Cow ID:</label>
            <select
              value={cowId}
              onChange={(e) => setCowId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-sm bg-white"
            >
              <option value="">Select a Cow</option>
              {cattleList.map((item : any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Checkpoint (Details True/False) */}
          <div>
            <label className="block text-sm font-medium">Show Detailed Report:</label>
            <div className="flex items-center space-x-3">
              <label htmlFor="details-true" className="flex items-center text-sm">
                <input
                  type="radio"
                  id="details-true"
                  name="details"
                  value="true"
                  checked={details === true}
                  onChange={() => setDetails(true)}
                  className="mr-2"
                />
                Yes
              </label>
              <label htmlFor="details-false" className="flex items-center text-sm">
                <input
                  type="radio"
                  id="details-false"
                  name="details"
                  value="false"
                  checked={details === false}
                  onChange={() => setDetails(false)}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Timestamp Dropdown */}
          <div>
            <label className="block text-sm font-medium">Select Timestamp:</label>
            <select
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-sm bg-white"
            >
              <option value="">Select Timestamp</option>
              <option value="10">Last 30 min</option>
              <option value="1000">Last 1 hr </option>
              <option value="2000">Last 7 day</option>
              <option value="5000">Last 30 day</option>
              {/* <option value="2025-02-24T12:00:00">All Time</option> */}
            </select>
          </div>

          <div className="text-center mb-8">
            <button
              onClick={ handleDownloadReportById}
              className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 "
              disabled={!cowId  || !timestamp}
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
