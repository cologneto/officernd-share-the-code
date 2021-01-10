const controller = require("../controllers/snippet.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
        );
        next();
    });

    app.post("/api/snippet/create", controller.createSnippet);
    app.get("/api/snippet/all", controller.getSnippets);
    app.delete("/api/snippet/:id", controller.deleteSnippet);
}
