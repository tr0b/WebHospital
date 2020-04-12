const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
	try {
		const token = req
			.header("Authorization")
			.replace("Bearer ", "");
		console.log("Token created: => " + token);
		console.log(process.env.SECRET);
		const decoded = jwt.verify(token, process.env.SECRET);
		const user = await User.findOne({
			_id: decoded._id
		});
		if (!user) {
			throw new Error();
		}
		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		/* handle error */
		res.status(401).send({ error: "Not Authenticated" });
	}
};
module.exports = auth;
