const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
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
	phone: { type: Number },
	email: {
		type: String,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is Invalid!");
			}
		}
	}
});
PatientSchema.virtual("visits", {
	ref: "Visit",
	localField: "_id",
	foreignField: "patient"
});
PatientSchema.virtual("histories", {
	ref: "History",
	localField: "_id",
	foreignField: "patient"
});
//Export of the Country Model
const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
