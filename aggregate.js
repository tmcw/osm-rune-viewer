var planet = require('./planet-2.json');

var all = {};

for (var quadkey in planet) {
    for (var codepoint in planet[quadkey]) {
        all[codepoint] = (all[codepoint] === undefined ? 0 : all[codepoint]) + planet[quadkey][codepoint];
    }
}

console.log(JSON.stringify(all, null, 2));
