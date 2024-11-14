import React, { useRef, useEffect, useCallback } from "react";
import Plotly from "plotly.js-dist";

function Scatter({ dataset, selectedPoints, handleSelection }) {
  const chartRef = useRef(null);
  
  // Move preprocessData outside component to avoid recreating on each render
  const categoricalDimensionLabels = ["body-style", "drive-wheels", "fuel-type"];
  
  const preprocessData = useCallback((carsData) => {
    const mpg = carsData.map((row) => row["highway-mpg"]);
    const horsepower = carsData.map((row) => row["horsepower"]);
    const categoricalDimensions = categoricalDimensionLabels.map((dimLabel) => {
      const values = carsData.map((row) => row[dimLabel]);
      return { values, label: dimLabel };
    });
    return { mpg, horsepower, categoricalDimensions };
  }, []);

  useEffect(() => {
    const gd = chartRef.current;
    const { mpg, horsepower } = preprocessData(dataset);

    const layout = {
      width: 600,
      height: 600,
      xaxis: { title: "Horsepower" },
      yaxis: { domain: [0.6, 1], title: "MPG" },
      dragmode: "lasso",
      hovermode: "closest",
    };

    const traces = [
      {
        type: "scatter",
        x: horsepower,
        y: mpg,
        marker: { color: "gray" },
        mode: "markers",
        selected: { marker: { color: "firebrick" } },
        unselected: { marker: { opacity: 0.3 } },
      },
    ];

    // Initial plot creation
    Plotly.newPlot(gd, traces, layout);

    // Define updateColor function that uses the current selectedPoints
    const updateColor = (points_data) => {
      // console.log("selected points of Scatter")
      // console.log(points_data) // get an array of indices of the points
      const new_color = new Int8Array(mpg.length);
      for (let i = 0; i < points_data.length; i++) {
        new_color[points_data[i]] = 1;
        //new_color[points_data[i]] = 'firebrick';
      }
      // console.log("Color of Scatter")
      // console.log(new_color)
      Plotly.restyle(gd, {'marker.color': [new_color]}, 0);
    };

    // update colors whenever selectedPoints changes
    if (selectedPoints && selectedPoints.length > 0) {
      updateColor(selectedPoints);
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
  }, [dataset, handleSelection, selectedPoints]); // Include all dependencies

  return (
    <div className="pane">
      <div className="header">Scatter</div>
      <div id="myScatter" ref={chartRef} style={{ width: "100%", height: "100%"}}></div>
    </div>
  );
}

export default Scatter;