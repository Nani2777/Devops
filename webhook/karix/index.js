const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush');
//const Log = require('stark/utils/log');
const log = require('../../logger');


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