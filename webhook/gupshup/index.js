const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');

router.get('/smscallback/readurl', function (req, res) {
    try {
        var data = req.query;
        console.log('saim',data,typeof(data));
        if (typeof (data) == 'object') {
            var cmp_data = data['extra'];
            var campaign_data = JSON.parse(cmp_data);
            var camp_data = new Object(campaign_data.cust_params);
            var vid = campaign_data['vid'];
            var comp_id = campaign_data['comp_id'];
            var mobile = data['phoneNo'];
            var status = data['status'];
            var cause = data['cause'];
            var error = data['errCode'];
            var event = '_sms_delivered';
            camp_data["mobile"] = mobile;
            camp_data["status"] = status;
            camp_data["cause"] = cause;
            camp_data["error"] = error;
            console.log(comp_id,'Gupshup SMS -', camp_data);
            //Log.L(Log.I, comp_id,'Gupshup SMS -', camp_data);
            try {
                var url = "http://evbk.gamooga.com/ev/?c=" + comp_id + "&v=" + vid + "&e=" + event
                Object.entries(camp_data).forEach(
                    ([key, value]) => url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
                );
                console.log(comp_id,'Gupshup SMS -', url)
                //Log.L(Log.I, comp_id,'Gupshup SMS -', url);
                axios.get(url).then(function (response) {
                  }).catch(function (error) {
                    console.log(comp_id,'karvy Gupshup -',error);
                    //Log.L(Log.E, comp_id,'karvy Gupshup -', error);
                  });
            }
            catch (err) {
                console.log(comp_id,'gupshup - Error in Webhook from Gamooga Event API \n%s', err);
                //Log.L(Log.E, comp_id,'gupshup - Error in Webhook from Gamooga Event API \n%s', err);
                res.writeHead(200);
                res.end("ERROR");
            }
        }
        console.log('Instead of passing object we are getting', typeof (data));
        //Log.L(Log.I,'Instead of passing object we are getting', typeof (data));        
        res.writeHead(200);
        res.end("ok");
    }
    catch (err) {
        console.log('gupshup - Error in Webhook from Gupshup \n%s', err);
        //Log.L(Log.I,'gupshup - Error in Webhook from Gupshup \n%s', err);
        res.writeHead(200);
        res.end("ERROR");
    }
});

module.exports = router;
