var express = require("express");
var router = express.Router();
const {
	Users,
	UserById,
	CreateNewUser,
	DeleteUserById,
	UpdateUserById,
} = require("../controllers/index");

router.get("/users", Users);
router.get("/users/:id", UserById);
router.post("/createnewuser", CreateNewUser);
router.delete("/users/:id/deleteuser", DeleteUserById);
router.put("/users/:id/updateuser", UpdateUserById);

module.exports = router;
