const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
	//Authorization with JWT
	try {
		const token = req
			.header("Authorization")
			.replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.SECRET);
		const user = await User.findOne({
			_id: decoded._id
		});
		if (!user) {
			throw new Error();
		}
		req.token = token;
		req.user = user;
		req.userData = {
			email: decoded.email,
			name: decoded.name,
			_id: decoded._id
		};
		next();
	} catch (e) {
		/* handle error */
		res.status(401).send({ error: "Not Authenticated" });
	}
};
module.exports = auth;
