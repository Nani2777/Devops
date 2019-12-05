const express = require('express');
const router = express.Router();
const axios = require('axios');
const eventpush = require('../eventpush')
//const Log = require('stark/utils/log');
const log = require('../../logger');

router.post('/espcallback/', async (req, res) => {
log.info('Pepipost Email -', req.body);
  log.info('body',req.body);
  log.info('query',req.query);
  log.info('params',req.params);
  log.info('headers',req.headers);
    //Log.L(Log.I, 'Pepipost Email -', req.body);
    try {
        var webhookData = req.body;
        log.info('Pepipost Email -', webhookData);
        //Log.L(Log.I, 'Pepipost Email -', webhookData);
        if (typeof (webhookData) == 'object') {
            webhookData.forEach(function (each) {
                if (each['EVENT'] == "sent" || each['EVENT'] == "bounced" || each['EVENT'] == "unsubscribed") {
                    try {
                        var cmp_data = each['X-APIHEADER'];

                        var campaign_data = JSON.parse(cmp_data);
                        var vid = campaign_data.vid;
                        var comp_id = campaign_data.comp_id;
                        var camp_data = new Object(campaign_data.custom_params);
                        var event = "_email_" + (each['EVENT'] == 'sent' ? 'delivered' : each['EVENT']);
                        var _check_bounce = (event == '_email_bounced' ? 'true' : 'false');
                        if (_check_bounce == 'true') {
                            camp_data['bounce_type'] = each['BOUNCE_TYPE']
                            camp_data['bounce_reason'] = each['BOUNCE_REASON']
                        }
                        var url = "http://evbk.gamooga.com/ev/?c=" + comp_id + "&v=" + vid + "&e=" + event
                        Object.entries(camp_data).forEach(
                            ([key, value]) => url = url + "&ky=" + key + "&vl=" + value + "&tp=s"
                        );
                        axios.get(url).then(function (response) {
                          }).catch(function (error) {
                            log.info(comp_id,'Pepipost esp -',error);
                            //Log.L(Log.E, comp_id,'Pepipost esp -',error);
                          });
                    } catch (err) {
                        log.info(comp_id,'Pepipost - Error in entries for the Pepipost req data', req.body);
                        //Log.L(Log.E, comp_id,'Pepipost - Error in entries for the Pepipost req data', req.body);
                        res.writeHead(200);
                        res.end("ERROR");
                    }
                }
            })
        }
        res.writeHead(200);
        res.end("OK");
    } catch (err) {
        log.info('Pepipost - Error in Webhook from Pepipost \n%s', err);
        //Log.L(Log.E, 'Pepipost - Error in Webhook from Pepipost \n%s', err);
        res.writeHead(200);
        res.end("ERROR");
    }
    res.writeHead(200);
        res.end("OK");
});

router.post('/esppostback/', async (req, res) => {
        try {
            var webhookData = req.body;
            log.info(typeof webhookData);
            if (typeof (webhookData) == 'object') {
                webhookData.forEach(function (each) {
                        try {
                            var cmp_data = each['X-APIHEADER'];
                            var evname = each.EVENT.toLowerCase();
                            var eventname;
                            if(evname == 'sent'){
                             eventname='delivered';
                            }else{
                             eventname = evname;
                            }
                            let exe = cmp_data.split(':');
                            let details = {};
                               details['compid']= exe[0];
                               details['vid']= exe[1];
                               details['cp_type']= exe[2];
                               details['cp_id']= exe[3];
                               details['tp']= exe[4];
                               details['tpid']= exe[5];
                               details['email'] = each.EMAIL,
                               details['event'] = eventname,
                               details['server'] = 'evbk.gamooga.com'
                               eventpush(details);
                               log.info(details, '------Sent to eventpush');
                        } catch (err) {
                            log.info(comp_id,'Pepipost - Error in entries for the Pepipost req data', req.body);
                            //Log.L(Log.E, comp_id,'Pepipost - Error in entries for the Pepipost req data', req.body);
                            res.writeHead(200);
                            res.end("ERROR");
                        }
                })
            }
            res.writeHead(200);
            res.end("OK");
        } catch (err) {
            log.info('Pepipost - Error in Webhook from Pepipost \n%s', err);
            //Log.L(Log.E, 'Pepipost - Error in Webhook from Pepipost \n%s', err);
            res.writeHead(200);
            res.end("ERROR");
        }
        //res.writeHead(200);
          //  res.end("OK");
    });
module.exports = router;