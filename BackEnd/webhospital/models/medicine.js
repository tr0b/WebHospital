const mongoose = require("mongoose");
const { Schema } = mongoose;

//Medicine Schema
const MedicineSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	dose: { type: String, required: true },
	hoursPerDose: { type: Number, required: true }
});
//Export of the Medicine Model
const Medicine = mongoose.model("Medicine", MedicineSchema);
module.exports = Medicine;
