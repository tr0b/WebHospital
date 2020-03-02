const mongoose = require("mongoose");
const { Schema } = mongoose;

//Canton Schema
const CantonSchema = new Schema({
	id: { type: Number, required: true, unique: true, dropDups: true },
	name: { type: String, required: true },
	isActive: { type: Boolean, required: true, default: true },
	province: { type: mongoose.Schema.Types.ObjectId, ref: "Province" }
});

CantonSchema.virtual("patients", {
	ref: "Patient",
	localField: "_id",
	foreignField: "address.canton"
});
CantonSchema.virtual("doctors", {
	ref: "Doctor",
	localField: "_id",
	foreignField: "address.canton"
});
//Export of the Canton Model
const Canton = mongoose.model("Canton", CantonSchema);
module.exports = Canton;
