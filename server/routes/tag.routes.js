const controller = require("../controllers/tag.controller");
const { verifyTag } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/tag/create", [verifyTag.checkForDuplicateTag], controller.createTag);
};