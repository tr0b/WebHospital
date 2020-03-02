const mongoose = require("mongoose");
const { Schema } = mongoose;

//User Schema
const PatientSchema = new Schema({
	profile: {
		name: { type: String, required: true },
		last_name: { type: String, required: true },
		isActive: { type: Boolean, required: true, default: true }
	},
	address: {

		canton: { type: mongoose.Schema.Types.ObjectId, ref: "Canton" }
	}
});
//Export of the Country Model
const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
