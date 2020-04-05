const express = require("express");
const Visit = require("../models/visit");
const Patient = require("../models/patient");
const router = new express.Router();
router.post("/visit", async (req, res) => {
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
router.get("/visits", (req, res) => {
	//See all Visits
	Visit.find({})
		.then(visits => {
			res.status(200).send(visits);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});
router.get("/visits/:id", async (req, res) => {
	//See all Visits of specific patient
	try {
		const patient = await Patient.findById(req.params.id);
		await patient.populate("visits").execPopulate();
		res.status(200).send(patient.visits);
	} catch (e) {
		/* handle error */
	}
	Visit.find({})
		.then(visits => {
			res.status(200).send(visits);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

router.patch("/visit/:id", async (req, res) => {
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
