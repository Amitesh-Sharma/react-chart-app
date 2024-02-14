// Chart.js
import React from "react";
import Plot from "react-plotly.js";

// Functional component that takes data, selected rows, and a numeric column as props
const Chart = ({ data, selectedRows, numericColumn }) => {
  return (
    <Plot
      data={[
        {
          type: "bar",
          x: selectedRows?.map((row) => row.price),
          y: selectedRows?.map((row) => row.id),
        },
      ]}
      layout={{ width: 1200, height: 600, title: `${numericColumn}` }}
    />
  );
};
export default Chart;
