const express = require('express');
const router = express.Router();
const axios = require('axios');
var morgan = require('morgan');
var winston = require('../../config/winston');

//app.use(morgan('combined', { stream: winston.stream }));
router.post('/implwebhook', function (req, res) {
    console.log('chat logs');
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

module.exports = router;