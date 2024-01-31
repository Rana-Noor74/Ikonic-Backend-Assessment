class BadRequestError extends Error {
	constructor(message, code) {
		super(message);
		this.name = 'BadRequestError';
		this.code = code;
	}
}

class UnauthorizedError extends Error {
	constructor(message, code) {
		super(message);
		this.name = 'UnauthorizedError';
		this.code = code;
	}
}

module.exports = {
	BadRequestError,
	UnauthorizedError,
};
