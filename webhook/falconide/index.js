const express = require("express");
const router = express.Router();
const axios = require("axios");
//const Log = require('stark/utils/log');
const log = require('../../logger');

router.post('/espcallback', function(req, res) {
  try {
    let request = req.body[0];
    let ExcludeEvents = request['EVENT'];
    log.info('testing',request);
    console.log('testing')
    if (ExcludeEvents !== 'clicked' && ExcludeEvents !== 'opened') {
      let WebhookData = request['X-APIHEADER'];
      let EventData = WebhookData.split(':');
      let comp_id = EventData[0];
      let visid = EventData[1];
      
      let event = `_email_${request['EVENT'] == 'sent' ? 'delivered' : request['EVENT']}`;

      let data = new Object({
        cp_type: EventData[2],
        cp_id: EventData[3],
        tp: EventData[4],
        tpid: EventData[5]
      });

      event == '_email_dropped' || event == '_email_bounced'
        ? (data['reason'] = request['RESPONSE'])
        : '';
      event == '_email_bounced'
        ? (data['bounce_type'] = request['BOUNCE_TYPE'])
        : '';

      let server = 'evbk.gamooga.com';
      if(comp_id =='fcbe3928-6512-48a6-8cb5-c8c51e100539'){
        server = 'js3in1.gamooga.com';
      }

      //var url = "http://evbk.gamooga.com/ev/?c=" +comp_id +"&v=" + visid +"&e=" +event;
      let url = `http://${server}/ev/?c=${comp_id}&v=${visid}&e=${event}`;

      Object.entries(data).forEach(
        ([key, value]) => (url = url + `&ky=${key}&vl=${value}&tp=s`)
      );
      log.info(url);
      axios
        .get(url)
        .then(function(response) {
          log.info(response.statusText);
          res.status(200).send(response.statusText);
        })
        .catch(function(error) {
          log.info(error);
        });
    }
  } catch (e) {
    log.info('Something Happended in incoming request ');
    res.status(200).send('ERROR');
  }
});

module.exports = router;
