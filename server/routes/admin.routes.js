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
            motormon: req.body.motormon,
            baker: req.body.baker,
            meggningstator: req.body.meggningstator,
            meggningrotor: req.body.meggningrotor,
            driftström: req.body['driftström'],
            lindtemp: req.body.lindtemp,
            vibration: req.body.vibration,
            smörjning: req.body['smörjning'],
            okulärintern: req.body['okulärintern'],
            okulärextern: req.body['okulärextern'],
            manteltemp: req.body.manteltemp,
            släpringsyta: req.body['släpringsyta'],
            lagerkondde: req.body.lagerkondde,
            lagerkondnde: req.body.lagerkondnde,
            spmde: req.body.spmde,
            spmnde: req.body.spmnde,
            lagertempde: req.body.lagertempde,
            lagertempnde: req.body.lagertempnde,
            lagerisolering: req.body.lagerisolering,
            renhet: req.body.renhet,
            kylpaket: req.body.kylpaket,
            kolborstar: req.body.kolborstar,
            varvtalsgivare: req.body.varvtalsgivare,
            'tan-delta': req.body['tan-delta'],
            'pol-index': req.body['pol-index'],
            kommutatoryta: req.body.kommutatoryta,
            kollektortemp: req.body.kollektortemp,
            driftservice: req.body.driftservice,
            stoppservice: req.body.stoppservice,
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
            motormon: req.body.motormon,
            baker: req.body.baker,
            meggningstator: req.body.meggningstator,
            meggningrotor: req.body.meggningrotor,
            driftström: req.body['driftström'],
            lindtemp: req.body.lindtemp,
            vibration: req.body.vibration,
            smörjning: req.body['smörjning'],
            okulärintern: req.body['okulärintern'],
            okulärextern: req.body['okulärextern'],
            manteltemp: req.body.manteltemp,
            släpringsyta: req.body['släpringsyta'],
            lagerkondde: req.body.lagerkondde,
            lagerkondnde: req.body.lagerkondnde,
            spmde: req.body.spmde,
            spmnde: req.body.spmnde,
            lagertempde: req.body.lagertempde,
            lagertempnde: req.body.lagertempnde,
            lagerisolering: req.body.lagerisolering,
            renhet: req.body.renhet,
            kylpaket: req.body.kylpaket,
            kolborstar: req.body.kolborstar,
            varvtalsgivare: req.body.varvtalsgivare,
            'tan-delta': req.body['tan-delta'],
            'pol-index': req.body['pol-index'],
            kommutatoryta: req.body.kommutatoryta,
            kollektortemp: req.body.kollektortemp,
            driftservice: req.body.driftservice,
            stoppservice: req.body.stoppservice,
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

router.delete(
  '/admin/user/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  function(req, res) {
    console.log(req.params.id);
    User.findByPk(req.params.id).then(user => {
      console.log(user);
      user.destroy().then(callback => {
        console.log(`deleted: ${callback}`);
        res.status(200).send({ message: 'Användare borttagen' });
      });
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
    console.log(roles);
    Client.findAll().then(clients => {
      if (!clients || clients.length === 0) {
        return res.status(404).send({ message: 'Inga kunder hittade' });
      }
      console.log(clients);
      res.status(200).send({ roles, clients });
    });
  });
});

router.get('/admin/clients', function(req, res) {
  Client.findAll().then(clients => {
    if (!clients || clients.length === 0) {
      return res.status(404).send({ message: 'Inga kunder hittade' });
    }
    res.status(200).send(clients);
  });
});

router.get('/admin/client/:id', function(req, res) {
  Client.findByPk(req.params.id).then(client => {
    if (!client) {
      return res.status(404).send({ message: 'Ingen kund hittad' });
    }

    return res.status(200).send(client);
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

router.delete(
  '/admin/client/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  (req, res) => {
    console.log(req.params.id);
    Client.findByPk(req.params.id).then(client => {
      console.log(client);
      client.getEngines().then(engines => {
        console.log(`engines:`);
        console.log(engines);
        engines.forEach(engine => {
          engine
            .getEngine_value()
            .then(engineValue => {
              engineValue
                .destroy()
                .then(() => {
                  engine
                    .destroy()
                    .then(res.status(200).send({ message: 'Motor borttagen' }))
                    .catch(err => {
                      res.status(500).send({ message: err.message });
                    });
                })
                .catch(err => {
                  res.status(500).send({ message: err.message });
                });
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
        });
        client
          .destroy()
          .then(() => {
            res.status(200).send({ message: 'Kund borttagen' });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      });
    });
  }
);

module.exports = router;
