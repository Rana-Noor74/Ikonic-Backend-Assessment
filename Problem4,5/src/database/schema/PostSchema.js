const mongoose = require('mongoose');
const { PLATFORM, PRIVACY } = require('../../utilities/constants');

const postSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'Users',
			required: true,
		},

		privacy: {
			type: String,
			enum: {
				values: [PRIVACY.FRIENDS, PRIVACY.PRIVATE, PRIVACY.PUBLIC],
				message: `{VALUE} is not in the list`,
			},
			default: PRIVACY.PUBLIC,
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
		},

		description: {
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

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
