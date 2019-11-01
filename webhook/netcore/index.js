const express = require("express");
const router = express.Router();
const axios = require("axios");
//const Log = require('stark/utils/log');

router.post('/smscallback/', async (req, res) => {
  try {
    let data = req.body;
    console.log(typeof data);
    console.log('<><><><><>',data);
    if (typeof data == 'object') {
      if (data.jobname && data.jobname !== 'null') {
        let div = data.jobname.split(',');
        let params = {};
        for (i = 0; i < div.length; i++) {
          let fin = div[i].split(':');
          params[fin[0]] = fin[1];
        }
        var custom_params = Object.keys(params).reduce(
          (object, key) => {
            if (key != 'comp_id' && key != 'vid') {
              object[key] = params[key];
            }
            return object;
          },
          {}
        );
        let Server = params.comp_id == 'fcbe3928-6512-48a6-8cb5-c8c51e100539'? 'js3in1.gamooga.com': 'evbk.gamooga.com';
        let url ='http://' +Server +'/ev/?c=' +params.comp_id +'&v=' +params.vid +'&e=_sms_delivered';
        Object.entries(custom_params).forEach(
          ([key, value]) =>
            (url = url + '&ky=' + key + '&vl=' + value + '&tp=s')
        );
        console.log(url);
        axios.get(url).then(function(response) {
            console.log(response.statusText);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log('jobname was not paasing while sending sms');
      }
    }
  } catch (err) {
    console.log('Error in entries for MOSL req data', err);
    res.writeHead(200);
    res.end('ERROR');
  }
  res.end('OK');
});

router.get('/smscallback/', async (req, res) => {
  try {
    let data = req.query;
    console.log(typeof data);
    console.log(typeof data);
    console.log('<><><><><>',data);
    if (typeof data == 'object') {
      if (data.jobname && data.jobname !== 'null') {
        let div = data.jobname.split(',');
        let params = {};
        for (i = 0; i < div.length; i++) {
          let fin = div[i].split(':');
          params[fin[0]] = fin[1];
        }
        params['status'] = data.status;
        params['mobile'] = data.mobile;
        let custom_params = Object.keys(params).reduce(
          (object, key) => {
            if (key != 'comp_id' && key != 'vid') {
              object[key] = params[key];
            }
            return object;
          },
          {}
        );
        let Server =
          params.comp_id == 'fcbe3928-6512-48a6-8cb5-c8c51e100539'? 'js3in1.gamooga.com': 'evbk.gamooga.com';
        let url ='http://' +Server +'/ev/?c=' +params.comp_id +'&v=' +params.vid +'&e=_sms_delivered';
        Object.entries(custom_params).forEach(
          ([key, value]) =>
            (url = url + '&ky=' + key + '&vl=' + value + '&tp=s')
        );
        console.log(url);
        axios.get(url).then(function(response) {
            console.log(response.statusText);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log('jobname was not paasing while sending sms');
      }
    }
  } catch (err) {
    console.log('Error in entries for NETCORE req data', err);
    res.writeHead(200);
    res.end('ERROR');
  }
  res.end('OK');
});

module.exports = router;