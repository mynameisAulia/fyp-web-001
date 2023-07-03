import "./chart.scss";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Chart = ({ aspect, title }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      const data = snapshot.docs.map((doc) => {
        const timestamp = doc.data().timestamp; // Assuming timestamp field name is 'timestamp'
        const date = new Date(timestamp.toDate()); // Convert Firestore timestamp to JavaScript Date object
        const month = date.toLocaleString("default", { month: "long" }); // Get the month name
        return { name: month, Total: 1 }; // Each document is counted as 1
      });

      // Consolidate the data by summing the Total for each month
      const consolidatedData = data.reduce((acc, curr) => {
        const existingMonth = acc.find((item) => item.name === curr.name);
        if (existingMonth) {
          existingMonth.Total += curr.Total;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);

      const sortedData = consolidatedData.sort((a, b) =>
        new Date(a.name + " 1, 2000") - new Date(b.name + " 1, 2000")
      );

      setChartData(sortedData);
      };

    fetchData();
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={530}
          height={200}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#116A7B" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#116A7B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#116A7B"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
