const jwt = require("jsonwebtoken");

const UserSchema = require("../models/user");

function isAuth(req, res, next) {
  const token = req.headers.authorization;
  if (typeof token === "undefined") {
    res.status(401).send({ status: "error", message: "Missing Authentication" });
  }
  else {
    jwt.verify(token, process.env.JWT_SECRET, async function(err, decoded) {
      if (err) res.status(401).send({
        status: "error",
        message: "Not Authenticated"
      });

      else {
        const { id } = decoded;
        try {
          const user = await UserSchema.findOne({ _id: id }).exec();
          req.user = user;
          next();
        } catch(err) {
          res.status({ status: "error", message: err.message });
        }
      }
    });
  }
}

function hasRole(role, req, res, next) {
  if (req.user.role === role) next();
  else res.status(403).send({ status: "error", message: "Not Authorized" });
}

module.exports = {
  isAuth,
  hasRole
};
