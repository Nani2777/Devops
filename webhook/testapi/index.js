const express = require('express');
const router = express.Router();
const axios = require('axios');
var morgan = require('morgan');
var winston = require('../../config/winston');

//app.use(morgan('combined', { stream: winston.stream }));
router.post('/implwebhook', function (req, res) {
    console.log('chat post logs');
    console.log(req.body);
    //console.log(req.query);
    //console.log(req.params);
    //console.log(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    winston.error('error');
    winston.info('working'); 
    console.log(req.body);
    res.writeHead(200);
    res.end("OK");
  });

  router.get('/implwebhook', function (req, res) {
    console.log('chat get logs');
    console.log('body',req.body);
    console.log('query',req.query);
    console.log('params',req.params);
    console.log('headers',req.headers);
    winston.info(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    winston.error('error');
    winston.info('working'); 
    console.log(req.body);
    res.writeHead(200);
    res.end("OK");
  });

module.exports = router;