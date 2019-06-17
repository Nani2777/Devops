const express = require('express');
const app = express();
const http = require('http');
const multer = require('multer');
const apiRoutes = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse multipart/form-data
// none is used as we don't want to allow file uploads for now
app.use(multer().none());

const httpPort = 15000;

console.log('Creating http server');
httpServer = http.createServer(app);
httpServer.listen(httpPort, () => {
  console.log('External service Provider successfully listening on port: ', httpPort);
});

app.use('/gamooga-esp', apiRoutes);

module.exports = app;
