const mongoose = require("mongoose");

const Snippet = mongoose.model(
    "Snippet",
    new mongoose.Schema({
        code: String,
        numberOfLikes: Number,
        username: String,
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ]
    })
);

module.exports = Snippet;