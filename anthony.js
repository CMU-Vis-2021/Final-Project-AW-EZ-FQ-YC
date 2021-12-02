import * as d3 from "d3"

// set the dimensions and margins of the graph
const margin = {top: 20, right: 30, bottom: 40, left: 200},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv("number.csv").then( function(data) {

  // Add X axis
  const x = d3.scaleLinear()
    .domain([0, 4])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add X axis label:
svg.append("text")
.attr("text-anchor", "end")
.attr("x", width)
.attr("y", height + margin.top + 20)
.attr('font-family', "Saira")
.style('font-size', '12px')
.text("The number of the song");

  // Y axis
  const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(d => d.name))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("myRect")
    .data(data)
    .join("rect")
    .attr("x", x(0) )
    .attr("y", d => y(d.name))
    .attr("width", d => x(d.counts))
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2")
    
})