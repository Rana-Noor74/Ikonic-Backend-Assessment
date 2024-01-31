const { Post } = require('../database/schema/PostSchema');
const { StatusCode } = require('../utilities/keyMaster');
const exceptions = require('../utilities/exception');
const { BadRequestError } = require('../utilities/customeError');
const { checkPostById } = require('../utilities/validator');

module.exports = {
	list: async ({ userId }) => {
		try {
			const posts = userId ? await Post.find({ userId: userId }) : await Post.find({});

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: posts,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	get: async ({ id }) => {
		try {
			const post = await Post.findById(id).orFail();

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: post,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	create: async (body) => {
		try {
			if (!body) {
				throw new Error('body is not defiend');
			}

			const post = await Post.create({
				...body,
			});

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: post,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	update: async ({ id }, body) => {
		try {
			const checkPost = await checkPostById(id);

			if (!checkPost) {
				throw new Error('Post does not exist in databse');
			}

			const updatedPost = await Post.findByIdAndUpdate(id, { ...body }, { new: true });

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: updatedPost,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},

	delete: async ({ id }) => {
		try {
			const checkPost = await checkPostById(id);

			if (!checkPost) {
				throw new Error('Post does not exist in databse');
			}

			const deletedPost = await Post.findByIdAndDelete(id, { projection: {} }).orFail();

			return {
				result: {
					status: StatusCode.SUCCESS,
					data: deletedPost,
				},
			};
		} catch (error) {
			return { error: exceptions.getError(error) };
		}
	},
};
