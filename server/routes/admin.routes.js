const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../models');
const { authJwt } = require('../middleware');

const User = db.user;
const Role = db.role;
const Client = db.client;

const { Op } = db.Sequelize;

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
    include: [
      {
        model: Role,
        through: {
          association: [],
        },
      },
      {
        model: Client,
        through: {
          association: [],
        },
      },
    ],
  }).then(users => {
    if (!users) {
      return res.status(404).send({ message: 'Inga användare hittade' });
    }
    Role.findAll().then(roles => {
      Client.findAll().then(clients => {
        res.status(200).send({ users, roles, clients });
      });
    });
  });
});

router.post(
  '/admin/users/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    User.findByPk(req.params.id).then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Ingen användare hittad' });
      }

      if (req.body.password) {
        user
          .update({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
          })
          .then(() => {
            Role.findOne({
              where: {
                name: req.body.role,
              },
            }).then(role => {
              user
                .setRoles(role)
                .catch(err => res.status(500).send({ message: err.message }));
            });
            Client.findAll({
              where: {
                clientName: {
                  [Op.or]: req.body.clients,
                },
              },
            }).then(clients => {
              user
                .setClients(clients)
                .then(() =>
                  res.status(200).send({ message: 'Användaren ändrad!' })
                )
                .catch(err => res.status(500).send({ message: err.message }));
            });
          });
      } else {
        user
          .update({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
          })
          .then(() => {
            Role.findOne({
              where: {
                name: req.body.role,
              },
            }).then(role => {
              user
                .setRoles(role)
                .catch(err => res.status(500).send({ message: err.message }));
            });
            Client.findAll({
              where: {
                clientName: {
                  [Op.or]: req.body.clients,
                },
              },
            }).then(clients => {
              user
                .setClients(clients)
                .then(() =>
                  res.status(200).send({ message: 'Användaren ändrad!' })
                )
                .catch(err => res.status(500).send({ message: err.message }));
            });
          });
      }
    });
  }
);

router.get('/admin/register', [authJwt.verifyToken, authJwt.isAdmin], function(
  req,
  res
) {
  Role.findAll().then(roles => {
    if (!roles) {
      return res.status(404).send({ message: 'Inga användare hittade' });
    }
    Client.findAll().then(clients => {
      if (!clients || clients.length === 0) {
        return res.status(404).send({ message: 'Inga kunder hittade' });
      }
      res.status(200).send({ roles, clients });
    });
  });
});

router.get('/admin/clients', [authJwt.verifyToken, authJwt.isAdmin], function(
  req,
  res
) {
  Client.findAll().then(clients => {
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
      .then(() => {
        res.status(201).send({ message: 'Kunden skapad!' });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
);

router.put(
  '/admin/client/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    Client.findByPk(req.params.id).then(client => {
      if (!client) {
        return res.status(404).send({ message: 'Ingen kund hittad' });
      }

      client
        .update({
          clientName: req.body.clientName,
          contactName: req.body.clientContactName,
          phoneNumber: req.body.clientContactNumber,
        })
        .then(() => res.status(200).send({ message: 'Kund ändrad' }))
        .catch(err => res.status(500).send({ message: err.message }));
    });
  }
);

module.exports = router;
