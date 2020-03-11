const mongoose = require("mongoose");
const { Schema } = mongoose;
//Room Schema

const RoomSchema = new Schema({
	name: { type: String, required: true },
	plant: { required: true, type: mongoose.Schema.Types.ObjectId }
});
RoomSchema.virtual("histories", {
	ref: "History",
	localField: "_id",
	foreignField: "bedInfo.room"
});
//Export of the Room Model
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
