const { Post } = require('../database/schema/PostSchema');
const { User } = require('../database/schema/UserSchema');

const checkUserByEmail = async (email) => {
	const user = await User.findOne({ email: email });
	if (user) {
		return true;
	} else {
		return false;
	}
};

const checkUserById = async (id) => {
	const user = await User.findById(id).exec();
	if (user) {
		return true;
	} else {
		return false;
	}
};

const checkPostById = async (id) => {
	const post = await Post.findById(id).exec();
	if (post) {
		return true;
	} else {
		return false;
	}
};

const validateCreateUserBody = ({ name, email, password }) => {
	const errors = [];

	// Validate name
	if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
		errors.push('Name is invalid.');
	}

	// Validate email
	if (!email || !email.includes('@') || !email.includes('.')) {
		errors.push('Email is invalid.');
	}

	// Validate password
	if (
		!password ||
		password.length < 8 ||
		!/[a-z]/.test(password) ||
		!/[A-Z]/.test(password) ||
		!/\d/.test(password)
	) {
		errors.push(
			'Password is invalid. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.',
		);
	}

	// Return validation results
	if (errors.length === 0) {
		return { isValid: true };
	} else {
		return { isValid: false, errors };
	}
};

const validateUpdateUserBody = ({ name, email, password }) => {
	const errors = [];

	// Validate name
	if (name) {
		if (!/^[a-zA-Z\s]+$/.test(name)) {
			errors.push('Name is invalid.');
		}
	}

	if (email) {
		// Validate email
		if (!email || !email.includes('@') || !email.includes('.')) {
			errors.push('Email is invalid.');
		}
	}

	if (password) {
		// Validate password
		if (
			!password ||
			password.length < 8 ||
			!/[a-z]/.test(password) ||
			!/[A-Z]/.test(password) ||
			!/\d/.test(password)
		) {
			errors.push(
				'Password is invalid. It should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.',
			);
		}
	}

	// Return validation results
	if (errors.length === 0) {
		return { isValid: true };
	} else {
		return { isValid: false, errors };
	}
};

module.exports = {
	validateCreateUserBody,
	checkUserByEmail,
	checkUserById,
	validateUpdateUserBody,
	checkPostById,
};
