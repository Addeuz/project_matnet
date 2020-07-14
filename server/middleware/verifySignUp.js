// middleware used when a registering a user.
const db = require('../models');

const { ROLES } = db;
const User = db.user;

// checks for duplicate in username or email
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'En användare med det givna användarnamnet existerar redan!',
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: 'En användare med den givna e-mailen existerar redan!',
        });
        return;
      }

      next();
    });
  });
};

// check if roles provided with the request body exists
checkRolesExisting = (req, res, next) => {
  // if (req.body.roles) {
  //   for (let i = 0; i < req.body.roles.length; i++) {
  //     if (!ROLES.includes(req.body.roles[i])) {
  //       res.status(400).send({
  //         message: `Misslyckade! Rolen existerar inte: ${req.body.roles[i]}.`,
  //       });
  //       return;
  //     }
  //   }
  // }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisting,
};

module.exports = verifySignUp;
