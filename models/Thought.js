const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const ObjectIdType = mongoose.Types.ObjectId;

const thoughtSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		required: true,
	},

	thoughtText: {
		type: String,
		trim: true,
		required: "text is required",
		length: "1 to 280",
	},

	reactions: [
		{	
			reactionId: { type: ObjectId, default: new ObjectIdType},

			reactionBody: {
				type: String,
				required: true,
				length: { max: 280 },
			},
			
			username: {
				type: String,
				trim: true,
				required: true,
			},

			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
