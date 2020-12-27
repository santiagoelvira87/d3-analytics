// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv", function(data) {
d3.csv("https://raw.githubusercontent.com/santiagoelvira87/d3-analytics/master/data/bestsellerswithcategories.csv", function(data) {

// Add X axis
var x = d3.scaleLinear()
.domain([2.5, 6])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([2005, 2022])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add a scale for bubble size
var z = d3.scaleLinear()
.domain([0, 50])
.range([ 1, 40]);

// Add a scale for bubble color
var myColor = d3.scaleOrdinal()
.domain(["Non Fiction", "Fiction"])
.range(["#F8766D","#00BA38"]);

var tooltip = d3.select("#my_dataviz")
.append("div")
.style("opacity", 0)
.attr("class", "tooltip")
.style("background-color", "black")
.style("border-radius", "5px")
.style("padding", "5px")
.style("color", "white")

var showTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
    tooltip
        .style("opacity", 1)
        .html("Title: " + d.Name)
        .style("left", (d3.mouse(this)[0]+10) + "px")
        .style("top", (d3.mouse(this)[1]+10) + "px")
    }
    var moveTooltip = function(d) {
    tooltip
        .style("left", (d3.mouse(this)[0]+10) + "px")
        .style("top", (d3.mouse(this)[1]+10) + "px")
    }
    var hideTooltip = function(d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }

// Add dots
svg.append('g')   
.selectAll("dot")
.data(data)
.enter()
.append("circle")
    .attr("cx", function (d) { return x(d["User Rating"]); } )
    .attr("cy", function (d) { return y(d.Year); } )
    .attr("r", function (d) { return z(d.Price); } )
    .style("fill", function (d) { return myColor(d.Genre); } )
    .style("opacity", "0.4")
    .attr("stroke", "white")
    .style("stroke-width", "1px")
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )
      
})