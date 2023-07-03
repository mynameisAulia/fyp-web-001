import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Month", "Registered User"],
  ["March", 10],
  ["April", 15],
  ["May", 25],
  ["June", 37],
];

export const options = {
  title: "MySecureAwareness User",
  curveType: "function",
  legend: { position: "bottom" },
};

export function BarChart() {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
