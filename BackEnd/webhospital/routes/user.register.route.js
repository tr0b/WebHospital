const express = require("express");
const User = require("../models/user");
const router = new express.Router();
router.post("/register", async (req, res) => {
	//Register A new User
	const user = new User(req.body);
	try {
		const token = await user.generateAuthToken();
		await user.save();
		res.status(200).send({ user, token });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
router.get("/users", (req, res) => {
	//See all Users
	User.find({})
		.then(users => {
			res.status(200).send(users);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

router.patch("/users/:id", async (req, res) => {
	//Modify User Details
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"name",
		"last_name",
		"email",
		"password",
		"isActive",
		"address.canton",
		"phone",
		"email"
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

module.exports = router;
