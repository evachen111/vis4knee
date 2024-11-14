import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function Metadata({ dataset }) {
  const chartRef = useRef(null);
  const [tableData, setTableData] = useState([]);

  // Preprocess the data into a format suitable for a table
  const preprocessData = (carsData) => {
    const categoricalDimensionLabels = ["body-style", "drive-wheels", "fuel-type"];
    const mpg = carsData.map((row) => row["highway-mpg"]);
    const horsepower = carsData.map((row) => row["horsepower"]);

    // Combine all data into an array of objects
    const combinedData = carsData.map((row, index) => ({
      "Highway MPG": mpg[index],
      Horsepower: horsepower[index],
      "Body Style": row["body-style"],
      "Drive Wheels": row["drive-wheels"],
      "Fuel Type": row["fuel-type"],
    }));

    return combinedData;
  };

  // Update table data when dataset changes
  useEffect(() => {
    if (dataset && dataset.length > 0) {
      const data = preprocessData(dataset);
      setTableData(data);
    }
  }, [dataset]);

  return (
    <div className="pane">
      <div className="header">Metadata</div>
      <div id="graph" ref={chartRef} style={{ overflowY: "scroll", height: "300px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Highway MPG</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Horsepower</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Body Style</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Drive Wheels</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fuel Type</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row["Highway MPG"]}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row.Horsepower}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row["Body Style"]}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row["Drive Wheels"]}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{row["Fuel Type"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Metadata;
