const mongoose = require("mongoose");
const { Schema } = mongoose;

//History Schema
const HistorySchema = new Schema({
	dateIn: { type: Date, required: true, default: Date.now() },
	dateOut: { type: Date },
	bedId: { type: Number },
	room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
	patient: { type: mongoose.Schema.Types.ObjectId, required: true }
});
//Export of the History Model
const History = mongoose.model("History", HistorySchema);
module.exports = History;
