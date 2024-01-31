const mongoose = require('mongoose');
const { PLATFORM } = require('../../utilities/constants');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name should be provided'],
		},

		email: {
			type: String,
			unique: [true, 'Email must be unique'],
			required: [true, 'Email should be provided'],
		},

		platform: {
			type: String,
			enum: {
				values: [
					PLATFORM.FACEBOOK,
					PLATFORM.DISCORD,
					PLATFORM.INSTAGRAM,
					PLATFORM.LINKEDIN,
				],
				message: `{VALUE} is not in the list`,
			},
			required: true,
		},

		password: {
			type: String,
			required: true,
		},

		created_at: {
			type: Date,
			default: Date.now,
		},

		updated_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	},
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
