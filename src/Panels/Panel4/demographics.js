import React, { useRef, useEffect } from "react";
import Plotly from "plotly.js-dist";

const preprocessData = (carsData) => {
  const categoricalDimensionLabels = ["AGE", "SEX", "ETHNICITY", "BMI"];

  // Define quantiles for AGE and BMI
  const quantilesAge = [0.2, 0.4, 0.6, 0.8];
  const quantilesBMI = [0.2, 0.5, 0.75];

  // Preprocess numerical features using quantiles
  const ageValues = splitByQuantiles(carsData, "AGE", quantilesAge);
  const bmiValues = splitByQuantiles(carsData, "BMI", quantilesBMI);

  // Handle categorical dimensions
  const categoricalDimensions = categoricalDimensionLabels.map((dimLabel) => {
    let values;
    if (dimLabel === "AGE") {
      values = ageValues;
    } else if (dimLabel === "BMI") {
      values = bmiValues;
    } else {
      values = carsData.map((row) => row[dimLabel]);
    }
    return { values, label: dimLabel };
  });

  return { categoricalDimensions };
};

const splitByQuantiles = (data, column, quantiles) => {
  const values = data.map((row) => parseFloat(row[column]));
  values.sort((a, b) => a - b);

  // Define quantile thresholds
  const thresholds = quantiles.length > 0 ? quantiles : [0.25, 0.5, 0.75];
  const quantileBins = [];
  const binLabels = [];

  for (let i = 0; i < thresholds.length; i++) {
    const lower = i === 0 ? Math.min(...values) : values[Math.floor(thresholds[i - 1] * values.length)];
    const upper = values[Math.floor(thresholds[i] * values.length)];
    quantileBins.push([lower, upper]);
    binLabels.push(`${column}: ${lower.toFixed(1)} ~ ${upper.toFixed(1)}`);
  }

  // Add the last bin (greater than the last quantile)
  const lastBin = [values[Math.floor(thresholds[thresholds.length - 1] * values.length)], Math.max(...values)];
  quantileBins.push(lastBin);
  binLabels.push(`${column}: ${lastBin[0].toFixed(1)} ~ ${lastBin[1].toFixed(1)}`);

  // Map each value to its corresponding bin label
  const categorizedValues = values.map((value) => {
    for (let i = 0; i < quantileBins.length; i++) {
      if (value >= quantileBins[i][0] && value <= quantileBins[i][1]) {
        return binLabels[i];
      }
    }
    return binLabels[binLabels.length - 1]; // Default to last bin
  });

  return categorizedValues;
};

function Demographics({
  dataset,
  selectedPoints,
  handleSelection,
  selectedOne,
}) {
  const chartRef = useRef(null); // Create a ref for the chart div
  // console.log("Demo: props selectedPoints");
  // console.log(selectedPoints);

  // Update color on selection
  var updateColor = function (points_data, one_point) {
    // console.log("selected points of Demo")
    // console.log(points_data)
    var new_color = new Array(dataset.length).fill(0);

    for (var i = 0; i < points_data.length; i++) {
      new_color[points_data[i]] = 0.5;
    }

    if (one_point){
      new_color[one_point] = 1;
    }
    // Update selected points in scatter plot
    // console.log("Color of Demo")
    // console.log(new_color)
    Plotly.restyle("myDemo", { "line.color": [new_color] }, 0);
  };

  const handlePlotClick = async (eventData) => {
    // Update the parent component with the clicked point
    await handleSelection(eventData);
  };

  useEffect(() => {
    const gd = chartRef.current;

    const { categoricalDimensions } = preprocessData(dataset);
    // Fetch data and render the Plotly chart

    const colorscale = [
      [0, "gray"],
      [1 / 2, "firebrick"],
      [1, "blue"],
    ];

    // Layout configuration
    const layout = {
      width: 800,
      // height: 900,
      yaxis: {
        // automargin: true,
        title: "Horsepower",
      },
      xaxis: {
        // domain: [0.6, 1],
        // automargin: true,
        title: "MPG",
      },
      dragmode: "lasso",
      hovermode: "closest",
    };

    // Build traces
    const traces = [
      {
        type: "parcats",
        domain: { y: [0.22, 0.78] },
        dimensions: categoricalDimensions,
        line: {
          colorscale: colorscale,
          cmin: 0,
          cmax: 1,
          color: "gray",
          shape: "hspline",
        },
        // labelfont: { size: 14 },
      },
    ];

    // Create the Plotly plot
    Plotly.newPlot(gd, traces, layout);

    // update colors whenever selectedPoints changes
    if (selectedPoints && selectedPoints.length > 0 && selectedOne) {
      updateColor(selectedPoints, selectedOne);
    } else if (selectedOne) {
      updateColor([], selectedOne);
    } else if (selectedPoints && selectedPoints.length > 0) {
      updateColor(selectedPoints, null);
    }

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
      <div
        id="myDemo"
        ref={chartRef}
        style={{ width: "100%", height: "100%", marginTop: "-190px" }}
      ></div>
    </div>
  );
}

export default Demographics;
