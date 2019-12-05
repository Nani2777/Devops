const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');
const log = require('../../logger');

router.post('/leadapi/', async (req, res) => {
  try {
    let data = req.body;
    log.info(typeof data);
    let comp_id = data['c'];
    let vid = data['v'];
    let event = data['e'];
    let custom_params = Object.keys(data).reduce((object, key) => {
      if (key != 'c' && key != 'v' && key != 'e') {
        object[key] = data[key];
      }
      return object;
    }, {});
    let str_data = JSON.stringify(custom_params);
    let final_data = str_data
      .replace('{', '')
      .replace('}', '')
      .replace(/"/g, '')
      .replace(/,/g, '&')
      .replace(/:/g, '=');
    log.info(final_data);
    try {
      let url =`http://evbk.gamooga.com/ev/?c=${comp_id}&v=${vid}&e=${event}&${final_data}`;
      /*Object.entries(custom_params).forEach(
            ([key, value]) => url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
        );*/
      log.info(url);
      axios
        .get(url)
        .then(function(response) {
          if (response.status == 200) {
            res.send(200).json(custom_params);
          }
        })
        .catch(function(error) {
          log.info(error);
        });
    } catch (err) {
      log.info('Error in Webhook from Gamooga Event API', err);
      res.writeHead(200);
      res.end('ERROR in axios call');
    }
  } catch (err) {
    log.info('Titan response Error in Webhook \n%s', err);
    res.writeHead(200);
    res.end('ERROR');
  }
  //res.end('OK');
});

module.exports = router;