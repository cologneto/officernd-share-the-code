const mongoose = require("mongoose");

const Snippet = mongoose.model(
    "Snippet",
    new mongoose.Schema({
        code: String,
        numberOfLikes: Number,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ]
    })
);

module.exports = Snippet;