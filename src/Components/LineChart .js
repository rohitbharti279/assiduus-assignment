import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
  const [data, setData] = useState(generateRandomData());
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [randomizeOption, setRandomizeOption] = useState('Manage');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function generateRandomData() {
    return Array.from({ length: 10 }, (_, i) => ({ x: i + 9, y: Math.random() * 10 }));
  }

  function randomizeData() {
    setData(generateRandomData());
  }

  function handleRandomizeChange(event) {
    setRandomizeOption(event.target.value);
    randomizeData();
  }

  function handleMonthChange(event) {
    setSelectedMonth(event.target.value);
    randomizeData(); // Randomize when a different month is selected
  }

  useEffect(() => {
    const svg = d3.select("#line-chart");

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain([9, 18])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) + 1])
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(d3.curveBasis);

    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("02")))
      .select(".domain")
      .remove();

    g.selectAll(".tick line").remove();

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2.5)
      .attr("d", line);

  }, [data]);


  return (
    <div className='bg-white w-[40%]'>
      <div className='flex justify-between'>
        <p>Checking Account</p>
        <div className='flex gap-2'>
        <select className='p-1 border-2 border-slate-400 rounded' value={randomizeOption} onChange={handleRandomizeChange}>
        <option value="Manage">Manage</option>
        <option value="Date">Date</option>
      </select>
      <select className='p-1 border-2 border-slate-400 rounded' value={selectedMonth} onChange={handleMonthChange}>
        {months.map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
        </div>
      </div>
      <div>
        <svg id="line-chart" width="600" height="400"></svg>
      </div>
      
    </div>
  );
};

export default LineChart;
