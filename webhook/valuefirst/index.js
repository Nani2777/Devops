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
                log.info(url);
                axios.get(url).then(function (response) {
                    log.info("Successfully data pushed to gamooga");
                    log.info(response.statusText);
                }).catch(function (error) {
                    log.info(error);
                });
            }
        })
    } catch (e) {
        log.info("Error in incoming data from value first", e);
        res.writeHead(200);
        res.end("ERROR");
    }
    res.writeHead(200);
    res.end("OK");
});

router.post('/wpsmscallback/', async (req, res) => {
    let wtappsms = req.body;
    log.info(typeof wtappsms);
    try{
        if (typeof (wtappsms) == 'object') {
            log.info(wtappsms);
            wtappsms.forEach(function (each) {
            //if (each['eventType'] == "READ" || each['eventType'] == "DELIVERED" || each['eventType'] == "SENT"){
                let eve = each.eventType;
                let exe = each.extra.split(',');
                let evname = eve.toLowerCase();        
                //log.info(exeobj.visid);
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
                details['server'] = 'js1in1.gamooga.com'
                //log.info([details]);
                eventpush(details);
                //}
            });
        }
    }catch (e){
        log.info("Error in incoming data from value first", e);
        res.writeHead(200);
        res.end("ERROR");
    }
    res.writeHead(200);
    res.end("OK");
  });

module.exports = router;