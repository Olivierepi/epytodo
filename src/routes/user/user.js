const express = require("express");
const auth = require('../../middleware/auth');

module.exports = function (app, pool) {
    app.get("/user", auth, (req, res) => {
        pool.query("SELECT * FROM user", function (err, result, fields) {
            res.send(result);
        });
    });
    app.get("/user/todos", auth, (req, res) => {
        pool.query("SELECT * FROM todo", function (err, result, fields) {
            res.send(result);
        });
    });

    app.get("/user/:id", auth, (req, res) => {
        pool.query("SELECT * FROM user WHERE id =" + Number(req.params.id), function (err, result, fields) {
            res.send(result);
        });
    });

    app.get("/user/:email", auth, (req, res) => {
        pool.query("SELECT * FROM user WHERE email =" + req.params.email.toString(), function (err, result, fields) {
            res.send(result);
        });
    });

    app.put("/user/:id", auth, (req, res) => {
        pool.query("UPDATE user SET email = $(req.) ", function (err, result, fields) {
            res.send(result);
        });
    });

    app.delete("/user/:id", auth, (req, res) => {
        pool.query('DELETE FROM user WHERE id = ?', [id], function (err, result, fields) {
            res.status(500).json({"msg":"Successfully deleted record number: ${id}"});
        });
    });
};


