const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("Server is running on port " + port + "." );
});