import * as d3 from "d3-v4"

// Setup svg using Bostock's margin convention
        
var margin = {top: 20, right: 160, bottom: 35, left: 30};
        
var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

var data = [
  { year: "2001", male: "62", female: "37", mixed: "1" },
  { year: "2002", male: "55", female: "44", mixed: "1" },
  { year: "2003", male: "63", female: "35", mixed: "2" },
  { year: "2004", male: "72", female: "27", mixed: "1" },
  { year: "2005", male: "73", female: "26", mixed: "1" },
  { year: "2006", male: "66", female: "33", mixed: "1" },
  { year: "2007", male: "67", female: "31", mixed: "2" },
  { year: "2008", male: "61", female: "36", mixed: "3" },
  { year: "2009", male: "57", female: "37", mixed: "6" },
  { year: "2010", male: "63", female: "34", mixed: "3" },
  { year: "2011", male: "58", female: "34", mixed: "8" },
  { year: "2012", male: "79", female: "19", mixed: "2" },
  { year: "2013", male: "73", female: "25", mixed: "2" },
  { year: "2014", male: "63", female: "34", mixed: "3" },
  { year: "2015", male: "59", female: "39", mixed: "2" },
  { year: "2016", male: "65", female: "31", mixed: "4" },
  { year: "2017", male: "68", female: "26", mixed: "6" },
  { year: "2018", male: "77", female: "21", mixed: "2" },
  { year: "2019", male: "64", female: "35", mixed: "1" },
];


var formatTime = d3.timeFormat("%Y");

// Transpose the data into layers
var dataset = d3.stack()(["male", "female", "mixed"].map(function(fruit) {
  return data.map(function(d) {
    return {x: formatTime(d.year), y: +d[fruit]};
  });
}));

console.log(d3.stack().keys(["male", "female", "mixed"])(data))

// Set x, y and colors
var x = d3.scaleOrdinal()
  .domain(dataset[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);

var y = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([height, 0]);

var colors = ["#6495ED", "#ff1493", "#d9d574"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.time.format("%Y"));

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)


svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);


// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rect = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
  .on("mouseover", function() { tooltip.style("display", null); })
  .on("mouseout", function() { tooltip.style("display", "none"); })
  .on("mousemove", function(d) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y);
  });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) { 
    switch (i) {
      case 0: return "Mixed";
      case 1: return "Female";
      case 2: return "Male";
    }
  });


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
tooltip.append("rect")
  .attr("width", 30)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 15)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");