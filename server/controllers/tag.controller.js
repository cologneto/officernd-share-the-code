const db = require("../models");
const Tag = db.tag;

exports.createTag = (req, res) => {
    const tag = new Tag({
        name: req.body.name,
        numberOfSnippets: 0
    });


    tag.save((err) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "Tag was created successfully!" });
    })
}