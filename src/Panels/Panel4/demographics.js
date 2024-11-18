import React, { useRef, useEffect } from "react";
import Plotly from "plotly.js-dist";

const preprocessData = (carsData) => {
  const categoricalDimensionLabels = ["AGE", "SEX", "ETHNICITY", "BMI", "KLG"];

  // Define the range boundaries for AGE and BMI
  const ageRanges = [40, 50, 60, 70, 80];
  const bmiRanges = [18.5, 24.9, 29.9, 34.9];

  // Preprocess the AGE and BMI columns by ranges
  const ageValues = splitByRange(carsData, "AGE", ageRanges);
  const bmiValues = splitByRange(carsData, "BMI", bmiRanges);

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

const splitByRange = (data, column, ranges) => {
  const values = data.map((row) => parseFloat(row[column]));

  const rangeBins = [];
  const binLabels = [];

  // Create bins based on ranges
  for (let i = 0; i < ranges.length - 1; i++) {
    const lower = ranges[i];
    const upper = ranges[i + 1];
    rangeBins.push([lower, upper]);
    binLabels.push(`${column}: ${lower} ~ ${upper}`);
  }

  // Map each value to its corresponding bin label
  const categorizedValues = values.map((value) => {
    for (let i = 0; i < rangeBins.length; i++) {
      if (value >= rangeBins[i][0] && value <= rangeBins[i][1]) {
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

    if (one_point) {
      new_color[one_point] = 1;
    }
    // Update selected points in scatter plot
    // console.log("Color of Demo")
    // console.log(new_color)
    Plotly.restyle("myDemo", { "line.color": [new_color] }, 0);
  };

  const handlePlotClick = async (eventData) => {
    // console.log(eventData)
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
      width: 900,
      height: 530,
      yaxis: {
        // automargin: true,
        tickangle: 45,
      },
      xaxis: {
        // domain: [0.6, 1],
        // automargin: true,
        tickangle: 45,
      },
      dragmode: "lasso",
      hovermode: "closest",
    };

    // Build traces
    const traces = [
      {
        type: "parcats",
        // domain: { y: [0.22, 0.78] },
        dimensions: categoricalDimensions,
        line: {
          colorscale: colorscale,
          cmin: 0,
          cmax: 1,
          color: "gray",
          shape: "hspline",
        },
        // labelfont: { size: 14 },
        textangle: 90,
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
          style={{
            overflow: "visable",
            maxHeight: "100%",
            maxWidth: "100%",
            marginTop: "40px",
            border: "0px solid #ccc",
          }}
        ></div>
    </div>
  );
}

export default Demographics;
