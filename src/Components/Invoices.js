import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Button, Modal } from '@mui/material';

const Chart = () => {
  const [showModal, setShowModal] = useState(false);

  const data = [
    { label: 'Older', value: 100 },
    { label: 'Jan 01-08', value: 200 },
    { label: 'Jan 09-16', value: 150 },
    { label: 'Jan 17-24', value: 300 },
    { label: 'Jan 25-31', value: 250 },
    { label: 'Future', value: 400 },
  ];

  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    g.append('g')
      .call(yAxis);

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value));
  }, [data]);

  return (
    <div>
      <Button variant="contained" onClick={() => setShowModal(true)}>
        New Sales Invoice
      </Button>

      <svg ref={chartRef} />

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div style={{ margin: '20px' }}>
          <input type="file" />
        </div>
      </Modal>
    </div>
  );
};

export default Chart;
