const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../logger');


router.post('/wpsmscallback/', async (req, res) => {
    let wtappsms = req.body;
  log.info(typeof wtappsms);
  console.log('body<><><><><><><><><><><><>',req.body);
  try{
      if (typeof (wtappsms) == 'object') {
          log.info(wtappsms);
          let extra = wtappsms.recipient.reference.messageTag1;
          let event_type = wtappsms.events.eventType;
          if (event_type  == 'DELIVERY EVENTS'){//status == "Read" || status == "delivered" || status == "sent"){
              console.log(extra)
              var params = extra.split(';').reduce((arr, each) => {
                arr[each.split(':')[0]] = each.split(':')[1]
                return arr
              },{})
              console.log(params)
              if(params['compid'] == '6a7ba941-3460-4ff6-b36b-1e1d214415c5'){
                params['server'] = 'engageb.rsec.co.in';
              } else if(params['compid']=='fcbe3928-6512-48a6-8cb5-c8c51e100539'){
                params['server'] = 'js3in1.gamooga.com';
              }else{
                params['server'] = 'evbk.gamooga.com';
              }
              var details = Object.assign({},params,{event_type,status:wtappsms.notificationAttributes.status,reason:wtappsms.notificationAttributes.reason,channel:wtappsms.channel,to_add:wtappsms.recipient.to,event:'_wpsms_'+wtappsms.notificationAttributes.status})
                
                //{...params,event_type,status:wtappsms.notificationAttributes.status,reason:wtappsms.notificationAttributes.reason,channel:wtappsms.channel,to_add:wtappsms.recipient.to,event:'_wpsms_'+wtappsms.notificationAttributes.status}
              console.log(details);
              log.info(details);
              eventpush(details);
          }
      }
    }catch (e){
        log.info("Error in incoming data from value first", e);
        res.writeHead(200);
        res.end("ERROR");
    }
    res.writeHead(200);
    res.end("OK");
  });

router.get('/smscallback/', async (req, res) => {
  let smsdata = req;
  log.info('Karix SMS Get data');
  log.info(typeof smsdata,smsdata);
  console.log('body<><><><><><><><><><><><>',req.body);
  res.writeHead(200);
  res.end("OK");
});

router.post('/smscallback/', async (req, res) => {
  let smsdata = req;
  log.info('Karix SMS Post data');
  log.info(typeof smsdata,smsdata);
  console.log('body<><><><><><><><><><><><>',req.body);
  res.writeHead(200);
  res.end("OK");
});

router.get('/emailcallback/', async (req, res) => {
  let emaildata = req;
  log.info('Karix Email Get data');
  log.info(typeof emaildata,emaildata);
  console.log('body<><><><><><><><><><><><>',req.body);
  res.writeHead(200);
  res.end("OK");
});

router.post('/emailcallback/', async (req, res) => {
  let emaildata = req;
  log.info('Karix Email Post data');
  log.info(typeof emaildata,emaildata);
  console.log('body<><><><><><><><><><><><>',req.body);
  res.writeHead(200);
  res.end("OK");
});

module.exports = router;