const express = require("express");
const router = express.Router();
const axios = require("axios");
//const Log = require('stark/utils/log');

router.post('/espcallback', function(req, res) {
  try {
    let request = req.body[0];
    let ExcludeEvents = request['EVENT'];
    console.log('testing',request);
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

      //var url = "http://evbk.gamooga.com/ev/?c=" +comp_id +"&v=" + visid +"&e=" +event;
      let url = `http://evbk.gamooga.com/ev/?c=${comp_id}&v=${visid}&e=${event}`;

      Object.entries(data).forEach(
        ([key, value]) => (url = url + `&ky=${key}&vl=${value}&tp=s`)
      );
      console.log(url);
      axios
        .get(url)
        .then(function(response) {
          console.log(response.statusText);
          res.status(200).send(response.statusText);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  } catch (e) {
    console.log('Something Happended in incoming request ');
    res.status(200).send('ERROR');
  }
});

module.exports = router;
