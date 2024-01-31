const { StatusCode } = require('./keyMaster');
const { BadRequestError } = require('../utilities/customeError');

const getError = function (err) {
	if (err instanceof BadRequestError) {
		return {
			status: StatusCode.BAD_REQUEST,
			message: err.message,
			code: err.code,
		};
	}
	if (err.name === 'BadRequestError') {
		return {
			status: StatusCode.BAD_REQUEST,
			message: err.message,
		};
	}

	if ('code' in err && err.code === 11000) {
		return {
			status: StatusCode.CONFLICT,
			message: `User already exist with the same email`,
		};
	}

	return {
		status: 404,
		message: err.message,
	};
};

module.exports = { getError };
