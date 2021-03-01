const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reactionSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		required: true,
	},

	reactionBody: {
		type: String,
		required: true,
		length: { max: 280 },
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
