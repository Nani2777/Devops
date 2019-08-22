const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');


router.post('/warplycallback/', function (req, res) {
  console.log('post logs');
  console.log(req.body);
  //console.log(req.query);
  //console.log(req.params);
  //console.log(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //console.log(req.body);
  res.writeHead(200);
  res.end("OK");
});

router.get('/warplycallback/', function (req, res) {
    console.log('get logs');
    console.log(req.body);
    //console.log(req.query);
    //console.log(req.params);
    //console.log(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    //console.log(req.body);
    res.writeHead(200);
    res.end("OK");
  });

router.post('/wasmscallback/', function (req, res) {
  console.log('post logs');
  console.log(req.body);
  //console.log(req.query);
  //console.log(req.params);
  //console.log(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //console.log(req.body);
  res.writeHead(200);
  res.end("OK");
});

router.get('/wasmscallback/', function (req, res) {
    console.log('get logs');
    console.log(req.body);
    //console.log(req.query);
    //console.log(req.params);
    //console.log(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    //console.log(req.body);
    res.writeHead(200);
    res.end("OK");
  });

module.exports = router;