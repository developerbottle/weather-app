const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const KEY = process.env.DARKSKY_API_KEY;
    const url = 'https://api.darksky.net/forecast/' + KEY + '/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const summary = body.daily.data[0].summary;
            const temperature = ((body.currently.temperature - 32) * 5 / 9).toFixed(0);
            const precipProbability = body.daily.data[0].precipProbability * 100;
            const precipType = body.daily.data[0].precipType || 'rain';

            callback(undefined, `${summary} It is currently ${temperature} degress out. There is a ${precipProbability}% chance of ${precipType}.`);
        }
    });
};

module.exports = forecast;