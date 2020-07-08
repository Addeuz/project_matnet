const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const { accessTokenSecret } = require('../config/env.config');

const User = db.user;
const Role = db.role;

const { Op } = db.Sequelize;

exports.signUp = (req, res) => {
  // save the user to the database
  User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then(roles => {
          console.log(`roles: ${JSON.stringify(roles, null, 2)}`);
          user.setRoles(roles).then(() => {
            res.status(201).send({ message: 'Användaren skapad!' });
          });
        });
      } else {
        // if no roles find set the role to 'user'
        user.setRoles([1]).then(() => {
          res.status(201).send({ message: 'Användaren skapad!' });
        });
      }
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
      console.log(user);
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
        console.log(user);
        res.status(200).send({
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// TODO: add a update controller here
