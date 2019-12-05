const express = require("express");
const router = express.Router();
const axios = require("axios");
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../logger');

router.post('/smscallback/', async (req, res) => {
  try {
    let data = req.body;
    log.info(typeof data);
    log.info(typeof data);
    log.info('<><><><><>',data);
    log.info('<><><><><>',data);
    if (typeof data == 'object') {
      if (data.jobname && data.jobname !== 'null') {
        let div = data.jobname.split(',');
        let params = {};
        for (i = 0; i < div.length; i++) {
          let fin = div[i].split(':');
          params[fin[0]] = fin[1];
        }
        let custom_params = Object.keys(params).reduce(
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
        log.info(url);
        axios.get(url).then(function(response) {
            log.info(response.statusText);
          })
          .catch(function(error) {
            log.info(error);
          });
      } else {
        log.info('jobname was not paasing while sending sms');
      }
    }
  } catch (err) {
    log.info('Error in entries for MOSL req data', err);
    res.writeHead(200);
    res.end('ERROR');
  }
  res.end('OK');
});

router.get('/smscallback/', async (req, res) => {
  try {
    let data = req.query; 
    log.info('<><><><><>',data);
    log.info('<><><><><>',data);
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
        params['delv_date']=data.delv_date;
        params['reqid']=data.reqid;
        if(params['status']== 'Success'){
          params['event']="_sms_delivered";
        }else{
          params['event']="_sms_bounced";
        }
        if(params['compid'] == '6a7ba941-3460-4ff6-b36b-1e1d214415c5'){
          params['server'] = 'engageb.rsec.co.in';
          if(params['status']== 'Success'){
            params['event']="sms_delivery";
          }
        } else if(params['compid']=='fcbe3928-6512-48a6-8cb5-c8c51e100539'){
          params['server'] = 'js3in1.gamooga.com';
        }else{
          params['server'] = 'evbk.gamooga.com';
        }
        log.info(params);
        // let custom_params = Object.keys(params).reduce(
        //   (object, key) => {
        //     if (key != 'comp_id' && key != 'vid') {
        //       object[key] = params[key];
        //     }
        //     return object;
        //   },
        //   {}
        // );
         eventpush(params);
      } else {
        log.info('jobname was not paasing while sending sms');
      }
    }
  } catch (err) {
    log.info('Error in entries for NETCORE req data', err);
    res.writeHead(200);
    res.end('ERROR');
  }
  res.end('OK');
});

module.exports = router;