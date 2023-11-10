import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    width: '100%',
    overflowX: 'auto',
    padding: theme.spacing(2),
  },
}));

const CashFlow = () => {
  const classes = useStyles();
  const graphRef = useRef(null);

  useEffect(() => {
    const data = [
      { month: 'January', in: 1000, out: 800 },
      { month: 'February', in: 1200, out: 900 },
      { month: 'March', in: 800, out: 700 },
      { month: 'April', in: 1100, out: 1000 },
      { month: 'May', in: 900, out: 800 },
      { month: 'June', in: 1300, out: 1100 },
      { month: 'July', in: 1000, out: 800 },
      { month: 'August', in: 1200, out: 900 },
      { month: 'September', in: 800, out: 700 },
      { month: 'October', in: 1100, out: 1000 },
      { month: 'November', in: 900, out: 800 },
      { month: 'December', in: 1300, out: 1100 },
    ];

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

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
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.in + d.out)])
        .range([height, 0]);

        // Hide x-axis line
      svg.selectAll('.domain').style('display', 'none');

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // svg.append('g').call(d3.axisLeft(y));

      const bars = svg.selectAll('.bar').data(data).enter().append('g');

      bars
        .append('rect')
        .attr('class', 'in-bar')
        .attr('x', (d) => x(d.month))
        .attr('y', (d) => y(d.in))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.in))
        .attr('fill', 'green')
        .attr('rx', 5) // Set horizontal corner radius
        .attr('ry', 5); // Set vertical corner radius;

      bars
        .append('rect')
        .attr('class', 'out-bar')
        .attr('x', (d) => x(d.month))
        .attr('y', (d) => y(d.in + d.out))
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - y(d.out))
        .attr('fill', 'blue')
        .attr('rx', 5) // Set horizontal corner radius
        .attr('ry', 5); // Set vertical corner radius;
    }
  }, []);

  return (
    <div>
      <Container className={classes.graphContainer} ref={graphRef}></Container>
    </div>
  );
};

export default CashFlow;
