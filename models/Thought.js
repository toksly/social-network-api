const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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

	reactions: [{ type: ObjectId, ref: "Reaction" }],

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
