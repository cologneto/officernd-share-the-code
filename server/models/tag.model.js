const mongoose = require("mongoose");

const Tag = mongoose.model(
    "Tag",
    new mongoose.Schema({
        name: String,
        numberOfLikes: Number
    })
);

module.exports = Tag;