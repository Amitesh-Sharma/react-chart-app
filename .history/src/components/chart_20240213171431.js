import React from "react";
import Plot from 'react-plotly.js';

const chart = ({data, selectedRows, numericColumn}) =>{
    const selectedData=selectedRows.map(row=>row[numericColumn]);

    return(
        <Plot
        data={[
            {
                x:selectedRows.map(row=>row.id),
                y:selectedData,
                type:'bar',
                mode:'markers',
                marker:{color:'blue'},
            },
        ]}
        layout={{ width: 800, height: 400, title: `Chart for ${numericColumn}` }}/>
        
    )
}
export default chart;