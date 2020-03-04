const mongoose = require("mongoose");
const { Schema } = mongoose;

//Visit Schema
const VisitSchema = new Schema({
	date: { type: Date, required: true },
	patient: {
		required: true,
		type: Mongoose.Schema.Types.ObjectId
	},
	doctor: {
		required: true,
		type: Mongoose.Schema.Types.ObjectId
	},
	diagnosis: { type: String, required: true }
});
//Export of the Visit Model
const Visit = mongoose.model("Visit", VisitSchema);
module.exports = Visit;
