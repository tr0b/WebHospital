const express = require("express");
const auth = require("../middleware/auth");

const Plant = require("../models/plant");
const router = new express.Router();
//Register A new Plant
router.post("/plant", auth, async (req, res) => {
	const plant = new Plant(req.body);
	try {
		await plant.save();
		res.status(200).send({ plant });
	} catch (e) {
		/* handle error */
		res.status(400).send(e);
	}
});
//Show a given plant
router.get("/plant/:id", auth, async (req, res) => {
	const plant = await Plant.findById(req.params.id);
	console.log(plant);
	res.status(200).json(plant);
});
//See all Plants
router.get("/plants", auth, (req, res) => {
	Plant.find({})
		.then(plants => {
			res.status(200).send(plants);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

//Modify Plant Details
router.patch("/plant/:id", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid Updates!" });
	}
	try {
		const plant = await Plant.findById(req.params.id);
		updates.forEach(update => (plant[update] = req.body[update]));
		await plant.save();
		res.status(200).send(plant);
	} catch (e) {
		res.status(400).send(e);
		/* handle error */
	}
});

module.exports = router;
