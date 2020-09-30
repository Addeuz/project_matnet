const router = require('express').Router();

const { Op } = require('sequelize');
const db = require('../models');
const { authJwt } = require('../middleware');

const User = db.user;
const Client = db.client;
const EngineValues = db.engine_values;
const Engine = db.engine;
const LimitValues = db.limit_values;
const AlarmList = db.alarm_list;

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.get('/moderator/clients/:userId', function(req, res) {
  User.findByPk(req.params.userId).then(user => {
    user.getClients().then(clients => {
      res.status(200).send(clients);
    });
  });
});

router.get('/moderator/engines/:clientId', function(req, res) {
  Client.findByPk(req.params.clientId).then(client => {
    if (!client) {
      return res
        .status(404)
        .send({ message: 'Ingen kund med det id-numret existerar' });
    }
    client
      .getEngines({ include: { model: EngineValues } })
      .then(engines => {
        res.status(200).send({ engines, client });
      })
      .catch(err => {
        res
          .status(404)
          .send({ message: 'Inga motorer hittade för angiven kund' });
      });
    // user.getClients().then(clients => {
    //   console.log(clients);
    //   clients.forEach((client, clientIndex) => {
    //     client
    //       .getEngines({ include: { model: EngineValues } })
    //       .then(engines => {
    //         console.log(engines);
    //         engines.forEach(engine => {
    //           engineArray.push(engine);
    //         });
    //         // check if all clients engines have been pushed, then respond with the enginges
    //         if (clientIndex + 1 === clients.length) {
    //           res.status(200).send(engineArray);
    //         }
    //       });
    //   });
    // });
  });
});

router.post(
  '/moderator/engine',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    Engine.create({
      engineInfo: { ...req.body.engineInfo },
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
            engine.createLimit_value();
            // engine.createLimit_value({
            //   ...req.body.limitValues,
            // });
          })
          .then(() => {
            res.status(201).send({ message: 'Motor skapad!' });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  }
);

// router.post();

router.put(
  '/moderator/engine/:id',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    Engine.findByPk(req.params.id)
      .then(engine => {
        console.log(engine);
        engine
          .update({
            engineInfo: { ...req.body.engineInfo },
          })
          .then(() => {
            EngineValues.findByPk(engine.engineValueId).then(values => {
              console.log(req.body.engineMeasureData);
              values
                .update({
                  engine_values: { ...req.body.engineMeasureData },
                })
                .then(() => {
                  // res.status(201).send({
                  //   message:
                  //     'Motor ändrad! Ladda om hemsidan för att se ändringarna.',
                  // });
                  engine
                    .setClient(req.body.client.id)
                    .then(() => {
                      res.status(201).send({
                        message:
                          'Motor ändrad! Ladda om hemsidan för att se ändringarna.',
                      });
                    })
                    .catch(err => {
                      res.status(500).send({
                        message: 'Kunden kunde inte ändras',
                        errorMessage: err.message,
                      });
                    });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).send({
                    message: 'Kan ej uppdatera mätpunkterna för motorn',
                    errorMessage: err.message,
                  });
                });
            });
          })
          .catch(err => {
            res.status(500).send({
              message: 'Motorn kunde inte uppdatera sig',
              errorMessage: err.message,
            });
          });
      })
      .catch(err => {
        res.status(500).send({
          message: 'Kunde inte hitta en motor med ett tillhörande id',
          errorMessage: err.message,
        });
      });
  }
);

router.delete(
  '/moderator/engine/:id',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    Engine.findByPk(req.params.id)
      .then(engine => {
        console.log(engine);
        engine.getEngine_value().then(engineValue => {
          console.log(engineValue);
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
        });
      })
      .catch(err => {});
  }
);

