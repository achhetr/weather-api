const request = require('postman-request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=${process.env.GEOCODE}&limit=1`;

	request({ url: url, json: true }, (error, response) => {
		console.log(response.body, 'response from api map box');
		console.log(process.env.GEOCODE);
		if (error) {
			callback('Unable to connect to location services', undefined);
		} else if (!response.body.features) {
			callback(
				'Unable to find the location. Try another search.',
				undefined
			);
		} else {
			callback(undefined, {
				lon: response.body.features[0].center[0],
				lat: response.body.features[0].center[1],
				location: response.body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
