const mongoose = require("mongoose");
const { Schema } = mongoose;

//History Schema
const HistorySchema = new Schema({
	dateIn: { type: Date, required: true },
	dateOut: { type: Date, required: true },
	bedInfo: {
		bedId: { type: Number },
		plant: { type: Mongoose.Schema.Types.ObjectId }
	}
});
//Export of the History Model
const History = mongoose.model("History", HistorySchema);
module.exports = History;
