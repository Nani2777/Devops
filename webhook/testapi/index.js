const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
const log = require('../../logger');
//var morgan = require('morgan');
//var winston = require('../../config/winston');

//app.use(morgan('combined', { stream: winston.stream }));
/*router.post('/implwebhook', function (req, res) {
  log.info('chat post logs');
  log.info(req.body);
  //log.info(req.query);
  //log.info(req.params);
  //log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  log.info('error');
  log.info('working'); 
  //log.info(req.body);
  res.writeHead(200);
  res.end("OK");
});*/


router.get('/chatwebhook', function (req, res) {
  log.info('chat post logs');
  log.info(req.body);
  //log.info(req.query);
  //log.info(req.params);
  //log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //log.info('error');
  //log.info('working'); 
  //log.info(req.body);
  res.writeHead(200);
  res.end("OK");
});

router.post('/chatwebhook', function (req, res) {
  log.info('chat post logs');
  log.info(req.body);
  //log.info(req.query);
  //log.info(req.params);
  //log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //log.info('error');
  //log.info('working'); 
  //log.info(req.body);
  res.writeHead(200);
  res.end("OK");
});

  router.get('/implwebhook', function (req, res) {
    log.info('chat get logs');
    log.info('body',req.body);
    log.info('query',req.query);
    log.info('params',req.params);
    log.info('headers',req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    log.info('error');
    log.info('working'); 
    log.info(req.body);
    try {
      var webhookData = req.query;
      log.info('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        var complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          var z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        log.info(custom_params)
        //var comp_id = custom_params['cmpid']
        var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        var vid = custom_params['vid']
        log.info('Final----',comp_id,custom_params)
        var event = 'test_oracle'
        var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              log.info(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        log.info(url);
        axios.get(url).then(function(response) {
          log.info(response.statusText);
        })
        .catch(function(error) {
          log.info(error);
        });
      }
      //res.writeHead(200);
      res.end("OK");
    } catch(err){
      log.info('Oracle \n%s', err)
    }
  });

  router.get('/implwebhook/spam/', function (req, res) {
    log.info('chat get logs');
    log.info('body',req.body);
    log.info('query',req.query);
    log.info('params',req.params);
    log.info('headers',req.headers);
    log.info(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    log.info('error');
    log.info('working'); 
    log.info(req.body);
    try {
      var webhookData = req.query;
      log.info('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        var complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          var z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        log.info(custom_params)
        //var comp_id = custom_params['cmpid']
        var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        var vid = custom_params['vid']
        log.info('Final----',comp_id,custom_params)
        var event = 'test_oracle'
        var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              log.info(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        log.info(url);
        /*axios.get(url).then(function(response) {
          log.info(response.statusText);
        })
        .catch(function(error) {
          log.info(error);
        });*/
      }
      //res.writeHead(200);
      res.end("OK");
    } catch(err){
      log.info('Oracle \n%s', err)
    }
  });

router.get('/implwebhook/unsubscribe/', function (req, res) {
  log.info('chat get logs');
  log.info('body',req.body);
  log.info('query',req.query);
  log.info('params',req.params);
  log.info('headers',req.headers);
  log.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  log.info('error');
  log.info('working'); 
  log.info(req.body);
  try {
    var webhookData = req.query;
    log.info('Oracle Email -', webhookData);
    if(typeof(webhookData) == 'object'){
      var complete_data = webhookData.cmpdetails.split(',');
      let custom_params = complete_data.reduce((object, key) => {
        var z = key.split(':')
        object[z[0]] = z[1];
        return object;
      }, {});
      log.info(custom_params)
      //var comp_id = custom_params['cmpid']
      var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
      var vid = custom_params['vid']
      log.info('Final----',comp_id,custom_params)
      var event = 'test_oracle'
      var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
      Object.entries(custom_params).forEach(
        ([key,value]) => {
          if(key != 'cmpid' && key != 'vid'){
            log.info(key,value)
            url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
          }
        }
      )
      log.info(url);
      /*axios.get(url).then(function(response) {
        log.info(response.statusText);
      })
      .catch(function(error) {
        log.info(error);
      });*/
    }
    //res.writeHead(200);
    res.end("OK");
  } catch(err){
    log.info('Oracle \n%s', err)
  }
});

router.post('/wpsmscallback', async (req, res) => {
  let wtappsms = req.body;
  log.info(typeof wtappsms);
  //console.log('body<><><><><><><><><><><><>',req.body);
  try{
      if (typeof (wtappsms) == 'object') {
          log.info(wtappsms);
          let extra = wtappsms.recipient.reference.messageTag1;
          let event_type = wtappsms.events.eventType;
          //let event = '_wpsms_'+status
          //wtappsms.forEach(function (each) {
          if (event_type  == 'DELIVERY EVENTS'){//status == "Read" || status == "delivered" || status == "sent"){
              //console.log(extra)
              var params = extra.split(';').reduce((arr, each) => {
                arr[each.split(':')[0]] = each.split(':')[1]
                return arr
              },{})
              //console.log(params)
              let compid = params.comp_id ? params.comp_id : params.compid;
              if(compid == '6a7ba941-3460-4ff6-b36b-1e1d214415c5'){
                params['server'] = 'engageb.rsec.co.in';
                console.log(params)
              } else {
                params['server'] = compid == 'fcbe3928-6512-48a6-8cb5-c8c51e100539'? 'js3in1.gamooga.com': 'evbk.gamooga.com';
              }
              console.log(params)
              params = {...params,event_type,status:wtappsms.notificationAttributes.status,reason:wtappsms.notificationAttributes.reason,channel:wtappsms.channel,to_add:wtappsms.recipient.to,event:'_wpsms_'+wtappsms.notificationAttributes.status}
              //console.log(details.event,details.status);

              //details['event'] = details.status == 'read' ? '_sms_read' : '_sms_not';
              console.log('<><><><><><><><><><><><><><><>__________-----------???????',params)
              //log.info([details]); 
              eventpush(details);
          }
          //});
      }
  }catch (e){
      console.log("Error in incoming data from value first", e);
      res.writeHead(200);
      res.end("ERROR");
    }
  //res.writeHead(200);
  res.end("OK");
});

module.exports = router;