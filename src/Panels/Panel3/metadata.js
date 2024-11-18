import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

function Metadata({ dataset, selectedPoints, selectedOne, onSelect }) {
  const tableRef = useRef(null);

  // Extract col names from the first row
  const columns = dataset.length > 0 ? Object.keys(dataset[0]) : [];
  // console.log(selectedPoints)

  const selectRows = dataset.filter((_, rowIndex) =>
    selectedPoints.includes(rowIndex)
  );
  const unselectRows = dataset.filter(
    (_, rowIndex) => !selectedPoints.includes(rowIndex)
  );
  // console.log("selected rows:")
  // console.log(selectRows)
  const combineData = [...selectRows, ...unselectRows];

  return (
    <div className="pane">
      <div className="header">Metadata</div>
      <div
        ref={tableRef}
        style={{
          overflow: "auto",
          maxHeight: "100%",
          maxWidth: "100%",
          border: "1px solid #ccc",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((colName) => (
                <th
                  key={colName}
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    padding: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  {colName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {selectRows.map((row, rowIndex) => { //put selectedPoints at the top
              return(
              <tr key={rowIndex}
                style = {{
                  backgroundColor: "#f0f0f0",
                }}>
                {columns.map((colName) => (
                  <td
                    key={colName}
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {row[colName] != null ? row[colName] : ""}
                  </td>
                ))}
              </tr>);
            })}
            {unselectRows.map((row, rowIndex) => {
              return(
              <tr key={rowIndex}
                style = {{
                  backgroundColor: "white",
                }}>
                {columns.map((colName) => (
                  <td
                    key={colName}
                    style={{
                      padding: "8px",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {row[colName] != null ? row[colName] : ""}
                  </td>
                ))}
              </tr>);
            })} */}

            {dataset
              .slice() // shallow copy to avoid mutating the original dataset
              .sort((a, b) => {
                const aIndex = dataset.indexOf(a);
                const bIndex = dataset.indexOf(b);

                // Check if a or b is the selectedOne
                const aIsSelectedOne = aIndex === selectedOne;
                const bIsSelectedOne = bIndex === selectedOne;

                // If one of them is the selectedOne, push it to the top
                if (aIsSelectedOne && !bIsSelectedOne) return -1;
                if (bIsSelectedOne && !aIsSelectedOne) return 1;

                // Otherwise, prioritize selectedPoints
                const aSelected = selectedPoints.includes(aIndex);
                const bSelected = selectedPoints.includes(bIndex);
                return aSelected === bSelected ? 0 : aSelected ? -1 : 1;
              })
              .map((row, rowIndex) => {
                const areSelected = selectedPoints.includes(
                  dataset.indexOf(row)
                );
                const isHighlighted = selectedOne === dataset.indexOf(row);
                return (
                  <tr
                    key={rowIndex}
                    style={{
                      backgroundColor: isHighlighted
                        ? "#e0ffe0"
                        : areSelected
                        ? "#f0f0f0"
                        : "white",
                      //cursor: "pointer",
                    }}
                    onClick={() => onSelect(dataset.indexOf(row))}
                  >
                    {columns.map((colName) => (
                      <td
                        key={colName}
                        style={{
                          padding: "8px",
                          border: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {row[colName] != null ? row[colName] : ""}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Metadata;
