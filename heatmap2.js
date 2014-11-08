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
    .tickFormat(hex);

var yAxis = d3.svg.axis()
    .tickFormat(hex)
    .scale(y)
    .orient("left");

function hex(d) {
    var h = d.toString(16).toUpperCase();
    return h.length == 1 ? '0' + h : h;
}

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var hexes = [];
x.domain([0, 255]);
y.domain([0, 255]);

var z = d3.scale.quantize()
    .range(colorbrewer.RdBu[9]);

d3.json("all.json", function(error, all) {
  var entries = d3.entries(all);
  z.domain(d3.extent(entries, function(d) { return d.value; }));
  console.log(z.domain());
  svg.selectAll("rect.block")
      .data(entries)
    .enter().append("rect")
      .attr("class", "isoline")
      .attr("transform", function(d) {
        var point = parseInt(d.key, 10);
        var xp = point % 255;
        var yp = Math.floor(point / 255);
        return "translate(" + [~~x(xp), ~~y(yp)] + ")";
      })
      .attr("width", function(d) { return ~~(x(1) - x(0)) - 1; })
      .attr("height", function(d) { return ~~(y(1) - y(0)) - 1; })
      .style("fill", function(d, i) { return z(d.value); });

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
});
