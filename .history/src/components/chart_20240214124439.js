// Chart.js
import React from 'react';
import Plot from 'react-plotly.js';

// Functional component that takes data, selected rows, and a numeric column as props
const Chart = ({ data, selectedRows, numericColumn }) => {
  // Extract the numeric data from selected rows based on the specified numeric column
  const selectedData = selectedRows.map(row => row[numericColumn]);

  // Return the Plotly component with data and layout configuration
  return (
    <Plot
      data={[
        {
          // X-axis values from the 'id' property of selected rows
          x: selectedRows.map(row => row.price),
          // Y-axis values from the selected numeric column
          y: selectedData,
          // Bar chart type with markers
          type: 'bar',
          mode: 'markers',
          // Marker style with blue color
          marker: { color: 'blue' },
        },
      ]}
      // Layout configuration with width, height, and title
      layout={{ width: 800, height: 400, title: `Chart for ${numericColumn}` }}
    />
  );
};

// Export the Chart component for use in other parts of the application
export default Chart;
