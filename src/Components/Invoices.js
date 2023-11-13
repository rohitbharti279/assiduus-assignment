import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Button, Modal } from '@mui/material';
import "./Invoices.css";
import upload from "./SVG/upload-svgrepo-com.svg"

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
    const margin = { top: 10, right: -60, bottom: 30, left: -40 };
    const width = window.innerWidth < 640 ? 600 : 650;
    const height = window.innerHeight < 640 ? 210 : 190;

    const svg = d3.select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.8); // the padding for gap between bars

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
    <div className='bg-white rounded-xl md:w-[50%]'>
      <div className='flex justify-between items-center p-2 px-5'>
        <p className='tracking-tight font-semibold md:text-lg text-center'>Invoices Owed to you</p>
        <div className='z-0'>
          <Button
            style={{
              color: 'green',
              backgroundColor: 'var(--slate-200)',
              textTransform: 'none', 
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
            <div className="flex flex-col justify-center items-center fixed bg-[#000000b3] top-0 w-[100vw] h-[100vh]">
              <div className="bg-white rounded-md font-serif py-8 md:p-2 md:w-[26rem] md:h-[22rem] lg:w-[32rem] xl:w-[35rem] xl:h-[25rem] xl:p-4 flex flex-col justify-center items-center">

              <button
                  className="absolute top-3 right-3 cursor-pointer text-xl"
                  onClick={() => setShowModal(false)}
                >
                  ❌
                </button>

                <label htmlFor="fileInput" className="cursor-pointer">
                  <img
                    src={upload}
                    alt="upload file"
                    className="w-[5rem] md:w-[10rem] bg-blend-multiply filter-none"
                  />
                </label>

                <p className="text-xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 cursor-pointer">
                  Upload Files
                </p>
                <p className="lg:text-lg xl:text-xl text-black text-center lg:mt-5 p-3">
                  Drop your files here or <label htmlFor="fileInput" className='text-blue-800 cursor-pointer'>browse for files</label>
                </p>
                <div className='px-10'>
                  <input type="file" id="fileInput" style={{ display: 'none' }} />
                </div>
              </div>
            </div>
          </Modal>

        </div>
      </div>
      <hr></hr>

      <div className='overflow-x-auto pr-5 xl:pr-0'>
        <svg className='tracking-wider text-2xl' ref={chartRef} />
      </div>

    </div>
  );
};

export default Invoices;
