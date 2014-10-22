var tilebelt = require('tilebelt');

var z = 6;

var fc = { type: 'FeatureCollection', features: [] };

for (var x = 0; x < Math.pow(2, z); x++) {
    for (var y = 0; y < Math.pow(2, z); y++) {
        var tile = tilebelt.tileToGeoJSON([x, y, z]);
        var qk = tilebelt.tileToQuadkey([x, y, z]);
        tile.properties.key = qk;
        fc.features.push(tile);
    }
}

console.log(JSON.stringify(fc, null, 2));
