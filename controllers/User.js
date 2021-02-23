// const Users = [
// 	{
// 		id: 1,
// 		username: "Silvester",
// 		email: "silvester@gmail.com",
// 		thoughts: ["1", "2", "5"],
// 		friends: ["1", "2", "5"],
// 	},
// 	{
// 		id: 2,
// 		username: "Janvier",
// 		email: "silvester@gmail.com",
// 		thoughts: ["1", "2", "5"],
// 		friends: ["1", "2", "5"],
// 	},
// 	{
// 		id: 3,
// 		username: "No Name",
// 		email: "silvester@gmail.com",
// 		thoughts: ["1", "2", "5"],
// 		friends: ["1", "2", "5"],
// 	},
// ];

const User = require("../models/User");
var ObjectID = require("mongodb").ObjectID;

exports.Users = (req, res) => {
	User.find((err, users) => {
		if (err) {
			return res.status(400).json({ error: err });
		}
		res.json(users);
	});
};

exports.UserById = (req, res) => {
	let param = req.params.id;

	const user = () => {
		return Users.filter((item) => item.id == param);
	};
	console.log(user());

	res.json(user());
};

exports.UpdateUserById = async (req, res) => {
	let param = req.params.id;
	let body = req.body;

	// let users = User.find();

	// let index = await users
	// 	.map(function (item) {
	// 		return item.id;
	// 	})
	// 	.indexOf(param);

	// //await users.splice(index, 1, updatedUser);
	// users[index].id = param;

	// In your request

	//for (const [key, value] of Object.entries(body)) {
	//console.log(`${key}: ${value}`);
	User.updateOne(
		{ _id: ObjectID(param) }, //filter
		{ $set: body }, //update
		function (err, docs) {
			if (err) {
				console.log(err);
			} else {
				console.log("Updated Docs : ", docs);
				res.json({ message: "User Updated!" });
			}
		}
	);
	//let user = Users[index];
	//user[key] = value;
	//}
};

exports.DeleteUserById = async (req, res) => {
	let param = req.params.id;
	// const user = () => {
	// 	return users.filter((item) => item.id == param);
	// };
	// get index of object with id:37
	// let removeIndex = Users.map(function (item) {
	// 	return item.id;
	// }).indexOf(parseInt(param));

	// console.log(removeIndex);

	// Users.splice(removeIndex, 1);

	// res.json({ message: "User deleted!" });

	User.deleteOne(
		{ _id: ObjectID(param) }, //filter
		(err) => {
			if (err) throw err;
			else res.json({ message: "User deleted!" });
		}
	);
};

exports.CreateNewUser = async (req, res) => {
	let newUser = await {
		username: req.body.username,
		email: req.body.email,
	};

	//await Users.push(newUser);
	let theNewUser = await new User(newUser);

	theNewUser.save((err, result) => {
		if (err) {
			return res.status(400).json({ error: err });
		}
		res.json({ message: "new user has been created!" });
	});
};
