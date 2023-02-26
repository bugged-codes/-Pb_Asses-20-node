const express = require('express');

// App-level Instance of express.
const app = express();

app.listen('3000', () => {
	console.log('Server is running on Port: 3000');
});

// Router-level Instance of express.
const router = express.Router();

// Mounting router on the app
app.use('/', router);

// Router-level Middleware (Default to all routes with all methods).
router.use((req, res, next) => {
	console.log('Request URL: ', req.originalUrl);
	console.log('Request Method: ', req.method);
	next();
});

const middleware1 = (req, res, next) => {
	console.log('This is Middlware-1');
	res.send('<h3>This page is passed through Middleware-1</h3>');
	next();
};

const middleware2 = (request, response, nextFunc) => {
	console.log('This is Middleware-2');
	res.send('<h3>This page is passed through Middleware-2</h3>');
	nextFunc();
};

// Router level GET request to "/"
router.get('/', (req, res, next) => {
	res.send("<h1>This is Homepage!</h1><h3>Different pages on this server are as follows: </h3><ul><li>/page-1</li><li>/api</li><li><a href='/about'>/about</a></li></ul>");
	// res.end();
	next();
});

app.get('page-1', (req, res) => {
	res.send('This is page-1');
	res.end();
});

// Route to /api with all methods.
router.use('/api', (req, res, next) => {
	res.json({
		Student1: {
			Name: 'Student-1',
			Age: 20,
			BatchMonth: 'October',
		},
		Student2: {
			Name: 'Student-2',
			Age: 22,
			BatchMonth: 'September',
		},
	});
	next();
});

// App-level Error handeling middlware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});
