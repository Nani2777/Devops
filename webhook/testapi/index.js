const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush')
//var morgan = require('morgan');
//var winston = require('../../config/winston');

//app.use(morgan('combined', { stream: winston.stream }));
/*router.post('/implwebhook', function (req, res) {
  console.log('chat post logs');
  console.log(req.body);
  //console.log(req.query);
  //console.log(req.params);
  //console.log(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  winston.error('error');
  winston.info('working'); 
  //console.log(req.body);
  res.writeHead(200);
  res.end("OK");
});*/


//Planetsuper heros Mailgun
router.post('/saimmailgun', function (req, res) {
  console.log('mailgun post logs');
  console.log(req.body);
  //console.log(req.query);
  //console.log(req.params);
  //console.log(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //winston.error('error');
  //winston.info('working'); 
  //console.log(req.body);
  res.writeHead(200);
  res.end("OK");
});


router.get('/chatwebhook', function (req, res) {
  console.log('chat post logs');
  console.log(req.body);
  //console.log(req.query);
  //console.log(req.params);
  //console.log(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //winston.error('error');
  //winston.info('working'); 
  //console.log(req.body);
  res.writeHead(200);
  res.end("OK");
});

router.post('/chatwebhook', function (req, res) {
  console.log('chat post logs');
  console.log(req.body);
  //console.log(req.query);
  //console.log(req.params);
  //console.log(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  //winston.error('error');
  //winston.info('working'); 
  //console.log(req.body);
  res.writeHead(200);
  res.end("OK");
});

  router.get('/implwebhook', function (req, res) {
    console.log('chat get logs');
    console.log('body',req.body);
    console.log('query',req.query);
    console.log('params',req.params);
    console.log('headers',req.headers);
    winston.info(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    winston.error('error');
    winston.info('working'); 
    console.log(req.body);
    try {
      var webhookData = req.query;
      console.log('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        var complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          var z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        console.log(custom_params)
        //var comp_id = custom_params['cmpid']
        var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        var vid = custom_params['vid']
        console.log('Final----',comp_id,custom_params)
        var event = 'test_oracle'
        var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              console.log(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        console.log(url);
        axios.get(url).then(function(response) {
          console.log(response.statusText);
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      //res.writeHead(200);
      res.end("OK");
    } catch(err){
      console.log('Oracle \n%s', err)
    }
  });

  router.get('/implwebhook/spam/', function (req, res) {
    console.log('chat get logs');
    console.log('body',req.body);
    console.log('query',req.query);
    console.log('params',req.params);
    console.log('headers',req.headers);
    winston.info(req.headers);
    //Logger.info(req.body);
    //Logger.info(req.query);
    //Logger.info(req.params);
    //Logger.info(req.headers);
    winston.error('error');
    winston.info('working'); 
    console.log(req.body);
    try {
      var webhookData = req.query;
      console.log('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        var complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          var z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        console.log(custom_params)
        //var comp_id = custom_params['cmpid']
        var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        var vid = custom_params['vid']
        console.log('Final----',comp_id,custom_params)
        var event = 'test_oracle'
        var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              console.log(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )
        console.log(url);
        /*axios.get(url).then(function(response) {
          console.log(response.statusText);
        })
        .catch(function(error) {
          console.log(error);
        });*/
      }
      //res.writeHead(200);
      res.end("OK");
    } catch(err){
      console.log('Oracle \n%s', err)
    }
  });

router.get('/implwebhook/unsubscribe/', function (req, res) {
  console.log('chat get logs');
  console.log('body',req.body);
  console.log('query',req.query);
  console.log('params',req.params);
  console.log('headers',req.headers);
  winston.info(req.headers);
  //Logger.info(req.body);
  //Logger.info(req.query);
  //Logger.info(req.params);
  //Logger.info(req.headers);
  winston.error('error');
  winston.info('working'); 
  console.log(req.body);
  try {
    var webhookData = req.query;
    console.log('Oracle Email -', webhookData);
    if(typeof(webhookData) == 'object'){
      var complete_data = webhookData.cmpdetails.split(',');
      let custom_params = complete_data.reduce((object, key) => {
        var z = key.split(':')
        object[z[0]] = z[1];
        return object;
      }, {});
      console.log(custom_params)
      //var comp_id = custom_params['cmpid']
      var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
      var vid = custom_params['vid']
      console.log('Final----',comp_id,custom_params)
      var event = 'test_oracle'
      var url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
      Object.entries(custom_params).forEach(
        ([key,value]) => {
          if(key != 'cmpid' && key != 'vid'){
            console.log(key,value)
            url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
          }
        }
      )
      console.log(url);
      /*axios.get(url).then(function(response) {
        console.log(response.statusText);
      })
      .catch(function(error) {
        console.log(error);
      });*/
    }
    //res.writeHead(200);
    res.end("OK");
  } catch(err){
    console.log('Oracle \n%s', err)
  }
});

router.post('/wpsmscallback/', async (req, res) => {
  let wtappsms = req.body;
  console.log(typeof wtappsms);
  try{
      if (typeof (wtappsms) == 'object') {
          console.log(wtappsms);
          wtappsms.forEach(function (each) {
          //if (each['eventType'] == "READ" || each['eventType'] == "DELIVERED" || each['eventType'] == "SENT"){
              let eve = each.eventType;
              let exe = each.extra.split(',');
              let evname = eve.toLowerCase();        
              //console.log(exeobj.visid);
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
              //console.log([details]);
              eventpush(details);
              //}
          });
      }
  }catch (e){
      console.log("Error in incoming data from value first", e);
      res.writeHead(200);
      res.end("ERROR");
    }
  res.writeHead(200);
  res.end("OK");
});

module.exports = router;