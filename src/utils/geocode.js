const request = require('request');

module.exports = geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibnBlenpvdHRpIiwiYSI6ImNrOHV5ZXkyZzA2cDczZm82cmhiOXB3YWYifQ.muiuosG7jXIH0EndwtvfrA&limit=1";
    request({ url, json: true }, (error, { body }) => {
        if (error) return callback("Unable to connect to location services", undefined);
        if (!body.features || body.features.length === 0) return callback("No locations found", undefined);
        const { features } = body;
        callback(undefined, {
            latitude: features[0].center[1],
            longitude: features[0].center[0],
            location: features[0].place_name
        });
    });
};