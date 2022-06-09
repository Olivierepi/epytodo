const express = require("express");
const auth = require('../../middleware/auth');
const verif_id = require('../../middleware/notFound');

module.exports = function (app, pool) {
    app.get("/todos", auth, (req, res) => {
        pool.query("SELECT * FROM todo", function (err, result, fields) {
            res.send(result);
        });
    })

    app.get("/todos/:id", auth ,verif_id, (req, res) => {
        pool.query("SELECT * FROM todo WHERE id = ?", [req.params.id], function (err, result, fields) {
            res.send(result);
        });
    })

    app.post("/todos", auth, (req, res) => {
        var title = req.body.title;
        var description = req.body.description;
        var due_time = req.body.due_time;
        var user_id = req.body.user_id;
        var status = req.body.status;

        if (title === undefined || description === undefined  || due_time === undefined || user_id === undefined || status === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        pool.execute('INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)', [title, description, due_time, status, user_id], function(err, results, fields) {
            res.status(200).json(results);
            return;
        });
    })

    app.put("/todos/:id", auth, (req, res) => {
        var title = req.body.title;
        var description = req.body.description;
        var due_time = req.body.due_time;
        var user_id = req.body.user_id;
        var status = req.body.status;

        if (title === undefined || description === undefined  || due_time === undefined || user_id === undefined || status === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        pool.query('UPDATE todo SET title = ?  WHERE id = ?', [title, req.params.id], function(err, results, fields) {});
        pool.query('UPDATE todo SET description = ?  WHERE id = ?', [description, req.params.id], function(err, results, fields) {});
        pool.query('UPDATE todo SET due_time = ?  WHERE id = ?', [due_time, req.params.id], function(err, results, fields) {});
        pool.query('UPDATE todo SET status = ?  WHERE id = ?', [status, req.params.id], function(err, results, fields) {});
        pool.query('UPDATE todo SET user_id = ?  WHERE id = ?', [user_id, req.params.id], function(err, results, fields) {});
    })
    app.delete("/todo/:id", (req, res) => {
        pool.query('DELETE FROM todo WHERE id = ?', [id], function (err, result, fields) {
            res.status(500).json({"msg":"Successfully deleted record number: ${id}"});
        });
    })
}
