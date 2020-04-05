const express = require("express");
const Doctor = require("../models/doctor");
const router = new express.Router();
router.post("/doctor", async (req, res) => {
	//Register A new Doctor
	const doctor = new Doctor(req.body);
	try {
		await doctor.save();
		res.status(200).send({ doctor });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
//Show a given doctor
router.get("/doctor/:id", async (req, res) => {
	const doctor = await Doctor.findById(req.params.id);
	res.status(200).send(doctor);
});
router.get("/doctors", (req, res) => {
	//See all Doctors
	Doctor.find({})
		.then(doctors => {
			res.status(200).send(doctors);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

router.patch("/doctor/:id", async (req, res) => {
	//Modify Doctor Details
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		"name",
		"last_name",
		"idCard",
		"isActive",
		"birthDate",
		"gender",
		"specialty",
		"address.canton",
		"phone",
		"email"
	];
	//Check Validation
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const doctor = await Doctor.findById(req.params.id);
		updates.forEach(update => (doctor[update] = req.body[update]));
		await doctor.save();
		res.status(200).send(doctor);
	} catch (e) {
		res.status(400).send(e);
		/* handle error */
	}
});

module.exports = router;
