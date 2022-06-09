const express = require("express");
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
const cbycrypt = require('bcrypt');


module.exports = function (app, pool) {
    app.post("/register", (req, res) => {
        var mail = req.body.email;
        var name = req.body.name;
        var firstname = req.body.firstname;
        var password = req.body.password;

        if (mail === undefined || name === undefined  || firstname === undefined || password === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        //let hash_password = cbycrypt.hash(password, 10).toString();
        const token = jwt.sign({email:mail, password:password}, 'SECRET');
        pool.execute('SELECT * FROM user WHERE email = ?', [mail], (err, results) => {
            if (err) {
                console.log(err)
            }
            if (results.length > 0) {
                res.status(409).json({"msg":"account already exist"});
                return;
            }
        });
        cbycrypt.hash(password, 10).then(function(hash) {
            pool.execute('INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)', [mail, hash, name, firstname], function(err, results, fields) {
                console.log(err);
                res.status(200).json({token});
                return;
            });
        });
    })

    app.post("/login", (req, res) => {
        var mail = req.body.email;
        var password = req.body.password;
        if (mail === undefined || password === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        const token = jwt.sign({email:mail, password:password}, 'SECRET');

        pool.execute('SELECT * FROM user WHERE email = ?', [mail], (err, results) => {
            if (err) {
                console.log(err);
            }
            pool.execute('SELECT password FROM user WHERE email = ?', [mail], (err, results) => {
                if (err) {
                    console.log(err);
                }
                cbycrypt.compare(password, results[0].password, function (err, results) {
                    if (results) {
                        res.status(200).json({token});
                    } else {
                        res.status(500).json({"msg":"Invalid Credentials"});
                    }
                })
            })
        })
    })
}