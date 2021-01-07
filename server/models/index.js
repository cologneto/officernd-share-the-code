const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.snippet = require("./snippet.model");
db.tag = require("./tag.model");

db.ROLES = ["user", "admin"];

module.exports = db;