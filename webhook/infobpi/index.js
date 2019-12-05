const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
const log = require('../../logger');


router.post('/warplycallback/', function (req, res) {
  log.info('/warplycallback/');
  log.info('post logs');
  log.info(req.body);
  //log.info(req.query);
  //log.info(req.params);
  //log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //log.info(req.body);
  res.writeHead(200);
  res.end("OK");
});

router.get('/warplycallback/', function (req, res) {
  log.info('/warplycallback/');
    log.info('get logs');
    log.info(req.body);
    //log.info(req.query);
    //log.info(req.params);
    //log.info(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    //log.info(req.body);
    res.writeHead(200);
    res.end("OK");
  });

router.post('/wasmscallback/', function (req, res) {
  log.info('/wasmscallback/');
  log.info('post logs');
  log.info(req.body);
  //log.info(req.query);
  //log.info(req.params);
  //log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //log.info(req.body);
  res.writeHead(200);
  res.end("OK");
});

router.get('/wasmscallback/', function (req, res) {
  log.info('/wasmscallback/');
    log.info('get logs');
    log.info(req.body);
    //log.info(req.query);
    //log.info(req.params);
    //log.info(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    //log.info(req.body);
    res.writeHead(200);
    res.end("OK");
  });
module.exports = router;