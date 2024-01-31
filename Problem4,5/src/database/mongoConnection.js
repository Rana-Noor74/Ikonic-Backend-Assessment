const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		console.log('Starting the connection');
		return await mongoose
			.connect(uri)
			.then(() => {
				console.log('Database Connected successfully');
			})
			.catch((error) => {
				console.log('Failed to connect databse');
				console.log(error);
			});
	} catch (error) {
		console.log('Failed to connect databse');
		console.log(error);
	}
};

module.exports = connectDB;
