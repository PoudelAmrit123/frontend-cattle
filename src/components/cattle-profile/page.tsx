import  { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate , Outlet } from "react-router-dom";
import { Image } from "lucide-react";

function CattleProfile() {
  const [cattle, setCattle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [timeFilter, setTimeFilter] = useState("last_30_min");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCattleDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/cows/activity` , {
            headers : {
              'Content-Type' :'application/json' ,
              'Authorization': `Bearer ${localStorage.getItem('userEmail')}`
            }
          }
        );
        const data = await response.json();
        console.log('the data in cattle is ' ,data)
        setCattle(data.data.returnData);
        // setLoading(false)
      } catch (error) {
        console.error("Error fetching cattle data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCattleDetails();
  }, [timeFilter]);

  const handleDetailsBtn = (cowId : any) => {
    navigate(`/cattle/${cowId}`);
  };

  const filteredCattle = cattle.filter((cow : any) =>
    searchId ? cow.cow_id.toString().includes(searchId) : true
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cow Details</h1>

      <div className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search by Cow ID"
          className="p-2 border rounded-md bg-white"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        {/* <select
          className="p-2 border rounded-md bg-white"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="last_30_min">Last 30 Minutes</option>
          <option value="last_1_hr">Last 1 Hour</option>
          <option value="last_24_hr">Last 24 Hours</option>
          <option value="last_7_days">Last 7 Days</option>
          <option value="last_30_days">Last 30 Days</option>
        </select> */}
      </div>

      {loading ? (


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>

        
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCattle.map((cow : any) => (
            <Card key={cow.cow_id} className="shadow-md hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image className="w-12 h-12 text-gray-500" />
                <div>
                  <CardTitle className="text-lg">Cow {cow.cow_id}</CardTitle>
                  <p className="text-sm text-gray-500">Status: {cow.highestBehavior}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Summary: {cow.summary}</p>
                <Button className="mt-4 w-full" onClick={() => handleDetailsBtn(cow.cow_id)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Outlet/>
    </div>
  );
}

export default CattleProfile;
