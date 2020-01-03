const express = require('express');
const app = express();
const http = require('http');
const multer = require('multer');
const apiRoutes = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
var morgan = require('morgan');
const log = require('./logger');
//var winston = require('./config/winston');

//app.use(morgan('combined', { stream: winston.stream }));
app.use(morgan('combined'));
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

const httpPort = process.env.PORT||15000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


console.log('Creating http server');
log.info('Creating http server');
httpServer = http.createServer(app);
httpServer.listen(httpPort, () => {
  console.log('External service Provider successfully listening on port: ', httpPort);
  log.info('External service Provider successfully listening on port: ', httpPort);
});

app.use('/gamooga-esp', apiRoutes);

app.use("/logfiles", express.static(__dirname + "/logfiles"));

app.get('/ping',function(req, res){
  res.status(200).send('Pong!')
})

module.exports = app;
