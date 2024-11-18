import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function PreProcessing({ selectedOne, onSelect }) {
  const [scatterData, setScatterData] = useState(null);

  // Fetch scatter data from JSON file
  useEffect(() => {
    fetch("heatmap_data.json")
      .then((response) => response.json())
      .then((jsonData) => setScatterData(jsonData))
      .catch((error) => console.error("Error fetching scatter data:", error));
  }, []);

  // Plotly scatter plot configuration
  return (
    <div className="pane">
      <div className="header">PreProcessing</div>
      {scatterData? (
        <div className="scroll-container">
  <Plot
    data={[
      {
        x: scatterData.x,
        y: scatterData.y,
        text: scatterData.text,
        mode: "markers",
        marker: {
          color: scatterData.color,
          size: scatterData.size,
          symbol: scatterData.symbols,
          colorscale: [
            [0, "white"], [0.0625, "black"],
            [0.3125, "white"], [0.375, "#d8c187"],
            [0.625, "white"], [0.6875, "#9bc1bc"],
            [0.9375, "white"], [1.0, "#bc9bc1"]
          ],
          showscale: false,
        },
        hoverinfo: "text",
      },
    ]}
    layout={{
      showlegend: false,
      width: 25*scatterData.column_names.length,
      height: 20*scatterData.subject_ids.length,
      // width: 800,
      // height: 11000,
      xaxis: {
        tickvals: scatterData.column_names.map((_, index) => index),
        ticktext: scatterData.column_names,
        tickfont: {
          size: 10
        },
        side: "top",
        tickangle: 45,
        showgrid: false,
        zeroline: false,
        range: [-0.5, scatterData.column_names.length - 0.5],
      },
      yaxis: {
        tickvals: scatterData.subject_ids.map((_, index) => index),
        ticktext: scatterData.subject_ids,
        tickfont: {
          size: 10
        },
        showticklabels: true,
        showgrid: false,
        zeroline: false,
        range: [-0.5, scatterData.subject_ids.length - 0.5],
      },
    }}
    onClick={(event) => {
      const pointIndex = event.points[0].pointIndex;
      onSelect(pointIndex);
    }}
  />
</div>
      ) : (
        <div>Loading scatter plot data...</div>
      )}
    </div>
  );
}

export default PreProcessing;
