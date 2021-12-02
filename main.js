import * as d3 from "d3-v6"

// set the dimensions and margins of the graph
  const margin = {top: 10, right: 100, bottom: 30, left: 30},
  width = 1000 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// time 

const tParser = d3.timeParse("%Y");

const yearParser = d3.timeFormat("%Y")

//Read the data
d3.csv("topsongs.csv").then( function(data) {

  // List of groups (here I have one group per column)
  let options = [...new Set(data.map(d => d.artists))]; 

  // add the options to the button
  d3.select("#selectButton")
    .selectAll('myOptions')
     .data(options)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

  

  // Add X axis --> it is a date format
  const x = d3.scaleLinear()
    .domain([d3.min(data, function(d) { return d.year; }), d3.max(data, function(d) { return d.year; })])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain( [0, d3.max(data, function(d) { return Number(d.count); })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Initialize line with some dots
  svg
    .append('defs')
    .append('marker')
    .attr('id', 'dot')
    .attr('viewBox', [0, 0, 20, 20])
    .attr('refX', 10)
    .attr('refY', 10)
    .attr('markerWidth', 10)
    .attr('markerHeight', 10)
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 10)
    .attr('r', 2)
    .style('fill', 'green');


  const line = svg
    .append('g')
    .append("path")
      .datum(data)
      .attr("d", d3.line()
        .x(function(d) { return x(+d.time) })
        .y(function(d) { return y(+d.value) })
      )
      .style("stroke-width", 4)
      .style("stroke", "#69b3a2")
      .style("fill", "transparent")
      .attr('marker-start', 'url(#dot)')
      .attr('marker-mid', 'url(#dot)')
      .attr('marker-end', 'url(#dot)');


  // Add X axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .attr('font-family', "Saira")
    .style('font-size', '12px')
    .text("Year");

// Y axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+ 50)
    .attr("x", -margin.top)
    .style('font-size', '12px')
    .text("The number of the")

  // A function that update the chart
  function update(selectedGroup) {
    console.log(selectedGroup)
    var selectArtist = data.filter(function(d) { return d.artists == selectedGroup })

    
    // Create new data with the selection?
    const dataFilter = selectArtist.map(function(d){ console.log( parseInt(d.year)); console.log( parseInt(d.count));  
      return {time: parseInt(d.year), value:parseInt(d.count)} })

    // Give these new data to update line
    line
        .datum(dataFilter)
        .attr("d", d3.line()
          .x(function(d) { return x(+d.time) })
          .y(function(d) { return y(+d.value) }) 
        )
        .attr('marker-start', 'url(#dot)')
        .attr('marker-mid', 'url(#dot)')
        .attr('marker-end', 'url(#dot)');
  }

  // When the button is changed, run the updateChart function
  d3.select("#selectButton").on("change", function(event,d) {
      // recover the option that has been chosen
      const selectedOption = d3.select(this).property("value")
      // run the updateChart function with this selected option
      update(selectedOption)
  })


// run the updateChart function with the default option.
update(options[0])

})