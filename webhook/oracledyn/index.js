const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/espcallback/', function (req, res) {
    console.log('chat post logs');
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    console.log(req.headers);
    //winston.error('error');
    //winston.info('working'); 
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
        var comp_id = custom_params['cmpid']
        //var comp_id = '107a3b41-1aa3-45c6-a324-f0399a2aa2af'
        var vid = custom_params['vid']
        console.log('Final----',comp_id,custom_params)
        var event = 'test'
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
      res.end("ERROR");
    }
  });


module.exports = router;