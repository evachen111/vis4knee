import React, { useState } from "react";

const QuantileSlider = ({ range, quantiles, onQuantileChange }) => {
  const width = 300; // Slider width
  const [handles, setHandles] = useState(
    quantiles.map((q) => range[0] + q * (range[1] - range[0]))
  );

  const handleDrag = (handleIndex, newValue) => {
    const newHandles = [...handles];
    newHandles[handleIndex] = Math.max(
      range[0],
      Math.min(range[1], newValue)
    );
    newHandles.sort((a, b) => a - b);
    setHandles(newHandles);

    // Update quantiles
    const newQuantiles = newHandles.map(
      (value) => (value - range[0]) / (range[1] - range[0])
    );
    onQuantileChange(newQuantiles);
  };

  return (
    <svg width={width} height={50}>
      {/* Slider line */}
      <line
        x1={10}
        x2={width - 10}
        y1={25}
        y2={25}
        stroke="#CBD5E0"
        strokeWidth="8"
      />
      {/* Handles */}
      {handles.map((value, index) => {
        const x =
          10 + ((value - range[0]) / (range[1] - range[0])) * (width - 20);
        return (
          <g key={index} transform={`translate(${x}, 25)`}>
            <circle
              r="6"
              fill="white"
              stroke="#4A5568"
              strokeWidth="2"
              cursor="pointer"
              onMouseDown={(e) => {
                const startX = e.clientX;
                const startValue = value;

                const onMouseMove = (event) => {
                  const deltaX = event.clientX - startX;
                  const newValue =
                    startValue +
                    (deltaX / (width - 20)) * (range[1] - range[0]);
                  handleDrag(index, newValue);
                };

                const onMouseUp = () => {
                  document.removeEventListener("mousemove", onMouseMove);
                  document.removeEventListener("mouseup", onMouseUp);
                };

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
              }}
            />
            <text y={-10} textAnchor="middle" fontSize="10">
              {value.toFixed(1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default QuantileSlider;
