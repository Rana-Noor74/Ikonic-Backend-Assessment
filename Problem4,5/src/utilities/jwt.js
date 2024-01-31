const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });
};

const verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return reject(err);
			resolve(decoded);
		});
	});
};

module.exports = { generateToken, verifyToken };
