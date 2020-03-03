const mongoose = require("mongoose");
const { Schema } = mongoose;

//User Schema
const PatientSchema = new Schema({
	name: { type: String, required: true },
	last_name: { type: String, required: true },
	idCard: { type: Number, required: true },
	bloodType: { type: String, required: true },
	gender: { type: String, required: true },
	isActive: { type: Boolean, required: true, default: true },
	birthDate:{type:Date, required:true},
	address: {
		canton: { type: mongoose.Schema.Types.ObjectId, ref: "Canton" }
	}
});
//Export of the Country Model
const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
