const request = require('postman-request');

const forecast = (lat, lon, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${
		process.env.WEATHER_ACCESS_KEY
	}&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}`;
	request({ url: url, json: true }, (error, resolve) => {
		if (error) {
			callback('Unable to connect to forecast api', undefined);
		} else if (resolve.body.error) {
			callback('Not a valid location', undefined);
		} else {
			callback(undefined, {
				description: resolve.body.current.weather_descriptions[0].toLowerCase(),
				temperature: resolve.body.current.temperature,
				feelslike: resolve.body.current.feelslike,
			});
		}
	});
};

module.exports = forecast;
