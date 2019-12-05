const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/espcallback/bounce/', function (req, res) {
    log.info('chat post logs');
    //log.info(req.body);
    //log.info(req.query);
    //log.info(req.params);
    //log.info(req.headers);
    //winston.error('error');
    //winston.info('working'); 
    //log.info(req.body);
    try {
      let webhookData = req.query;
      log.info('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        let complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          let z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        //log.info(custom_params)
        let comp_id = custom_params['cmpid']
        //let comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        let vid = custom_params['vid']
        //log.info('Final----',comp_id,custom_params)
        let event = 'test'
        let url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              //log.info(key,value)
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
      res.end("ERROR");
    }
  });

  router.get('/espcallback/spam/', function (req, res) {
    log.info('chat post logs');
    //log.info(req.body);
    //log.info(req.query);
    //log.info(req.params);
    //log.info(req.headers);
    //winston.error('error');
    //winston.info('working'); 
    //log.info(req.body);
    try {
      let webhookData = req.query;
      log.info('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        let complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          let z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        //log.info(custom_params)
        let comp_id = custom_params['cmpid']
        //let comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        let vid = custom_params['vid']
        //log.info('Final----',comp_id,custom_params)
        let event = 'test'
        let url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              //log.info(key,value)
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
      res.end("ERROR");
    }
  });

  router.get('/espcallback/unsubscribe/', function (req, res) {
    log.info('chat post logs');
    //log.info(req.body);
    //log.info(req.query);
    //log.info(req.params);
    //log.info(req.headers);
    //winston.error('error');
    //winston.info('working'); 
    //log.info(req.body);
    try {
      let webhookData = req.query;
      log.info('Oracle Email -', webhookData);
      if(typeof(webhookData) == 'object'){
        let complete_data = webhookData.cmpdetails.split(',');
        let custom_params = complete_data.reduce((object, key) => {
          let z = key.split(':')
          object[z[0]] = z[1];
          return object;
        }, {});
        //log.info(custom_params)
        let comp_id = custom_params['cmpid']
        //let comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        let vid = custom_params['vid']
        //log.info('Final----',comp_id,custom_params)
        let event = 'test'
        let url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&ky=email&vl=${webhookData.email}&tp=s&ky=bouncerule&vl=${webhookData.bouncerule}&tp=s&ky=bouncetype&vl=${webhookData.bouncetype}&tp=s`
        Object.entries(custom_params).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              //log.info(key,value)
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
      res.end("ERROR");
    }
  });


module.exports = router;