import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Button, Modal } from '@mui/material';
import "./Invoices.css"

const Invoices = () => {
  const [showModal, setShowModal] = useState(false);

  const data = [
    { label: 'Older', value: 75 },
    { label: 'Jan 01-08', value: 150 },
    { label: 'Jan 09-16', value: 300 },
    { label: 'Jan 17-24', value: 200 },
    { label: 'Jan 25-31', value: 250 },
    { label: 'Future', value: 150 },
  ];

  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 10, right: -50, bottom: 30, left: -50 };
    const width = 480 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.8); // Adjust the padding for gap between bars

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    // const yAxis = d3.axisLeft(y);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    // g.append('g')
    //   .call(yAxis);

    // Remove x-axis line
    g.selectAll('.domain').remove();

    // Remove vertical gridlines
    g.selectAll('.tick line').remove();

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', 'green') // Set the bar color to green
      .attr('rx', 5) // Set the border radius for rounded corners
  }, [data]);

  return (
    <div className='bg-white w-[40%] rounded-xl'>
      <div className='flex justify-between items-center p-2 px-5'>
        <p className='tracking-tight font-semibold text-lg'>Invoices Owed to you</p>
        <div>
          <Button
            style={{
              color: 'green',
              backgroundColor: 'var(--slate-200)',
              textTransform: 'none', // text is not transformed in to capital
              letterSpacing: '-0.02em',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}
            variant="contained"
            onClick={() => setShowModal(true)}
          >
            New Sales Invoice
          </Button>

          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <div style={{ margin: '20px' }}>
              <input type="file" />
            </div>
          </Modal>
        </div>
      </div>
      <hr></hr>

      <svg className='tracking-wider text-2xl' ref={chartRef} />

    </div>
  );
};

export default Invoices;
