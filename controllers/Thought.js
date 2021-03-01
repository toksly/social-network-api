const Thought = require("../models/Thought");
const User = require("../models/User");
var ObjectID = require("mongodb").ObjectID;

exports.CreateNewThought = async (req, res) => {
	//newThougth
	let newThought = await new Thought({
		username: req.body.username,
		thoughtText: req.body.thoughtText,
	});

	newThought.save((err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json({ message: "Thought created!" });
			User.findOneAndUpdate(
				result.username,
				{ $push: { thoughts: ObjectID(result._id) } },
				{ new: true }
			)
				.then((data) => {
					console.log({ message: "removed to user schema" });
				})
				.catch((err) => {
					console.log({ message: "Failed to removed from user schema" });
				});
		}
	});
};

exports.Thoughts = (req, res) => {
	Thought.find((err, thoughts) => {
		if (err) {
			return res.status(400).json({ error: err });
		}
		res.json(thoughts);
	});
};

// delete thouhgt controller
exports.DeleteThoughtById = async (req, res) => {
	let param = req.params.id;

	Thought.deleteOne(
		{ _id: ObjectID(param) }, //filter
		(err, result) => {
			if (err) throw err;
			else {
				res.json(result);
				User.findOneAndUpdate(
					result.username,
					{ $pull: { thoughts: ObjectID(param) } },
					{ new: true }
				)
					.then((data) => {
						console.log({ message: "removed from user schema" });
					})
					.catch((err) => {
						console.log({ message: "Failed to removed from user schema" });
					});
			}
		}
	);
};

// update thought controller
exports.updateThoughtById = (req, res) => {
	Thought.findOneAndUpdate(
		{ _id: req.params.id },
		{ $set: req.body },
		{ runValidators: true, new: true }
	)
		.then((dbThoughtData) => {
			if (!dbThoughtData) {
				return res.status(400).json({ message: "No thought with this id!" });
			}
			res.json(dbThoughtData);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
};

//Reactions controller

//create reaction
exports.CreateReaction = (req, res) => {
	let newReaction = {
		reactionBody: req.body.reactionBody,
		username: req.body.username,
	};
	Thought.findByIdAndUpdate(
		req.body.thoughtId,
		{ $push: { reactions: newReaction } },
		{ new: true }
	)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
};

//delete reactions

exports.RemoveReaction = (req, res) => {
	Thought.findOneAndUpdate(
		req.body.thoughtId,
		{ $pull: { reactions: { _id: req.body.reactionId } } },
		{ new: true }
	)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
};
