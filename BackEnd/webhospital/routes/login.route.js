const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const router = new express.Router();
router.post("/login", async (req, res) => {
	try {
		//Login
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateAuthToken();
		const decoded = jwt.verify(token, process.env.SECRET);
		console.log(decoded);
		res.status(200).json({
			user,
			token,
			expiresIn: 3600,
			userName: decoded.name,
			userEmail: decoded.email,
			userId: decoded._id
		});
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
router.get("/logout", auth, async (req, res) => {
	try {
		//Single Logout
		req.user.tokens = req.user.tokens.filter(token => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.status(200).send();
	} catch (e) {
		/* handle error */
		res.status(500).json(e);
	}
});
router.get("/logoutAll", auth, async (req, res) => {
	try {
		//Total Logout
		req.user.tokens = [];
		await req.user.save();
		res.status(200).send();
	} catch (e) {
		/* handle error */
		res.status(500).json(e);
	}
});

module.exports = router;