router.get('/moderator/:engineId/:type/overview', function(req, res) {
  if (req.params.type === 'lågspänd') {
    Engine.findByPk(req.params.engineId, {
      attributes: [
        'motormon',
        'baker',
        'meggningstator',
        'meggningrotor',
        'driftström',
        'lindtemp',
        'vibration',
        'smörjning',
        'okulärintern',
        'okulärextern',
        'manteltemp',
        'släpringsyta',
        'lagerkondde',
        'lagerkondnde',
        'spmde',
        'spmnde',
        'lagertempde',
        'lagertempnde',
        'lagerisolering',
        'renhet',
        'kylpaket',
        'kolborstar',
        'varvtalsgivare',
      ],
    })
      .then(engine => {
        const engineData = [];
        for (
          let index = 0;
          index < engine._options.attributes.length;
          index++
        ) {
          const attributes = engine._options.attributes[index];
          // console.log(engine[attributes].values);
          engineData.push({ [attributes]: engine[attributes].values });
        }
        console.log(engineData);
        res.status(200).send(engineData);
      })
      .catch(error => {
        res.status(500).send({ message: error });
      });
  } else {
    res.status(200).send(req.params.type);
  }
});

router.get('/moderator/:engineId/:dataPoint/:userId', function(req, res) {
  console.log(req.params);
  Engine.findByPk(req.params.engineId, {
    attributes: [req.params.dataPoint, 'engineInfo'],
    include: { model: LimitValues, attributes: [req.params.dataPoint] },
  }).then(engine => {
    User.findByPk(req.params.userId, {
      attributes: [req.params.dataPoint],
    }).then(user => {
      const canEdit = user[req.params.dataPoint];
      res.status(200).send({ engine, canEdit });
    });
  });
});

router.post('/moderator/:engineId/:dataPoint', function(req, res) {
  Engine.findByPk(req.params.engineId).then(engine => {
    console.log(req.body.data);
    const oldValues = engine[req.params.dataPoint].values;
    engine
      .update({
        [req.params.dataPoint]: { values: [...oldValues, req.body.data] },
      })
      .then(() => {
        if (req.body.data.limit === 'red') {
          AlarmList.findAll({
            where: {
              engineId: engine.id,
              dataPoint: req.params.dataPoint,
            },
          }).then(alarm => {
            console.log(alarm.length);
            console.log(alarm);
            if (alarm.length !== 0) {
              AlarmList.update(
                {
                  value: req.body.data,
                },
                {
                  where: {
                    engineId: engine.id,
                    dataPoint: req.params.dataPoint,
                  },
                }
              );
            } else {
              AlarmList.create({
                engineId: engine.id,
                dataPoint: req.params.dataPoint,
                value: req.body.data,
              }).then(alarm => {
                engine.getClient().then(client => {
                  alarm.setClient(client);
                });
              });
            }
          });
        } else {
          AlarmList.findAll({
            where: {
              engineId: engine.id,
              dataPoint: req.params.dataPoint,
            },
          }).then(alarm => {
            if (alarm) {
              AlarmList.destroy({
                where: {
                  engineId: engine.id,
                  dataPoint: req.params.dataPoint,
                },
              });
            }
          });
        }
      })
      .then(() => {
        res.status(200).send({ message: 'Värde sparat, ladda om sidan!' });
      })
      .catch(err => {
        res.status(500).send({ message: 'Kunde ej lägga till värdet' });
      });
  });
});

router.get('/moderator/:userId/alarmList', function(req, res) {
  User.findByPk(req.params.userId).then(user => {
    user.getClients().then(clients => {
      console.log(clients);
      const clientIdArray = [];
      clients.forEach(client => {
        clientIdArray.push(client.id);
      });

      AlarmList.findAll({
        where: { clientId: { [Op.or]: clientIdArray } },
      }).then(alarms => {
        res.status(200).send(alarms);
      });
    });
  });
});

router.put(
  '/moderator/:engineId/editLimitValues',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    console.log(req.params);
    console.log(req.body);
    Engine.findByPk(req.params.engineId).then(engine => {
      engine.getLimit_value().then(limitValues => {
        limitValues
          .update({
            [req.body.dataPoint]: {
              limit: [req.body.lowLimitNumber, req.body.highLimitNumber],
              default: false,
            },
          })
          .then(() => {
            res
              .status(200)
              .send({ message: 'Gränsvärden uppdaterade, ladda om sidan' });
          })
          .catch(err => res.status(500).send({ message: err.message }));
      });
    });
  }
);

module.exports = router;
