const express = require("express");
const History = require("../models/history");
const Room = require("../models/room");
const Patient = require("../models/patient");
const auth = require("../middleware/auth");
const router = new express.Router();
router.post("/history", auth, async (req, res) => {
	//Register A new History
	const history = new History(req.body);
	try {
		await history.save();
		res.status(200).send({ history });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
router.get("/histories", auth, (req, res) => {
	//See all Historys
	History.find({})
		.then(histories => {
			res.status(200).send(histories);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});
router.get("/histories/:id", auth, async (req, res) => {
	//See all Histories of specific patient
	try {
		const patient = await Patient.findById(req.params.id);
		await patient
			.populate({
				path: "histories",
				populate: {
					path: "room"
				}
			})
			.execPopulate();
		res.status(200).send(patient.histories);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.patch("/history/:id", auth, async (req, res) => {
	//Modify History Details
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"dateIn",
		"dateOut",
		"bedId",
		"patient",
		"room"
	];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const history = await History.findById(req.params.id);
		updates.forEach(update => (history[update] = req.body[update]));
		await history.save();
		res.status(200).send(history);
	} catch (e) {
		res.status(400).send(e);
		console.log(e);
		/* handle error */
	}
});
//Show a given history
router.get("/history/:id", auth, async (req, res) => {
	const history = await History.findById(req.params.id).populate({
		path: "room"
	});
	console.log(history);
	res.status(200).json(history);
});
//See all Histories in a given Room
router.get("/histories/room/:id", auth, async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		await room.populate("histories").execPopulate();
		res.status(200).send(room.histories);
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
module.exports = router;
