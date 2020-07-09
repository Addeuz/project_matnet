const router = require('express').Router();

const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

// router.get('/test/all', function(req, res) {
//   controller.allAccess(req, res);
// });

router.get('/user', [authJwt.verifyToken], function(req, res) {
  controller.userBoard(req, res);
});

// router.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], function(
//   req,
//   res
// ) {
//   controller.moderatorBoard(req, res);
// });

router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], function(
  req,
  res
) {
  controller.adminBoard(req, res);
});

module.exports = router;
