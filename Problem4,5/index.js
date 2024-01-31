const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = Number(process.env.PORT);
const connection = require('./src/database/mongoConnection');
const users = require('./src/routes/userRoutes');
const { sendResponse } = require('./src/utilities/middleware');
const posts = require('./src/routes/postRoutes');

app.use(express.urlencoded({ extended: true }));

app.use(
	express.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	}),
);

app.use('/users', users, sendResponse);
app.use('/posts', posts, sendResponse);

const start = async () => {
	try {
		await connection();
		app.listen(port, () => {
			console.log(`App is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
