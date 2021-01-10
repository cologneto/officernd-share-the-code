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
};

exports.getListOfTagNames = (req, res) => {
    Tag.find({
        _id: { $in: req.body.tags }
    }).then(tags => {
        res.status(200).send(tags);
    })
};