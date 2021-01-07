const db = require("../models");
const Tag = db.tag;

findTag = (tagName) => Tag.findOne({ name: tagName });

checkForDuplicateTag = (req, res, next) => {
    findTag(req.body.name).exec((err, tag) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        if (tag) {
            res.status(400).send({tagId: tag._id});
            return;
        }
        next();
    })
};

const verifyTag = {
    checkForDuplicateTag: checkForDuplicateTag,
    findTag: findTag
};

module.exports = verifyTag;