const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = 3000;
//Establish MongoDB Connection

require("./db/database");

app.get("/", (req, res) => res.send("Web Hospital!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
