const express = require('express');
const router = express.Router();
const axios = require('axios');
var morgan = require('morgan');
var winston = require('../../config/winston');

//app.use(morgan('combined', { stream: winston.stream }));
router.post('/implwebhook', function (req, res) {
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
    console.log(req.body);
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
        /*var url = "http://evbk.gamooga.com/ev/?c=" + comp_id + "&v=" + vid + "&e=" + event
        Object.entries(complete_data).forEach(
          ([key,value]) => {
            if(key != 'cmpid' && key != 'vid'){
              console.log(key,value)
              url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
            }
          }
        )*/
      }
      res.writeHead(200);
      res.end("OK");
    } catch(err){
      console.log('Oracle \n%s', err)
    }
    res.writeHead(200);
    res.end("OK");
  });

module.exports = router;