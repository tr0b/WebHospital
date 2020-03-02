const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = require("./server/server");
const port = 3000;
const User = require("./models/user");
//Establish MongoDB Connection

require("./db/database");

app.get("/", (req, res) => res.send("Web Hospital!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
