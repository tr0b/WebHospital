const express = require("express");
//Import of Room Model
const Room = require("../models/room");
//Import of Plant Model
const Plant = require("../models/plant");
const auth = require("../middleware/auth");
const router = new express.Router();
//Register A new Room
router.post("/room", auth, async (req, res) => {
	const room = new Room(req.body);
	try {
		await room.save();
		res.status(200).send({ room });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
//See all Rooms
router.get("/rooms", auth, (req, res) => {
	Room.find({})
		.then(rooms => {
			res.status(200).send(rooms);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});
//Show a given room
router.get("/room/:id", auth, async (req, res) => {
	const room = await Room.findById(req.params.id).populate({
		path: "plant"
	});
	console.log(room);
	res.status(200).json(room);
});

//Modify Room Details
router.patch("/room/:id", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "plant"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const room = await Room.findById(req.params.id);
		updates.forEach(update => (room[update] = req.body[update]));
		await room.save();
		res.status(200).send(room);
	} catch (e) {
		res.status(400).send(e);
		/* handle error */
	}
});
//See all Rooms in a Certain Plant
router.get("/rooms/:id", auth, async (req, res) => {
	try {
		const plant = await Plant.findById(req.params.id);
		await plant.populate("rooms").execPopulate();
		res.status(200).send(plant.rooms);
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
module.exports = router;
