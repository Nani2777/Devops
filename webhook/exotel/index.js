const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');

router.post('/smscallback/', function (req, res) {
    try {
      let webhookData = req.body;
      if (typeof (webhookData) == 'object') {
        //console.log('step logs');
        //console.log(req.query);
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
          console.log(url)
          axios.get(url).then(function (response) {}).catch(function (error) {
            console.log(error);
          });
        } catch (err) {
          console.log('Error in Webhook from Gamooga Event API', err);
          res.writeHead(200);
          res.end("ERROR");
        }
        //console.log(req.body);
        //console.log(req.headers);
      }
    } catch (err) {
      console.log('Step Error in Webhook from exotel object \n%s', err);
      res.writeHead(200);
      res.end("ERROR");
    }
    res.writeHead(200);
  });

module.exports = router;