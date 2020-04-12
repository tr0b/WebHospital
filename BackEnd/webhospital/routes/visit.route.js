const express = require("express");
const Visit = require("../models/visit");
const Patient = require("../models/patient");
const auth = require("../middleware/auth");
const router = new express.Router();
router.post("/visit", auth, async (req, res) => {
	//Register A new Visit
	const visit = new Visit(req.body);
	try {
		await visit.save();
		res.status(200).send({ visit });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
router.get("/visits", auth, (req, res) => {
	//See all Visits
	Visit.find({})
		.then(visits => {
			res.status(200).send(visits);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

//Show a given visit
router.get("/visit/:id", auth, async (req, res) => {
	const visit = await Visit.findById(req.params.id);
	console.log(visit);
	res.status(200).json(visit);
});
router.get("/visits/:id", auth, async (req, res) => {
	//See all Visits of specific patient
	try {
		const patient = await Patient.findById(req.params.id);
		await patient.populate("visits").execPopulate();
		res.status(200).send(patient.visits);
	} catch (e) {
		/* handle error */
	}
});

router.patch("/visit/:id", auth, async (req, res) => {
	//Modify Visit Details
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"date",
		"patient",
		"doctor",
		"description",
		"plant"
	];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const visit = await Visit.findById(req.params.id);
		updates.forEach(update => (visit[update] = req.body[update]));
		await visit.save();
		res.status(200).send(visit);
	} catch (e) {
		res.status(400).send(e);
		/* handle error */
	}
});

module.exports = router;
