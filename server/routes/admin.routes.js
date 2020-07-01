const router = require('express').Router();

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
    console.log(users);
    res.status(200).send(users);
  });
});

module.exports = router;
