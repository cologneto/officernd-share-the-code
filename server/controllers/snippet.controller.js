const db = require("../models");
const Snippet = db.snippet;

exports.createSnippet = (req, res) => {
    const snippet = new Snippet({
        username: req.body.username,
        code: req.body.code,
        tags: req.body.tags,
        numberOfLikes: 0
    });


    snippet.save((err) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "User was registered successfully!" });
    })
}