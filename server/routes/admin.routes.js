const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../models');
const { authJwt } = require('../middleware');

const User = db.user;

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.get('/admin/users', [authJwt.verifyToken, authJwt.isAdmin], function(
  req,
  res
) {
  User.findAll().then(users => {
    if (!users) {
      return res.status(404).send({ message: 'Inga användare hittade' });
    }
    res.status(200).send(users);
  });
});

router.post(
  '/admin/users/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    User.findByPk(req.params.id).then(user => {
      if (!user) {
        res.status(404).send({ message: 'Ingen användare hittad' });
      }

      console.log(`retrieved record ${JSON.stringify(user, null, 2)}`);
      console.log(req.body);
      if (req.body.password) {
        console.log('update password');
        user
          .update({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
          })
          .then(updatedRecord => {
            console.log(
              `updated record ${JSON.stringify(updatedRecord, null, 2)}`
            );
          });
      } else {
        console.log('DO NOT update password');
        user
          .update({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
          })
          .then(updatedRecord => {
            console.log(
              `updated record ${JSON.stringify(updatedRecord, null, 2)}`
            );
          });
      }

      res.status(200).send({ message: 'Hello' });
    });
  }
);

module.exports = router;
