const db = require("../models");
const Snippet = db.snippet;
const Tag = db.tag;
const Like = db.like;

function getUniqueValuesWithCase(arr, caseSensitive){
    let temp = [];
    return [...new Set(caseSensitive ? arr : arr.filter(x => {
        let _x = typeof x === 'string' ? x.toLowerCase() : x;
        if(temp.indexOf(_x) === -1){
            temp.push(_x)
            return x;
        }
    }))];
}

exports.createSnippet = (req, res) => {
    const snippet = new Snippet({
        userId: req.body.userId,
        code: req.body.code,
        tags: req.body.tags,
        numberOfLikes: 0
    });

    let tags = [];
    let tagIds = [];
    if(req.body.tags) {
        tags = getUniqueValuesWithCase(req.body.tags, false);
    }

    Tag.find({ name: { $in: tags } })
        .then((tgs) => {
                let promises = [];
                tgs.forEach((tag) => {
                    tagIds.push(tag._id);
                    promises.push(Tag.updateOne(
                        { _id: tag._id},
                        { $set:
                            {
                                "numberOfSnippets": tag.numberOfSnippets + 1
                            }
                        }
                    ));

                   const index = tags.indexOf(tag.name);
                   if (index > -1) {
                        tags.splice(index, 1);
                   }
                });

                Promise.all(promises).then(() => {
                    if(tags.length > 0) {
                        tags = tags.map(t => {
                            return {
                                name: t,
                                numberOfSnippets: 1
                            }
                        });
                        Tag.insertMany(tags)
                            .then((tt) => {
                                tt.forEach((item) => tagIds.push(item._id));
                                snippet.tags = tagIds;
                                snippet.save((err) => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }

                                    res.send({ message: "Snippet was created successfully!", tags });
                                })
                            })
                    } else {
                        snippet.tags = tagIds;
                        snippet.save((err) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            res.send({ message: "Snippet was created successfully!", tags });
                        })
                    }

                });
        })
        .catch((err) => {
            res.send({ message: err });
        });
};

exports.getSnippets = (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const skip  = parseInt(req.query.skip) || 0;
    let query = {};

    if(req.query.userId) {
        query = { userId: req.query.userId }
    }

    Snippet.find(query).sort('createdAt').skip(skip).limit(limit)
        .then(snippets => res.status(200).send({ snippets }));
};

exports.deleteSnippet = (req, res) => {
    Snippet.find({ _id: req.params.id })
        .then((snippet) => {
            return Tag.find({
                _id: { $in: snippet[0].tags }
            })
        })
        .then((tags) => {
            let promises = [];
            tags.forEach((tag) => {
                promises.push(Tag.updateOne(
                    { _id: tag._id},
                    { $set:
                        {
                            "numberOfSnippets": tag.numberOfSnippets - 1
                        }
                    }
                ));
            });
            return Promise.all(promises)
        })
        .then(() => {
            return Snippet.deleteOne({ _id: req.params.id })
        })
        .then((result) => {
            res.status(200).send({result})
        })
        .catch(e => console.log(e))
};

exports.updateSnippet = (req, res) => {
    const snippetId = req.body.snippetId;
    const likeId = req.body._id;

    Snippet.update(
            { _id: snippetId},
            { $push:
                    {
                        "likes": likeId
                    }
            }
        )
        .then(result => res.status(200).send(result))
        .catch(e => console.log(e))
}
