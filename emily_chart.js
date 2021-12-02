import * as d3 from "d3-v4"

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 120, bottom: 30, left: 50},
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#multiline_chart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("averages_by_year.csv",

      // Format csv variables:
      function(d){
        return { 
          year : d.year, 
          danceability : d.danceability, 
          energy : d.energy, 
          speechiness : d.speechiness, 
          acousticness : d.acousticness, 
          instrumentalness : d.instrumentalness, 
          liveness : d.liveness, 
          valence : d.valence}
      },

      // Use this dataset:
      function(data) {

        // x axis 
        var x = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { return d.year; })) // maybe change extent?
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // text label for the x axis
        svg.append("text")             
            .attr("transform",
                  "translate(" + (width/2) + " ," + 
                                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Year");  

        // y axis
        var y = d3.scaleLinear()
          .domain([0, 1])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Value"); 

        // Add the lines
        // danceability line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.danceability) })
          )
        // energy line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "red")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.energy) })
          )
        // speechiness line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "green")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.speechiness) })
          )
        // acousticness line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "orange")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.acousticness) })
          )
        // instrumentalness line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "purple")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.instrumentalness) })
          )
        // liveness line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "pink")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.liveness) })
          )
        // valence line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "lime")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(d.valence) })
          )

        // Handmade legend
        svg.append("text").attr("x", width+20).attr("y", height/4 - 25).text("Legend").style("font-size", "16px").attr("alignment-baseline","middle")

        svg.append("circle").attr("cx", width + 10).attr("cy", height/4).attr("r", 6).style("fill", "steelblue")
        svg.append("text").attr("x", width + 20).attr("y", height/4).text("danceability").style("font-size", "12px").attr("alignment-baseline","middle")

        svg.append("circle").attr("cx", width + 10).attr("cy", height/4 + 20).attr("r", 6).style("fill", "red")
        svg.append("text").attr("x", width + 20).attr("y", height/4 + 20).text("energy").style("font-size", "12px").attr("alignment-baseline","middle")

        svg.append("circle").attr("cx", width + 10).attr("cy", height/4 + 40).attr("r", 6).style("fill", "green")
        svg.append("text").attr("x", width + 20).attr("y", height/4 + 40).text("speechiness").style("font-size", "12px").attr("alignment-baseline","middle")

        svg.append("circle").attr("cx", width + 10).attr("cy", height/4 + 60).attr("r", 6).style("fill", "orange")
        svg.append("text").attr("x", width + 20).attr("y", height/4 + 60).text("acousticness").style("font-size", "12px").attr("alignment-baseline","middle")

        svg.append("circle").attr("cx", width + 10).attr("cy", height/4 + 80).attr("r", 6).style("fill", "purple")
        svg.append("text").attr("x", width + 20).attr("y", height/4 + 80).text("instrumentalness").style("font-size", "12px").attr("alignment-baseline","middle")

        svg.append("circle").attr("cx", width + 10).attr("cy", height/4 + 100).attr("r", 6).style("fill", "pink")
        svg.append("text").attr("x", width + 20).attr("y", height/4 + 100).text("liveness").style("font-size", "12px").attr("alignment-baseline","middle")

        svg.append("circle").attr("cx", width + 10).attr("cy", height/4 + 120).attr("r", 6).style("fill", "lime")
        svg.append("text").attr("x", width + 20).attr("y", height/4 + 120).text("valence").style("font-size", "12px").attr("alignment-baseline","middle")

    })