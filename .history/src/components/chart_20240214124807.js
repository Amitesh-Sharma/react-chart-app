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
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
      ]}
      // Layout configuration with width, height, and title
      layout={{ width: 800, height: 400, title: `Chart for ${numericColumn}` }}
    />
  );
};

// Export the Chart component for use in other parts of the application
export default Chart;
