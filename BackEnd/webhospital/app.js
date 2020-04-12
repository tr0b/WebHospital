const dotenv = require("dotenv");
dotenv.config();
const app = require("./server/server");
const port = 3000;
//Establish MongoDB Connection

require("./db/database");

app.get("/", (req, res) => res.send("Web Hospital!"));
app.listen(port, () =>
	console.log(`InstHealth Service listening on port ${port}!`)
);
module.exports = app;
