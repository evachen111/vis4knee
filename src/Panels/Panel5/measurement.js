import React, { Component } from 'react';
import Plot from "react-plotly.js";
import image1 from "./1.png";
import image2 from "./2.png";
import image3 from "./3.png";


function Measurements({ data, selectedPoints, selectedOne }) {
    // const selectedPointIndex = selectedOne ? parseInt(selectedOne.pointIndex) : null;
  
    // Determine the color of the line based on selection
    const lineColor = selectedOne !== null ? "red" : "black";
    // console.log(selectedOne)
  
    return (
        <div className='pane'>
            <div className='header'>Morphological Measurements</div>
            {/* <div style={{marginTop: "-5px"}}>
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
         />
            </div> */}
<div style={{maxHeight: "100%", overflow: "scroll"}}>
            <div style={{ width: "100%", height: "10%", marginTop:"0px" }}>
              <img src={image1} className="img-fluid w-100 h-100" />
            </div>
            <div style={{ width: "100%", height: "10%", marginTop:"-25px" }}>
              <img src={image2} className="img-fluid w-100 h-100" />
            </div>
            <div style={{ width: "100%", height: "10%", marginTop:"-25px" }}>
              <img src={image3} className="img-fluid w-100 h-100" />
            </div>
</div>

        </div>
    )
  }
  
  export default Measurements;