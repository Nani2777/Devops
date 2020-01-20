const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../logger');


router.get('/crmupdate/', async (req, res) => {
  let smsdata = req;
  log.info('Google CRM Get data');
  //log.info(typeof smsdata,smsdata);
  log.info(req);
  log.info(req.body);
  console.log('body<><><><><><><><><><><><>',req.body);
  console.log(typeof smsdata,smsdata);
  res.writeHead(200);
  res.end("OK");
});

router.post('/crmupdate/', async (req, res) => {
  let smsdata = req;
  log.info('Google CRM Post data');
  log.info(req);
  log.info(req.body);
  console.log('body<><><><><><><><><><><><>',req.body);
  console.log(typeof smsdata,smsdata);
  res.writeHead(200);
  res.end("OK");
});


module.exports = router;