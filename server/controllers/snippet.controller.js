const db = require("../models");
const Snippet = db.snippet;
const Tag = db.tag;

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
        username: req.body.username,
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
    const skip = parseInt(req.query.limit) || 0;


    Snippet.find().sort('createdAt').skip(skip).limit(limit)
        .then(snippets => res.status(200).send({ snippets }));
};

