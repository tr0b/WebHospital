const express = require("express");
const History = require("../models/history");
const router = new express.Router();
router.post("/history", async (req, res) => {
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
router.get("/histories", (req, res) => {
	//See all Historys
	History.find({})
		.then(histories => {
			res.status(200).send(histories);
		})
		.catch(e => {
			res.status(400).send(e);
		});
});

router.patch("/history/:id", async (req, res) => {
	//Modify History Details
	const updates = Object.keys(req.body);
	const allowedUpdates = ["dateIn", "dateOut", "bedInfo", "patient"];
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
		/* handle error */
	}
});

module.exports = router;
