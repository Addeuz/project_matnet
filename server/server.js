const express = require('express');
const next = require('next');
const cors = require('cors');
const bodyParser = require('body-parser');

// dev becomes true when running 'npm run start'
const dev = process.env.NODE_ENV !== 'production';
// port for the server to run on
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const db = require('./models/index');

const Role = db.role;

const corsOptions = {
  origin: 'http://localhost:8081',
};

app
  .prepare()
  .then(() => {
    const server = express();

    // server settings
    server.use(cors(corsOptions));
    // tells the server that we parse content-type: application/json
    server.use(bodyParser.json());
    // tells the server that we parse content-type: application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: true }));

    // Use this in production.
    db.sequelize.sync();
    // force: true will drop the table if it already exists, can be used in development but not really smart
    // db.sequelize.sync({ force: true }).then(() => {
    //   console.log('Drop and resync database because { force: true }');
    //   // eslint-disable-next-line no-use-before-define
    //   initial();
    // });

    server.use('/api', authRoutes);
    server.use('/api', userRoutes);
    server.use('/api', adminRoutes);
    server.use('/', applicationRoutes);

    // using a wildcard handler here so that next can do some heavy lifting, like serving a 404 page..
    server.get('*', (req, res) => {
      // console.log(`> Request: ${req}`);
      handle(req, res);
    });

    // Start the server and listen for requests on the `port` variable
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Server running on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(`> Server error: ${ex.stack}`);
    process.exit(1);
  });

module.exports = app;

const {
  authRoutes,
  userRoutes,
  applicationRoutes,
  adminRoutes,
} = require('./routes/index');

// Only used in development to create roles
// function initial() {
//   Role.create({
//     name: 'kund',
//   });

//   Role.create({
//     name: 'moderator',
//   });

//   Role.create({
//     name: 'admin',
//   });
// }
