import * as d3_default from "d3"

let chart = BarChart(number, {
  x: d => d.cnt,
  y: d => d.id,
  yDomain: d3_default.groupSort(number, ([d]) => -d.cnt, d => d.id), // sort by descending frequency
  xFormat: "",
  xLabel: "Number of Years in Top 100",
  width,
  color: "steelblue"
})

// append the svg object to the body of the page
var svg = d3_default.select("#anthony").append(chart)


// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/horizontal-bar-chart
function BarChart(data, {
  x = d => d, // given d in data, returns the (quantitative) x-value
  y = (d, i) => i, // given d in data, returns the (ordinal) y-value
  title, // given d in data, returns the title text
  marginTop = 30, // the top margin, in pixels
  marginRight = 2, // the right margin, in pixels
  marginBottom = 10, // the bottom margin, in pixels
  marginLeft = 525, // the left margin, in pixels
  width = 640, // the outer width of the chart, in pixels
  height, // outer height, in pixels
  xType = d3_default.scaleLinear, // type of x-scale
  xDomain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  xFormat, // a format specifier string for the x-axis
  xLabel, // a label for the x-axis
  yPadding = 0.1, // amount of y-range to reserve to separate bars
  yDomain, // an array of (ordinal) y-values
  yRange, // [top, bottom]
  color = "currentColor", // bar fill color
  titleColor = "white", // title fill color when atop bar
  titleAltColor = "currentColor", // title fill color when atop background
} = {}) {
  // Compute values.
  const X = d3_default.map(data, x);
  const Y = d3_default.map(data, y);

  // Compute default domains, and unique the y-domain.
  if (xDomain === undefined) xDomain = [0, d3_default.max(X)];
  if (yDomain === undefined) yDomain = Y;
  yDomain = new d3_default.InternSet(yDomain);

  // Omit any data not present in the y-domain.
  const I = d3_default.range(X.length).filter(i => yDomain.has(Y[i]));

  // Compute the default height.
  if (height === undefined) height = Math.ceil((yDomain.size + yPadding) * 25) + marginTop + marginBottom;
  if (yRange === undefined) yRange = [marginTop, height - marginBottom];

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = d3_default.scaleBand(yDomain, yRange).padding(yPadding);
  const xAxis = d3_default.axisTop(xScale).ticks(width / 800, xFormat);
  const yAxis = d3_default.axisLeft(yScale).tickSizeOuter(0);
  
  // Number of Years
  if (title === undefined) {
    const formatValue = xScale.tickFormat(100, xFormat);
    title = i => `${formatValue(X[i])}`;
  } else {
    const O = d3_default.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  //Entire Chart (Change "max-width" value to scale)
  const svg = d3_default.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  //X Axis Title
  svg.append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(xAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("y2", height - marginTop - marginBottom)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", width - marginRight)
          .attr("y", -22)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(xLabel));

  //Bars
  svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(I)
    .join("rect")
      .attr("x", xScale(0))
      .attr("y", i => yScale(Y[i]))
      .attr("width", i => xScale(X[i]) - xScale(0))
      .attr("height", yScale.bandwidth());

  // Count Value Display
  svg.append("g")
      .attr("fill", titleColor)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("text")
    .data(I)
    .join("text")
      .attr("x", i => xScale(X[i]))
      .attr("y", i => yScale(Y[i]) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(title)
      .call(text => text.filter(i => xScale(X[i]) - xScale(0) < 20) // short bars
          .attr("dx", +4)
          .attr("fill", titleAltColor)
          .attr("text-anchor", "start"));

  //Song Names
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis);

  return svg.node();
}