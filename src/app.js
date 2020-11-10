const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

require('dotenv').config();

const app = express();

// path defined
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlerbars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static public directory
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Home Page',
		name: 'Akash',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Akash',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Akash',
		helpText: 'This is a Help page',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'No address was provided',
		});
	}
	// get lat,lon, and location
	geocode(req.query.address, (err, loc) => {
		if (err) {
			return res.send({
				error: err,
			});
		}

		// get weather from lat, lon
		const { lat, lon, location } = loc;

		forecast(lat, lon, (err, fore) => {
			if (err) {
				return res.send({
					error: err,
				});
			}

			res.send({
				temperature: fore.temperature,
				feelslike: fore.feelslike,
				location,
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a seach term',
		});
	}
	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help Page',
		error: 'Help page not found',
		name: 'Akash',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Page Not Found',
		error: 'Page not found',
		name: 'Akash',
	});
});

app.listen(3000, () => {
	console.log('Server listening to port 3000');
});
