const mongoose = require("mongoose");
const { Schema } = mongoose;

//Patient Schema
const PatientSchema = new Schema({
	name: { type: String, required: true },
	last_name: { type: String, required: true },
	idCard: { type: Number, required: true },
	bloodType: { type: String, required: true },
	gender: { type: String, required: true },
	isActive: { type: Boolean, required: true, default: true },
	birthDate: { type: Date, required: true, default: Date.now() },
	maritalStatus: { type: String, required: true, default: "Single" },
	address: {
		canton: { type: mongoose.Schema.Types.ObjectId, ref: "Canton" }
	},
	contact: {
		phone: { type: Array },
		email: { type: Array }
	}
});
PatientSchema.virtual("histories", {
	ref: "History",
	localField: "_id",
	foreignField: "patient"
});
//Export of the Country Model
const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
