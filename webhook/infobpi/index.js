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
  console.log('Pepipost Email -', req.body);
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


  router.post('/esppostback/', async (req, res) => {
    try {
        var webhookData = req.body;
        console.log(typeof webhookData);
        if (typeof (webhookData) == 'object') {
            webhookData.forEach(function (each) {
                    try {
                        var cmp_data = each['X-APIHEADER'];
                        var evname = each.EVENT.toLowerCase();
                        var eventname;
                        if(evname == 'sent'){
                         eventname='delivered';
                        }else{
                         eventname = evname;
                        }
                        let exe = cmp_data.split(':');
                        let details = {};
                           details['compid']= exe[0];
                           details['vid']= exe[1];
                           details['cp_type']= exe[2];
                           details['cp_id']= exe[3];
                           details['tp']= exe[4];
                           details['tpid']= exe[5];
                           details['email'] = each.EMAIL,
                           details['event'] = eventname,
                           details['server'] = 'evbk.gamooga.com'
                           eventpush(details);
                           console.log(details, '------Sent to eventpush');
                    } catch (err) {
                        console.log(comp_id,'Pepipost - Error in entries for the Pepipost req data', req.body);
                        //Log.L(Log.E, comp_id,'Pepipost - Error in entries for the Pepipost req data', req.body);
                        res.writeHead(200);
                        res.end("ERROR");
                    }
            })
        }
        res.writeHead(200);
        res.end("OK");
    } catch (err) {
        console.log('Pepipost - Error in Webhook from Pepipost \n%s', err);
        //Log.L(Log.E, 'Pepipost - Error in Webhook from Pepipost \n%s', err);
        res.writeHead(200);
        res.end("ERROR");
    }
    //res.writeHead(200);
      //  res.end("OK");
});

module.exports = router;