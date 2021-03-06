const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const { accessTokenSecret } = require('../config/env.config');

const User = db.user;
const Role = db.role;
const Client = db.client;

const { Op } = db.Sequelize;

exports.signUp = (req, res) => {
  // save the user to the database
  console.log(req.body);
  User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
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
    .then(user => {
      // checking for roles and then setting the roles that corresponds in the database
      if (req.body.roles) {
        Role.findOne({
          where: {
            name: req.body.roles,
          },
        }).then(role => {
          user.setRoles(role).catch(err => {
            res.status(500).send({ message: err.message });
          });
        });
      } else {
        // if no roles find set the role to 'kund'
        user.setRoles('kund').catch(err => {
          res.status(500).send({ message: err.message });
        });
      }
      // checking for clients and then making the association between users and clients in the database
      Client.findAll({
        where: {
          clientName: {
            [Op.or]: req.body.clients,
          },
        },
      })
        .then(clients => {
          console.log(clients);
          user.setClients(clients).then(() => {
            res.status(201).send({ message: 'Användaren skapad!' });
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Ingen användare hittad.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Felaktigt lösenord.',
        });
      }

      const token = jwt.sign({ id: user.id }, accessTokenSecret, {
        expiresIn: 86400, // 24 hours
      });

      const authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(`ROLE_${roles[i].name.toUpperCase()}`);
        }
        user.getClients().then(clients => {
          res.status(200).send({
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            roles: authorities,
            clients,
            accessToken: token,
          });
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// TODO: add a update controller here
