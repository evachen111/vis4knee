import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

function PreProcessing({ dataset, selectedOne, onSelect }) {
  const [scatterData, setScatterData] = useState(null);

  const extractSubjectId = (hoverText) => {
    const match = hoverText.match(/SUBJECT_ID:\s*(\d+)/);
    return match ? match[1] : null;
  };

    // Find the y-axis index of the selected SUBJECT_ID
  const selectedRowIndex =
    selectedOne !== null && scatterData
      ? scatterData.subject_ids.findIndex(
          (id) => id.toString() === dataset[selectedOne]?.SUBJECT_ID.toString()
        )
      : null;

  // Define the shape for the selected row
  const selectedRowShape =
    selectedRowIndex !== null
      ? [
          {
            type: "rect",
            xref: "x",
            yref: "y",
            x0: -0.5,
            x1: scatterData.column_names.length - 0.5,
            y0: selectedRowIndex - 0.5,
            y1: selectedRowIndex + 0.5,
            line: {
              color: "black",
              width: 2,
            },
          },
        ]
      : [];

  // Fetch scatter data from JSON file
  useEffect(() => {
    fetch("heatmap_data.json")
      .then((response) => response.json())
      .then((jsonData) => setScatterData(jsonData))
      .catch((error) => console.error("Error fetching scatter data:", error));
  }, []);

  return (
    <div className="pane">
      <div className="header">Quality Assesment</div>
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
      shapes: selectedRowShape,
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
      // Extract SUBJECT_ID from the hover text of the clicked point
      const hoverText = event.points[0].text;
      const subjectId = extractSubjectId(hoverText);

      if (subjectId) {
        // Find the index of the data in the dataset with this SUBJECT_ID
        const dataIndex = dataset.findIndex(
          (data) => data.SUBJECT_ID.toString() === subjectId
        );

        if (dataIndex !== -1) {
          // Call onSelect with the found index
          onSelect(dataIndex);
        } else {
          console.warn(`SUBJECT_ID: ${subjectId} not found in dataset`);
        }
      } else {
        console.warn("Could not extract SUBJECT_ID from hover text");
      }
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