import React, { Component } from 'react';
import Plot from "react-plotly.js";
import image1 from './1.jpg';


function Image() {
    return (
        <div className='pane'>
            <div className='header'>3D Image</div>
            <img src={image1} style={{ width: "95%", height: "auto", margin: "5px"}}></img>
        </div>
    )
  }
  
  export default Image;