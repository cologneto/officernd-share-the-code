const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.getUserById = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            res.status(200).send(user)
        })
};