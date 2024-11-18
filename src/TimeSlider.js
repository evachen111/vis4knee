import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as slider from 'd3-simple-slider';

const TimeSlider = ({ onChange }) => {
  const sliderRef = useRef();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!sliderRef.current) return;

    d3.select(sliderRef.current).selectAll("*").remove();

    const labels = ['v00', 'v12', 'v24', 'v36', 'v48', '', 'v72', '', 'v96', 'ALL'];
    const sliderTime = slider.sliderBottom()
      .min(0)
      .max(labels.length - 1)
      .step(1)
      .width(300)
      .tickValues(labels.map((_, i) => i))
      .tickFormat((d) => labels[d] || '')
      .default(currentValue)
      .on('onchange', (val) => {
        setCurrentValue(val);
        if (onChange) onChange(labels[val]);
      });

    const svg = d3.select(sliderRef.current)
      .append('svg')
      .attr('width', 340)
      .attr('height', 80);

    const g = svg.append('g')
      .attr('transform', 'translate(20,30)');

    g.call(sliderTime);

    g.select('.handle')
      .style('cursor', 'pointer');
  }, [currentValue, onChange]);

  return (
    <div className="slider-container">
      <div ref={sliderRef} style={{ width: '100%', maxWidth: '400px' }} />
    </div>
  );
};

export default TimeSlider;
