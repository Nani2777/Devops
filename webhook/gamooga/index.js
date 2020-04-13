//import DateTimeUtil from '../util/datetime'
const Url = require('url');
//import nunjucks from 'nunjucks'
//import NunjucksEnv from './nunjucks_custom'
//import VisProp from '../vprop'
//import NodeUtil from 'util'
//import Log from '../util/log'
//import LRU from 'lru-cache'
const express = require('express');
const router = express.Router();
const axios = require('axios');
//const Log = require('stark/utils/log');
const log = require('../../logger');

router.post('/wpsmscallback/', function (req, res) {
    let body = req.body;
    console.log(body);
    let self = this;
    let eventToTrigger = '_wpsms_click';
    let compid = body.compid;
    let vid = body.vid;
    let td = new Date().getTime() + '' + parseInt(Math.random()*10000);
    let url = body.url;//'https://www.lidolearning.com/?utmcampaign=testcamp';    
    let urlToWrap;
    let urlObj = Url.parse(url, true, true);
    urlToWrap = urlObj.format(urlObj);
    let wrappedurl = 'http://'+'evbk.gamooga.com'+'/ev/?e='+eventToTrigger+'&c='+compid+'&v='+vid+'&s=abc&t=xyz&z='+td+'&redir='+urlToWrap;
    console.log(wrappedurl);
    res.status(200).json({ 'url' : encodeURIComponent(wrappedurl)});//send(wrappedurl);
});

module.exports = router;