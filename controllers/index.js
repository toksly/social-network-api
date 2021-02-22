const users = [
	{
		id: 1,
		username: "Silvester",
		email: "silvester@gmail.com",
		thoughts: ["1", "2", "5"],
		friends: ["1", "2", "5"],
	},
	{
		id: 2,
		username: "Janvier",
		email: "silvester@gmail.com",
		thoughts: ["1", "2", "5"],
		friends: ["1", "2", "5"],
	},
	{
		id: 3,
		username: "No Name",
		email: "silvester@gmail.com",
		thoughts: ["1", "2", "5"],
		friends: ["1", "2", "5"],
	},
];

exports.Users = (req, res) => {
	res.json(users);
};

exports.UserById = (req, res) => {
	let param = req.params.id;

	const user = () => {
		return users.filter((item) => item.id == param);
	};
	console.log(user());

	res.json(user());
};

exports.UpdateUserById = async (req, res) => {
	let param = req.params.id;
	let body = req.body;

	let index = await users
		.map(function (item) {
			return item.id;
		})
		.indexOf(parseInt(param));

	//await users.splice(index, 1, updatedUser);
	users[index].id = await parseInt(param);

	for (const [key, value] of Object.entries(body)) {
		//console.log(`${key}: ${value}`);
		let user = users[index];
		user[key] = value;
	}

	res.json({ message: "User Updated!" });
};

exports.DeleteUserById = async (req, res) => {
	let param = req.params.id;
	// const user = () => {
	// 	return users.filter((item) => item.id == param);
	// };
	// get index of object with id:37
	let removeIndex = users
		.map(function (item) {
			return item.id;
		})
		.indexOf(parseInt(param));

	console.log(removeIndex);

	users.splice(removeIndex, 1);

	res.json({ message: "User deleted!" });
};

exports.CreateNewUser = async (req, res) => {
	let newUser = await {
		id: users.length + 1,
		username: req.body.username,
		email: req.body.email,
	};

	await users.push(newUser);

	res.json({ message: "new user has been created!" });
};
