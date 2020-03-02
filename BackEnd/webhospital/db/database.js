const mongoose = require("mongoose");

// Mongo Default Values
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

//Mongo DB Connection
mongoose.connect(process.env.MONGO_CLOUD_URL)
	.then(db => console.log("InstHealth MongoDB Connected!"))
	.catch(error => console.error(error));
