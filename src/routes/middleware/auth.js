var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        jwt.verify(token, 'SECRET', (err, user) => {
            if (err) {
                return res.status(500).json({"msg":"Token is not valid"});
            }
            if (user != undefined) next();
        });
    } else {
        res.status(500).json({"msg":"No token , authorization denied"});
    }
};
