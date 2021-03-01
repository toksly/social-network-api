var express = require("express");
var router = express.Router();
const {
	Users,
	UserById,
	CreateNewUser,
	DeleteUserById,
	UpdateUserById,
	AddFriend,
	RemoveFriend,
} = require("../controllers/User");

router.get("/users", Users);
router.get("/users/:id", UserById);
router.post("/createnewuser", CreateNewUser);
router.delete("/users/:id/deleteuser", DeleteUserById);
router.put("/users/:id/updateuser", UpdateUserById);
router.put("/users/addfriend", AddFriend);
router.put("/users/removefriend", RemoveFriend);

module.exports = router;
