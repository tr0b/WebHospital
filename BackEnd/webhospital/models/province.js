const mongoose = require("mongoose");
const { Schema } = mongoose;

//Province Schema
const ProvinceSchema = new Schema({
	id: { type: Number, required: true, unique: true, dropDups: true },
	name: { type: String, required: true },
	isActive: { type: Boolean, required: true, default: true },
	country: { type: mongoose.Schema.Types.ObjectId, ref: "Country" }
});

ProvinceSchema.virtual("cantons", {
	ref: "Canton",
	localField: "_id",
	foreignField: "province"
});
//Export of the Province Model
const Province = mongoose.model("Province", ProvinceSchema);
module.exports = Province;
