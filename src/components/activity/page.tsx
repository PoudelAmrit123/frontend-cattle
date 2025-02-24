import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function ActivityPage() {
  const [data, setData] = useState([]);
  const [totalBehaviors, setTotalBehaviors] = useState([]);
  const [totalCows, setTotalCows] = useState(0);
  const [duration, setDuration] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cattleList, setCattleList] = useState<{ id: string; name: string }[]>([]);
  const navigate = useNavigate();

  async function fetchActivityData(selectedDuration: string) {
    try {
      const url =
        selectedDuration === "all"
          ? "http://localhost:8080/api/cows/activity"
          : `http://localhost:8080/api/cows/activity?dur=${selectedDuration}`;

      const res = await fetch(url);
      const response = await res.json();

      if (response.data) {
        setData(response.data.returnData);
        setTotalBehaviors(response.data.totalBehaviors);
        setTotalCows(response.data.length);

       const newCattleList = Array.from({ length: response.data.length }, (_, i) => ({
          id: (i + 1).toString(),
          name: `Cattle ${i + 1}`,
        }));

        if (JSON.stringify(newCattleList) !== JSON.stringify(cattleList)) {
          setCattleList(newCattleList);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchActivityData(duration);
  }, [duration]); 

  function processChartData() {
    if (!data) return [];
    return Object.entries(totalBehaviors).map(([behavior, count]) => ({
      name: behavior,
      count,
    }));
  }

  function handleCowSelection(cowId: string) {
    navigate(`/cattle/${cowId}`);
  }

  return (
    <div className="p-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Total Cows: {totalCows}</h2>
            <Select onValueChange={(value) => setDuration(value)} defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="3600">Last 1hr</SelectItem>
                <SelectItem value="86400">Last 1 day</SelectItem>
                <SelectItem value="604800">Last 7 days</SelectItem>
                <SelectItem value="18144000">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

     

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Behavior Distribution</CardTitle>
          <CardContent>The maximum activity done in the selected time range by cattle.</CardContent>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processChartData()}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Select Cattle </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search cattle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <Select onValueChange={handleCowSelection}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Cattle"  />
            </SelectTrigger>
            <SelectContent>
              {cattleList
                .filter((cow) => cow.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((cow) => (
                  <SelectItem key={cow.id} value={cow.id}>
                    {cow.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}

export default ActivityPage;
