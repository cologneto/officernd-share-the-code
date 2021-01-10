const mongoose = require("mongoose");

const Tag = mongoose.model(
    "Like",
    new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        snippetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Snippet"
        }
    })
);

module.exports = Tag;