const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../models');
const { authJwt } = require('../middleware');

const User = db.user;
const Role = db.role;
const Client = db.client;

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
  User.findAll({
    include: {
      model: Role,
      through: {
        attributes: [],
      },
    },
  }).then(users => {
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

router.get('/admin/roles', [authJwt.verifyToken, authJwt.isAdmin], function(
  req,
  res
) {
  Role.findAll().then(roles => {
    if (!roles) {
      return res.status(404).send({ message: 'Inga användare hittade' });
    }
    res.status(200).send(roles);
  });
});

router.get('/admin/clients', [authJwt.verifyToken, authJwt.isAdmin], function(
  req,
  res
) {
  Client.findAll().then(clients => {
    console.log(clients);
    if (!clients || clients.length === 0) {
      return res.status(404).send({ message: 'Inga kunder hittade' });
    }
    res.status(200).send(clients);
  });
});

router.post(
  '/admin/register/client',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    Client.create({
      clientName: req.body.clientName,
      contactName: req.body.clientContactName,
      phoneNumber: req.body.clientContactNumber,
    })
      .then(client => {
        console.log(client);
        res.status(201).send({ message: 'Kunden skapad!' });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
);

module.exports = router;
