const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');


router.post('/espcallback/', function (req, res) {
  let webhookData = req.body;
  if (typeof (webhookData) == 'object') {
    console.log(webhookData);
    if ((webhookData['event_type'] == "delivery_attempt" && webhookData["status"]=="success") || webhookData['event_type'] == "bounce_all") {
      try {
        var cmp_data = webhookData['click_tracking_id'];
        var campaign_data = JSON.parse(cmp_data);
        var vid = campaign_data.vid;
        var comp_id = campaign_data.comp_id;
        var camp_data = new Object(campaign_data.custom_params);
        var event = "_email_delivered"; 
        if (webhookData['event_type'] == "bounce_all"){
          event = "_email_bounce"
          camp_data["bounce_text"] = webhookData.bounce_text;
        }
        var url = "http://evbk.gamooga.com/ev/?c=" + comp_id + "&v=" + vid + "&e=" + event
        Object.entries(camp_data).forEach(
          ([key, value]) => url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
        );
        console.log(url);
        axios.get(url).then(function (response) {
          console.log(response.statusText)
        }).catch(function (error) {
          console.log(error);
        });
      } catch (err) {
        console.log('Error in entries for the Mailkoot req data', err);
        //Log.L(Log.E, 'Error in entries for the Mailkoot req data', err);
        res.writeHead(200);
        res.end("ERROR");
      }
    }
  }
  res.writeHead(200);
  res.end("OK");
});

module.exports = router;