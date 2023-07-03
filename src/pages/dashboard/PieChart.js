import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export function PieChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newData"));
        const newData = querySnapshot.docs.map((doc) => doc.data());

        // Count the number of occurrences of each heading
        const countMap = new Map();
        newData.forEach((item) => {
          const count = countMap.get(item.heading) || 0;
          countMap.set(item.heading, count + 1);
        });

        // Convert countMap to the format required for the chart
        const data = [["Task", "Count"]];
        countMap.forEach((count, heading) => {
          data.push([heading, count]);
        });

        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    title: "Report Heading",
    is3D: true,
  };

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
