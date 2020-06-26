const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../logger');


router.post('/wpsmscallback/', async (req, res) => {
    let wtappsms = req.body;
    log.info('wpsmscallback',JSON.stringify(req.body))
    //console.log('wpsmscallback',req.body);
  try{
      if (typeof (wtappsms) == 'object') {
          log.info(wtappsms);
          // console.log('object <><><>',wtappsms);
          let event_type = wtappsms.events.eventType;
          if (event_type  == 'DELIVERY EVENTS'){//status == "Read" || status == "delivered" || status == "sent"){
            let extra = wtappsms.recipient.reference.messageTag1;
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
          if(event_type == 'User initiated'){
            var params = {};
            if(wtappsms.eventContent.message.to == '918142260005'){
              params['compid'] = 'c9f594dd-9492-4d90-b948-dfd58315a0bb';
            }
            params['uid'] = wtappsms.eventContent.message.from.substr(2);
            if(params['compid'] == '6a7ba941-3460-4ff6-b36b-1e1d214415c5'){
              params['server'] = 'engageb.rsec.co.in';
            } else if(params['compid']=='fcbe3928-6512-48a6-8cb5-c8c51e100539'){
              params['server'] = 'js3in1.gamooga.com';
            }else{
              params['server'] = 'evbk.gamooga.com';
            }
            var details = Object.assign({},params,{event_type,channel:wtappsms.channel,app_type:wtappsms.appDetails.type,to_add:wtappsms.eventContent.message.to,from_add:wtappsms.eventContent.message.from,id:wtappsms.eventContent.message.id,content_type:wtappsms.eventContent.message.contentType,mess_timestamp:wtappsms.events.timestamp,mess_date:wtappsms.events.date,event:'test'/* _wp_user_initiated */,res_data:JSON.stringify(wtappsms)})
            
            function dataparse(attr) {
              return new Promise((resolve, reject) => {
                Object.entries(attr).forEach(
                  ([key,value]) => details[key.toLowerCase()] = value
                )
                resolve;
              })
            }
            if(wtappsms.eventContent.message.text || wtappsms.eventContent.message.location){
              var data = wtappsms.eventContent.message.text ? wtappsms.eventContent.message.text : wtappsms.eventContent.message.location;
              dataparse(data);
            }
            if(wtappsms.eventContent.message.document || wtappsms.eventContent.message.image){
              details['attachment_type'] = wtappsms.eventContent.message.attachmentType
              var data = wtappsms.eventContent.message.document ? wtappsms.eventContent.message.document : wtappsms.eventContent.message.image;
              dataparse(data);
            }
            /* switch (wtappsms.eventContent.message){
              case wtappsms.eventContent.message.text:
                dataparse(wtappsms.eventContent.message.text);
                break;
              case wtappsms.eventContent.message.document:
                details['attachment_type'] = wtappsms.eventContent.message.attachmentType
                dataparse(wtappsms.eventContent.message.document);
                break;
              case wtappsms.eventContent.message.image:
                details['attachment_type'] = wtappsms.eventContent.message.attachmentType
                dataparse(wtappsms.eventContent.message.image);
                break;
            } */
            /* if(wtappsms.eventContent.message.document){
              details['attachment_type'] = wtappsms.eventContent.message.attachmentType
              Object.entries(wtappsms.eventContent.message.document).forEach(
                ([key,value]) => details[key.toLowerCase()] = value
              );
            } */
            console.log(details,'<><><><>user initiated')
            log.info(details,'*******Userinitiated')
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