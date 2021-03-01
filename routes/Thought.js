const express = require("express");
const router = express.Router();
const {
	CreateNewThought,
	Thoughts,
	DeleteThoughtById,
	updateThoughtById,
	
} = require("../controllers/Thought");

router.get("/thoughts", Thoughts);
//router.get("/thoughts/:id", ThoughtById);
router.post("/createnewthought", CreateNewThought);
router.delete("/thoughts/:id/deletethought", DeleteThoughtById);
router.put("/thoughts/:id/updatethought", updateThoughtById);

module.exports = router;
