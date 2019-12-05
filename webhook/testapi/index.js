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

router.post('/wpsmscallback/', async (req, res) => {
  let wtappsms = req.body;
  log.info(typeof wtappsms);
  log.info('body<><><><><><><><><><><><>',req.body);
  try{
      if (typeof (wtappsms) == 'object') {
          log.info(wtappsms);
          wtappsms.forEach(function (each) {
          //if (each['eventType'] == "READ" || each['eventType'] == "DELIVERED" || each['eventType'] == "SENT"){
              let eve = each.eventType;
              let exe = each.extra.split(',');
              let evname = eve.toLowerCase();        
              //log.info(exeobj.visid);
              let details={};
              details['compid']= exe[0],
              details['vid']= exe[1],
              details['cp_id']= exe[2],
              details['tpid']= exe[3],
              details['channel'] = each.channel,
              details['cause'] = each.cause,
              details['destAddr'] = each.destAddr,
              details['errorCode'] = each.errorCode,
              details['event'] = 'whatsapp_'+evname,
              details['server'] = 'js1in1.gamooga.com'
              //log.info([details]);
              eventpush(details);
              //}
          });
      }
  }catch (e){
      log.info("Error in incoming data from value first", e);
      res.writeHead(200);
      res.end("ERROR");
    }
  res.writeHead(200);
  res.end("OK");
});

module.exports = router;