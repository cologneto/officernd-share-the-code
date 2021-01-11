const db = require("../models");
const Like = db.like;

exports.createLike = (req, res) => {
    const like = new Like({
        userId: req.body.userId,
        snippetId: req.body.snippetId
    });

    like.save((err, like) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "Tag was created successfully!", like});
    })
};

exports.getLikesPerSnippet = (req,res) => {
    Like.find({ snippetId: req.params.snippetId})
        .then((result) => {
            res.status(200).send({ result })
        })
        .catch(e => console.log(e))
};

