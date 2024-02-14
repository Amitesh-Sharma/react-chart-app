// Chart.js
import React from "react";
import Plot from "react-plotly.js";

// Functional component that takes data, selected rows, and a numeric column as props
const Chart = ({ data, selectedRows, numericColumn }) => {
  // Extract the numeric data from selected rows based on the specified numeric column
  const selectedData = selectedRows.map((row) => row[numericColumn]);

  // Return the Plotly component with data and layout configuration
  return (
    <Plot
      data={[
        {
          x: selectedRows.filter((row) => row.price),
          y: [2, 6, 3],
          type: "scatter",
          mode: "markers",
          marker: { color: "blue" },
        },
        {
          type: "bar",
          x: selectedRows.map((row) => row.price),
          y: selectedRows.map((row) => row.id),
        },
      ]}
      // Layout configuration with width, height, and title
      layout={{ width: 1200, height: 600, title: `${numericColumn}` }}
    />
  );
};

// Export the Chart component for use in other parts of the application
export default Chart;
