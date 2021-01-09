const mongoose = require("mongoose");

const Snippet = mongoose.model(
    "Snippet",
    new mongoose.Schema({
        code: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Like"
            }
        ]
    }, {
        timestamps: true
    })
);

module.exports = Snippet;