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
    if(req.body.tags) {
        tags = getUniqueValuesWithCase(req.body.tags, false);
    }

    Tag.find({ name: { $in: tags } })
        .then((tgs) => {
            if(tgs)
            {
                let promises = [];
                tgs.forEach((tag) => {
                   promises.push(Tag.updateOne(
                        { _id: tag._id},
                        { $set:
                            {
                                "numberOfSnippets": tag.numberOfSnippets + 1
                            }
                        }));

                   const index = tags.indexOf(tag.name);
                   if (index > -1) {
                        tags.splice(index, 1);
                   }
                });

                Promise.all(promises).then(resii => console.log(resii));

            }
            else
            {

            }
            res.send({ message: "Tags Tags Tags!", tgs });
        })
        .catch((err) => {
            res.send({ message: err });
        });

    // snippet.save((err) => {
    //
    //
    //     if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //     }
    //
    //     res.send({ message: "User was registered successfully!", tags });
    // })
};