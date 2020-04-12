const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
router.post("/register", async (req, res) => {
	//Register A new User
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
router.get("/users", auth, async (req, res) => {
	//See all Users
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (e) {
		res.status(500).send(e);
		/* handle error */
	}
});

router.get("/profile", auth, async (req, res) => {
	res.status(200).json(req.user);
});

router.patch("/profile", auth, async (req, res) => {
	//Modify My User Details
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"name",
		"last_name",
		"email",
		"password",
		"isActive",
		"address",
		"phone"
	];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.send.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		updates.forEach(
			update => (req.user[update] = req.body[update])
		);
		await req.user.save();
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
		/* handle error */
	}
});
router.patch("/users/:id", auth, async (req, res) => {
	//Modify User Details *DEPRECATED*
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"name",
		"last_name",
		"email",
		"password",
		"isActive",
		"address",
		"phone"
	];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.send.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const user = await User.findById(req.params.id);
		updates.forEach(update => (user[update] = req.body[update]));
		await user.save();
	} catch (e) {
		res.status(400).send(e);
		/* handle error */
	}
});

//See a specified user profile by its _id
router.get("/users/:id", auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).send(user);
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
module.exports = router;
