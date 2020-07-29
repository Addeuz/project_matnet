const router = require('express').Router();
const bcrypt = require('bcryptjs');

const db = require('../models');
const { authJwt } = require('../middleware');

const User = db.user;
const Role = db.role;
const Client = db.client;
const EngineValues = db.engine_values;
const Engine = db.engine;

const { Op } = db.Sequelize;

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.get('/moderator/engines/:id', function(req, res) {
  User.findByPk(req.params.id).then(user => {
    if (!user) {
      return res
        .status(404)
        .send({ message: `Ingen användare med det id-numret existerar` });
    }

    user.getClients().then(clients => {
      // console.log(clients);
      // console.log(clients.getEngines());
      // clients.map(client => {
      //   console.log(client.getUsers());
      // });

      clients.forEach(client => {
        client.getEngines().then(engines => {
          console.log(client.clientName);
          engines.forEach(engine => {
            console.log(engine.tag_nr);
          });
        });
      });

      res.status(200).send('hello');
    });
  });
});

router.post(
  '/moderator/engine',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    // EngineTypes.create({
    //   name: req.body.engineName,
    //   engine_values: req.body.engineValues,
    // })
    //   .then(() => {
    //     res.status(201).send({ message: 'Typen är skapad' });
    //   })
    //   .catch(err => {
    //     res.status(500).send({ message: err.message });
    //   });

    console.log(req.body);
    Engine.create({
      tag_nr: req.body.tagNr,
      art_nr: req.body.artNr,
      position: req.body.position,
      diverse: req.body.diverse,
      fabrikat: req.body.fabrikat,
      typ: req.body.typ,
      motor_nr: req.body.motorNr,
      varvtal: req.body.varvtal,
      frekvens: req.body.frekvens,
      effekt: req.body.effekt,
      spanning: req.body.spanning,
      strom: req.body.strom,
      sekundar_v: req.body.sekundarV,
      sekundar_a: req.body.sekundarA,
      lager_isolerad: req.body.lagerIsolerad,
      lager_de: req.body.lagerDE,
      lager_nde: req.body.lagerNDE,
      kolborstar: req.body.kolborstar,
      fri_text: req.body.friText,
    })
      .then(engine => {
        Client.findByPk(req.body.client.id).then(client => {
          // engine.setClient(client).catch(err => {
          //   res.status(500).send({ message: err.message });
          // });
          client.addEngine(engine).catch(err => {
            res.status(500).send({ message: err.message });
          });
        });

        engine
          .createEngine_value({
            type: req.body.engineType,
            engine_values: req.body.engineMeasureData,
          })
          .then(() => {
            console.log('WOGOOAODOASDOS');
            res.status(201).send({ message: 'Motor skapad!' });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({ message: err.message });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
);

module.exports = router;
