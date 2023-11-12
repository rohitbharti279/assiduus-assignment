import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

// Material UI
// const useStyles = makeStyles((theme) => ({
//   graphContainer: {
//     width: '100%',
//     overflowX: 'auto',
// padding: theme.spacing(2),
//   },
// }));

const TotalCashFlow = () => {
  // const classes = useStyles();
  const graphRef = useRef(null);

  useEffect(() => {
    const data = [
      { month: 'January', in: 300, out: 150 },
      { month: 'February', in: 150, out: 75 },
      { month: 'March', in: 200, out: 175 },
      { month: 'April', in: 300, out: 200 },
      { month: 'May', in: 200, out: 175 },
      { month: 'June', in: 200, out: 150 },
      { month: 'July', in: 300, out: 150 },
      { month: 'August', in: 150, out: 75 },
      { month: 'September', in: 200, out: 150 },
      { month: 'October', in: 300, out: 200 },
      { month: 'November', in: 200, out: 175 },
      { month: 'December', in: 200, out: 150 },
    ];

    const margin = { top: -100, right: -60, bottom: 30, left: -65 };
    const width = window.innerWidth < 640 ? 1200 : 1200;
    const height = window.innerHeight < 640 ? 300 : 270;

    // Check if the svg element already exists
    const svgElement = d3.select(graphRef.current).select('svg');
    if (svgElement.empty()) { //D3 code is only executed once
      const svg = d3
        .select(graphRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.month))
        .range([0, width])
        .padding(0.8);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.in + d.out)])
        .range([height, 0]);

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // svg.append('g').call(d3.axisLeft(y));

      const bars = svg.selectAll('.bar').data(data).enter().append('g');

      // Remove x-axis line
      svg.selectAll('.domain').remove();

      // Remove vertical gridlines
      svg.selectAll('.tick line').remove();

      bars
        .append('rect')
        .attr('class', 'in-bar')
        .attr('x', (d) => x(d.month))
        .attr('y', (d) => y(d.in))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.in))
        .attr('fill', '#10B981')
        .attr('rx', 5) // Set horizontal corner radius
        .attr('ry', 5); // Set vertical corner radius;

      bars
        .append('rect')
        .attr('class', 'out-bar')
        .attr('x', (d) => x(d.month))
        .attr('y', (d) => y(d.out))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.out))
        .attr('fill', 'green')
        .attr('rx', 5)
        .attr('ry', 5);
    }
  }, []);

  return (
    <div className='bg-white xl:w-[50%] rounded-xl'>
      <div className='flex justify-between p-3 px-5'>
        <p className='tracking-tight font-semibold md:text-lg'>Checking Account</p>
        <div className='flex gap-3'>
          <div className='flex gap-2 items-center'><p className='h-4 w-4 bg-[#10B981] rounded'></p><span className='text-xs font-medium'>In</span></div>
          <div className='flex gap-2 items-center'><p className='h-4 w-4 bg-green-700 rounded'></p><span className='text-xs font-medium'>Out</span></div>
        </div>
      </div>
      <hr></hr>
      {/* <Container className={classes.graphContainer} ref={graphRef}></Container> //Material UI */}
      <Container className='overflow-x-auto' ref={graphRef}></Container>
    </div>
  );
};

export default TotalCashFlow;
