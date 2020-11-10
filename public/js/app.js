console.log('Client side javascript file is loaded!');

fetch('http://puzzle.mead.io/puzzle')
	.then((response) => {
		response.json().then((data) => {
			console.log(data);
			alert(data.puzzle);
		});
	})
	.catch((err) => alert(err));

fetch('http://localhost:3000/weather?address=delhi')
	.then((response) => {
		response.json().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				console.log(data);
			}
		});
	})
	.catch((err) => console.log(err));
