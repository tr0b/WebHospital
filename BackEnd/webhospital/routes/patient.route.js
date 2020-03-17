const express = require("express");
const Patient = require("../models/patient");
const router = new express.Router();
router.post("/patient", async (req, res) => {
	//Register A new Patient
	const patient = new Patient(req.body);
	try {
		await patient.save();
		res.status(200).json({ patient });
	} catch (e) {
		/* handle error */
		res.status(400).json(e);
	}
});
router.get("/patients", (req, res) => {
	//See all Patients
	Patient.find({})
		.then(patients => {
			res.status(200).json(patients);
			console.log("Angular Reached the patients in Node");
		})
		.catch(e => {
			res.status(400).json(e);
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
		"address.canton",
		"phone",
		"email"
	];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);
	if (!isValidOperation) {
		return res.status(400).json({ error: "Invalid Updates!" });
	}
	try {
		const patient = await Patient.findById(req.params.id);
		updates.forEach(update => (patient[update] = req.body[update]));
		await patient.save();
		res.status(200).json(patient);
	} catch (e) {
		res.status(400).json(e);
		/* handle error */
	}
});
module.exports = router;
//WIP
/* [>List All Requests of a certain Buyer as a Boss<]
 * router.post("/buyer/request/list", ensureAuthenticated, async (req, res) => {
 *         const buyer = await User.findById(req.body.buyerID);
 *         console.log(req.body.buyerID);
 *         await buyer.populate("requests").execPopulate();
 *         console.log(buyer.requests);
 *         res.json(buyer.requests);
 * });
 * [> List All Requests as a Buyer <]
 * router.get("/request/list", ensureAuthenticated, async (req, res) => {
 *         const buyer = await User.findById(req.user._id);
 *         await buyer.populate("requests").execPopulate();
 *         console.log(buyer.requests);
 *         res.json(buyer.requests);
 * });
 * [> List All Buyers as a  Boss <]
 * router.get("/buyer/list", ensureAuthenticated, async (req, res) => {
 *         const boss = await User.findById(req.user._id);
 *         await boss.populate("buyers").execPopulate();
 *         console.log(boss.buyers);
 *         res.json(boss.buyers);
 * }); */
