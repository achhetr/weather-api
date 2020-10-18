require('dotenv').config();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

if (process.argv[2]) {
	geocode(process.argv[2], (error, { lat, lon, location }) => {
		if (error) {
			console.log(error);
			return;
		} else {
			forecast(lat, lon, (error, forecastData) => {
				if (error) {
					console.log('Error', error);
					return;
				} else {
					console.log(forecastData);
					console.log('Location', location);
				}
			});
		}
	});
} else {
	console.log('No address is provided');
}
