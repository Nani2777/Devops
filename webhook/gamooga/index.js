const Url = require('url');
const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');
const log = require('../../logger');

router.post('/wpsmscallback/', function (req, res) {
    let body = req.body;
    console.log(body);
    log.info('###############click wrapper');
    log.info(body);
    let self = this;
    let eventToTrigger = '_wpsms_click';
    let compid = body.compid;
    let vid = body.vid;
    let cp_id = body.cp_id;
    let cp_type = body.cp_type;
    let tp = body.tp;
    let tpid = body.tpid;
    let runid = body.runid;
    let td = new Date().getTime() + '' + parseInt(Math.random()*10000);
    let url = body.url;//'https://www.lidolearning.com/?utmcampaign=testcamp';    
    let urlToWrap;
    let urlObj = Url.parse(url, true, true);
    urlToWrap = urlObj.format(urlObj);
    let wrappedurl = 'http://'+'evbk.gamooga.com'+'/ev/?e='+eventToTrigger+'&c='+compid+'&v='+vid+'&ky=cp_id&vl='+cp_id+'tp=s&ky=cp_type&vl='+cp_type+'tp=s&ky=tp&vl='+tp+'tp=s&ky=tpid&vl='+tpid+'tp=s&ky=runid&vl='+runid+'tp=s&s=abc&t=xyz&z='+td+'&redir='+urlToWrap;
    console.log(wrappedurl);
    res.status(200).json({ 'url' : encodeURIComponent(wrappedurl)});//send(wrappedurl);
});

module.exports = router;