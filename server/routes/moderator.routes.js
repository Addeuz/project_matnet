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
const Files = db.files;

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
      .getEngines({ include: [{ model: EngineValues }, { model: Files }] })
      .then(engines => {
        res.status(200).send({ engines, client });
      })
      .catch(err => {
        res
          .status(404)
          .send({ message: 'Inga motorer hittade för angiven kund' });
      });
  });
});

router.post(
  '/moderator/engine',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    const extraInputsDatabaseObject = {};
    if (req.body.engineMeasureData.extraInputs) {
      const { extraInputs } = req.body.engineMeasureData;

      extraInputs.forEach(extraInput => {
        const key = Object.keys(extraInput)[0].toLowerCase();
        extraInputsDatabaseObject[key] = { values: [] };
      });
    }
    Engine.create({
      engineInfo: { ...req.body.engineInfo },
      extraInputs: extraInputsDatabaseObject,
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

router.put(
  '/moderator/engine/:id',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    const extraInputsDatabaseKeys = [];
    if (req.body.engineMeasureData.extraInputs) {
      const { extraInputs } = req.body.engineMeasureData;

      extraInputs.forEach(extraInput => {
        const key = Object.keys(extraInput)[0].toLowerCase();

        extraInputsDatabaseKeys.push(key);
      });
    }
    Engine.findByPk(req.params.id)
      .then(engine => {
        const oldExtraInputs = engine.extraInputs;

        const newKeys = diffArray(
          Object.keys(oldExtraInputs),
          extraInputsDatabaseKeys
        );

        const tempObject = {};
        newKeys.forEach(key => {
          tempObject[key] = { values: [] };
        });

        engine
          .update({
            engineInfo: { ...req.body.engineInfo },
            extraInputs: { ...oldExtraInputs, ...tempObject },
          })
          .then(() => {
            EngineValues.findByPk(engine.engineValueId).then(values => {
              values
                .update({
                  engine_values: { ...req.body.engineMeasureData },
                })
                .then(() => {
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
        engine.getEngine_value().then(engineValue => {
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
  // TODO: still need type because we want to filter out attributes not concerned by that type
  // might not be needed since we have the edit check in the front end so might take away attribute specific stuff anyway
  Engine.findByPk(req.params.engineId)
    .then(engine => {
      console.log(engine);
      const engineData = [];
      for (let index = 0; index < engine._options.attributes.length; index++) {
        const attributes = engine._options.attributes[index];
        // TODO: check here if it is attributes we dont want, so that extra fields can get fetched
        if (req.params.type === 'lågspänd') {
          if (
            attributes === 'motormon' ||
            attributes === 'baker' ||
            attributes === 'meggningstator' ||
            attributes === 'meggningrotor' ||
            attributes === 'driftström' ||
            attributes === 'lindtemp' ||
            attributes === 'vibration' ||
            attributes === 'smörjning' ||
            attributes === 'okulärintern' ||
            attributes === 'okulärextern' ||
            attributes === 'manteltemp' ||
            attributes === 'släpringsyta' ||
            attributes === 'lagerkondde' ||
            attributes === 'lagerkondnde' ||
            attributes === 'spmde' ||
            attributes === 'spmnde' ||
            attributes === 'lagertempde' ||
            attributes === 'lagertempnde' ||
            attributes === 'lagerisolering' ||
            attributes === 'renhet' ||
            attributes === 'kylpaket' ||
            attributes === 'kolborstar' ||
            attributes === 'varvtalsgivare'
          ) {
            engineData.push({ [attributes]: engine[attributes].values });
          }
        } else if (req.params.type === 'högspänd') {
          if (
            attributes === 'motormon' ||
            attributes === 'baker' ||
            attributes === 'meggningstator' ||
            attributes === 'meggningrotor' ||
            attributes === 'driftström' ||
            attributes === 'lindtemp' ||
            attributes === 'vibration' ||
            attributes === 'smörjning' ||
            attributes === 'okulärintern' ||
            attributes === 'okulärextern' ||
            attributes === 'manteltemp' ||
            attributes === 'släpringsyta' ||
            attributes === 'lagerkondde' ||
            attributes === 'lagerkondnde' ||
            attributes === 'spmde' ||
            attributes === 'spmnde' ||
            attributes === 'lagertempde' ||
            attributes === 'lagertempnde' ||
            attributes === 'lagerisolering' ||
            attributes === 'renhet' ||
            attributes === 'kylpaket' ||
            attributes === 'kolborstar' ||
            attributes === 'varvtalsgivare' ||
            attributes === 'tan-delta' ||
            attributes === 'pol-index'
          ) {
            console.log('ayyylmao');
            engineData.push({ [attributes]: engine[attributes].values });
          }
        } else if (req.params.type === 'likström') {
          if (
            attributes === 'meggningstator' ||
            attributes === 'meggningrotor' ||
            attributes === 'driftström' ||
            attributes === 'lindtemp' ||
            attributes === 'vibration' ||
            attributes === 'smörjning' ||
            attributes === 'okulärintern' ||
            attributes === 'okulärextern' ||
            attributes === 'manteltemp' ||
            attributes === 'lagerkondde' ||
            attributes === 'lagerkondnde' ||
            attributes === 'spmde' ||
            attributes === 'spmnde' ||
            attributes === 'lagertempde' ||
            attributes === 'lagertempnde' ||
            attributes === 'lagerisolering' ||
            attributes === 'renhet' ||
            attributes === 'kylpaket' ||
            attributes === 'kolborstar' ||
            attributes === 'varvtalsgivare' ||
            attributes === 'kommutatoryta' ||
            attributes === 'kollektortemp'
          ) {
            engineData.push({ [attributes]: engine[attributes].values });
          }
        } else if (req.params.type === 'drivsystem') {
          if (attributes === 'driftservice' || attributes === 'stoppservice') {
            engineData.push({ [attributes]: engine[attributes].values });
          }
        }
      }
      // console.log('engineData', engineData);
      // console.log('extraInputs', engine.extraInputs);
      // console.log(
      //   'extraInputsLength',
      //   Object.keys(engine.extraInputs).length
      // );

      const engineExtraData = [];
      const extraInputKeys = Object.keys(engine.extraInputs);
      extraInputKeys.forEach(extraInputKey => {
        // console.log('extraInputKey', extraInputKey);
        // console.log(engine.extraInputs[extraInputKey].values);
        engineExtraData.push({
          [extraInputKey]: engine.extraInputs[extraInputKey].values,
        });
      });

      // console.log('engineExtraData', engineExtraData);
      EngineValues.findByPk(engine.engineValueId).then(engineValue => {
        res.status(200).send({
          engineData,
          engineExtraData,
          engineInfo: engine.engineInfo,
          engineValues: engineValue.engine_values,
        });
      });
    })
    .catch(error => {
      res.status(500).send({ message: error });
    });
});

router.get('/moderator/:engineId/:dataPoint/extra', function(req, res) {
  Engine.findByPk(req.params.engineId, {
    attributes: ['extraInputs', 'engineInfo'],
  })
    .then(engine => {
      res.status(200).send({
        engine: {
          [req.params.dataPoint]: engine.extraInputs[req.params.dataPoint],
          engineInfo: engine.engineInfo,
        },
      });
    })
    .catch(error => {
      res
        .status(400)
        .send({ message: 'There has been an error getting the extra fields' });
    });
});

router.post(
  '/moderator/:engineId/:dataPoint/extra',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    Engine.findByPk(req.params.engineId).then(engine => {
      const oldValues = engine.extraInputs[req.params.dataPoint].values;

      const tempExtraInput = {};
      const { extraInputs } = engine;

      Object.keys(extraInputs).forEach(extraInputKey => {
        if (extraInputKey === req.params.dataPoint) {
          tempExtraInput[extraInputKey] = {
            values: [...oldValues, req.body.data],
          };
        } else {
          tempExtraInput[extraInputKey] = extraInputs[extraInputKey];
        }
      });

      engine
        .update({
          extraInputs: {
            ...tempExtraInput,
          },
        })
        .then(() => {
          if (req.body.data.limit === 'red') {
            console.log('extra alarm');
            AlarmList.findAll({
              where: {
                engineId: engine.id,
                dataPoint: req.params.dataPoint,
              },
            }).then(alarm => {
              // there is already an alarm
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
                // there is no alarm for this datapoint at this point
                AlarmList.create({
                  engineId: engine.id,
                  dataPoint: req.params.dataPoint,
                  value: req.body.data,
                  extra: true,
                }).then(alarm => {
                  engine.getClient().then(client => {
                    alarm.setClient(client);
                  });
                });
              }
            });
          } else {
            // data was not in harm, check if there is data in alarm list, if there is delete it
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
        });
    });
  }
);

router.get('/moderator/:engineId/:dataPoint/:userId', function(req, res) {
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

router.post(
  '/moderator/:engineId/:userId/notes',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    const { engineId, userId } = req.params;
    const { note, date } = req.body;

    Engine.findByPk(engineId).then(engine => {
      engine
        .createNote({
          note,
          date,
        })
        .then(note => {
          note.setUser(userId).then(() => {
            res.status(200).send({ message: 'Not sparad!' });
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.response });
        });
    });
  }
);

router.get('/moderator/notes/:engineId', function(req, res) {
  const { engineId } = req.params;

  Engine.findByPk(engineId).then(engine => {
    engine
      .getNotes({
        include: [
          { model: User, attributes: ['firstname', 'lastname', 'username'] },
          { model: Engine, attributes: ['engineInfo'] },
        ],
      })
      .then(notes => {
        // res.status(200).send({ notes });

        // console
        // sort them so that the newest note comes on top
        const sortedNotes = notes.sort((a, b) =>
          // eslint-disable-next-line no-nested-ternary
          a.date > b.date ? -1 : a.date < b.date ? 1 : 0
        );
        // console.log(sortedNotes);
        res.status(200).send({ notes: sortedNotes });
      })
      .catch(err => {
        res.status(500).send({ message: err.response });
      });
  });
});

router.delete(
  '/moderator/notes/:noteId/:engineId',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    const { noteId, engineId } = req.params;

    console.log('noteid', noteId);
    console.log('engineId', engineId);
    Engine.findByPk(engineId)
      .then(engine => {
        engine
          .removeNote(noteId)
          .then(() => {
            res.status(200).send({ message: 'Not borttagen! Ladda om sidan.' });
          })
          .catch(err => {
            res.status(500).send({ message: err.response });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.response });
      });
  }
);

router.get('/moderator/:userId/notes', async function(req, res) {
  const { userId } = req.params;

  const user = await User.findByPk(userId);
  const clients = await user.getClients();

  const engines = [];
  for (const client of clients) {
    const clientEngines = await client.getEngines();

    engines.push(...clientEngines);
  }

  const notes = [];
  for (const engine of engines) {
    const engineNotes = await engine.getNotes({
      include: [
        { model: User, attributes: ['firstname', 'lastname', 'username'] },
        { model: Engine, attributes: ['engineInfo'] },
      ],
    });

    notes.push(...engineNotes);
  }

  // sort them so that the newest note comes on top
  // eslint-disable-next-line no-nested-ternary
  notes.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));
  res.status(200).send(notes);
});

router.post('/moderator/:engineId/:dataPoint', function(req, res) {
  Engine.findByPk(req.params.engineId).then(engine => {
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
            // there is already an alarm
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
                extra: false,
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

router.post(
  '/moderator/:engineId/:userId/file',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    const { name, baseUrl, mimeType, extension } = req.body;
    const { engineId, userId } = req.params;
    console.log(req.body);
    console.log('Length of url', baseUrl.length);
    console.log('length in bytes: ', Buffer.byteLength(baseUrl, 'utf8'));
    console.log(typeof baseUrl);
    Files.create({
      name,
      baseUrl,
      mimeType,
      extension,
    })
      .then(file => {
        file.setUser(userId).then(() => {
          file.setEngine(engineId).then(() => {
            res.status(200).send({
              message:
                'Dokumentet är uppladdat! Ladda om sidan för att se det.',
            });
          });
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({
          message: error.message,
        });
      });
  }
);

router.delete(
  '/moderator/:fileId/file',
  [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
  function(req, res) {
    const { fileId } = req.params;
    Files.findByPk(fileId).then(file => {
      file
        .destroy()
        .then(() => {
          res.status(200).send({
            message: 'Dokument borttaget! Ladda om sidan.',
          });
        })
        .catch(error => {
          res.status(500).send({
            message: error.message,
          });
        });
    });
  }
);

function diffArray(arr1, arr2) {
  // eslint-disable-next-line array-callback-return
  return arr1.concat(arr2).filter(function(val) {
    if (!(arr1.includes(val) && arr2.includes(val))) return val;
  });
}

module.exports = router;
