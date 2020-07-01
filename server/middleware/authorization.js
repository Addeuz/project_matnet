const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../config/env.config');
const db = require('../models');

const User = db.user;

verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({
      message: 'Ingen token försedd!',
    });
  }

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: 'Obehörig!',
      });
    }
    req.userId = decoded.id;
    // next() is called so that express knows that it can continue, either go to next middleware or execute handler
    next();
  });
};

isAdmin = (req, res, next) => {
  console.log(req.userId);
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Admin behörighet krävs!',
      });
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Moderator behörighet krävs!',
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }

        if (roles[i].name === 'moderator') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Moderator eller admin behörighet krävs!',
      });
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};

module.exports = authJwt;
