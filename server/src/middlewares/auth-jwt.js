const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
            if (role.name === "admin") {
                next();
                return;
            }

            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};

isEmployee = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRole().then(role => {
<<<<<<<< HEAD:server/src/middlewares/auth_jwt.js
            if (role.name === "employee") {
                next();
                return;
            }

            if (role.name === "admin") {
========
            if (role.name === "employee" || role.name === "admin") {
>>>>>>>> origin/auth_fix:server/src/middlewares/auth-jwt.js
                next();
                return;
            }

            res.status(403).send({
                message: "Require Employee or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
<<<<<<<< HEAD:server/src/middlewares/auth_jwt.js
    isEmployee: isEmployee,
========
    isEmployee: isEmployee
>>>>>>>> origin/auth_fix:server/src/middlewares/auth-jwt.js
};
module.exports = authJwt;