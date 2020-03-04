const express = require("express");
const Medicine = require("../models/medicine");
const router = new express.Router();
router.post("/medicine", async (req, res) => {
	//Register A new Medicine
	const medicine = new Medicine(req.body);
	try {
		await medicine.save();
		res.status(200).send({ medicine });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
router.get("/medicines", (req, res) => {
	//See all Medicines
	Medicine.find({})
		.then(medicines => {
			res.status(200).send(medicines);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

router.patch("/medicine/:id", async (req, res) => {
	//Modify Medicine Details
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "description", "dose", "hoursPerDose"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const medicine = await Medicine.findById(req.params.id);
		updates.forEach(
			update => (medicine[update] = req.body[update])
		);
		await medicine.save();
		res.status(200).send(medicine);
	} catch (e) {
		res.status(400).send(e);
		/* handle error */
	}
});

module.exports = router;
