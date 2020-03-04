const mongoose = require("mongoose");
const { Schema } = mongoose;

//Plant Schema
const PlantSchema = new Schema({
	name: { type: String, required: true }
});
//Export of the Plant Model
const Plant = mongoose.model("Plant", PlantSchema);
module.exports = Plant;
