const router = require('express').Router();
const app = require('../server');
const { authJwt } = require('../middleware');

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.get('/', function(req, res) {
  return app.render(req, res, '/', req.query);
});

// only for testing
router.get('/about', function(req, res) {
  return app.render(req, res, '/about', req.query);
});

router.get('/login', function(req, res) {
  return app.render(req, res, '/login', req.query);
});

router.get('/admin', function(req, res) {
  return app.render(req, res, '/admin', req.query);
});

router.get('/admin/register', function(req, res) {
  return app.render(req, res, '/admin/register', req.query);
});

router.get('/admin/users', function(req, res) {
  return app.render(req, res, '/admin/users', req.query);
});

module.exports = router;
