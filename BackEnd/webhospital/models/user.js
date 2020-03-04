const mongoose = require("mongoose");
const Country = require("./country");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

//User Schema
const UserSchema = new Schema({
	name: { type: String, required: true, trim: true },
	last_name: { type: String, required: true },
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is Invalid!");
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes("password")) {
				throw new Error(
					"Password cannot contain 'password' as a value"
				);
			}
		}
	},
	isActive: { type: Boolean, required: true, default: true },
	address: {
		canton: { type: mongoose.Schema.Types.ObjectId, ref: "Canton" }
	},
	contact: {
		phone: { type: Array },
		email: { type: Array }
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});
UserSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "usertkn");
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};
UserSchema.statics.findByCredentials = async (email, password) => {
	console.log(email);
	console.log(password);
	//Asynchronous Email search
	const user = await User.findOne({ email: email });
	if (!user) {
		console.log("No email match.");
		throw new Error("Unable to login.");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		console.log("No password match");
		throw new Error("Unable to login.");
	}

	return user;
};
//Hash the plain text password before saving (Hashear credenciales)

UserSchema.pre("save", async function(next) {
	const user = this;
	console.log("Test 43");
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 9);
	}
});

//Export of the User Model
const User = mongoose.model("User", UserSchema);
module.exports = User;
