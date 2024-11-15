import React, { Component } from 'react';
import Plot from "react-plotly.js";
import image1 from "./1.png";
import image2 from "./2.png";
import image3 from "./3.png";
import image4 from "./4.png";


function PopupContent() {
    return (
        <div className="container" style={{ height: "650px", textAlign: "center" }}> 
          <div className="row row-cols-2 h-100">
            <div className="col" style={{ width: "50%", height: "50%", padding:"0px"}}>
              <img src={image1} className="img-fluid w-100 h-100" />
            </div>
            <div className="col" style={{ width: "50%", height: "50%", padding:"0px" }}>
              <img src={image2} className="img-fluid w-100 h-100"/>
            </div>
            <div className="col" style={{ width: "50%", height: "50%", padding:"0px" }}>
              <img src={image3} className="img-fluid w-100 h-100" />
            </div>
            <div className="col" style={{ width: "50%", height: "50%", padding:"0px" }}>
              <img src={image4} className="img-fluid w-100 h-100" />
            </div>
          </div>
        </div>
      );  
  }
  
  export default PopupContent;