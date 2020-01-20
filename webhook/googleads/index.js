const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../logger');


router.get('/crmupdate/', async (req, res) => {
  let smsdata = req;
  log.info('Google CRM Get data');
  //log.info(typeof smsdata,smsdata);
  log.info(req.body);
  console.log('body<><><><><><><><><><><><>',req.body);
  console.log(typeof smsdata,smsdata);
  res.writeHead(200);
  res.end("OK");
});

router.post('/crmupdate/', async (req, res) => {
//console.log('body<><><><><><><><><><><><>',req.body);
try {
  let crmupData = req.body;
  console.log('typeOF<><><><><><><><><><><><>',typeof(crmupData))
  if(typeof(crmupData) == 'object'){
    console.log(crmupData);
    let campData=[];
    campData['lead_id']= crmupData.lead_id;
    campData['api_version']= crmupData.api_version;
    campData['form_id']= crmupData.form_id;
    campData['g_campaign_id']= crmupData.campaign_id;
    campData['google_key']= crmupData.google_key;
    campData['is_test']= crmupData.is_test;
    let user_data= crmupData.user_column_data
    for (i=0;i<user_data.length;i++){
      if(user_data[i].column_name == 'Full Name'){
      campData['full_name']= user_data[i].string_value
      }
      if(user_data[i].column_name == 'User Phone'){
      campData['mobile']= user_data[i].string_value
      }
    }
    let comp_id = 'dcaf55cc-b36d-4d0e-9003-f93187c04886'
    let event = 'test_lead'
    let url = `http://evbk.gamooga.com/evwid/?c=${comp_id}&u=${campData['mobile']}&e=${event}`
    Object.entries(campData).forEach(
      ([key,value]) => {
          log.info(key,value)
          url = url + '&ky=' + key + '&vl=' + value + '&tp=s'
      }
    )
    log.info(url);
    axios.get(url).then(function(response) {
      log.info(response.statusText);
    })
  }
  res.writeHead(200);
  res.end("OK");
} catch(err){
  log.info('crmupData \n%s', err);
  console.log(err)
  res.status(404).json({'Message':"Something went wrong"})
}
});
module.exports = router;