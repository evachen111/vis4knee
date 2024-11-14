// import React, { Component } from 'react';
// import Plot from "react-plotly.js";


// function PreProcessing({ data, selectedData, onSelect }) {
//     // Determine color based on selected data
//     const zColor = data.z.map((row, i) =>
//       row.map((val, j) => (selectedData && selectedData.pointIndex === `${i}-${j}` ? "red" : "blue"))
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
import React from "react";
import Plot from "react-plotly.js";

function PreProcessing({ data, selectedData, onSelect }) {
  // Helper function to preprocess the data
  const preprocessData = (dataset) => {
    // Get unique x (Body Style) and y (Drive Wheels) values
    const xLabels = [...new Set(dataset.map((row) => row["body-style"]))];
    const yLabels = [...new Set(dataset.map((row) => row["drive-wheels"]))];

    // Create a 2D array for z values (Horsepower)
    const zValues = yLabels.map(() =>
      Array(xLabels.length).fill(null)
    );

    // Populate the zValues array with horsepower data
    dataset.forEach((row) => {
      const xIndex = xLabels.indexOf(row["body-style"]);
      const yIndex = yLabels.indexOf(row["drive-wheels"]);
      const horsepower = parseFloat(row["horsepower"]);
      if (!isNaN(horsepower)) {
        zValues[yIndex][xIndex] = horsepower;
      }
    });

    return { x: xLabels, y: yLabels, z: zValues };
  };

  // Preprocess the data
  const processedData = preprocessData(data);

  // Determine color based on selected data
  const zColor = processedData.z.map((row, i) =>
    row.map((val, j) =>
      selectedData && selectedData.pointIndex === `${i}-${j}` ? "red" : "blue"
    )
  );

  // Plotly heatmap configuration
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
          height: 500,
          xaxis: { title: "Body Style" },
          yaxis: { title: "Drive Wheels" },
        }}
        onClick={(event) => {
          const { pointNumber } = event.points[0];
          const pointIndex = `${pointNumber[1]}-${pointNumber[0]}`; // In heatmap, x is column (index 1), y is row (index 0)
          onSelect({ pointIndex });
        }}
      />
    </div>
  );
}

export default PreProcessing;
