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
router.get("/visits", auth, async (req, res) => {
	//See all Visits
	Visit.find()
		.then(visits => {
			res.status(200).send(visits);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

//Show a given visit
router.get("/visit/:id", auth, async (req, res) => {
	try {
		const visit = await Visit.findById(req.params.id)
			.populate({
				path: "doctor"
			})
			.populate({ path: "patient" })
			.populate({ path: "plant" });
		res.status(200).json(visit);
	} catch (e) {
		/* handle error */
		res.status(500).json(e);
	}
});
router.get("/visits/:id", auth, async (req, res) => {
	//See all Visits of specific patient
	try {
		const patient = await Patient.findById(req.params.id);
		await patient
			.populate({
				path: "visits",
				populate: [
					{ path: "doctor" },
					{ path: "plant" },
					{ path: "patient" }
				]
			})
			.execPopulate();
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
