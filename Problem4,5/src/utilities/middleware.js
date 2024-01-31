const { StatusCode } = require('./keyMaster');
const jwtUtils = require('./jwt');
const { UnauthorizedError } = require('./customeError');

exports.sendResponse = function (req, res) {
	if (!req.response) {
		res.sendStatus(StatusCode.FORBIDDEN);
	}

	const { result, error } = req.response;

	if (error) {
		res.status(error.status).json({
			message: error.message,
			...(error.code && { code: error.code }),
		});
	} else if (result) {
		if (result.event_name) {
			console.log(result.event_name);
		}

		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
	}
};

exports.authenticateToken = async (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	try {
		const decoded = await jwtUtils.verifyToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			// Handle token expiration error
			return res.status(401).json({ error: 'Token has expired' });
		}

		// Handle other verification errors
		return res.status(403).json({ error: 'Invalid Token' });
	}
};
