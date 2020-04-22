const request = require('request');

module.exports = forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=7a5748fe66ce8c832f1d2aa4e4278747&query=" + latitude + "," + longitude + "&units=f";
    request({ url, json: true }, (error, { body }) => {
        if (error) return callback("Unable to connect to weather service.", undefined);
        const responseError = body.error
        if (responseError) return callback(`${responseError.type}: ${responseError.info}`, undefined)
        const {temperature, feelslike} = body.current
        callback(undefined, `It is currently ${temperature} degrees out. It feels like ${feelslike}.`);
    });
}
