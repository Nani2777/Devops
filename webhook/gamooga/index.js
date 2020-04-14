const Url = require('url');
const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');
const log = require('../../logger');

router.post('/clickwrapper/', function (req, res) {
    let body = req.body;
    console.log(body);
    log.info('###############click wrapper');
    log.info(body);
    let self = this;
    let eventToTrigger = 'wpsms_click';
    let compid = body.compid;
    let vid = body.vid;
    let cp_id = body.cp_id;
    let cp_type = body.cp_type;
    let tpid = body.tpid;
    let runid = body.runid;
    let trigId = cp_type+cp_id+'-hrid-'+tpid;
    let td = new Date().getTime() + '' + parseInt(Math.random()*10000);
    let url = body.url;//'https://www.lidolearning.com/?utmcampaign=testcamp';    
    let urlToWrap;
    let urlObj = Url.parse(url, true, true);
    urlToWrap = urlObj.format(urlObj);
    let eventDataB64 = Buffer.from(JSON.stringify(["^"+eventToTrigger+" - "+trigId, { "link" : urlToWrap }])).toString("base64").replace(/\+/g,'-').replace(/\//g,'_');
    let wrappedurl = 'http://'+'evbk.gamooga.com'+'/mev/?data='+eventDataB64+'&c='+compid+'&v='+vid+'&s=abc&t=xyz&z='+td+'&ky=link&vl='+encodeURIComponent(urlToWrap)+'&tp=s'+'&redir='+encodeURIComponent(urlToWrap);
    console.log(encodeURIComponent(wrappedurl));
    res.status(200).json({ 'url' : encodeURIComponent(wrappedurl)});//send(wrappedurl);
});

module.exports = router;