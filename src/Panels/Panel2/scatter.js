import React, { useRef, useEffect, useState } from "react";
import Plotly from "plotly.js-dist";

function Scatter({ dataset, selectedPoints, handleSelection, selectedOne }) {
  const [pcaData, setPcaData] = useState({ pca1: [], pca2: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('pca_data.json');
        const data = await response.json();
        setPcaData(data);
      } catch (error) {
        console.error("Error loading PCA data:", error);
      }
    };

    fetchData();
    // console.log(pcaData)
  }, []);

  // Define updateColor function that uses the current selectedPoints
  const updateColor = (points_data, one_point) => {
    // console.log("selected points of Scatter")
    // console.log(points_data) // get an array of indices of the points
    const new_color = new Array(dataset.length).fill(0);
    for (let i = 0; i < points_data.length; i++) {
      new_color[points_data[i]] = 1;
      //new_color[points_data[i]] = 'firebrick';
    }
    // console.log("Color of Scatter")
    // console.log(new_color)
    if (one_point) {
      // console.log("yes");
      // console.log(one_point);
      new_color[one_point] = 2;
    }
    // console.log(new Set(new_color));
    Plotly.restyle("myScatter", { "marker.color": [new_color] }, 0);
  };

  useEffect(() => {
    const gd = chartRef.current;

    const layout = {
      width: 600,
      height: 600,
      xaxis: { title: "PCA1" },
      yaxis: { 
        domain: [0.6, 1], 
        title: "PCA2" },
      dragmode: "lasso",
      hovermode: "closest",
    };

    const traces = [
      {
        type: "scatter",
        x: pcaData.pca1,
        y: pcaData.pca2,
        marker: {
          color: "gray",
          colorscale: [
            [0, "gray"],
            [1 / 2, "firebrick"], // by default
            [1, "blue"],
          ],
          cmax: 2,
          cmin: 0,
        },
        mode: "markers",
        selected: { marker: { color: "firebrick" } }, // only affects the selection moment
        unselected: { marker: { opacity: 0.3 } },
      },
    ];

    // Initial plot creation
    Plotly.newPlot(gd, traces, layout);

    // update colors whenever selectedPoints changes
    if (selectedPoints && selectedPoints.length > 0 && selectedOne) {
      updateColor(selectedPoints, selectedOne);
    } else if (selectedOne) {
      updateColor([], selectedOne);
    } else if (selectedPoints && selectedPoints.length > 0) {
      updateColor(selectedPoints, null);
    }

    // event listener for selection
    const handlePlotlySelect = async (eventData) => {
      if (eventData && eventData.points) {
        await handleSelection(eventData); // send eventData
        // No need to call updateColor here - it will happen on next render
      }
    };

    // event listener
    gd.on("plotly_selected", handlePlotlySelect);

    return () => {
      gd.removeAllListeners("plotly_selected");
    };
  }, [dataset, handleSelection, selectedPoints, selectedOne]); // Include all dependencies

  return (
    <div className="pane">
      <div className="header">Scatter</div>
      <div
        id="myScatter"
        ref={chartRef}
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
}

export default Scatter;
