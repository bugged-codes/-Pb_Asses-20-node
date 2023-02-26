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
	console.log('Request URL: ', req.url);
	console.log('Request Method: ', req.method);
	next();
});

const middleware1 = (req, res, next) => {
	console.log('This is Middlware-1');
	// res.write('Note: This page is passed through Middleware-1');
	next();
};

const middleware2 = (request, response, nextFunc) => {
	console.log('This is Middleware-2');
	response.write('Note: This page is passed through Middleware-2');
	nextFunc();
};

// Router-level GET request to "/"
router.get('/', (req, res, next) => {
	res.send("<h1>This is Homepage!</h1><h3>Different pages on this server are as follows: </h3><ul><li><a href='/page-1'>/page-1</a></li><li><a href='/page-2'>/page-2</a></li><li><a href='/api'>/api</a></li><li><a href='/about'>/about✌️</a></li></ul>");
	// res.end();
	next();
});

// App-level GET request to /page-1.
app.get('/page-1', (req, res) => {
	res.send('<h1>This is page-1</h1>');
	res.end();
});

// Router-level GET request to /page-1.
router.get('/page-2', middleware1, (req, res) => {
	res.send('<h1>This is page-2</h1>');
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
	// next();
	res.end();
});

router.get('/about', middleware2, (req, res) => {
	res.write('\n\n This is About Page!');
	res.end();
});

// App-level Error handeling middlware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});
