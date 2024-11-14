import React, { useRef, useEffect } from "react";
import Plotly from "plotly.js-dist";

function Demographics({ dataset, selectedPoints, handleSelection }) {
  const chartRef = useRef(null); // Create a ref for the chart div
  console.log("Demo: props selectedPoints");
  console.log(selectedPoints);
  
  // Helper function to preprocess the data
  const preprocessData = (carsData) => {
    const categoricalDimensionLabels = ["body-style", "drive-wheels", "fuel-type"];
    const mpg = carsData.map((row) => row["highway-mpg"]);
    const horsepower = carsData.map((row) => row["horsepower"]);
    const categoricalDimensions = categoricalDimensionLabels.map((dimLabel) => {
      const values = carsData.map((row) => row[dimLabel]);
      return { values, label: dimLabel };
    });
    return { mpg, horsepower, categoricalDimensions };
  };

  useEffect(() => {
    const gd = chartRef.current;

    const { categoricalDimensions } = preprocessData(dataset);
    // Fetch data and render the Plotly chart

    // Initial color and colorscale
    const color = new Int8Array(dataset.length);
    const colorscale = [
        [0, "gray"],
        [1, "firebrick"],
      ];

    // Layout configuration
    const layout = {
        width: 800,
        // height: 900,
        yaxis: {
          // automargin: true,
          title: "Horsepower" },
        xaxis: { 
          // domain: [0.6, 1], 
          // automargin: true,
          title: "MPG",},
        dragmode: "lasso",
        hovermode: "closest",
    };

    // Build traces
    const traces = [
        {
          type: "parcats",
          domain: { y: [0.22, 0.78]},
          dimensions: categoricalDimensions,
          line: {
            colorscale: colorscale,
            cmin: 0,
            cmax: 1,
            color: color,
            shape: "hspline",
          },
          // labelfont: { size: 14 },
        },
    ];

    // Create the Plotly plot
    Plotly.newPlot(gd, traces, layout);

    // Update color on selection
    var updateColor = function (points_data) {
      console.log("selected points of Demo")
      console.log(points_data)
      var new_color = new Int8Array(dataset.length);

      for (var i = 0; i < points_data.length; i++) {
        new_color[points_data[i]] = 1;
      }

      // Update selected points in scatter plot
      console.log("Color of Demo")
      console.log(new_color)
      Plotly.restyle('myDemo', {'line.color': [new_color]}, 0);
    };

    if (selectedPoints && selectedPoints.length > 0) {
      updateColor(selectedPoints);
    }

    const handlePlotClick = async (eventData) => {
      // Update the parent component with the clicked point
      await handleSelection(eventData);
    };

    // Add event listeners
    gd.on("plotly_click", handlePlotClick);

    // Cleanup function to remove event listeners
    return () => {
      gd.removeAllListeners("plotly_click");
    };

  }, [dataset, handleSelection, selectedPoints]);

  return (
    <div className="pane">
      <div className="header">Demographics</div>
      <div id="myDemo" ref={chartRef} style={{ width: "100%", height: "100%" , marginTop: "-190px"}}></div>
    </div>
  );
}

export default Demographics;
