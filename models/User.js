const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},

	email: {
		type: String,
		unique: true,
		required: true,
		match: [/.+@.+\..+/],
	},
	thoughts: [{ type: ObjectId, ref: "Thought" }],

	friends: [],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
