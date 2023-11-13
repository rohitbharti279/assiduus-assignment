import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const CheckingAccount = () => {
  const [data, setData] = useState(generateRandomData());
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [randomizeOption, setRandomizeOption] = useState('Manage');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const randomizeOptions = ['Manage','By Date', 'Monthly', 'Quarterly'];

   // Function to generate random data
  function generateRandomData() {
    return Array.from({ length: 10 }, (_, i) => ({ x: i + 9, y: Math.random() * 10 }));
  }

  // Function to randomize data based on selected option
  function randomizeData(option) {
    if (option === 'By Date') {
      setData(generateRandomData());
    } else if (option === 'Monthly') {
      setData(generateRandomData());
      // setData(generateRandomDataForMonth(selectedMonth));
    } else if (option === 'Quarterly') {
      setData(generateRandomData());
      // setData(generateRandomDataForQuarter(selectedMonth));
    }
  }

  // // Generate random data for the selected month
  // function generateRandomDataForMonth(month) {
  //   return Array.from({ length: 10 }, (_, i) => ({ x: i + 9, y: Math.random() * 10 }));
  // }

// Event handler for randomize dropdown change
function randomizeChange(event) {
  const selectedOption = event.target.value;
  setRandomizeOption(selectedOption);
  randomizeData(selectedOption);
}

// Event handler for month dropdown change
function monthChange(event) {
  const selectedMonth = event.target.value;
  setSelectedMonth(selectedMonth);
  randomizeData(randomizeOption); // Randomize when a different month is selected
}

  useEffect(() => {
    const svg = d3.select("#line-chart");

    const margin = { top: 20, right: -30, bottom: Math.max(20, window.innerWidth < 640 ? 30 : 0), left: 25 };
    const width = window.innerWidth < 640 ? 400 : 540;
    const height = window.innerHeight < 640 ? 200 : 180;

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

      // Remove vertical gridlines
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

  const isSmallScreen = window.innerWidth < 640;
  const svgWidth = isSmallScreen ? 450 : 600;
  const svgHeight = isSmallScreen ? 250 : 450;


  return (
    <div className='bg-white rounded-xl md:w-[50%]'>
      <div className='flex justify-between p-3 px-5'>
        <p className='tracking-tight font-semibold md:text-lg'>Checking Account</p>
        <div className='flex gap-2'>
          <select className='p-1 text-sm tracking-tighter border-2 border-slate-400 rounded' value={randomizeOption} onChange={randomizeChange}>
            {randomizeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select className='p-1 text-sm tracking-tighter border-2 border-slate-400 rounded' value={selectedMonth} onChange={monthChange}>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>
      <hr></hr>

      <div className='overflow-x-auto'>
        <svg className='' id="line-chart" width={svgWidth} height={svgHeight}></svg>
      </div>
      
    </div>
  );
};

export default CheckingAccount;