import React, { Component } from 'react';
import Plot from "react-plotly.js";



function Measurements({ data, selectedData, onSelect }) {
    console.log(selectedData)
    const selectedPointIndex = selectedData ? parseInt(selectedData.pointIndex) : null;
  
    // Determine the color of the line based on selection
    const lineColor = selectedPointIndex !== null ? "red" : "black";
  
    return (
        <div className='pane'>
            <div className='header'>Morphological Measurements</div>
            <div style={{marginTop: "-5px"}}>
            <Plot
        data={[
          {
            x: data.x,
            y: data.y,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: lineColor },
            line: { color: lineColor },
          },
        ]}
        layout={{
          width: 400,
          height: 300,
        }}
        onClick={(event) => {
          const pointIndex = event.points[0].pointIndex;
          onSelect({ pointIndex });
        }}
         />
            </div>


        </div>
    )
  }
  
  export default Measurements;