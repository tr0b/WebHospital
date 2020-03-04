const mongoose = require("mongoose");
const { Schema } = mongoose;

//Plant Schema
const PlantSchema = new Schema({
	name: { type: String, required: true }
});
PlantSchema.virtual("histories", {
	ref: "History",
	localField: "_id",
	foreignField: "plant"
});
//Export of the Plant Model
const Plant = mongoose.model("Plant", PlantSchema);
module.exports = Plant;
