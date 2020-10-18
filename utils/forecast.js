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
			callback(
				undefined,
				`It is currently ${resolve.body.current.weather_descriptions[0].toLowerCase()} with temperature ${
					resolve.body.current.temperature
				} degrees celsius outside and it feels like ${
					resolve.body.current.feelslike
				} degrees celsius out`
			);
		}
	});
};

module.exports = forecast;
