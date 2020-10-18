const path = require('path');

const express = require('express');

const app = express();

// add middleware to public directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('/weather', (req, res) => {
	res.send({
		weather: 38,
		forecast: 'Snow',
		location: 'Newyork',
	});
});

app.listen(3000, () => {
	console.log('Server listening to port 3000');
});
