const express = require('express');
const next = require('next');

// dev becomes true when running 'npm run start'
const dev = process.env.NODE_ENV !== 'production';
// port for the server to run on
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // using a wildcard handler here so that next can do some heavy lifting, like serving a 404 page..
    server.get('*', (req, res) => {
      // console.log(`> Request: ${req}`);
      handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Server running on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(`> Server error: ${ex.stack}`);
    process.exit(1);
  });
