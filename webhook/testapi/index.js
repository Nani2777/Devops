const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');

app.post('/implwebhook', function (req, res) {
    console.log('chat logs');
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    console.log(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    System.err.println("Hello, logs!");
    System.out.println("Hello, logs!");
    //console.log("req", req);
    res.writeHead(200);
    res.end("OK");
  });

module.exports = router;