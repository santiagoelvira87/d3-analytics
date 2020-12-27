// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("/year_rating_var.csv", function(data) {


  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 5])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.Year_; }))
    .padding(1);
  svg.append("g")
    .call(d3.axisLeft(y))

  // Lines
  svg.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
      .attr("x1", function(d) { return x(d.User_Rating_amax); })
      .attr("x2", function(d) { return x(d.User_Rating_amin); })
      .attr("y1", function(d) { return y(d.Year_); })
      .attr("y2", function(d) { return y(d.Year_); })
      .attr("stroke", "grey")
      .attr("stroke-width", "1px")

  // Circles of variable 1
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.User_Rating_amax); })
      .attr("cy", function(d) { return y(d.Year_); })
      .attr("r", "6")
      .style("fill", "#69b3a2")

  // Circles of variable 2
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.User_Rating_amin); })
      .attr("cy", function(d) { return y(d.Year_); })
      .attr("r", "6")
      .style("fill", "#4C4082")
})