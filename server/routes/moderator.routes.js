const router = require('express').Router();

const db = require('../models');
const { authJwt } = require('../middleware');

const User = db.user;
const Client = db.client;
const EngineValues = db.engine_values;
const Engine = db.engine;

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.get('/moderator/engines/:id', function(req, res) {
  const engineArray = [];

  User.findByPk(req.params.id).then(user => {
    if (!user) {
      return res
        .status(404)
        .send({ message: `Ingen användare med det id-numret existerar` });
    }
    user.getClients().then(clients => {
      console.log(clients);
      clients.forEach((client, clientIndex) => {
        client
          .getEngines({ include: { model: EngineValues } })
          .then(engines => {
            engines.forEach(engine => {
              engineArray.push(engine);
            });
            // check if all clients engines have been pushed, then respond with the enginges
            if (clientIndex + 1 === clients.length) {
              res.status(200).send(engineArray);
            }
          });
      });
    });
  });
});

router.post(
  '/moderator/engine',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
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
