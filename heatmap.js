var margin = {top: 20, right: 20, bottom: 30, left: 30},
    width = 960 - margin.left - margin.right,
    height = 960 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(20);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var hexes = [];
x.domain([0, 255]);
y.domain([0, 255]);

d3.csv("basic_multilingual_ranges_wikipedia.csv", function(error, blocks) {

  blocks.forEach(function(d) {
    var start = d.range.split(/\–|\-/)[0];
    var end = d.range.split(/\–|\-/)[1];
    d.start = toStringPair(start);
    d.end = toStringPair(end);
    function toStringPair(str) {
      return [
        parseInt(str.substring(0, 2), 16),
        parseInt(str.substring(2, 4), 16)
      ];
    }
  });

  svg.selectAll("rect.block")
      .data(blocks)
    .enter().append("rect")
      .attr("class", "isoline")
      .attr("transform", function(d) {
        return "translate(" + [x(d.start[1]), y(d.start[0])] + ")";
      })
      .attr("width", function(d) { return x(d.end[1]) - x(d.start[1]); })
      .attr("height", function(d) { return y(d.end[0]) - y(d.start[0]); })
      .style("fill", function(d, i) { return '#000'; });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
});
