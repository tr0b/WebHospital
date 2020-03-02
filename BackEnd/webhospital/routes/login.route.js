const express = require("express");
const User = require("../models/user");
const router = new express.Router();
router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});

module.exports = router;
