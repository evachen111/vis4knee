// import React, { Component } from 'react';
// import Plot from "react-plotly.js";


// function PreProcessing({ data, selectedOne, onSelect }) {
//     // Determine color based on selected data
//     const zColor = data.z.map((row, i) =>
//       row.map((val, j) => (selectedOne && selectedOne.pointIndex === `${i}-${j}` ? "red" : "blue"))
//     );
//     // console.log(zColor)
  
//     // Plotly heatmap configuration
//     return (
//         <div className='pane'>
//             <div className='header'>PreProcessing</div>
//             {/* <PieChart data={data} width={width} height={height} /> */}
//             <Plot
//         data={[
//           {
//             z: data.z,
//             x: data.x,
//             y: data.y,
//             type: "heatmap",
//             colorscale: zColor,
//             showscale: true,
//             hoverinfo: "x+y+z",
//           },
//         ]}
//         layout={{
//           width: 400,
//           height: 400,
//         }}
//         onClick={(event) => {
//             console.log(event.points[0].pointNumber)
//           const pointIndex = `${event.points[0].pointNumber[0]}-${event.points[0].pointNumber[1]}`; //e.g. [1,2]: 1-2
//           onSelect({ pointIndex });
//         }}
//       />
//         </div>
//     )
//   }
  
//   export default PreProcessing;
import React, { useState } from "react";
import Plot from "react-plotly.js";

function PreProcessing({ data, selectedOne, onSelect }) {

  const preprocessData = (dataset) => {
    const xLabels = [...Object.keys(dataset[0])];
    const yLabels = [...dataset.map((_, index) => index)];

    const zValues = yLabels.map((rowIndex) =>
      xLabels.map((colName) => (dataset[rowIndex][colName] > 1 ? 1 : 0))
    );

    return { x: xLabels, y: yLabels, z: zValues };
  };

  const processedData = preprocessData(data);

  const zColor = processedData.z.map((row, i) =>
    row.map((val, j) =>
      selectedOne && selectedOne.pointIndex === `${i}-${j}` ? "red" : "blue"
    )
  );

  // Define the shape for the selected row
  const selectedRowShape = selectedOne !== null
    ? [
        {
          type: "rect",
          xref: "x",
          yref: "y",
          // x0: processedData.x[0],
          // x1: processedData.x[processedData.x.length - 1],
          x0: -0.5,
          x1: processedData.x.length-0.5,
          y0: processedData.y[selectedOne] - 0.5,
          y1: processedData.y[selectedOne] + 0.5,
          line: {
            color: "black",
            width: 2,
          },
        },
      ]
    : [];

  return (
    <div className="pane">
      <div className="header">PreProcessing</div>
      <Plot
        data={[
          {
            z: processedData.z,
            x: processedData.x,
            y: processedData.y,
            type: "heatmap",
            colorscale: "red",
            showscale: true,
            hoverinfo: "x+y+z",
          },
        ]}
        layout={{
          width: 500,
          height: 800,
          shapes: selectedRowShape,
        }}
        onClick={(event) => {
          const pointIndex = event.points[0].pointIndex[0];
          // onSelect({ pointIndex }); //an object with a key-value pair ({ pointIndex: value }).
          onSelect(pointIndex);
        }}
      />
    </div>
  );
}

export default PreProcessing;