const mongoose = require("mongoose");
const { Schema } = mongoose;

//Visit Schema
const VisitSchema = new Schema(
	{
		date: { type: Date, required: true, default: Date.now() },
		patient: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Patient"
		},
		doctor: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Doctor"
		},
		plant: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Plant"
		},
		//room

		description: { type: String, required: true }
	},

	{ timestamps: true }
);

//Export of the Visit Model
const Visit = mongoose.model("Visit", VisitSchema);
module.exports = Visit;
