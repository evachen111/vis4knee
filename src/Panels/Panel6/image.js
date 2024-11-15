import React from "react";
import Plot from "react-plotly.js";
import Popup from "reactjs-popup";
import image1 from "./1.jpg";
import "reactjs-popup/dist/index.css";
import PopupContent from "../Panel1/index";

function Image() {
  return (
    <div className="pane">
      <div className="header">3D Image</div>
      <Popup
        trigger={
          <img
            src={image1}
            style={{ width: "95%", height: "auto", margin: "5px", cursor: "pointer" }}
            alt="3D Visualization"
          />
        }
        modal
        closeOnDocumentClick
      >
        <PopupContent/>
      </Popup>
    </div>
  );
}

export default Image;
