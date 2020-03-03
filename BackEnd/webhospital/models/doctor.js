const mongoose = require("mongoose");
const { Schema } = mongoose;

//Doctor Schema
const DoctorSchema = new Schema({
	name: { type: String, required: true },
	last_name: { type: String, required: true },
	idCard: { type: String, required: true },
	isActive: { type: Boolean, required: true, default: true },
	birthDate: { type: Date, required: true },
	gender: { type: String, required: true },
	specialty: { type: String, required: true },
	address: {
		canton: { type: mongoose.Schema.Types.ObjectId, ref: "Canton" }
	}
});
//Export of the Country Model
const Doctor = mongoose.model("Doctor", DoctorSchema);
module.exports = Doctor;
