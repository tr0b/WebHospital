const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const app = express();
//Passport config
require("../middleware/passport")(passport);

// Server Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

// Static Files
app.use(express.static(path.join(__dirname, "..", "public")));

// BodyParser
app.use(express.urlencoded({ extended: false }));

//Express Session Middleware
app.use(
	session({
		secret: "pianocat",
		resave: true,
		saveUninitialized: true,
		cookie: { secure: true }
	})
);

//Passport Middleware

app.use(passport.initialize());
app.use(passport.session());

//* Routes*
//User CRUD Route
app.use(process.env.API_BASE_PATH, require("../routes/user.register.route"));
//Doctor CRUD Route
app.use(process.env.API_BASE_PATH, require("../routes/doctor.route"));
//Patient CRUD Route
app.use(process.env.API_BASE_PATH, require("../routes/patient.route"));
//Visit CRUD Route
app.use(process.env.API_BASE_PATH, require("../routes/visit.route"));
//Plant CRUD Route
app.use(process.env.API_BASE_PATH, require("../routes/plant.route"));
//History CRUD Route
app.use(process.env.API_BASE_PATH, require("../routes/history.route"));
//Medicine CRUD Route
app.use(process.env.API_BASE_PATH, require("../routes/medicine.route"));
//Login Route
app.use(process.env.API_BASE_PATH, require("../routes/login.route"));

// Default Route
app.use("*", (req, res, next) => {
	if (!req.originalUrl.includes(process.env.API_BASE_PATH))
		res.sendFile(
			path.join(__dirname, "..", "public", "index.html")
		);
	else next();
});

module.exports = app;
