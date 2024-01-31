const { User } = require('../database/schema/UserSchema');
const { StatusCode } = require('../utilities/keyMaster');
const exceptions = require('../utilities/exception');
const { BadRequestError, UnauthorizedError } = require('../utilities/customeError');
const jwtUtils = require('../utilities/jwt');
const {
	validateCreateUserBody,
	checkUserByEmail,
	checkUserById,
	validateUpdateUserBody,
} = require('../utilities/validator');

module.exports = {
	create: async (body) => {
		try {
			if (!body) {
				throw new Error('body is not defiend');
			}

			const validateBody = validateCreateUserBody(body);

			if (!validateBody.isValid) {
				console.log(validateBody.errors);
				throw new Error(validateBody.errors);
			}

			if (!checkUserByEmail(body.email)) {
				//if user not exist
				throw new Error('User is already exist');
			}

			const user = await User.create({
				...body,
			});

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: user,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	login: async ({ email, password }) => {
		try {
			const user = await User.findOne({ email });

			if (!user || password != user.password) {
				throw new Error('Invalid credentials');
			}

			const token = jwtUtils.generateToken({ userId: user._id, email: user.email });

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: { data: token },
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	list: async ({ platform }) => {
		try {
			const users = platform ? await User.find({ platform: platform }) : await User.find({});

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: users,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	get: async ({ id }) => {
		try {
			const user = await User.findById(id).orFail();

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: user,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	update: async ({ id }, body) => {
		try {
			const checkUser = await checkUserById(id);

			if (!checkUser) {
				throw new Error('User does not exist in databse');
			}

			const validateBody = validateUpdateUserBody(body);

			if (!validateBody.isValid) {
				console.log(validateBody.errors);
				throw new Error(validateBody.errors);
			}

			const updatedUser = await User.findByIdAndUpdate(id, { ...body }, { new: true });

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: updatedUser,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	delete: async ({ id }) => {
		try {
			const checkUser = await checkUserById(id);

			if (!checkUser) {
				throw new Error('User does not exist in databse');
			}

			const deletedUser = await User.findByIdAndDelete(id, { projection: {} }).orFail();

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: deletedUser,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},
};
