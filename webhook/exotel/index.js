const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');
const log = require('../../logger');

router.post('/smscallback/', function (req, res) {
    try {
      let webhookData = req.body;
      if (typeof (webhookData) == 'object') {
        //log.info('step logs');
        //log.info(req.query);
        var qury = req.query;
        var event = '_sms_' + (webhookData['Status'] == 'sent' ? 'delivered' : 'failed')
        var custom_params = Object.keys(qury).reduce((object, key) => {
          if (key != "comp_id" && key != "vid") {
            object[key] = qury[key]
          }
          return object
        }, {});
        custom_params['status'] = webhookData.Status;
        custom_params['mobile'] = webhookData.To;
        try {
          var url = "http://evbk.gamooga.com/ev/?c=" + qury.comp_id + "&v=" + qury.vid + "&e=" + event
          Object.entries(custom_params).forEach(
            ([key, value]) => url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
          );
          log.info(url)
          axios.get(url).then(function (response) {}).catch(function (error) {
            log.info(error);
          });
        } catch (err) {
          log.info('Error in Webhook from Gamooga Event API', err);
          res.writeHead(200);
          res.end("ERROR");
        }
        //log.info(req.body);
        //log.info(req.headers);
      }
    } catch (err) {
      log.info('Step Error in Webhook from exotel object \n%s', err);
      res.writeHead(200);
      res.end("ERROR");
    }
    res.writeHead(200);
  });

module.exports = router;