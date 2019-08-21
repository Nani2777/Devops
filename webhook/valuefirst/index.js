const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');

router.post('/espcallback/', async (req, res) => {
    let cb_data = req.body;
    try {
        cb_data.forEach(function (each) {
            if (each['event'] == 'delivered' || each['event'] == 'bounce' || each['event'] == 'dropped' || each['event'] == "unsubscribe") {
                let comp_id = each.comp_id;
                let vid = each.vid;
                let cp_type = each.cp_type;
                let cp_id = each.cp_id;
                let tpid = each.tpid;
                let mail_type = each.mail_type;
                let email = each.emailid;
                let custom_args = {
                    "cp_type": cp_type,
                    "cp_id": cp_id,
                    "tpid": tpid,
                    "mail_type": mail_type,
                    "email": email
                }
                let event = "_email_" + each['event'];
                if (event == "_email_dropped" || event == "_email_unsubscribe") {
                    custom_args['reason'] = each.reason;
                }
                if (event == "_email_bounce") {
                    custom_args['reason'] = each.reason;
                    custom_args['bounce_category'] = each.bounce_category;
                    custom_args['type'] = each.type;
                }

                let url = "http://js1in1.gamooga.com/ev/?c=" + comp_id + "&v=" + vid + "&e=" + event
                Object.entries(custom_args).forEach(
                    ([key, value]) => url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
                );
                console.log(url);
                axios.get(url).then(function (response) {
                    console.log("Successfully data pushed to gamooga");
                    console.log(response.statusText);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        })
    } catch (e) {
        console.log("Error in incoming data from value first", e);
        res.writeHead(200);
        res.end("ERROR");
    }
    res.writeHead(200);
    res.end("OK");
});

router.post('/wpsmscallback/', async (req, res) => {
    let wtappsms = req.body;
    console.log(typeof wtappsms);
    try{
        if (typeof (wtappsms) == 'object') {
            console.log(wtappsms);
            wtappsms.forEach(function (each) {
            //if (each['eventType'] == "READ" || each['eventType'] == "DELIVERED" || each['eventType'] == "SENT"){
                let eve = each.eventType;
                let exe = each.extra.split(',');
                let evname = eve.toLowerCase();        
                //console.log(exeobj.visid);
                let details={};
                details['compid']= exe[0],
                details['vid']= exe[1],
                details['cp_id']= exe[2],
                details['tpid']= exe[3],
                details['channel'] = each.channel,
                details['cause'] = each.cause,
                details['destAddr'] = each.destAddr,
                details['errorCode'] = each.errorCode,
                details['event'] = 'whatsapp_'+evname,
                details['server'] = 'js1ijh.gamooga.com'
                //console.log([details]);
                eventpush(details);
                //}
            });
        }
    }catch (e){
        console.log("Error in incoming data from value first", e);
        res.writeHead(200);
        res.end("ERROR");
    }
    res.writeHead(200);
    res.end("OK");
  });

module.exports = router;