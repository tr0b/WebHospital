const express = require("express");
const Patient = require("../models/patient");
const router = new express.Router();
router.post("/patient", async (req, res) => {
	//Register A new Patient
	const patient = new Patient(req.body);
	try {
		await patient.save();
		res.status(200).send({ patient });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
router.get("/see", (req, res) => {
	//See all Patients
	Patient.find({})
		.then(patients => {
			res.status(200).send(patients);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

router.patch("/patient/:id", async (req, res) => {
	//Modify Patient Details
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"name",
		"last_name",
		"idCard",
		"isActive",
		"bloodType",
		"birthDate",
		"gender",
		"address.canton"
	];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.send.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const patient = await Patient.findById(req.params.id);
		updates.forEach(update => (patient[update] = req.body[update]));
		await patient.save();
	} catch (e) {
		res.status(400).send(e);
		/* handle error */
	}
});
