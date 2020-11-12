// set up chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper,append SVG group that will hold chart and set margins
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// import csv
d3.csv("assets/data/data.csv").then(function(CensusData) {
  CensusData.forEach(function(data) {
    data.age = +data.poverty;
    data.smokes = +data.healthcare;
    // console.log(data);
  });

  // scales x
  const xScale = d3.scaleLinear()
    .domain(d3.extent(CensusData, d => d.age))
    .range([0, width])
    .nice(); 
  // scales y 
  const yScale = d3.scaleLinear()
    .domain([6,d3.max(CensusData, d => d.smokes)])
    .range([height, 0])
    .nice();
  
// create axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

// append axis to ChartGroup
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
  chartGroup.append("g").call(yAxis);

  // create circles 
chartGroup.selectAll("circle")
.data(CensusData)
.enter()
.append("circle")
.attr("cx", d=>xScale(d.poverty))
.attr("cy", d=>yScale(d.healthcare))
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.75);

// add abbreviation text to circles
chartGroup.append("g")
  .selectAll('text')
  .data(CensusData)
  .enter()
  .append("text")
  .text(d=>d.abbr)
  .attr("x",d=>xScale(d.poverty))
  .attr("y",d=>yScale(d.healthcare))
  .classed(".stateText", true)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-size", "10px")
  .style("font-weight", "bold")
  .attr("alignment-baseline", "central");
  
  // adds x axis text and style
  chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .text("In Poverty (%)");
  // adds y axis text and style
        chartGroup.append("text")
        .attr("y", 0 - ((margin.left / 2) + 2))
        .attr("x", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "black")
        .style("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .text("Lacks Healthcare (%)");
}).catch(function(error) {
  console.log(error);
});





// // // .on("mouseout", function(data, index) {
// // //   toolTip.hide(data);
// // // });
// // // // Step 6: Initialize tool tip
// // // // ==============================
// // // var toolTip = d3.tip()
// // //   .attr("class", "tooltip")
// // //   .offset([80, -60])
// // //   .html(function(d) {
// // //     return (abbr + '%');
// // //     });

// // // // Step 7: Create tooltip in the chart
// // // // ==============================
// // // chartGroup.call(toolTip);

// // // // Step 8: Create event listeners to display and hide the tooltip
// // // // ==============================
// // // circlesGroup.on("click", function(data) {
// // //   toolTip.show(data);
// // // })
// // //   // onmouseout event
// // //   .on("mouseout", function(data, index) {
// // //     toolTip.hide(data);
// // //   });





// // //============add texts to each datapoint=========
// // chartGroup.append("g")
// //   .selectAll('text')
// //   .data(CensusData)
// //   .enter()
// //   .append("text")
// //   .text(d=>d.abbr)
// //   .attr("x",d=>xTimeScale(d.poverty))
// //   .attr("y",d=>yLinearScale(d.healthcare))
// //   .attr("font-family", "sans-serif")
// //   .attr("text-anchor", "middle")
// //   .attr("fill", "white")
// //   .attr("font-size", "8px")
// //   .style("font-weight", "bold")
// //   .attr("alignment-baseline", "central");
  
// //   //============add axes titles=========
// //   // y axis text
// //   chartGroup.append("text")
// //         .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
// //         .attr("text-anchor", "middle")
// //         .attr("font-size", "16px")
// //         .attr("fill", "black")
// //         .style("font-weight", "bold")
// //         .text("In Poverty (%)")
// // // x axis text
// //         chartGroup.append("text")
// //         .attr("y", 0 - ((margin.left / 2) + 2))
// //         .attr("x", 0 - (height / 2))
// //         .attr("text-anchor", "middle")
// //         .attr("font-size", "16px")
// //         .attr("fill", "black")
// //         .style("font-weight", "bold")
// //         .attr("transform", "rotate(-90)")
// //         .text("Lacks Healthcare (%)")

// //   // // date formatter to display dates nicely
// //   // var dateFormatter = d3.timeFormat("%d-%b");

// //     // date formatter to display dates nicely
// //     // var dateFormatter = d3.timeFormat("%d-%b");

// //     // // Step 1: Append tooltip div
// //     //circlesGroup
// //     //.on('mouseover', function(data) {
// //      // toolTip.text(d=> d.abbr);
      
// //    // })
// //     // Step 3: Add an onmouseout event to make the tooltip invisible

        
// //     //   // Step 3: Create "mouseout" event listener to hide tooltip
// //     //   .on("mouseout", function() {
// //     //     toolTip.style("display", "none");
// //     //   });

// //   // }).catch(function(error) {
// //   //   console.log(error);
// //   // });




















// // // add multiple y axis text

// //     //     chartGroup.append("text")
// //     //     .attr("transform", `translate(${width / 2}, ${height + margin.top + 16})`)
// //     //     .attr("text-anchor", "middle")
// //     //     .attr("font-size", "16px")
// //     //     .attr("fill", "green")
// //     //     .text("Donut Cravings in Morning")

// //     // chartGroup.append("text")
// //     //     .attr("transform", `translate(${width / 2}, ${height + margin.top + 32})`)
// //     //     .attr("text-anchor", "middle")
// //     //     .attr("font-size", "16px")
// //     //     .attr("fill", "orange")
// //     //     .text("Donut Cravings in evening")
 
// //     //     chartGroup.append("text")
// //     //     .attr("transform", `translate(${width / 2}, ${height + margin.top + 48})`)
// //     //     .attr("text-anchor", "middle")
// //     //     .attr("font-size", "16px")
// //     //     .attr("fill", "black")
// //     //     .text("Donut Cravings in Night")
  
        





// // // adding multiple x axis texts


// //        //Make labels for the healthrisk graph


// // //      chartGroup.append("text")
// // //        .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
// // //        .attr("class", "axisText")
// // //        .text("In Poverty (%)");
 
 
 
//  });
