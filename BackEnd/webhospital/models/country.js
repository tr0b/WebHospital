const mongoose = require("mongoose");
const { Schema } = mongoose;

//Country Schema
const CountrySchema = new Schema({
	id: { type: Number, required: true, unique: true, dropDups: true },
	name: { type: String, required: true },
	isActive: { type: Boolean, required: true, default: true }
});

CountrySchema.virtual("provinces", {
	ref: "Province",
	localField: "_id",
	foreignField: "country"
});

//Export of the Country Model
const Country = mongoose.model("Country", CountrySchema);
module.exports = Country;
