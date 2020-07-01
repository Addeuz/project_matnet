const router = require('express').Router();

const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post(
  '/auth/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisting],
  function(req, res) {
    controller.signUp(req, res);
  }
);

router.post('/auth/signin', function(req, res) {
  controller.signIn(req, res);
});

module.exports = router;
